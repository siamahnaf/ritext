"use client"
import { Editor, Toolbar, Content } from "ritext";

//Extensions
import { History } from "ritext/extension/history";
import { Bold } from "ritext/extension/bold";
import { Italic } from "ritext/extension/italic";
import { Underline } from "ritext/extension/underline";
import { Strike } from "ritext/extension/strike";
import { Subscript } from "ritext/extension/subscript";
import { Superscript } from "ritext/extension/superscript";
import { SubAndSuperscript } from "ritext/extension/subandsuperscript";
import { ClearFormat } from "ritext/extension/clearformat";
import { Heading } from "ritext/extension/heading";
import { FontFamily } from "ritext/extension/font-family";
import { FontSize } from "ritext/extension/font-size";

//CSS
import "ritext/styles.css";

const extensions = [
    History,
    Bold,
    Italic,
    Underline,
    Strike,
    Subscript,
    Superscript,
    SubAndSuperscript,
    ClearFormat,
    Heading,
    FontFamily,
    FontSize
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