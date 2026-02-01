import { type ReactNode, useMemo } from "react";
import { type Extensions, useEditor } from "@tiptap/react";

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
        extensions: [...extensions],
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