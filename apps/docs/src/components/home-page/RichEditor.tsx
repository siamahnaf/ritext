"use client"
import { useState, useRef } from "react";
import { Editor, Toolbar, Content, EditorRef } from "ritext";

//Extensions
import { Document, Text, Paragraph, TextStyle, ListItem, ListKeymap, Dropcursor, Gapcursor, Placeholder, TrailingNode } from "ritext/extension/base";
import { History } from "ritext/extension/history";
import { Bold } from "ritext/extension/bold";
import { Italic } from "ritext/extension/italic";
import { Underline } from "ritext/extension/underline";
import { Strike } from "ritext/extension/strike";
import { Subscript } from "ritext/extension/subscript";
import { Superscript } from "ritext/extension/superscript";
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
import { Image } from "ritext/extension/image";
import { BlockQuote } from "ritext/extension/blockquote";
import { HorizontalRule } from "ritext/extension/horizontalrule";
import { Table } from "ritext/extension/table";
import { Emoji } from "ritext/extension/emoji";
import { HardBreak } from "ritext/extension/hardbreak";

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
    TrailingNode,
    Dropcursor.configure({
        width: 4
    }),
    Gapcursor,
    Placeholder.configure({
        placeholder: "Type your content here..."
    }),

    //Custom Extensions
    History,
    Bold,
    Italic,
    Underline,
    Strike,
    Subscript,
    Superscript,
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
    Links,
    Image,
    BlockQuote,
    HorizontalRule,
    Table,
    Emoji,
    HardBreak
]

const RichEditor = () => {
    const [content, setContent] = useState(`
    <h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>    
    `);

    const ref = useRef<EditorRef>(null);

    return (
        <div>
            <Editor
                ref={ref}
                extensions={extensions}
                content={content}
                onContentChange={(e) => setContent(e as string)}
                className="border border-solid border-gray-200 rounded-xl"
            >
                <Toolbar className="p-2" />
                <hr className="border-gray-200" />
                <Content />
            </Editor>
            <div className="flex gap-x-4 items-center mt-4 ">
                <h5 className="text-xl font-semibold">Output</h5>
                <button className="bg-gray-800 text-white px-3 py-1.5 rounded-md" onClick={() => ref.current?.clear()}>
                    Clear Content
                </button>
            </div>
            <p className="border border-gray-200 p-4 mt-3 rounded-xl">{content}</p>
        </div>
    );
};

export default RichEditor;