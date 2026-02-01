import TiptapUnder from "@tiptap/extension-underline";
import type { Mark } from "@tiptap/react";
import UnderIcon from "../lib/icon/UnderIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const Underline: Mark<ExtButtonOptions> = TiptapUnder.extend<ExtButtonOptions>({
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
                        _internalIcon={<UnderIcon />}
                        _extName="underline"
                        _onToggle={() => editor.chain().focus().toggleUnderline().run()}
                        _interShortcut={{ win: "Ctrl + U", mac: "⌘ + U" }}
                        _tooltipContent="Underline"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});