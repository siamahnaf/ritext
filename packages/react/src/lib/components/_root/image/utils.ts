import type React from "react";
import { ImageAcceptType, type ResolutionType } from "../image/typings";

export const openFileDialog = (inputRef: React.RefObject<HTMLInputElement | null>): void => {
    if (inputRef.current) inputRef.current.click();
};

export const getImageAccepts = (acceptType?: ImageAcceptType | Exclude<ImageAcceptType, ImageAcceptType.ALL>[]) => {
    if (!acceptType || acceptType === ImageAcceptType.ALL) {
        const defaultArray: string[] = Object.values(ImageAcceptType).filter(value => value !== ImageAcceptType.ALL);
        return defaultArray;
    } else {
        return acceptType as string[];
    }
}

export const getImage = (file: File): Promise<HTMLImageElement> => {
    const image = new Image();
    return new Promise((resolve) => {
        image.addEventListener('load', () => resolve(image));
        image.src = URL.createObjectURL(file);
    });
};

export const getBase64 = (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(String(reader.result)));
        reader.readAsDataURL(file);
    });
};


export const isResolutionValid = (image: HTMLImageElement, resolutionType: ResolutionType, resolutionWidth: number | undefined, resolutionHeight: number | undefined): boolean => {
    if (!resolutionWidth || !resolutionHeight || !image.width || !image.height)
        return true;
    switch (resolutionType) {
        case 'absolute': {
            if (image.width === resolutionWidth && image.height === resolutionHeight)
                return true;
            break;
        }
        case 'ratio': {
            const ratio = resolutionWidth / resolutionHeight;
            if (image.width / image.height === ratio) return true;
            break;
        }
        case 'less': {
            if (image.width <= resolutionWidth && image.height <= resolutionHeight)
                return true;
            break;
        }
        case 'more': {
            if (image.width >= resolutionWidth && image.height >= resolutionHeight)
                return true;
            break;
        }
        default:
            break;
    }
    return false;
};


export const createImage = (url: string) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.src = url
    })

export function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180
}

export function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation)

    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
}

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { width: number, height: number, x: number, y: number } | null,
    rotation: number = 0,
    flip: { horizontal: boolean, vertical: boolean } = { horizontal: false, vertical: false }
) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const image = await createImage(imageSrc) as any;
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx || !pixelCrop) {
        return null
    }

    const rotRad = getRadianAngle(rotation)

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    )

    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')

    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
        return null
    }

    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    const blob: Blob = await new Promise((resolve) =>
        croppedCanvas.toBlob((b) => resolve(b as Blob), "image/png")
    );
    return {
        file: new File([blob], `${crypto.randomUUID()}.png`, { type: "image/png" }),
        dataURL: croppedCanvas.toDataURL("image/png")
    }
}