import { type ReactNode, useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import type { Extension } from "@tiptap/react";
import { Color as TiptapColor, type ColorOptions as TiptapColorOption } from "@tiptap/extension-text-style";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import ColorIconComponent from "../lib/components/ColorIconComponent";
import ColorComponent from "../lib/components/ColorComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

interface ExtFontFamilyOptions extends ExtDropdownOptions, TiptapColorOption {
    colorLists?: string[];
    component: (args: { options: ExtFontFamilyOptions; editor: Editor; dropdownContainerClassName: string }) => ReactNode;
}

const RECENT_COLORS_KEY = "tiptap_recent_colors";
const RECENT_COLORS_LIMIT = 10;

const normalizeHex = (c: string) => c?.trim()?.toUpperCase();

const readRecentColors = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(RECENT_COLORS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((x) => typeof x === "string" && x.startsWith("#")).map(normalizeHex);
    } catch {
        return [];
    }
};

const writeRecentColors = (colors: string[]) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(colors));
};

const pushRecentColor = (color: string) => {
    const c = normalizeHex(color);
    const prev = readRecentColors();
    const next = [c, ...prev.filter((x) => normalizeHex(x) !== c)].slice(0, RECENT_COLORS_LIMIT);
    writeRecentColors(next);
    return next;
};


export const Color: Extension<ExtFontFamilyOptions> = TiptapColor.extend<ExtFontFamilyOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...parent,
            types: parent?.types ?? ["textStyle"],
            colorLists: DEFAULT_COLOR_LIST,
            component: ({ options, editor, dropdownContainerClassName }) => {
                const items = options.colorLists ?? DEFAULT_COLOR_LIST;

                const Wrapper = () => {
                    const [recents, setRecents] = useState<string[]>([]);

                    useEffect(() => {
                        setRecents(readRecentColors());
                        const onStorage = (e: StorageEvent) => { if (e.key === RECENT_COLORS_KEY) setRecents(readRecentColors()); };
                        window.addEventListener("storage", onStorage);
                        return () => window.removeEventListener("storage", onStorage);
                    }, []);

                    const onPick = (hex: string) => {
                        setRecents(pushRecentColor(hex));
                        editor.chain().focus().setColor(hex).run();
                    };

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
                            _internalContent={<ColorIconComponent />}
                            _dropdownClassName={"w-65 " + dropdownContainerClassName}
                        >
                            <ColorComponent
                                onPick={(e) => onPick(e)}
                                items={items}
                                recents={recents}
                            />
                        </DropdownComponent>
                    );
                };
                return <Wrapper />;
            },
        };
    }
});

export const DEFAULT_COLOR_LIST: string[] = [
    "#000000", "#222222", "#4F4F4F", "#818181", "#B7B7B7", "#D4D4D4", "#E6E6E6", "#F3F3F3", "#F9F9F9", "#FFFFFF",
    "#D0442D", "#D86024", "#DF7A18", "#E2D625", "#71AF1A", "#58B1B6", "#457DF4", "#2B41E0", "#5120C4", "#C04897",
    "#F4E3E3", "#F9EEE3", "#FBF4E0", "#FBFBD8", "#ECF7D9", "#D9F1F2", "#DAE8FF", "#E4E5FF", "#E8DFFB", "#F2DFEB",
    "#E9A29B", "#EDB37D", "#ECC676", "#F8F671", "#B3CE72", "#8ED3C9", "#7CB5FF", "#919CF9", "#B7A5F8", "#E999C8",
    "#E26652", "#E48048", "#EA9B3B", "#F0E037", "#8FBD35", "#75C2C4", "#5A8EF3", "#4A60E4", "#7240D0", "#D86AAE",
    "#AE392A", "#AE5523", "#AA701B", "#AE9F1B", "#4C8A16", "#3D7D84", "#3A50B9", "#242DA0", "#4729A0", "#8D3475",
    "#5C1811", "#4E1A08", "#4E2607", "#413406", "#1E3A07", "#16333D", "#182C7D", "#0B0B5C", "#19085E", "#53184B",
];
