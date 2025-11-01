"use client"
import { Editor, Toolbar, Content, Bold, Italic, Underline, Strike, Subscript, Superscript } from "ritext";
import "ritext/dist/index.css";

const extensions = [
    Bold,
    Italic,
    Underline,
    Strike,
    Subscript,
    Superscript
]

const RichEditor = () => {
    return (
        <Editor extensions={extensions} className="border border-solid border-gray-200 rounded-xl">
            <Toolbar className="p-2" />
            <hr className="border-gray-200" />
            <Content />
        </Editor>
    );
};

export default RichEditor;