import TiptapSuperscript from "@tiptap/extension-superscript";
import { Mark } from "@tiptap/react";
import SupIcon from "../icon/SupIcon";

//Components
import ButtonComponent from "../components/ButtonComponent";
import { ExtButtonOptions } from "../types/tiptap-ext.type";

export const Superscript: Mark<ExtButtonOptions, any> = TiptapSuperscript.extend<ExtButtonOptions>({
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
                        _internalIcon={<SupIcon />}
                        _extName="superscript"
                        _onToggle={() => editor.chain().focus().toggleSuperscript().run()}
                        _interShortcut="⌘ + ,"
                        _tooltipContent="Superscript"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});