import { ReactNode, useMemo } from "react";
import { type Extensions, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

//Context
import { EditorProvider } from "./context/editor.context";

//Interface
interface Props {
    children?: ReactNode;
    extensions?: Extensions;
    className?: string;
}

const Editor = ({ children, extensions = [], className }: Props) => {
    const editor = useEditor({
        extensions: [Document, Paragraph, Text, ...extensions],
        immediatelyRender: false,
    });

    const value = useMemo(() => ({ editor }), [editor]);

    return (
        <EditorProvider value={value}>
            <div className={className}>
                {children}
            </div>
        </EditorProvider>
    );
};

export default Editor;