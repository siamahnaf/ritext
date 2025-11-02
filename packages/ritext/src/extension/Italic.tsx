import TiptapItalic from "@tiptap/extension-italic";
import { Mark } from "@tiptap/react";
import ItalicIcon from "../lib/icon/ItalicIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const Italic: Mark<ExtButtonOptions, any> = TiptapItalic.extend<ExtButtonOptions>({
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
                        _internalIcon={<ItalicIcon />}
                        _extName="italic"
                        _onToggle={() => editor.chain().focus().toggleItalic().run()}
                        _interShortcut="⌘ + I"
                        _tooltipContent="Italic"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});