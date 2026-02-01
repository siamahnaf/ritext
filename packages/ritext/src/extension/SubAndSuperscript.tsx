import type { ReactNode } from "react";
import { Extension, type Extensions } from "@tiptap/react";
import TiptapSubscript from "@tiptap/extension-subscript";
import TiptapSuperscript from "@tiptap/extension-superscript";
import { type Editor, isMacOS } from "@tiptap/react";
import SubIcon from "../lib/icon/SubIcon";
import SupIcon from "../lib/icon/SupIcon";
import SubAndSupIcon from "../lib/icon/SubAndSupIcon";

//Components
import DropdownComponent from "../lib/components/DropdownComponent";
import DropdownItemComponent from "../lib/components/DropdownItemComponent";
import type { ExtDropdownOptions, ExtDropdownItemProps } from "../lib/types/tiptap-ext.type";

//Interface
interface ExtSubAndSupOptions extends ExtDropdownOptions {
    subscript?: string | boolean;
    superscript?: string | boolean;
    subscriptIcon?: ReactNode;
    superscriptIcon?: ReactNode;
    showCommandText?: boolean;
    component: (args: {
        options: ExtSubAndSupOptions,
        editor: Editor,
        dropdownContainerClassName: string;
        dropdownItemClassName: string;
    }) => ReactNode;
}

export const SubAndSuperscript = Extension.create<ExtSubAndSupOptions>({
    name: "subAndSuperScript",
    addOptions() {
        return {
            ...this.parent?.(),
            component: ({ options, editor, dropdownContainerClassName, dropdownItemClassName }) => {
                const list: ExtDropdownItemProps[] = [];

                if (options.subscript !== false) {
                    list.push({
                        id: crypto.randomUUID(),
                        icon: options.subscriptIcon ?? <SubIcon />,
                        text: typeof options.subscript === "string" ? options.subscript : "Subscript",
                        onClick: () => editor.chain().focus().toggleSubscript().run(),
                        keyBind: isMacOS() ? "⌘ + ," : "Ctrl + ,",
                        name: "subscript"
                    });
                }

                if (options.superscript !== false) {
                    list.push({
                        id: crypto.randomUUID(),
                        icon: options.superscriptIcon ?? <SupIcon />,
                        text: typeof options.superscript === "string" ? options.superscript : "Superscript",
                        onClick: () => editor.chain().focus().toggleSuperscript().run(),
                        keyBind: isMacOS() ? "⌘ + ." : "Ctrl + .",
                        name: "superscript"
                    });
                }
                return (
                    <DropdownComponent
                        className={options.className}
                        showArrow={options.showArrow}
                        content={options.content}
                        dropdownClassName={options.dropdownClassName}
                        style={options.style}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _tooltipContent="Sub & Superscript"
                        _internalContent={<SubAndSupIcon />}
                        _dropdownClassName={dropdownContainerClassName}
                    >
                        {list.map((item) => (
                            <DropdownItemComponent
                                key={item.id}
                                onSelect={item.onClick}
                                item={item}
                                activeClassName={options.activeClassName || ""}
                                itemClassName={options.itemClassName || ""}
                                _itemClassName={dropdownItemClassName}
                            />
                        ))}
                    </DropdownComponent>
                )
            }
        }
    },
    addExtensions() {
        const extensions: Extensions = [];

        if (this.options.subscript !== false) extensions.push(TiptapSubscript);
        if (this.options.superscript !== false) extensions.push(TiptapSuperscript)

        return extensions;
    }
});