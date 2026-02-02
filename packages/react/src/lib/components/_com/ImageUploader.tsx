"use client"
import { Fragment, useState } from "react";
import { ImageUpload, type ImageType } from "../_root/image";
import { CloseIcon, ImageIcon, FlipVertical, FlipHorizontal } from "../../icons";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../_root/image/utils";
import { AnimatePresence, motion } from "motion/react";
import { type Editor } from "@tiptap/react";

//Components
import Loading from "./Loading";
import InputComponent from "../InputComponent";
import CheckboxComponent from "../CheckboxComponent";
import RangeSlider from "./RangeSlider";

//Interface
import type { ImageOptionsTypes } from "../../types/image.types";
export interface Props {
    editor?: Editor;
    options?: ImageOptionsTypes;
    onClose?: () => void;
}

const ImageUploader = ({ editor, options, onClose }: Props) => {
    //State
    const [image, setImage] = useState<ImageType>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [crop, setCrop] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [alt, setAlt] = useState<string>("");
    const [inline, setInline] = useState<boolean>(false);
    const [flip, setFlip] = useState<{ horizontal: boolean, vertical: boolean }>({ horizontal: false, vertical: false });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number, height: number, x: number, y: number } | null>(null);
    const [isUploading, setUploading] = useState<boolean>(false);

    //Handler
    const onImageChange = async (image: ImageType) => {
        setImage(image);
    }

    const reset = () => {
        setOpen(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setFlip({ horizontal: false, vertical: false });
        setCroppedAreaPixels(null);
    }

    const createCroppedImage = async () => {
        if (image?.dataURL) {
            const croppedImage = await getCroppedImg(
                image?.dataURL,
                croppedAreaPixels,
                rotation
            )
            onImageChange(croppedImage);
            reset();
        }
    }

    const onInsertImage = async () => {
        if (!image?.dataURL) return;
        if (options?.upload) {
            if (!image.file) return;
            setUploading(true);
            const url = await options.upload(image.file);
            editor?.chain().focus().setImageWithInline({ src: url, alt: alt, width: 400, inline: inline }).run();
            setUploading(false);
            onClose?.();
        } else {
            editor?.chain().focus().setImageWithInline({ src: image.dataURL, alt: alt, width: 400, inline: inline }).run();
            onClose?.();
        }
    }

    return (
        <div className="ritext:mt-3">
            <ImageUpload
                onChange={onImageChange}
                value={image}
                maxFileSize={options?.maxSize}
            >
                {({
                    isDragging,
                    dragProps,
                    onImageUpload,
                    errors,
                }) => (
                    <div className="ritext:relative">
                        <div className={`ritext:border ritext:bg-gray-50 ritext:overflow-hidden ritext:border-dashed ritext:w-full ritext:pt-7 ritext:pb-4 ritext:rounded-xl ritext:relative ${isDragging ? "ritext:border-green-600" : "ritext:border-gray-300"}`}>
                            <div className="ritext:text-center ritext:px-4 ritext:flex ritext:items-center ritext:justify-center ritext:w-full ritext:h-full">
                                <div>
                                    <div {...dragProps}>
                                        {!image?.dataURL ?
                                            <Fragment>
                                                <ImageIcon className="ritext:mx-auto" size={60} strokeWidth={1.5} />
                                                <p className="ritext:mt-4 ritext:text-base">Drag and drop an image here, or click following button to upload image.</p>
                                            </Fragment> :
                                            <div className="ritext:relative ritext:w-full ritext:h-full">
                                                <img src={image.dataURL} alt="Selected Image" className="ritext:object-contain ritext:w-full ritext:h-full" />
                                            </div>
                                        }
                                    </div>
                                    <div className="ritext:flex ritext:gap-x-2 ritext:mt-4">
                                        <button type="button" className="ritext:flex-1 ritext:cursor-pointer  ritext:text-center ritext:bg-white ritext:border ritext:rounded-lg ritext:border-gray-200 ritext:py-2 ritext:text-sm ritext:px-2" onClick={onImageUpload}>
                                            Upload Image
                                        </button>
                                        <button type="button" className="ritext:flex-1 ritext:rounded-lg ritext:text-center ritext:bg-white ritext:cursor-pointer ritext:border ritext:border-gray-200 ritext:py-2 ritext:text-sm ritext:px-2" onClick={() => (onImageUpload(), setOpen(true))}>
                                            Upload & Crop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors &&
                            <ul className="ritext:mt-2 ritext:ml-1">
                                {errors.maxFileSize &&
                                    <li className="ritext:flex ritext:text-sm ritext:text-error ritext:items-center ritext:gap-1"><div className="ritext:w-1 ritext:h-1 ritext:rounded-full ritext:bg-error" /> <p>File size exceeds 5MB limit.</p></li>
                                }
                                {errors.acceptType &&
                                    <li className="ritext:flex ritext:text-sm ritext:text-error ritext:items-center ritext:gap-1"><div className="ritext:w-1 ritext:h-1 ritext:rounded-full ritext:bg-error" /> <p>Only image files are allowed.</p></li>
                                }
                            </ul>
                        }
                        <CheckboxComponent
                            id="isInline"
                            checked={inline}
                            onChange={setInline}
                            label="Insert as inline"
                            bottomSpace={false}
                        />
                        <InputComponent
                            id="Alt"
                            placeholder="Alt text"
                            containerClassName="ritext:mt-3"
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                        />
                        <button type="button" className="ritext:bg-gray-700 ritext:py-2 ritext:px-6 ritext:rounded-lg ritext:text-white ritext:w-full ritext:mt-3 ritext:relative" onClick={onInsertImage}>
                            <span className={`${isUploading && "ritext:opacity-15"}`}>Insert Image</span>
                            {isUploading &&
                                <Loading className="ritext:absolute ritext:top-1/2 ritext:left-1/2 ritext:-translate-1/2 ritext:stroke-white" size={24} />
                            }
                        </button>
                    </div>
                )}
            </ImageUpload>
            <AnimatePresence>
                {open && image?.dataURL && (
                    <motion.div
                        className="ritext:fixed ritext:top-0 ritext:left-0 ritext:w-full ritext:h-full ritext:bg-black ritext:z-99999 ritext:flex ritext:flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button type="button" className="ritext:absolute ritext:top-8 ritext:right-8 ritext:bg-white ritext:z-9999999 ritext:text-black ritext:rounded-md ritext:p-1" onClick={() => (reset(), setImage(null))}>
                            <CloseIcon />
                        </button>
                        <div className="ritext:w-full ritext:flex-1 ritext:relative ritext:h-full">
                            <Cropper
                                image={image?.dataURL}
                                aspect={options?.aspect || 1}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                                onCropComplete={(_, e) => setCroppedAreaPixels(e)}
                                transform={[
                                    `translate(${crop.x}px, ${crop.y}px)`,
                                    `rotateY(${flip.horizontal ? 180 : 0}deg)`,
                                    `rotateX(${flip.vertical ? 180 : 0}deg)`,
                                    `rotateZ(${rotation}deg)`,
                                    `scale(${zoom})`
                                ].join(" ")}
                            />
                        </div>

                        <motion.div
                            className="ritext:z-999 ritext:relative ritext:bg-white ritext:py-9 ritext:px-20"
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 16, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="ritext:flex ritext:gap-x-10">
                                <div className="ritext:flex ritext:gap-x-6 ritext:flex-1 ritext:items-center">
                                    <h4>ZOOM</h4>
                                    <div className="ritext:flex-1">
                                        <RangeSlider value={zoom} min={1} max={3} onChange={setZoom} step={0.0000000001} />
                                    </div>
                                </div>
                                <div className="ritext:flex ritext:gap-x-6 ritext:flex-1 ritext:items-center">
                                    <h4>ROTATION</h4>
                                    <div className="ritext:flex-1">
                                        <RangeSlider value={rotation} min={0} max={360} step={1} onChange={setRotation} />
                                    </div>
                                </div>
                                <button type="button" className="ritext:hover:bg-light ritext:px-2 ritext:py-2 ritext:rounded-lg ritext:transition-all" onClick={() => setFlip(prev => ({ horizontal: prev.horizontal, vertical: !prev.vertical }))}>
                                    <FlipVertical />
                                </button>
                                <button type="button" className="ritext:hover:bg-light ritext:px-2 ritext:py-2 ritext:rounded-lg ritext:transition-all" onClick={() => setFlip(prev => ({ horizontal: !prev.horizontal, vertical: prev.vertical }))}>
                                    <FlipHorizontal />
                                </button>
                            </div>
                            <div className="ritext:mt-8 ritext:text-center">
                                <button type="button" onClick={createCroppedImage} className="ritext:bg-gray-700 ritext:py-2 ritext:px-6 ritext:rounded-lg ritext:text-white">
                                    Crop & Done
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageUploader;
