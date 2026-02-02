import { HardBreak as TiptapHardBreak, HardBreakOptions } from "@tiptap/extension-hard-break";
import type { Node } from "@tiptap/react";
import { HardBreakIcon } from "../lib/icons";

//Components
import ButtonWithoutActive from "../lib/components/ButtonWithoutActive";
import type { ExtWithoutActiveOptions } from "../lib/types/tiptap-ext.type";

type ExtBoldOptions = ExtWithoutActiveOptions<HardBreakOptions & {
    showInBubbleMenu?: boolean;
    bubbleMenuPosition?: number;
}>;

export const HardBreak: Node<ExtBoldOptions> = TiptapHardBreak.extend<ExtBoldOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as HardBreakOptions ?? {}),
            showInBubbleMenu: true,
            bubbleMenuPosition: 10,
            component: ({ editor, options, buttonClassName }) => {
                return (
                    <ButtonWithoutActive
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<HardBreakIcon />}
                        _onToggle={() => editor.chain().focus().setHardBreak().run()}
                        _interShortcut={{ win: "⇧ + ⏎ + Ctrl + ⏎", mac: "⇧ + ⏎ + ⌘ + ⏎" }}
                        _tooltipContent="Hard Break"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});