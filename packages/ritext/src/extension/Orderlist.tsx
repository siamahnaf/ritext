import { OrderedList as TiptapOrderedList } from "@tiptap/extension-list";
import type { Node } from "@tiptap/react";
import { OrderListIcon } from "../lib/icon/listIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const OrderedList: Node<ExtButtonOptions> = TiptapOrderedList.extend<ExtButtonOptions>({
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