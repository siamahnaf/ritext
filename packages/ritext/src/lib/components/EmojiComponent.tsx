"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { emojis } from "@tiptap/extension-emoji";

//interface
interface Props {
    editor: Editor;
    onClose?: () => void;
}

const EmojiComponent = ({ editor, onClose }: Props) => {
    //Ref
    const listRef = useRef<HTMLDivElement | null>(null);

    //State
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hoverName, setHoverName] = useState<string>("");
    const [hoverEmoji, setHoverEmoji] = useState<string>("");

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

    //Effect
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose?.();
                return;
            }

            if (!items.length) return;

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((v) => (v + items.length - 1) % items.length);
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((v) => (v + 1) % items.length);
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
    useEffect(() => {
        const root = listRef.current;
        if (!root) return;
        const el = root.querySelector<HTMLElement>(`[data-idx="${selectedIndex}"]`);
        el?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    return (
        <div>
            <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search emoji…"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
            />
            <hr className="my-3 border-gray-200" />
            <div
                ref={listRef}
                className="overflow-auto max-h-62.5"
            >
                {!items.length ? (
                    <div className="py-8 text-center text-sm text-gray-500">No results</div>
                ) : (
                    <div className="grid grid-cols-7 gap-1">
                        {items.map((item, idx) => {
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
                                    className={`h-8 w-8 cursor-pointer rounded-lg flex items-center justify-center text-base hover:bg-gray-100 ${isSelected ? "bg-gray-100 ring-2 ring-gray-200" : ""}`}
                                    title={`:${item.name}:`}
                                >
                                    <span>{item.emoji}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 text-xs text-gray-600 flex items-center gap-2 pt-2.5">
                <span className="text-sm">
                    {hoverEmoji || selected.emoji || "🙂"}
                </span>
                <span className="truncate capitalize">
                    {(hoverName || selected.name || "").replaceAll("_", " ")}
                </span>
            </div>
        </div>
    );
};

export default EmojiComponent;
