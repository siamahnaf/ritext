import type { ComponentPropsWithRef } from "react";
import type { Editor, JSONContent, Extensions } from "@tiptap/react";

export type EditorContextType = {
    editor: Editor | null;
    dragHandler?: boolean;
}

export interface EditorRef {
    editor: Editor | null;
    insert: (value: string) => void;
    insertAtEnd: (value: string) => void;
    replaceSelection: (value: string) => void;
    focus: () => void;
    getHTML: () => string;
    setContent: (value: string) => void;
    clear: () => void;
}

type OutputType = "html" | "json" | "text";
type ContentValue = string | JSONContent;

export type EditorProps = ComponentPropsWithRef<"div"> & {
    extensions?: Extensions;
    dragHandler?: boolean;
    showBubbleMenu?: boolean;
    content?: ContentValue;
    output?: OutputType;
    onContentChange?: (value: string | JSONContent) => void;
}