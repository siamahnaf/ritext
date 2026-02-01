import { BulletList as TiptapBulletList } from "@tiptap/extension-list";
import type { Node } from "@tiptap/react";
import { BulletListIcon } from "../lib/icon/listIcon";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

export const BulletList: Node<ExtButtonOptions> = TiptapBulletList.extend<ExtButtonOptions>({
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
                        _internalIcon={<BulletListIcon />}
                        _extName="bulletList"
                        _onToggle={() => editor.chain().focus().toggleBulletList().run()}
                        _interShortcut={{ win: "Ctrl + ⇧ + 8", mac: "⌘ + ⇧ + 8" }}
                        _tooltipContent="Bullet List"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});
