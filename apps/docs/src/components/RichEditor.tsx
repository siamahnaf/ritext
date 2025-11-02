"use client"
import { Editor, Toolbar, Content } from "ritext";

//Extensions
import { Bold } from "ritext/extension/bold";
import { Italic } from "ritext/extension/italic";
import { Underline } from "ritext/extension/underline";
import { Strike } from "ritext/extension/strike";
import { Subscript } from "ritext/extension/subscript";
import { Superscript } from "ritext/extension/superscript";

//CSS
import "ritext/styles.css";

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