import { type ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import type { Extension } from "@tiptap/react";
import { TextAlignOptions, TextAlign as TiptapTextAlign } from "@tiptap/extension-text-align";
import { AlignJustify } from "../lib/icon/AlignmentIcon";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import AlignmentComponent from "../lib/components/AlignmentComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

interface ExtTextAlignmentOptions extends ExtDropdownOptions, TextAlignOptions {
    component: (args: {
        options: ExtTextAlignmentOptions;
        editor: Editor;
        dropdownContainerClassName: string;
    }) => ReactNode;
}


export const TextAlign: Extension<ExtTextAlignmentOptions> = TiptapTextAlign.extend<ExtTextAlignmentOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...parent,
            types: ["heading", "paragraph", "list_item", "title"],
            alignments: parent?.alignments ?? ["left", "center", "right", "justify"],
            defaultAlignment: parent?.defaultAlignment ?? "left",
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
                        _dropdownClassName={"w-40 " + dropdownContainerClassName}
                    >
                        <AlignmentComponent
                            items={items}
                            onPick={(e) => {
                                console.log(e);
                                editor.chain().focus().setTextAlign(e).run()
                            }}
                            onSelect={() => { }}
                        />
                    </DropdownComponent>
                )
            },
        };
    }
});