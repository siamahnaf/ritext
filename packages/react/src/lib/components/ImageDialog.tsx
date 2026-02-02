"use client"
import { useState } from "react";
import { type Editor } from "@tiptap/react";
import Dialog from "./_com/Dialog";

//Components
import ImageUploader from "./_com/ImageUploader";
import ImageUrInserter from "./_com/ImageUrInserter";

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
            className="ritext:max-w-100 ritext:w-[calc(100vw-4px)]"
        >
            <Dialog.Header
                title="Add an image"
                onClose={onClose}
                className="ritext:px-3 ritext:py-3.5"
                titleClassName="ritext:text-lg ritext:font-medium"
            />
            <Dialog.Body className="ritext:px-3 ritext:pb-3 ritext:pl-3 ritext:pr-3">
                <div className="ritext:flex ritext:bg-gray-100 ritext:p-1 ritext:rounded-lg">
                    <button type="button" className={`ritext:flex-1 ritext:py-2 ritext:text-sm ritext:text-center ritext:px-2 ritext:rounded-lg ${type === "upload" ? "ritext:bg-white" : ""}`} onClick={() => setType("upload")}>
                        Upload
                    </button>
                    <button type="button" className={`ritext:flex-1 ritext:py-2 ritext:text-sm ritext:text-center ritext:px-2 ritext:rounded-lg ${type === "url" ? "ritext:bg-white" : ""}`} onClick={() => setType("url")}>
                        URL
                    </button>
                </div>
                {type === "upload" &&
                    <ImageUploader
                        editor={editor}
                        options={options}
                        onClose={onClose}
                    />
                }
                {type === "url" &&
                    <ImageUrInserter
                        editor={editor}
                        onClose={onClose}
                    />
                }
            </Dialog.Body>
        </Dialog>
    );
};

export default ImageDialog;
