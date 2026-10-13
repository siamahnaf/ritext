import type { Extension } from "@tiptap/react";
import { type TextAlignOptions, TextAlign as TiptapTextAlign } from "@tiptap/extension-text-align";
import { AlignJustify } from "../lib/icons";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import AlignmentComponent from "../lib/components/AlignmentComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtTextAlignmentOptions = ExtDropdownOptions<
    TextAlignOptions,
    { dropdownContainerClassName: string; }
>;

export const TextAlign: Extension<ExtTextAlignmentOptions> = TiptapTextAlign.extend<ExtTextAlignmentOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...parent,
            types: ["heading", "paragraph", "list_item", "title", "image", "youtube"],
            alignments: ["left", "center", "right", "justify"],
            defaultAlignment: "left",
            surface: { bubbleMenu: true },
            order: { bubbleMenu: 8 },
            component: ({ options, editor, dropdownContainerClassName }) => {
                const items = options.alignments;
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
                        _tooltipContent="Text Align"
                        _internalContent={<AlignJustify />}
                        _dropdownClassName={"ritext:w-40 " + dropdownContainerClassName}
                    >
                        <AlignmentComponent
                            items={items}
                            onPick={(e) => {
                                console.log(e);
                                editor.chain().focus().setTextAlign(e).run()
                            }}
                        />
                    </DropdownComponent>
                )
            },
        };
    }
});
