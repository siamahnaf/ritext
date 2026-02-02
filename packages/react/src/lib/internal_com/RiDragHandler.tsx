"use clint"
import { useState, useEffect } from "react";
import { DragHandle } from "@tiptap/extension-drag-handle-react";
import { TextSelection } from "@tiptap/pm/state";
import { DragVerticalIcon, PlusIcon } from "../icons";
import Tooltip from "../components/_com/Tooltip";
import { useEditor } from "../context/editor.context";

const RiDragHandler = () => {
    //State
    const [ready, setReady] = useState(false);

    const { editor } = useEditor();

    //Effect Check
    useEffect(() => {
        if (!editor) return;

        let raf = requestAnimationFrame(() => {
            const ok = !!editor.view?.dom && editor.view.dom.isConnected;
            setReady(ok);
        });

        return () => cancelAnimationFrame(raf);
    }, [editor]);

    if (!editor || !ready) return null;

    const insertSlash = () => {
        editor.chain().focus().command(({ tr, state }) => {
            const { $from } = state.selection;
            let blockDepth = $from.depth;
            while (blockDepth > 0 && !$from.node(blockDepth).isBlock) blockDepth--;

            const blockNode = $from.node(blockDepth);
            const isEmptyBlock = blockNode.isTextblock && blockNode.content.size === 0;

            if (isEmptyBlock) {
                tr.insertText("/", state.selection.from, state.selection.to);
                tr.setSelection(TextSelection.create(tr.doc, state.selection.from + 1));
                return true;
            }

            const insertPos = $from.after(blockDepth);
            const paragraph = state.schema.nodes.paragraph;
            const text = state.schema.text("/");
            if (!paragraph) return false;

            tr.insert(insertPos, paragraph.create(null, text));
            tr.setSelection(TextSelection.create(tr.doc, insertPos + 2));
            return true;
        }).run();
    };


    return (
        <DragHandle
            editor={editor}
            computePositionConfig={{
                placement: "left",
                strategy: "fixed"
            }}
            pluginKey="ri-drag-handle"
        >
            <div className="flex gap-x-1.5 mt-1.5 -translate-x-1.5">
                <Tooltip content="Insert Content">
                    <button
                        type="button"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); insertSlash(); }}
                    >
                        <PlusIcon size={16} />
                    </button>
                </Tooltip>

                <Tooltip content="Drag for move">
                    <button type="button">
                        <DragVerticalIcon size={16} />
                    </button>
                </Tooltip>
            </div>
        </DragHandle>
    );
};

export default RiDragHandler;
