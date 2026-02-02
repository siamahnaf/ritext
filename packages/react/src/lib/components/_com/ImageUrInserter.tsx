import { useState } from "react";
import type { Editor } from "@tiptap/react";

//Components
import InputComponent from "../InputComponent";
import CheckboxComponent from "../CheckboxComponent";

//Interface
export interface Props {
    editor?: Editor;
    onClose?: () => void;
}

const ImageUrInserter = ({ editor, onClose }: Props) => {
    //State
    const [alt, setAlt] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [inline, setInline] = useState<boolean>(false);

    const onInsertImage = () => {
        editor?.chain().focus().setImageWithInline({ src: url, alt: alt, width: 300, inline: inline }).run();
        onClose?.();
    }

    return (
        <div>
            <InputComponent
                id="url"
                label="Image URL"
                placeholder="Image url...."
                containerClassName="ritext:mt-3 ritext:mb-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
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
                containerClassName="ritext:mt-3.5"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
            />
            <button type="button" className="ritext:bg-gray-700 ritext:py-2 ritext:px-6 ritext:rounded-lg ritext:text-white ritext:w-full ritext:mt-4 ritext:relative" onClick={onInsertImage}>
                Insert Image
            </button>
        </div>
    );
};

export default ImageUrInserter;