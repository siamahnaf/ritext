"use client"
import { Editor, Toolbar, Content, Bold } from "ritext";
import "ritext/dist/index.css";

const extensions = [
    Bold.configure()
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