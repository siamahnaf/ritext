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
                className="ritext:w-full ritext:rounded-lg ritext:border ritext:border-gray-200 ritext:px-3 ritext:py-2 ritext:text-sm ritext:focus:outline-none"
            />
            <hr className="ritext:my-3 ritext:border-gray-200" />
            <div
                ref={listRef}
                className="ritext:overflow-auto ritext:max-h-62.5"
            >
                {!items.length ? (
                    <div className="ritext:py-8 ritext:text-center ritext:text-sm ritext:text-gray-500">No results</div>
                ) : (
                    <div className="ritext:grid ritext:grid-cols-7 ritext:gap-1">
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
                                    className={`ritext:h-8 ritext:w-8 ritext:cursor-pointer ritext:rounded-lg ritext:flex ritext:items-center ritext:justify-center ritext:text-base ritext:hover:bg-gray-100 ${isSelected ? "ritext:bg-gray-100 ritext:ring-2 ritext:ring-gray-200" : ""}`}
                                    title={`:${item.name}:`}
                                >
                                    <span>{item.emoji}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="ritext:border-t ritext:border-gray-200 ritext:text-xs ritext:text-gray-600 ritext:flex ritext:items-center ritext:gap-2 ritext:pt-2.5">
                <span className="ritext:text-sm">
                    {hoverEmoji || selected.emoji || "🙂"}
                </span>
                <span className="ritext:truncate ritext:capitalize">
                    {(hoverName || selected.name || "").replaceAll("_", " ")}
                </span>
            </div>
        </div>
    );
};

export default EmojiComponent;
