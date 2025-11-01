import TiptapUnder from "@tiptap/extension-underline";
import { Mark } from "@tiptap/react";
import UnderIcon from "../icon/UnderIcon";

//Components
import ButtonComponent from "../components/ButtonComponent";
import { ExtButtonOptions } from "../types/tiptap-ext.type";

export const Underline: Mark<ExtButtonOptions, any> = TiptapUnder.extend<ExtButtonOptions>({
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
                        _internalIcon={<UnderIcon />}
                        _extName="underline"
                        _onToggle={() => editor.chain().focus().toggleUnderline().run()}
                        _interShortcut="⌘ + U"
                        _tooltipContent="Underline"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});