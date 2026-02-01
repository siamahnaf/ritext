import { EditorContent } from "@tiptap/react";
import { useEditor } from "./context/editor.context";
import { twMerge } from "tailwind-merge";

//Interface
interface Props {
    className?: string;
}

const Content = ({ className }: Props) => {
    const { editor } = useEditor();

    return (
        <EditorContent editor={editor} className={twMerge("focus:outline-none [&_.tiptap]:focus:outline-none [&_.tiptap]:min-h-50 [&_.tiptap]:p-[10px_20px]", className)} />
    );
};

export default Content;