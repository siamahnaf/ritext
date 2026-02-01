import type { Extension } from "@tiptap/react";
import { FontSize as TiptapFontSize, type FontSizeOptions as TiptapFontSizeOptions } from "@tiptap/extension-text-style";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import DropdownItemComponent from "../lib/components/DropdownItemComponent";
import type { ExtDropdownOptions, ExtDropdownItemProps } from "../lib/types/tiptap-ext.type";

type FontSizeListItem =
    | string
    | {
        label: string;
        value?: string | null;
    };

type ExtFontSizeOptions = ExtDropdownOptions<
    TiptapFontSizeOptions & {
        fontSizeList?: FontSizeListItem[];
    },
    {
        dropdownContainerClassName: string;
        dropdownItemClassName: string;
    }
>;

export const FontSize: Extension<ExtFontSizeOptions> = TiptapFontSize.extend<ExtFontSizeOptions>({
    addOptions() {
        const parent = this.parent?.();

        return {
            ...parent,
            types: ["textStyle"],
            fontSizeList: DEFAULT_FONT_SIZE_LIST,
            component: ({ options, editor, dropdownContainerClassName, dropdownItemClassName }) => {
                const items = options.fontSizeList ?? DEFAULT_FONT_SIZE_LIST;

                const list: ExtDropdownItemProps[] = items.map((it) => {
                    const label = typeof it === "string" ? it : it.label;
                    const value = typeof it === "string" ? it : it.value === undefined ? it.label : it.value;

                    const isDefault = value == null || label.toLowerCase() === "default";

                    return {
                        id: crypto.randomUUID(),
                        text: label,
                        name: "fontSize",
                        onClick: () => {
                            if (isDefault) {
                                editor.chain().focus().unsetFontSize().run();
                            } else {
                                editor.chain().focus().setFontSize(String(value)).run();
                            }
                        },
                    };
                });

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
                        _tooltipContent="Font Size"
                        _internalContent="Font Size"
                        _dropdownClassName={dropdownContainerClassName}
                    >
                        {list.slice(0, 1).map((item) => (
                            <DropdownItemComponent
                                key={item.id}
                                onSelect={item.onClick}
                                item={item}
                                activeClassName={options.activeClassName || ""}
                                itemClassName={options.itemClassName || ""}
                                _itemClassName={dropdownItemClassName}
                            />
                        ))}
                        <hr className="border-gray-200" />
                        {list.slice(1).map((item) => (
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
                );
            },
        };
    }
});

export const DEFAULT_FONT_SIZE_LIST: FontSizeListItem[] = [
    { label: "Default", value: null },
    "10px",
    "11px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "36px",
    "48px",
    "72px",
];
