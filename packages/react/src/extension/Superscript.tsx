import { Superscript as TiptapSuperscript, SuperscriptExtensionOptions } from "@tiptap/extension-superscript";
import type { Mark } from "@tiptap/react";
import { SupIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtSuperScriptOptions = ExtButtonOptions<SuperscriptExtensionOptions>;

export const Superscript: Mark<ExtSuperScriptOptions> = TiptapSuperscript.extend<ExtSuperScriptOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as SuperscriptExtensionOptions ?? {}),
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
                        _interShortcut={{ win: "Ctrl + .", mac: "⌘ + ." }}
                        _tooltipContent="Superscript"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});