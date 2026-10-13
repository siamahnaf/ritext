"use client"
import { useState, useRef } from "react";
import { Editor, Toolbar, Content, EditorRef, BubbleMenu, SlashCommand, SlashItems } from "ritext";

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
import { Youtube } from "ritext/extension/youtube";

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
        placeholder: "Type '/' for commands"
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
    Youtube,
    Table,
    Emoji,
    HardBreak,

]

const RichEditor = () => {
    const [content, setContent] = useState(`<h2 style="text-align: left;">Welcome to Ritext ✨</h2><p style="text-align: left;">Ritext is a modern rich text editor built for React. It’s designed to feel simple at first, but powerful when you need structure.</p><p style="text-align: left;">Try selecting text to test inline formatting like <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike</s>, and inline code.</p><blockquote><p style="text-align: left;"><span style="color: rgb(226, 102, 82);">“Write clean content, then style it your way.”</span></p></blockquote><h3 style="text-align: left;">Quick demo checklist</h3><ul><li><p style="text-align: left;">Make a sentence <strong>bold</strong> and <em>italic</em></p></li><li><p style="text-align: left;">Turn this list into an ordered list</p></li><li><p style="text-align: left;">Add a link to <a target="_blank" rel="noopener noreferrer" class="link" href="https://ritext.vercel.app">ritext.vercel.app</a></p></li></ul><h3 style="text-align: left;">Image support</h3><p style="text-align: left;">Images can be inserted inline to enrich content. Here’s one sample image:<br></p><p style="text-align: center;"><img src="https://imagisum.vercel.app/image?id=x-10489623&width=1280&height=857" alt="Ritext" data-width="517" data-height="388" data-inline="false" data-flip-x="false" data-flip-y="false" data-align="center" data-border-radius="24" style="text-align: left; border-radius: 24px;">A sample image inside the Ritext playground.</p><h3 style="text-align: left;">Try a nested list</h3><ul><li><p style="text-align: left;">Ritext basics</p><ul><li><p style="text-align: left;">Headings</p></li><li><p style="text-align: left;">Lists</p></li><li><p style="text-align: left;">Blockquotes</p></li></ul></li><li><p style="text-align: left;">Next steps</p><ul><li><p style="text-align: left;">Tables</p></li><li><p style="text-align: left;">Slash commands</p></li><li><p style="text-align: left;">Custom nodes</p></li></ul></li></ul><p style="text-align: left;">End of demo — now edit this content and make it yours 🚀</p>`);


    const ref = useRef<EditorRef>(null);

    return (
        <div>
            <Editor
                ref={ref}
                extensions={extensions}
                content={content}
                onContentChange={(e) => setContent(e.content as string)}
                className="border border-solid bg-white border-gray-200 rounded-xl"
            >
                <Toolbar className="p-2 sticky rounded-t-xl top-0 border-b border-solid border-gray-200 bg-white z-9" />
                <Content />
                <BubbleMenu />
                <SlashCommand />
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