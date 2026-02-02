"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { emojis } from "@tiptap/extension-emoji";

//interface
interface Props {
    editor: Editor;
    onClose?: () => void;
}

const COLS = 7;
const CELL = 32;
const GAP = 4;
const ROW_H = CELL + GAP;

const OVERSCAN_ROWS = 4;

const EmojiComponent = ({ editor, onClose }: Props) => {
    //Refs
    const listRef = useRef<HTMLDivElement | null>(null);

    //State
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hoverName, setHoverName] = useState<string>("");
    const [hoverEmoji, setHoverEmoji] = useState<string>("");
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportH, setViewportH] = useState(0);

    //Items
    const items = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return emojis;
        return emojis.filter((e) => e.name.toLowerCase().includes(q));
    }, [query]);

    const selected = items[selectedIndex];

    const pick = (name: string) => {
        editor.chain().focus().setEmoji(name).run();
        onClose?.();
    };

    // reset selection on search
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        const updateViewport = () => setViewportH(el.clientHeight);
        updateViewport();

        const onScroll = () => setScrollTop(el.scrollTop);

        el.addEventListener("scroll", onScroll, { passive: true });
        const ro = new ResizeObserver(updateViewport);
        ro.observe(el);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
        };
    }, []);

    // Virtualizations
    const totalRows = Math.ceil(items.length / COLS);
    const totalH = Math.max(0, totalRows * ROW_H - GAP);

    const startRow = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN_ROWS);
    const endRow = Math.min(
        totalRows,
        Math.ceil((scrollTop + viewportH) / ROW_H) + OVERSCAN_ROWS
    );

    const startIndex = startRow * COLS;
    const endIndex = Math.min(items.length, endRow * COLS);

    const visibleItems = items.slice(startIndex, endIndex);

    //Naves
    useEffect(() => {
        const scrollToIndex = (idx: number) => {
            const root = listRef.current;
            if (!root) return;

            const row = Math.floor(idx / COLS);
            const top = row * ROW_H;
            const bottom = top + CELL;

            const viewTop = root.scrollTop;
            const viewBottom = viewTop + root.clientHeight;

            if (top < viewTop) root.scrollTop = top;
            else if (bottom > viewBottom) root.scrollTop = bottom - root.clientHeight;
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose?.();
                return;
            }

            if (!items.length) return;

            const max = items.length;

            const move = (nextIndex: number) => {
                const idx = ((nextIndex % max) + max) % max;
                const item = items[idx];
                setSelectedIndex(idx);
                setHoverName(item?.name ?? "");
                setHoverEmoji(item?.emoji ?? "");
                scrollToIndex(idx);
            };

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(selectedIndex - 1);
                return;
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                move(selectedIndex + 1);
                return;
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                move(selectedIndex - COLS);
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                move(selectedIndex + COLS);
                return;
            }

            if (e.key === "Enter") {
                e.preventDefault();
                const item = items[selectedIndex];
                if (item) pick(item.name);
                return;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [items, selectedIndex, onClose, editor]);

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search emoji…"
                className="ritext:w-full ritext:rounded-lg ritext:border ritext:border-gray-200 ritext:px-3 ritext:py-2 ritext:text-sm ritext:focus:outline-none"
            />

            <hr className="ritext:my-3 ritext:border-gray-200" />

            <div ref={listRef} className="ritext:overflow-auto ritext:max-h-62.5 ritext:relative">
                {!items.length ? (
                    <div className="ritext:py-8 ritext:text-center ritext:text-sm ritext:text-gray-500">No results</div>
                ) : (
                    <div style={{ height: totalH, position: "relative" }}>
                        <div style={{ position: "absolute", top: startRow * ROW_H, left: 0, right: 0 }}>
                            <div className="ritext:grid ritext:grid-cols-7 ritext:gap-1">
                                {visibleItems.map((item, i) => {
                                    const idx = startIndex + i;
                                    const isSelected = idx === selectedIndex;

                                    return (
                                        <div
                                            key={`${item.name}-${idx}`}
                                            data-idx={idx}
                                            onClick={() => pick(item.name)}
                                            onMouseEnter={() => {
                                                setSelectedIndex(idx);
                                                setHoverName(item.name);
                                                setHoverEmoji(item.emoji || "");
                                            }}
                                            className={`ritext:h-8 ritext:w-8 ritext:cursor-pointer ritext:rounded-lg ritext:flex ritext:items-center ritext:justify-center ritext:text-base ritext:hover:bg-gray-100 ${isSelected ? "ritext:bg-gray-100 ritext:border ritext:border-solid ritext:border-gray-200" : ""}`}
                                            title={`:${item.name}:`}
                                        >
                                            <span>{item.emoji}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="ritext:border-t ritext:border-gray-200 ritext:text-xs ritext:text-gray-600 ritext:flex ritext:items-center ritext:gap-2 ritext:pt-2.5">
                <span className="ritext:text-sm">{hoverEmoji || selected?.emoji || "🙂"}</span>
                <span className="ritext:truncate ritext:capitalize">
                    {(hoverName || selected?.name || "").replaceAll("_", " ")}
                </span>
            </div>
        </div>
    );
};

export default EmojiComponent;
