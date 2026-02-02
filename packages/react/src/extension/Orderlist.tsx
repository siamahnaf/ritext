import { OrderedList as TiptapOrderedList, OrderedListOptions } from "@tiptap/extension-list";
import type { Node } from "@tiptap/react";
import { OrderListIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtOrderListOptions = ExtButtonOptions<OrderedListOptions>;

export const OrderedList: Node<ExtOrderListOptions> = TiptapOrderedList.extend<ExtOrderListOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as OrderedListOptions ?? {}),
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
                        _internalIcon={<OrderListIcon />}
                        _extName="orderedList"
                        _onToggle={() => editor.chain().focus().toggleOrderedList().run()}
                        _interShortcut={{ win: "Ctrl + ⇧ + 7", mac: "⌘ + ⇧ + 7" }}
                        _tooltipContent="Ordered List"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});