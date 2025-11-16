import type { ReactNode } from "react";
import type { Node } from "@tiptap/react";
import TiptapHeading from "@tiptap/extension-heading";
import type { Editor } from "@tiptap/react";
import { H1Icon, H2Icon, H3Icon, H4Icon, H5Icon, H6Icon } from "../lib/icon/HeadingIcon";

//Components
import DropdownComponent from "../lib/components/DropdownComponent";
import DropdownItemComponent from "../lib/components/DropdownItemComponent";
import type { ExtDropdownOptions, ExtDropdownItemProps } from "../lib/types/tiptap-ext.type";

//Interface
interface ExtHeadingOptions extends ExtDropdownOptions {
    showKeyShortcutText?: boolean;
    levels?: { enable: boolean, icon?: ReactNode, text?: string, keyShortcuts?: string }[];
    component: (args: {
        options: ExtHeadingOptions,
        editor: Editor,
        dropdownContainerClassName: string;
        dropdownItemClassName: string;
    }) => ReactNode;
}

export const Heading: Node<ExtHeadingOptions> = TiptapHeading.extend<ExtHeadingOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            component: ({ options, editor, dropdownContainerClassName, dropdownItemClassName }) => {
                const defaultIcons: Record<number, React.ReactNode> = {
                    1: <H1Icon />, 2: <H2Icon />, 3: <H3Icon />,
                    4: <H4Icon />, 5: <H5Icon />, 6: <H6Icon />,
                };
                const defaultTexts: Record<number, string> = {
                    1: "Heading 1", 2: "Heading 2", 3: "Heading 3",
                    4: "Heading 4", 5: "Heading 5", 6: "Heading 6",
                };
                const defaultKeys: Record<number, string> = {
                    1: "⌘⌥ 1", 2: "⌘⌥ 2", 3: "⌘⌥ 3",
                    4: "⌘⌥ 4", 5: "⌘⌥ 5", 6: "⌘⌥ 6",
                };

                const list: ExtDropdownItemProps[] = [];
                const levels = options.levels ?? [];

                for (let level = 1; level <= 6; level++) {
                    const cfg = levels[level - 1];
                    const enabled = cfg?.enable ?? true;
                    if (!enabled) continue;

                    list.push({
                        icon: (cfg?.icon ?? defaultIcons[level]),
                        text: (cfg?.text ?? defaultTexts[level]),
                        keyBind: (cfg?.keyShortcuts ?? defaultKeys[level]),
                        onClick: () => editor.chain().focus().toggleHeading({ level: level as 1 }).run(),
                        id: `heading-${level}`,
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
                        _internalContent="Heading"
                        _dropdownClassName={dropdownContainerClassName}
                    >
                        {list.map((item) => (
                            <DropdownItemComponent
                                key={item.id}
                                onSelect={item.onClick}
                                item={item}
                                activeClassName={options.activeClassName || ""}
                                itemClassName={options.itemClassName || ""}
                                showKeyShortcutText={options.showKeyShortcutText}
                                _itemClassName={dropdownItemClassName}
                            />
                        ))}
                    </DropdownComponent>
                )
            }
        }
    }
});