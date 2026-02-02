import { Extension } from "@tiptap/react";
import { ClearIcon } from "../lib/icons";

//Components
import ButtonWithoutActive from "../lib/components/ButtonWithoutActive";
import type { ExtWithoutActiveOptions } from "../lib/types/tiptap-ext.type";

export type ExtClearFormOptions = ExtWithoutActiveOptions<{}>;

export const ClearFormat = Extension.create<ExtClearFormOptions>({
    name: "ClearFormat",
    addOptions() {
        return {
            ...this.parent?.(),
            component: ({ editor, options, buttonClassName }) => {
                return (
                    <ButtonWithoutActive
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<ClearIcon />}
                        _onToggle={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                        _tooltipContent="Clear Format"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});