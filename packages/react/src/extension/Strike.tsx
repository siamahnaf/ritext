import { Strike as TiptapStrike, type StrikeOptions } from "@tiptap/extension-strike";
import type { Mark } from "@tiptap/react";
import { StrikeIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
export type ExtStrikeOptions = ExtButtonOptions<StrikeOptions & {
    showInBubbleMenu?: boolean;
    bubbleMenuPosition?: number;
}>;

export const Strike: Mark<ExtStrikeOptions> = TiptapStrike.extend<ExtStrikeOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as StrikeOptions ?? {}),
            showInBubbleMenu: true,
            bubbleMenuPosition: 5,
            component: ({ options, editor, buttonClassName }) => {
                return (
                    <ButtonComponent
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        activeClassName={options.activeClassName}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<StrikeIcon />}
                        _extName="strike"
                        _onToggle={() => editor.chain().focus().toggleStrike().run()}
                        _interShortcut={{ win: "Ctrl + ⇧ + S", mac: "⌘ + ⇧ + S" }}
                        _tooltipContent="Strike"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});