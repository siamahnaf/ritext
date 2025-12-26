import { type ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import type { Extension } from "@tiptap/react";
import { FontFamily as TiptapFontFamily, type FontFamilyOptions as TiptapFontFamilyOptions, TextStyle } from "@tiptap/extension-text-style";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import DropdownItemComponent from "../lib/components/DropdownItemComponent";
import type { ExtDropdownOptions, ExtDropdownItemProps } from "../lib/types/tiptap-ext.type";

type FontFamilyListItem =
    | string
    | {
        label: string;
        value?: string | null;
    };

interface ExtFontFamilyOptions extends ExtDropdownOptions, TiptapFontFamilyOptions {
    fontFamilyList?: FontFamilyListItem[];
    component: (args: {
        options: ExtFontFamilyOptions;
        editor: Editor;
        dropdownContainerClassName: string;
        dropdownItemClassName: string;
    }) => ReactNode;
}

export const FontFamily: Extension<ExtFontFamilyOptions> = TiptapFontFamily.extend<ExtFontFamilyOptions>({
    addOptions() {
        const parent = this.parent?.();

        return {
            ...parent,
            types: parent?.types ?? ["textStyle"],
            fontFamilyList: DEFAULT_FONT_FAMILY_LIST,
            component: ({ options, editor, dropdownContainerClassName, dropdownItemClassName }) => {
                const items = options.fontFamilyList ?? DEFAULT_FONT_FAMILY_LIST;
                const list: ExtDropdownItemProps[] = items.map((it) => {
                    const label = typeof it === "string" ? it : it.label;
                    const value = typeof it === "string" ? it : it.value === undefined ? it.label : it.value;
                    const isDefault = value == null || label.toLowerCase() === "default";
                    const fontFamilyPreview = !isDefault ? String(value) : undefined;
                    return {
                        id: crypto.randomUUID(),
                        text: label,
                        name: "fontFamily",
                        style: fontFamilyPreview ? { fontFamily: fontFamilyPreview } : undefined,
                        onClick: () => {
                            if (isDefault) {
                                editor.chain().focus().unsetFontFamily().run();
                            } else {
                                editor.chain().focus().setFontFamily(String(value)).run();
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
                        _tooltipContent="Font Family"
                        _internalContent="Font Family"
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
    },
    addExtensions() {
        return [TextStyle];
    }
});

export const DEFAULT_FONT_FAMILY_LIST: FontFamilyListItem[] = [
    { label: "Default", value: null },
    "Inter",
    "Comic Sans MS, Comic Sans",
    "serif",
    "cursive",
    "Arial",
    "Arial Black",
    "Georgia",
    "Impact",
    "Tahoma",
    "Times New Roman",
    "Verdana",
    "Courier New",
    "Lucida Console",
    "Monaco",
    "monospace",
];
