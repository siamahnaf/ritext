"use client"
import { useState } from "react";
import { type Editor } from "@tiptap/react";
import Dialog from "./_com/Dialog";

//Components
import ImageUploader from "./_com/ImageUploader";

//Interface
import { ImageOptionsTypes } from "../types/image.types";
interface Props {
    open: boolean;
    onClose: () => void;
    editor: Editor;
    options?: ImageOptionsTypes
}

const ImageDialog = ({ open, onClose, editor, options }: Props) => {
    //State
    const [type, setType] = useState<"upload" | "url">("upload");

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="max-w-100 w-[calc(100vw-4px)]"
        >
            <Dialog.Header
                title="Add an image"
                onClose={onClose}
                className="px-3 py-3.5"
                titleClassName="text-lg font-medium"
            />
            <Dialog.Body className="px-3 pb-3 pl-3 pr-3">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button className={`flex-1 py-2 text-sm text-center px-2 rounded-lg ${type === "upload" ? "bg-white" : ""}`} onClick={() => setType("upload")}>
                        Upload
                    </button>
                    <button className={`flex-1 py-2 text-sm text-center px-2 rounded-lg ${type === "url" ? "bg-white" : ""}`} onClick={() => setType("url")}>
                        URL
                    </button>
                </div>
                <ImageUploader
                    editor={editor}
                    options={options}
                    onClose={onClose}
                />
            </Dialog.Body>
        </Dialog>
    );
};

export default ImageDialog;