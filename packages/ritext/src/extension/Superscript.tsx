import TiptapSuperscript from "@tiptap/extension-superscript";
import type { Mark } from "@tiptap/react";
import SupIcon from "../lib/icon/SupIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const Superscript: Mark<ExtButtonOptions> = TiptapSuperscript.extend<ExtButtonOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
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