import TiptapBold from "@tiptap/extension-bold";
import { Mark } from "@tiptap/react";
import BoldIcon from "../lib/icon/BoldIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const Bold: Mark<ExtButtonOptions, any> = TiptapBold.extend<ExtButtonOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            button: ({ editor, options, buttonClassName }) => {
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
                        _interShortcut="⌘ + B"
                        _tooltipContent="Bold"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});