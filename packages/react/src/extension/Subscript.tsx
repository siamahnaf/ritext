import { Subscript as TiptapSubscript, type SubscriptExtensionOptions } from "@tiptap/extension-subscript";
import type { Mark } from "@tiptap/react";
import { SubIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtSubscriptOptions = ExtButtonOptions<SubscriptExtensionOptions>;

export const Subscript: Mark<ExtSubscriptOptions> = TiptapSubscript.extend<ExtSubscriptOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as SubscriptExtensionOptions ?? {}),
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
                        _internalIcon={<SubIcon />}
                        _extName="subscript"
                        _onToggle={() => editor.chain().focus().toggleSubscript().run()}
                        _interShortcut={{ win: "Ctrl + ,", mac: "⌘ + ," }}
                        _tooltipContent="Subscript"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});