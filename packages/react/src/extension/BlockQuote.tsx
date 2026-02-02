import { Blockquote as TiptapBlockquote, BlockquoteOptions } from "@tiptap/extension-blockquote";
import type { Node } from "@tiptap/react";
import { BlockquoteLeft } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

type ExtBlockQuoteOptions = ExtButtonOptions<BlockquoteOptions>;

export const BlockQuote: Node<ExtBlockQuoteOptions> = TiptapBlockquote.extend<ExtBlockQuoteOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as BlockquoteOptions ?? {}),
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
                        _internalIcon={<BlockquoteLeft />}
                        _extName="blockquote"
                        _onToggle={() => editor.chain().focus().toggleBlockquote().run()}
                        _interShortcut={{ win: "Ctrl + ⇧ + B", mac: "⌘ + ⇧ + B" }}
                        _tooltipContent="Block Quote"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});