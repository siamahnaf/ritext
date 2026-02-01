import { type ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import type { Extension } from "@tiptap/react";
import { LineHeight as TiptapLineHeight, type LineHeightOptions as TiptapLineHeightOptions } from "@tiptap/extension-text-style";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import { FormatLineHeight } from "../lib/icon/LineHeight";
import LineHeightComponent from "../lib/components/LineHeightComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

interface ExtFontFamilyOptions extends ExtDropdownOptions, TiptapLineHeightOptions {
    lineHeights?: string[];
    component: (args: { options: ExtFontFamilyOptions; editor: Editor; dropdownContainerClassName: string }) => ReactNode;
}

export const LineHeight: Extension<ExtFontFamilyOptions> = TiptapLineHeight.extend<ExtFontFamilyOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...parent,
            types: parent?.types as string[],
            lineHeights: parent?.lineHeights ?? DEFAULT_LINE_HEIGHT_LIST,
            component: ({ options, editor, dropdownContainerClassName, }) => {
                const list = options.lineHeights ?? DEFAULT_LINE_HEIGHT_LIST;
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
                        _tooltipContent="Color"
                        _internalContent={<FormatLineHeight />}
                        _dropdownClassName={"w-30 " + dropdownContainerClassName}
                    >
                        {list.map((item) => (
                            <LineHeightComponent
                                key={item}
                                onSelect={() => {
                                    if (item === "Default") editor.chain().focus().unsetLineHeight().run()
                                    else editor.chain().focus().toggleTextStyle({ lineHeight: item }).run()
                                }}
                                item={item}
                                activeClassName={options.activeClassName || ""}
                                itemClassName={options.itemClassName || ""}
                                _itemClassName=""
                            />
                        ))}
                    </DropdownComponent>
                )
            },
        };
    }
});

export const DEFAULT_LINE_HEIGHT_LIST: string[] = ["Default", "1.5", "2", "2.5", "3", "3.5", "4"];
