"use client"
import { ColorIcon, BackgroundIcon } from "../icons";
import { useEditor } from "../context/editor.context";
import { useEditorState } from "@tiptap/react";

//Interface
interface Props {
    type?: "color" | "background";
}

const ColorIconComponent = ({ type = "color" }: Props) => {
    const { editor } = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            color: type === "color" ?
                editor?.getAttributes("textStyle").color || "#000" :
                editor?.getAttributes("textStyle").backgroundColor || "#000"
        })
    });

    return (
        type === "color" ? <ColorIcon fill={editorState?.color} /> :
            <BackgroundIcon fill={editorState?.color} />
    );
};

export default ColorIconComponent;