import { Fragment, type ReactNode } from "react";
import { type Editor, mergeAttributes } from "@tiptap/react";
import type { Mark } from "@tiptap/react";
import { Link as TiptapLink, type LinkOptions } from "@tiptap/extension-link";
import { LinkIcon } from "../lib/icon/listIcon";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import LinkComponent from "../lib/components/LinkComponent";
import LinkMenuComponent from "../lib/components/LinkMenuComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

interface ExtLinkOptions extends ExtDropdownOptions, LinkOptions {
    component: (args: {
        options: ExtLinkOptions;
        editor: Editor;
        dropdownContainerClassName: string
    }) => ReactNode;
}

export const Links: Mark<ExtLinkOptions> = TiptapLink.extend<ExtLinkOptions>({
    inclusive: false,
    parseHTML() {
        return [
            {
                tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "a",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: "link",
            }),
            0,
        ];
    },
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as LinkOptions ?? {}),
            openOnClick: false,
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
                            _tooltipContent="Link"
                            _internalContent={<LinkIcon />}
                            _dropdownClassName={"w-66 " + dropdownContainerClassName}
                        >
                            <LinkComponent
                                editor={editor}
                            />
                        </DropdownComponent>
                        <LinkMenuComponent />
                    </Fragment>
                );
            },
        };
    }
});