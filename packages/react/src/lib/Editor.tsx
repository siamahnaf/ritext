import { forwardRef, useMemo, useImperativeHandle } from "react";
import { useEditor } from "@tiptap/react";

//Components
import RiDragHandler from "./internal_com/RiDragHandler";
import BubbleMenu from "./internal_com/BubbleMenu";

//Context
import { EditorProvider } from "./context/editor.context";

//Types
import type { EditorProps, EditorRef } from "./types/editor.types";

const Editor = forwardRef<EditorRef, EditorProps>(({
    children,
    extensions = [],
    dragHandler = true,
    showBubbleMenu = true,
    content,
    onContentChange,
    output,
    className,

    //Events
    onFocus,
    onBlur,
    onClick,
    onKeyDown
}, ref) => {
    //Stable
    const stableExtensions = useMemo(() => extensions, [extensions]);

    //Editor
    const editor = useEditor({
        extensions: stableExtensions,
        immediatelyRender: false,
        content,
        onUpdate: ({ editor }) => {
            if (!onContentChange) return;
            const out = output === "json" ? editor.getJSON() : output === "text" ? editor.getText() : editor.getHTML();
            onContentChange({ editor, content: out });
        },
        onFocus: onFocus,
        onBlur: onBlur,
        editorProps: {
            handleDOMEvents: {
                click: (_view, event) => {
                    if (editor) onClick?.({ editor, event: event as MouseEvent });
                    return false;
                },
                keydown: (_view, event) => {
                    if (editor) onKeyDown?.({ editor, event: event as KeyboardEvent });
                    return false;
                }
            }
        }
    }, [stableExtensions]);

    //Stable Editor
    const value = useMemo(() => ({ editor }), [editor]);

    //Ref Handler
    useImperativeHandle(
        ref,
        (): EditorRef => ({
            editor: editor,
            insert: (val) => {
                if (!editor) return;
                editor.chain().focus().insertContent(val).run();
            },

            insertAtEnd: (val) => {
                if (!editor) return;
                const end = editor.state.doc.content.size;
                editor.commands.insertContentAt(end, val);
                editor.commands.focus(end);
            },

            replaceSelection: (val) => {
                if (!editor) return;
                const { from, to } = editor.state.selection;
                editor.commands.insertContentAt({ from, to }, val);
                editor.chain().focus().run();
            },

            focus: () => {
                if (!editor) return;
                editor.chain().focus().run();
            },

            getHTML: () => editor?.getHTML?.() ?? "",

            setContent: (val) => {
                if (!editor) return;
                editor.commands.setContent(val);
            },

            clear: () => {
                if (!editor) return;
                editor.commands.clearContent?.();
            },
        }),
        [editor],
    );

    return (
        <EditorProvider value={{ ...value, dragHandler }}>
            <div className={className}>
                {children}
            </div>
            {value.editor && dragHandler &&
                <RiDragHandler editor={value.editor} />
            }
            {value.editor && showBubbleMenu &&
                <BubbleMenu editor={value.editor} />
            }
        </EditorProvider>
    );
});
Editor.displayName = "Editor";
export default Editor;