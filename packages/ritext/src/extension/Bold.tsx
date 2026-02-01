import TiptapBold from "@tiptap/extension-bold";
import type { Mark } from "@tiptap/react";
import BoldIcon from "../lib/icon/BoldIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const Bold: Mark<ExtButtonOptions> = TiptapBold.extend<ExtButtonOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            component: ({ editor, options, buttonClassName }) => {
                return (
                    <ButtonComponent
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        activeClassName={options.activeClassName}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<BoldIcon />}
                        _extName="bold"
                        _onToggle={() => editor.chain().focus().toggleBold().run()}
                        _interShortcut={{ win: "Ctrl + B", mac: "⌘ + B" }}
                        _tooltipContent="Bold"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});