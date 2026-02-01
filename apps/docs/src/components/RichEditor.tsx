"use client"
import { Editor, Toolbar, Content } from "ritext";

//Extensions
import { Document, Text, Paragraph, TextStyle, ListItem, ListKeymap } from "ritext/extension/base";
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
import { Color } from "ritext/extension/color";
import { BackgroundColor } from "ritext/extension/backgroundcolor";
import { BulletList } from "ritext/extension/bulletlist";
import { OrderedList } from "ritext/extension/orderedlist";
import { TextAlign } from "ritext/extension/textalign";
import { IndentOutdent } from "ritext/extension/indentoutdent";
import { LineHeight } from "ritext/extension/lineheight";
import { TaskList } from "ritext/extension/tasklist";
import { Links } from "ritext/extension/link";

//CSS
import "ritext/styles.css";

const extensions = [
    //Base Extensions
    Document,
    Text,
    Paragraph,
    TextStyle,
    ListItem,
    ListKeymap,

    //Custom Extensions
    History,
    Bold,
    Italic,
    Underline,
    Strike,
    Subscript,
    Superscript,
    //Or
    // SubAndSuperscript,
    ClearFormat,
    Heading,
    FontFamily,
    FontSize,
    Color,
    BackgroundColor,
    BulletList,
    OrderedList,
    TextAlign,
    IndentOutdent,
    LineHeight,
    TaskList,
    Links
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