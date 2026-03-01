"use client";
import { useState, useEffect, useRef, useCallback, useMemo, type CSSProperties } from "react";
import { TextSelection } from "@tiptap/pm/state";
import {
    FloatingPortal,
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useEditor } from "./context/editor.context";
import { twMerge } from "./utils/tw";
import { SlashItems } from "./SlashItems";
import type { SlashCommandItem } from "./types/tiptap-ext.type";

//Types
type Group = { label: string; items: SlashCommandItem[] };
const parseEntries = (entries: Array<SlashCommandItem | string>): Group[] => {
    const groups: Group[] = [];
    let current: Group | null = null;

    for (const entry of entries) {
        if (typeof entry === "string") {
            current = { label: entry, items: [] };
            groups.push(current);
        } else {
            if (!current) {
                current = { label: "", items: [] };
                groups.push(current);
            }
            current.items.push(entry);
        }
    }

    return groups;
};

const DEFAULT_ITEMS: Array<SlashCommandItem | string> = [
    "Format",
    SlashItems.Paragraph,
    SlashItems.Heading1,
    SlashItems.Heading2,
    SlashItems.Heading3,
    SlashItems.Heading4,
    SlashItems.Heading5,
    SlashItems.Heading6,
    SlashItems.BulletList,
    SlashItems.OrderedList,
    SlashItems.TaskList,
    SlashItems.BlockQuote,
    "Insert",
    SlashItems.Image,
    SlashItems.Table,
    SlashItems.HorizontalRule,
];

interface Props {
    items?: Array<SlashCommandItem | string>;
    className?: string;
    itemClassName?: string;
    style?: CSSProperties;
}

const SlashCommand = ({ items = DEFAULT_ITEMS, className, itemClassName, style }: Props) => {
    const { editor } = useEditor();

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [panelItem, setPanelItem] = useState<SlashCommandItem | null>(null);


    const panelActiveRef = useRef(false);
    const editorRef = useRef(editor);
    useEffect(() => { editorRef.current = editor; }, [editor]);
    const blockStartRef = useRef(0);
    const virtualEl = useRef({
        getBoundingClientRect(): DOMRect {
            const ed = editorRef.current;
            if (!ed) return new DOMRect();
            const c = ed.view.coordsAtPos(blockStartRef.current);
            return {
                x: c.left, y: c.top,
                width: 0, height: c.bottom - c.top,
                top: c.top, left: c.left, right: c.left, bottom: c.bottom,
                toJSON: () => ({}),
            } as DOMRect;
        },
    });
    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: (o) => { if (!o) close(); },
        placement: "bottom-start",
        strategy: "fixed",
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    });
    const dismiss = useDismiss(context, { outsidePressEvent: "pointerdown" });
    const { getFloatingProps } = useInteractions([dismiss]);

    useEffect(() => {
        refs.setReference(virtualEl.current);
    }, [refs]);
    const validGroups = useMemo((): Group[] => {
        const parsed = parseEntries(items);
        if (!editor) return parsed;

        const registered = new Set(editor.extensionManager.extensions.map((e) => e.name));
        const missing: SlashCommandItem[] = [];

        const groups = parsed.map((group) => ({
            ...group,
            items: group.items.filter((item) => {
                if (item.extensionName && !registered.has(item.extensionName)) {
                    missing.push(item);
                    return false;
                }
                return true;
            }),
        }));

        if (missing.length > 0) {
            console.error(
                `[ritext] <SlashCommand> — the following extensions are not registered:\n` +
                missing
                    .map((i) => `  • "${i.extensionName}"  (required by SlashItem "${i.title}")`)
                    .join("\n") +
                `\n\nFix: add the missing extension(s) to your <Editor extensions={[...]} />.`
            );
        }

        return groups.filter((g) => g.items.length > 0);
    }, [editor, items]);


    const flatFiltered = useMemo(() => {
        const q = query.toLowerCase();
        return validGroups.flatMap((g) =>
            g.items.filter((item) => !q || item.title.toLowerCase().includes(q))
        );
    }, [validGroups, query]);

    const filteredGroups = useMemo(() => {
        const q = query.toLowerCase();
        return validGroups
            .map((g) => ({
                ...g,
                items: g.items.filter((item) => !q || item.title.toLowerCase().includes(q)),
            }))
            .filter((g) => g.items.length > 0);
    }, [validGroups, query]);

    const close = useCallback(() => {
        setOpen(false);
        setQuery("");
        setActiveIndex(0);
        panelActiveRef.current = false;
        setPanelItem(null);
    }, []);

    const executeItem = useCallback(
        (item: SlashCommandItem) => {
            if (!editor) return;
            const { state } = editor;
            const { $from } = state.selection;
            const blockStart = $from.start();

            if (item.panel) {
                panelActiveRef.current = true;
                editor.chain().focus().deleteRange({ from: blockStart, to: $from.pos }).run();
                setOpen(false);
                setQuery("");
                setActiveIndex(0);
                setPanelItem(item);
                return;
            }
            const slashText = state.doc.textBetween(blockStart, $from.pos);
            const topLevelIsPureSlash = $from.node(1).textContent === slashText;

            if (topLevelIsPureSlash) {
                const beforeBlock = $from.before(1);
                const afterBlock = $from.after(1);
                const tr = state.tr;
                tr.delete(beforeBlock, afterBlock);
                const emptyPara = state.schema.nodes.paragraph.create();
                tr.insert(beforeBlock, emptyPara);
                tr.setSelection(TextSelection.near(tr.doc.resolve(beforeBlock + 1)));
                editor.view.dispatch(tr);
            } else {
                editor.chain().focus().deleteRange({ from: blockStart, to: $from.pos }).run();
            }

            item.command(editor);
            close();
        },
        [editor, close]
    );

    const checkSlash = useCallback(() => {
        if (!editor || panelActiveRef.current) return;

        const { $from } = editor.state.selection;

        if (!$from.parent.isTextblock) {
            close();
            return;
        }

        const blockStart = $from.start();
        const textBefore = editor.state.doc.textBetween(blockStart, $from.pos);

        if (textBefore.startsWith("/") && !textBefore.slice(1).includes(" ")) {
            blockStartRef.current = blockStart;
            setQuery(textBefore.slice(1));
            setActiveIndex(0);
            setOpen(true);
        } else {
            close();
        }
    }, [editor, close]);

    useEffect(() => {
        if (!editor) return;
        editor.on("update", checkSlash);
        editor.on("selectionUpdate", checkSlash);
        return () => {
            editor.off("update", checkSlash);
            editor.off("selectionUpdate", checkSlash);
        };
    }, [editor, checkSlash]);
    useEffect(() => {
        if (!open) return;
        const el = refs.floating.current?.querySelector("[data-active='true']") as HTMLElement | null;
        el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, open, refs.floating]);
    useEffect(() => {
        if (!editor || !open) return;
        const dom = editor.view.dom;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % Math.max(flatFiltered.length, 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex(
                    (i) => (i - 1 + Math.max(flatFiltered.length, 1)) % Math.max(flatFiltered.length, 1)
                );
            } else if (e.key === "Enter") {
                const item = flatFiltered[activeIndex];
                if (item) {
                    e.preventDefault();
                    e.stopPropagation();
                    executeItem(item);
                }
            } else if (e.key === "Escape") {
                e.preventDefault();
                close();
            }
        };

        dom.addEventListener("keydown", onKeyDown, true);
        return () => dom.removeEventListener("keydown", onKeyDown, true);
    }, [editor, open, flatFiltered, activeIndex, executeItem, close]);

    if (!editor) return null;

    const flatIndexMap = new Map(flatFiltered.map((item, i) => [item.id, i]));

    return (
        <FloatingPortal>
            <AnimatePresence>
                {open && (
                    <div
                        ref={refs.setFloating}
                        style={{ ...floatingStyles, zIndex: 999999, ...style } as CSSProperties}
                        {...getFloatingProps()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: -4 }}
                            transition={{ type: "tween", duration: 0.12 }}
                            className={twMerge(
                                "ritext:bg-white ritext:border ritext:border-gray-200 ritext:rounded-xl ritext:shadow-lg ritext:py-1.5 ritext:min-w-56 ritext:max-h-80 ritext:overflow-y-auto",
                                className
                            )}
                        >
                            {filteredGroups.length > 0 ? (
                                filteredGroups.map((group) => (
                                    <div key={group.label || "__ungrouped__"}>
                                        {group.label && (
                                            <p className="ritext:px-3 ritext:pt-2 ritext:pb-1 ritext:text-xs ritext:font-semibold ritext:text-gray-400 ritext:uppercase ritext:tracking-wider">
                                                {group.label}
                                            </p>
                                        )}
                                        {group.items.map((item) => {
                                            const flatIdx = flatIndexMap.get(item.id) ?? -1;
                                            const isActive = flatIdx === activeIndex;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    data-active={isActive}
                                                    onPointerDown={(e) => {
                                                        e.preventDefault();
                                                        executeItem(item);
                                                    }}
                                                    onPointerEnter={() => setActiveIndex(flatIdx)}
                                                    className={twMerge(
                                                        "ritext:w-full ritext:flex ritext:items-center ritext:gap-2.5 ritext:px-2.5 ritext:py-1.5 ritext:text-left ritext:text-sm ritext:transition-colors ritext:cursor-pointer",
                                                        isActive
                                                            ? "ritext:bg-gray-100"
                                                            : "ritext:hover:bg-gray-50",
                                                        itemClassName
                                                    )}
                                                >
                                                    {item.icon && (
                                                        <span className="ritext:flex ritext:items-center ritext:justify-center ritext:w-7 ritext:h-7 ritext:rounded-md ritext:bg-white ritext:border ritext:border-gray-200 ritext:text-gray-600 ritext:shrink-0">
                                                            {item.icon}
                                                        </span>
                                                    )}
                                                    <span>
                                                        <span className="ritext:block ritext:font-medium ritext:text-gray-800 ritext:leading-tight">
                                                            {item.title}
                                                        </span>
                                                        {item.description && (
                                                            <span className="ritext:block ritext:text-xs ritext:text-gray-500 ritext:leading-tight ritext:mt-0.5">
                                                                {item.description}
                                                            </span>
                                                        )}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))
                            ) : (
                                <p className="ritext:px-3 ritext:py-2 ritext:text-sm ritext:text-gray-400">
                                    No results
                                </p>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Dialog panels (e.g. ImageDialog) portal themselves to body */}
            {panelItem?.panelAsDialog && panelItem.panel?.({ editor, onClose: () => { panelActiveRef.current = false; setPanelItem(null); } })}
        </FloatingPortal>
    );
};

export default SlashCommand;
