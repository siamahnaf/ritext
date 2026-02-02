import { EditorContent } from "@tiptap/react";
import { useEditor } from "./context/editor.context";
import { twMerge } from "./utils/tw";


//Interface
interface Props {
    className?: string;
}

const Content = ({ className }: Props) => {
    const { editor, dragHandler } = useEditor();

    return (
        <EditorContent editor={editor} className={twMerge(`ritext:focus:outline-none ritext:[&_.tiptap]:focus:outline-none ritext:[&_.tiptap]:min-h-50 ${dragHandler ? "ritext:[&_.tiptap]:p-[10px_20px_10px_50px]" : "ritext:[&_.tiptap]:p-[10px_20px]"}`, className)} />
    );
};

export default Content;