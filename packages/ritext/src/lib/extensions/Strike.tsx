import TiptapStrike from "@tiptap/extension-strike";
import { Mark } from "@tiptap/react";
import StrikeIcon from "../icon/StrikeIcon";

//Components
import ButtonComponent from "../components/ButtonComponent";
import { ExtButtonOptions } from "../types/tiptap-ext.type";

export const Strike: Mark<ExtButtonOptions, any> = TiptapStrike.extend<ExtButtonOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            button: ({ options, editor, buttonClassName }) => {
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
                        _interShortcut="⌘ ⇧ S"
                        _tooltipContent="Strike"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});