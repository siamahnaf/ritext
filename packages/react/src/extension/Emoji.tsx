import { Fragment } from "react";
import type { Node } from "@tiptap/react";
import { Emoji as TiptapEmoji, type EmojiOptions } from "@tiptap/extension-emoji";
import { EmojiIcon } from "../lib/icons";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import EmojiComponent from "../lib/components/EmojiComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtEmojiOptions = ExtDropdownOptions<
    EmojiOptions,
    { dropdownContainerClassName: string }
>

export const Emoji: Node<ExtEmojiOptions> = TiptapEmoji.extend<ExtEmojiOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as EmojiOptions ?? {}),
            openOnClick: false,
            surface: { toolbar: true },
            component: ({ options, editor, dropdownContainerClassName }) => {
                return (
                    <Fragment>
                        <DropdownComponent
                            className={options.className}
                            showArrow={options.showArrow || false}
                            content={options.content}
                            dropdownClassName={options.dropdownClassName}
                            style={options.style}
                            tooltip={options.tooltip}
                            tooltipClassName={options.tooltipClassName}
                            tooltipPlacement={options.tooltipPlacement}
                            _tooltipContent="Emoji"
                            _internalContent={<EmojiIcon />}
                            _dropdownClassName={"ritext:w-75 " + dropdownContainerClassName}
                        >
                            <EmojiComponent
                                editor={editor}
                            />
                        </DropdownComponent>
                    </Fragment>
                );
            },
        };
    }
});
