import { mergeAttributes, type Node } from "@tiptap/react";
import { Youtube as TiptapYoutube, getEmbedUrlFromYoutubeUrl, type YoutubeOptions } from "@tiptap/extension-youtube";
import { YoutubeIcon } from "../lib/icons";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import YoutubeComponent from "../lib/components/YoutubeComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtYoutubeOptions = ExtDropdownOptions<
    YoutubeOptions,
    { dropdownContainerClassName: string }
>

//Helpers
const getVideoId = (url: string) => url.match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live|v)\/)([\w-]+)/)?.[1] ?? null;
const getParam = (el: HTMLElement, key: string) => {
    try {
        return new URL(el.getAttribute("src") ?? "").searchParams.get(key);
    } catch {
        return null;
    }
};
const toSize = (value: number | string) => typeof value === "number" ? `${value}px` : value;
const toAlign = (value?: string | null) => value === "center" || value === "right" ? value : "left";

export const Youtube: Node<ExtYoutubeOptions> = TiptapYoutube.extend<ExtYoutubeOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as YoutubeOptions ?? {}),
            surface: { toolbar: true },
            component: ({ options, editor, dropdownContainerClassName }) => {
                return (
                    <DropdownComponent
                        className={options.className}
                        showArrow={options.showArrow || false}
                        content={options.content}
                        dropdownClassName={options.dropdownClassName}
                        style={options.style}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _tooltipContent="YouTube"
                        _internalContent={<YoutubeIcon />}
                        _dropdownClassName={"ritext:w-72 " + dropdownContainerClassName}
                    >
                        <YoutubeComponent
                            editor={editor}
                            options={{
                                width: options.width,
                                height: options.height,
                                controls: options.controls,
                                autoplay: options.autoplay,
                                loop: options.loop,
                            }}
                        />
                    </DropdownComponent>
                );
            },
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            controls: {
                default: this.options.controls,
                parseHTML: (el) => getParam(el, "controls") !== "0",
                renderHTML: () => ({}),
            },
            autoplay: {
                default: this.options.autoplay,
                parseHTML: (el) => getParam(el, "autoplay") === "1",
                renderHTML: () => ({}),
            },
            loop: {
                default: this.options.loop,
                parseHTML: (el) => getParam(el, "loop") === "1",
                renderHTML: () => ({}),
            },
            textAlign: {
                default: "left",
                parseHTML: (el) => toAlign(el.parentElement?.style.textAlign),
                renderHTML: () => ({}),
            },
        };
    },

    renderHTML({ node, HTMLAttributes }) {
        const { src, start, width, height, controls, autoplay, loop, textAlign } = node.attrs;
        const align = toAlign(textAlign);
        const videoId = getVideoId(src ?? "");

        //Youtube needs playlist=id to loop a single video
        const embedUrl = getEmbedUrlFromYoutubeUrl({
            ...this.options,
            url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : src,
            controls,
            autoplay,
            loop,
            playlist: this.options.playlist || (loop && videoId ? videoId : ""),
            startAt: start || 0,
        });

        //TextAlign style belongs on the wrapper, not the iframe
        const { style: _style, ...attrs } = HTMLAttributes;

        return [
            "div",
            { "data-youtube-video": "", style: align === "left" ? null : `text-align: ${align};` },
            [
                "iframe",
                mergeAttributes(
                    { allow: "autoplay; encrypted-media; picture-in-picture", allowfullscreen: this.options.allowFullscreen || null },
                    this.options.HTMLAttributes,
                    attrs,
                    { src: embedUrl, style: `width: ${toSize(width)}; height: ${toSize(height)};` },
                ),
            ],
        ];
    },
});
