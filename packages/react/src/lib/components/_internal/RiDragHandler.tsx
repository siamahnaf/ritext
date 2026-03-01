import { useRef } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import type { Node } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import { DragVerticalIcon, PlusIcon } from "../../icons";
import Tooltip from "../_com/Tooltip";

interface Props { editor: Editor }

const RiDragHandler = ({ editor }: Props) => {
    const hoveredRef = useRef<{ node: Node; pos: number } | null>(null);

    const insertSlash = () => {
        const hovered = hoveredRef.current;
        if (!hovered) return;

        const { node, pos } = hovered;

        editor.chain().focus().command(({ tr, state }) => {
            const isEmptyBlock = node.isTextblock && node.content.size === 0;
            if (isEmptyBlock) {
                const innerStart = pos + 1;
                tr.insertText("/", innerStart);
                tr.setSelection(TextSelection.create(tr.doc, innerStart + 1));
                return true;
            }
            const insertPos = pos + node.nodeSize;
            const paragraph = state.schema.nodes.paragraph;
            if (!paragraph) return false;

            tr.insert(insertPos, paragraph.create(null, state.schema.text("/")));
            tr.setSelection(TextSelection.create(tr.doc, insertPos + 2));
            return true;
        }).run();
    };

    return (
        <DragHandle
            editor={editor}
            onNodeChange={({ node, pos }) => {
                hoveredRef.current = node ? { node, pos } : null;
            }}
        >
            <div className="ritext:flex ritext:gap-x-1.5 ritext:mt-1.5 ritext:-translate-x-1.5">
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
