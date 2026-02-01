import { type ReactNode, useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import type { Extension } from "@tiptap/react";
import { BackgroundColor as TiptapBackgroundColor, type BackgroundColorOptions as TiptapBackgroundOption } from "@tiptap/extension-text-style";

// Components
import DropdownComponent from "../lib/components/DropdownComponent";
import ColorIconComponent from "../lib/components/ColorIconComponent";
import ColorComponent from "../lib/components/ColorComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

//Default
import { DEFAULT_COLOR_LIST } from "./Color";

//Colors
interface ExtFontFamilyOptions extends ExtDropdownOptions, TiptapBackgroundOption {
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


export const BackgroundColor: Extension<ExtFontFamilyOptions> = TiptapBackgroundColor.extend<ExtFontFamilyOptions>({
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
                        editor.chain().focus().setBackgroundColor(hex).run();
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
                            _tooltipContent="Background Color"
                            _internalContent={<ColorIconComponent type="background" />}
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