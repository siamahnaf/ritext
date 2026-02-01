"use client"
import { Fragment, useState } from "react";
import { ImageUpload, ImageType } from "../_root/image";
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
import { ImageOptionsTypes } from "../../types/image.types";
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
            editor?.chain().focus().setImageWithInline({ src: url, alt: alt, width: 300, inline: inline }).run();
            setUploading(false);
            onClose?.();
        } else {
            editor?.chain().focus().setImageWithInline({ src: image.dataURL, alt: alt, width: 300, inline: inline }).run();
            onClose?.();
        }
    }

    return (
        <div className="mt-3">
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
                    <div className="relative">
                        <div className={`border bg-gray-50 overflow-hidden border-dashed w-full pt-7 pb-4 rounded-xl relative ${isDragging ? "border-green-600" : "border-gray-300"}`}>
                            <div className="text-center px-4 flex items-center justify-center w-full h-full">
                                <div>
                                    <div {...dragProps}>
                                        {!image?.dataURL ?
                                            <Fragment>
                                                <ImageIcon className="mx-auto" size={60} strokeWidth={1.5} />
                                                <p className="mt-4 text-base">Drag and drop an image here, or click following button to upload image.</p>
                                            </Fragment> :
                                            <div className="relative w-full h-full">
                                                <img src={image.dataURL} alt="Selected Image" className="object-contain w-full h-full" />
                                            </div>
                                        }
                                    </div>
                                    <div className="flex gap-x-2 mt-4">
                                        <button className="flex-1 cursor-pointer  text-center bg-white border rounded-lg border-gray-200 py-2 text-sm px-2" onClick={onImageUpload}>
                                            Upload Image
                                        </button>
                                        <button className="flex-1 rounded-lg text-center bg-white cursor-pointer border border-gray-200 py-2 text-sm px-2" onClick={() => (onImageUpload(), setOpen(true))}>
                                            Upload & Crop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors &&
                            <ul className="mt-2 ml-1">
                                {errors.maxFileSize &&
                                    <li className="flex text-sm text-error items-center gap-1"><div className="w-1 h-1 rounded-full bg-error" /> <p>File size exceeds 5MB limit.</p></li>
                                }
                                {errors.acceptType &&
                                    <li className="flex text-sm text-error items-center gap-1"><div className="w-1 h-1 rounded-full bg-error" /> <p>Only image files are allowed.</p></li>
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
                            containerClassName="mt-3"
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                        />
                        <button className="bg-gray-700 py-2 px-6 rounded-lg text-white w-full mt-3 relative" onClick={onInsertImage}>
                            <span className={`${isUploading && "opacity-15"}`}>Insert Image</span>
                            {isUploading &&
                                <Loading className="absolute top-1/2 left-1/2 -translate-1/2 stroke-white" size={24} />
                            }
                        </button>
                    </div>
                )}
            </ImageUpload>
            <AnimatePresence>
                {open && image?.dataURL && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-black z-99999 flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button className="absolute top-8 right-8 bg-white z-9999999 text-black rounded-md p-1" onClick={() => (reset(), setImage(null))}>
                            <CloseIcon />
                        </button>
                        <div className="w-full flex-1 relative h-full">
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
                            className="z-999 relative bg-white py-9 px-20"
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 16, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex gap-x-10">
                                <div className="flex gap-x-6 flex-1 items-center">
                                    <h4>ZOOM</h4>
                                    <div className="flex-1">
                                        <RangeSlider value={zoom} min={1} max={3} onChange={setZoom} step={0.0000000001} />
                                    </div>
                                </div>
                                <div className="flex gap-x-6 flex-1 items-center">
                                    <h4>ROTATION</h4>
                                    <div className="flex-1">
                                        <RangeSlider value={rotation} min={0} max={360} step={1} onChange={setRotation} />
                                    </div>
                                </div>
                                <button className="hover:bg-light px-2 py-2 rounded-lg transition-all" type="button" onClick={() => setFlip(prev => ({ horizontal: prev.horizontal, vertical: !prev.vertical }))}>
                                    <FlipVertical />
                                </button>
                                <button className="hover:bg-light px-2 py-2 rounded-lg transition-all" type="button" onClick={() => setFlip(prev => ({ horizontal: !prev.horizontal, vertical: prev.vertical }))}>
                                    <FlipHorizontal />
                                </button>
                            </div>
                            <div className="mt-8 text-center">
                                <button type="button" onClick={createCroppedImage} className="bg-gray-700 py-2 px-6 rounded-lg text-white">
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