import { type ReactNode, useMemo } from "react";
import { type Extensions, useEditor } from "@tiptap/react";

//Components
import RiDragHandler from "./internal_com/RiDragHandler";
import BubbleMenu from "./internal_com/BubbleMenu";

//Context
import { EditorProvider } from "./context/editor.context";

//Interface
interface Props {
    children?: ReactNode;
    extensions?: Extensions;
    className?: string;
    dragHandler?: boolean;
    showBubbleMenu?: boolean;
}

const Editor = ({ children, extensions = [], className, dragHandler = true, showBubbleMenu = true }: Props) => {
    //Stable
    const stableExtensions = useMemo(() => extensions, [extensions]);

    //Editor
    const editor = useEditor({
        extensions: stableExtensions,
        immediatelyRender: false,
    }, [stableExtensions]);

    //Stable Editor
    const value = useMemo(() => ({ editor }), [editor]);

    return (
        <EditorProvider value={{ ...value, dragHandler }}>
            <div className={className}>
                {children}
            </div>
            {value.editor && dragHandler &&
                <RiDragHandler />
            }
            {value.editor && showBubbleMenu &&
                <BubbleMenu editor={value.editor} />
            }
        </EditorProvider>
    );
};

export default Editor;