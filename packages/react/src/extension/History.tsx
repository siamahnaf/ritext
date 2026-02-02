import { Fragment } from "react";
import { UndoRedo, type UndoRedoOptions } from "@tiptap/extensions";
import type { Extension, Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { Undo2, Redo2 } from "../lib/icons";

import ButtonWithoutActive from "../lib/components/ButtonWithoutActive";
import type { ExtWithoutActiveOptions } from "../lib/types/tiptap-ext.type";

type ExtHistoryOptions = ExtWithoutActiveOptions<UndoRedoOptions>;
type ExtHistoryComponentOptions = Parameters<ExtHistoryOptions["component"]>[0]["options"];

function HistoryButtons({
    editor,
    options,
    buttonClassName,
}: {
    editor: Editor;
    options: ExtHistoryComponentOptions;
    buttonClassName: string;
}) {
    const { canUndo, canRedo } = useEditorState({
        editor,
        selector: (ctx) => ({
            canUndo: ctx.editor.can().chain().focus().undo().run(),
            canRedo: ctx.editor.can().chain().focus().redo().run(),
        }),
    });

    return (
        <Fragment>
            <ButtonWithoutActive
                className={options.className}
                icon={options.icon}
                style={options.style}
                tooltip={options.tooltip}
                tooltipClassName={options.tooltipClassName}
                tooltipPlacement={options.tooltipPlacement}
                _internalIcon={<Undo2 />}
                _onToggle={() => editor.chain().focus().undo().run()}
                _interShortcut={{ win: "", mac: "⌘ + Z" }}
                _tooltipContent="Undo"
                _disabled={!canUndo}
                _buttonClassName={buttonClassName}
            />
            <ButtonWithoutActive
                className={options.className}
                icon={options.icon}
                style={options.style}
                tooltip={options.tooltip}
                tooltipClassName={options.tooltipClassName}
                tooltipPlacement={options.tooltipPlacement}
                _internalIcon={<Redo2 />}
                _onToggle={() => editor.chain().focus().redo().run()}
                _interShortcut={{ win: "Ctrl + Y", mac: "⌘ + Y" }}
                _tooltipContent="Redo"
                _disabled={!canRedo}
                _buttonClassName={buttonClassName}
            />
        </Fragment>
    );
}

export const History: Extension<ExtHistoryOptions> = UndoRedo.extend<ExtHistoryOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as UndoRedoOptions ?? {}),
            component: ({ editor, options, buttonClassName }) => (
                <HistoryButtons editor={editor} options={options} buttonClassName={buttonClassName} />
            ),
        };
    },
});
