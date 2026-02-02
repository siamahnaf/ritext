import type { ReactNode } from "react";
import type { Node } from "@tiptap/react";
import { Heading as TiptapHeading, HeadingOptions } from "@tiptap/extension-heading";
import { isMacOS } from "@tiptap/react";
import { H1Icon, H2Icon, H3Icon, H4Icon, H5Icon, H6Icon, Pilcrow } from "../lib/icons";

//Components
import DropdownComponent from "../lib/components/DropdownComponent";
import DropdownItemComponent from "../lib/components/DropdownItemComponent";
import type { ExtDropdownOptions, ExtDropdownItemProps } from "../lib/types/tiptap-ext.type";

//Interface
type ExtHeadingOptions = ExtDropdownOptions<
    HeadingOptions & {
        showKeyShortcutText?: boolean;
        level?: { enable: boolean, icon?: ReactNode, text?: string, keyShortcuts?: string }[];
        showInBubbleMenu?: boolean;
        bubbleMenuPosition?: number;
    }, {
        dropdownContainerClassName: string;
        dropdownItemClassName: string;
    }
>;

export const Heading: Node<ExtHeadingOptions> = TiptapHeading.extend<ExtHeadingOptions>({
    addOptions() {
        const parent = this.parent?.()
        return {
            ...(parent as HeadingOptions ?? {}),
            showInBubbleMenu: true,
            bubbleMenuPosition: 1,
            component: ({ options, editor, dropdownContainerClassName, dropdownItemClassName }) => {
                const macKey = isMacOS() ? "⌘ ⌥ " : "Ctrl ⌥ ";

                const defaultIcons: Record<number, React.ReactNode> = {
                    1: <H1Icon />, 2: <H2Icon />, 3: <H3Icon />,
                    4: <H4Icon />, 5: <H5Icon />, 6: <H6Icon />,
                };
                const defaultTexts: Record<number, string> = {
                    1: "Heading 1", 2: "Heading 2", 3: "Heading 3",
                    4: "Heading 4", 5: "Heading 5", 6: "Heading 6",
                };
                const defaultKeys: Record<number, string> = {
                    1: `${macKey} 1`, 2: `${macKey} 2`, 3: `${macKey} 3`,
                    4: `${macKey} 4`, 5: `${macKey} 5`, 6: `${macKey} 6`
                };

                const list: ExtDropdownItemProps[] = [];

                const levels = options.level;
                const shouldShowAll = !Array.isArray(levels) || levels.length === 0;

                if (shouldShowAll) {
                    for (let level = 1; level <= 6; level++) {
                        list.push({
                            id: crypto.randomUUID(),
                            icon: defaultIcons[level],
                            text: defaultTexts[level],
                            keyBind: defaultKeys[level],
                            onClick: () =>
                                editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run(),
                            name: "heading",
                            ext: level
                        });
                    }
                } else {
                    // levels is guaranteed non-empty array here
                    levels.forEach((cfg, index) => {
                        const level = (index + 1) as 1 | 2 | 3 | 4 | 5 | 6;
                        if (!cfg?.enable) return;

                        list.push({
                            id: crypto.randomUUID(),
                            icon: cfg.icon ?? defaultIcons[level],
                            text: cfg.text ?? defaultTexts[level],
                            keyBind: cfg.keyShortcuts ?? defaultKeys[level],
                            onClick: () => editor.chain().focus().toggleHeading({ level }).run(),
                            name: "heading",
                            ext: level
                        });
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
                        _tooltipContent="Headings"
                        _internalContent="Heading"
                        _dropdownClassName={dropdownContainerClassName}
                    >
                        <DropdownItemComponent
                            onSelect={() => editor.chain().setParagraph().run()}
                            item={{
                                id: crypto.randomUUID(),
                                icon: <Pilcrow />,
                                text: "Paragraph",
                                keyBind: `${macKey} P`,
                                onClick: () => editor.chain().setParagraph().run(),
                                name: "paragraph"
                            }}
                            activeClassName={options.activeClassName || ""}
                            itemClassName={options.itemClassName || ""}
                            showKeyShortcutText={options.showKeyShortcutText}
                            _itemClassName={dropdownItemClassName}
                        />
                        <hr className="border-gray-200" />
                        {list.map((item) => (
                            <DropdownItemComponent
                                key={`${item.name}${item.ext}`}
                                onSelect={item.onClick}
                                item={item}
                                spClass={["text-3xl", "text-2xl", "text-xl", "text-lg", "text-base", "text-sm"][(Number(item.ext) || 6) - 1]}
                                activeClassName={options.activeClassName || ""}
                                itemClassName={options.itemClassName || ""}
                                showKeyShortcutText={options.showKeyShortcutText}
                                _itemClassName={dropdownItemClassName}
                            />
                        ))}
                    </DropdownComponent>
                );
            }

        }
    }
});