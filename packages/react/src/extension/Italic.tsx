import { Italic as TiptapItalic, type ItalicOptions } from "@tiptap/extension-italic";
import type { Mark } from "@tiptap/react";
import { ItalicIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

type ExtItalicOptions = ExtButtonOptions<ItalicOptions>;

export const Italic: Mark<ExtItalicOptions> = TiptapItalic.extend<ExtItalicOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as ItalicOptions ?? {}),
            surface: { bubbleMenu: true },
            order: { bubbleMenu: 3 },
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
                        _internalIcon={<ItalicIcon />}
                        _extName="italic"
                        _onToggle={() => editor.chain().focus().toggleItalic().run()}
                        _interShortcut={{ win: "Ctrl + I", mac: "⌘ + I" }}
                        _tooltipContent="Italic"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});
