import TiptapSubscript from "@tiptap/extension-subscript";
import { Mark } from "@tiptap/react";
import SubIcon from "../lib/icon/SubIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const Subscript: Mark<ExtButtonOptions, any> = TiptapSubscript.extend<ExtButtonOptions>({
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
                        _internalIcon={<SubIcon />}
                        _extName="subscript"
                        _onToggle={() => editor.chain().focus().toggleSubscript().run()}
                        _interShortcut="⌘ + ,"
                        _tooltipContent="Subscript"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});