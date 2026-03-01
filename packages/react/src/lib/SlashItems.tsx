import {
    Pilcrow,
    H1Icon, H2Icon, H3Icon, H4Icon, H5Icon, H6Icon,
    BulletListIcon, OrderListIcon, TaskListIcon,
    BlockquoteLeft,
    ImageUpIcon, TabelIcon, MinusIcon,
} from "./icons";

import type { Editor } from "@tiptap/react";
import type { SlashCommandItem } from "./types/tiptap-ext.type";
import ImageDialog from "./components/ImageDialog";

/* eslint-disable @typescript-eslint/no-explicit-any */
const cmd = (editor: Editor): any => editor.chain().focus();

export const SlashItems = {

    Paragraph: {
        id: "slash-paragraph",
        icon: <Pilcrow />,
        title: "Paragraph",
        description: "Plain text paragraph",
        extensionName: "paragraph",
        command: (editor: Editor) => cmd(editor).setParagraph().run(),
    } satisfies SlashCommandItem,

    Heading1: {
        id: "slash-heading-1",
        icon: <H1Icon />,
        title: "Heading 1",
        description: "Large section heading",
        extensionName: "heading",
        command: (editor: Editor) => cmd(editor).toggleHeading({ level: 1 }).run(),
    } satisfies SlashCommandItem,

    Heading2: {
        id: "slash-heading-2",
        icon: <H2Icon />,
        title: "Heading 2",
        description: "Medium section heading",
        extensionName: "heading",
        command: (editor: Editor) => cmd(editor).toggleHeading({ level: 2 }).run(),
    } satisfies SlashCommandItem,

    Heading3: {
        id: "slash-heading-3",
        icon: <H3Icon />,
        title: "Heading 3",
        description: "Small section heading",
        extensionName: "heading",
        command: (editor: Editor) => cmd(editor).toggleHeading({ level: 3 }).run(),
    } satisfies SlashCommandItem,

    Heading4: {
        id: "slash-heading-4",
        icon: <H4Icon />,
        title: "Heading 4",
        extensionName: "heading",
        command: (editor: Editor) => cmd(editor).toggleHeading({ level: 4 }).run(),
    } satisfies SlashCommandItem,

    Heading5: {
        id: "slash-heading-5",
        icon: <H5Icon />,
        title: "Heading 5",
        extensionName: "heading",
        command: (editor: Editor) => cmd(editor).toggleHeading({ level: 5 }).run(),
    } satisfies SlashCommandItem,

    Heading6: {
        id: "slash-heading-6",
        icon: <H6Icon />,
        title: "Heading 6",
        extensionName: "heading",
        command: (editor: Editor) => cmd(editor).toggleHeading({ level: 6 }).run(),
    } satisfies SlashCommandItem,

    BulletList: {
        id: "slash-bullet-list",
        icon: <BulletListIcon />,
        title: "Bullet List",
        description: "Create an unordered list",
        extensionName: "bulletList",
        command: (editor: Editor) => cmd(editor).toggleBulletList().run(),
    } satisfies SlashCommandItem,

    OrderedList: {
        id: "slash-ordered-list",
        icon: <OrderListIcon />,
        title: "Ordered List",
        description: "Create a numbered list",
        extensionName: "orderedList",
        command: (editor: Editor) => cmd(editor).toggleOrderedList().run(),
    } satisfies SlashCommandItem,

    TaskList: {
        id: "slash-task-list",
        icon: <TaskListIcon />,
        title: "Task List",
        description: "Create a checklist",
        extensionName: "taskList",
        command: (editor: Editor) => cmd(editor).toggleTaskList().run(),
    } satisfies SlashCommandItem,

    BlockQuote: {
        id: "slash-blockquote",
        icon: <BlockquoteLeft />,
        title: "Blockquote",
        description: "Add a quote block",
        extensionName: "blockquote",
        command: (editor: Editor) => cmd(editor).toggleBlockquote().run(),
    } satisfies SlashCommandItem,

    Image: {
        id: "slash-image",
        icon: <ImageUpIcon />,
        title: "Image",
        description: "Upload or embed an image",
        extensionName: "image",
        command: () => { },
        panelAsDialog: true,
        panel: ({ editor, onClose }) => {
            const ext = editor.extensionManager.extensions.find((e) => e.name === "image") as any;
            return (
                <ImageDialog
                    open={true}
                    onClose={onClose}
                    editor={editor}
                    options={{
                        upload: ext?.options?.upload,
                        maxSize: ext?.options?.maxSize,
                        defaultInline: ext?.options?.defaultInline,
                        enableAlt: ext?.options?.enableAlt,
                        aspect: ext?.options?.aspect,
                    }}
                />
            );
        },
    } satisfies SlashCommandItem,

    Table: {
        id: "slash-table",
        icon: <TabelIcon />,
        title: "Table",
        description: "Insert a table",
        extensionName: "table",
        command: (editor: Editor) => cmd(editor).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    } satisfies SlashCommandItem,

    HorizontalRule: {
        id: "slash-horizontal-rule",
        icon: <MinusIcon />,
        title: "Horizontal Rule",
        description: "Insert a divider line",
        extensionName: "horizontalRule",
        command: (editor: Editor) => cmd(editor).setHorizontalRule().run(),
    } satisfies SlashCommandItem,

};
