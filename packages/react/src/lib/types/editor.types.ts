import type { ReactNode } from "react";
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

export type EditorProps = {
    children?: ReactNode;
    extensions?: Extensions;
    dragHandler?: boolean;
    showBubbleMenu?: boolean;
    content?: ContentValue;
    output?: OutputType;
    onContentChange?: (e: { editor: Editor, content: string | JSONContent }) => void;
    className?: string;
    onFocus?: (e: { editor: Editor, event: FocusEvent }) => void;
    onBlur?: (e: { editor: Editor, event: FocusEvent }) => void;
    onClick?: (e: { editor: Editor, event: MouseEvent }) => void;
    onKeyDown?: (e: { editor: Editor, event: KeyboardEvent }) => void;
}