import type { Editor } from "@tiptap/react";

export type EditorContextType = {
    editor: Editor | null;
    dragHandler?: boolean;
}