import { Fragment, useState } from "react";
import { Image as TiptapImage, type ImageOptions, type SetImageOptions } from "@tiptap/extension-image";
import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageUpIcon } from "../lib/icons";

import ButtonWithoutActive from "../lib/components/ButtonWithoutActive";
import ImageDialog from "../lib/components/ImageDialog";
import { ImageView } from "../lib/components/ImageView";
import type { ExtWithoutActiveOptions } from "../lib/types/tiptap-ext.type";

type SetImageInlineOptions = SetImageOptions & { inline?: boolean };

declare module "@tiptap/react" {
    interface Commands<ReturnType> {
        imageLine: {
            setImageWithInline: (options: SetImageInlineOptions) => ReturnType;
        };
    }
}

//Types
type ExtImageOptions = ExtWithoutActiveOptions<
    ImageOptions & {
        upload?: (file: File) => Promise<string>;
        maxSize?: number;
        defaultInline?: boolean;
        enableAlt?: boolean;
        aspect?: number;
    }
>

export const Image: Node<ExtImageOptions> = TiptapImage.extend<ExtImageOptions>({
    group: "inline",
    inline: true,
    draggable: true,
    selectable: true,
    defining: true,

    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as ImageOptions ?? {}),
            defaultInline: false,
            component: ({ editor, options, buttonClassName }) => {
                const Wrapper = () => {
                    const [open, setOpen] = useState(false);
                    return (
                        <Fragment>
                            <ButtonWithoutActive
                                className={options.className}
                                icon={options.icon}
                                style={options.style}
                                tooltip={options.tooltip}
                                tooltipClassName={options.tooltipClassName}
                                tooltipPlacement={options.tooltipPlacement}
                                _internalIcon={<ImageUpIcon />}
                                _onToggle={() => setOpen((p) => !p)}
                                _tooltipContent="Image"
                                _buttonClassName={buttonClassName}
                            />
                            <ImageDialog
                                open={open}
                                onClose={() => setOpen(false)}
                                editor={editor}
                                options={{
                                    upload: options.upload,
                                    maxSize: options.maxSize,
                                    defaultInline: options.defaultInline,
                                    enableAlt: options.enableAlt,
                                    aspect: options.aspect,
                                }}
                            />
                        </Fragment>
                    );
                };
                return <Wrapper />;
            },
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            inline: {
                default: false,
                parseHTML: (el) => el.getAttribute("data-inline") === "true",
                renderHTML: (attrs) => ({ "data-inline": attrs.inline ? "true" : "false" }),
            },
            width: {
                default: null,
                parseHTML: (el) => {
                    const v = el.getAttribute("data-width");
                    return v ? Number(v) : null;
                },
                renderHTML: (attrs) => (attrs.width ? { "data-width": String(attrs.width) } : {}),
            },
            height: {
                default: null,
                parseHTML: (el) => {
                    const v = el.getAttribute("data-height");
                    return v ? Number(v) : null;
                },
                renderHTML: (attrs) => (attrs.height ? { "data-height": String(attrs.height) } : {}),
            },
            flipX: {
                default: false,
                parseHTML: (el) => el.getAttribute("data-flip-x") === "true",
                renderHTML: (attrs) => ({ "data-flip-x": attrs.flipX ? "true" : "false" }),
            },
            flipY: {
                default: false,
                parseHTML: (el) => el.getAttribute("data-flip-y") === "true",
                renderHTML: (attrs) => ({ "data-flip-y": attrs.flipY ? "true" : "false" }),
            },
            align: {
                default: "left",
                parseHTML: (el) => el.getAttribute("data-align") || "left",
                renderHTML: (attrs) => ({ "data-align": attrs.align || "left" }),
            },
        };
    },

    addCommands() {
        return {
            ...this.parent?.(),
            setImageWithInline: (options: SetImageInlineOptions) => ({ commands }) => {
                const inlineAttr = options.inline ?? this.options.defaultInline ?? false;
                const { inline: _inline, ...attrs } = options;

                return commands.insertContent({
                    type: this.name,
                    attrs: { ...attrs, inline: inlineAttr },
                });
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageView);
    },

    renderHTML({ HTMLAttributes }) {
        return ["img", mergeAttributes(HTMLAttributes)];
    },
});
