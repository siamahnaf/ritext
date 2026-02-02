"use client";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { autoUpdate, flip, offset, shift, useDismiss, useFloating, useInteractions, FloatingPortal } from "@floating-ui/react";
import { ColorPicker } from "@siamf/react-color-pick";

//Interface
type Props = {
    editor: Editor | null;
};

//Helpers
const getClosestCell = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return null;
    return (el.closest?.("td,th") as HTMLElement | null) ?? null;
};

//Helpers
const isTableResizeHandle = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    if (el.closest?.(".column-resize-handle")) return true;
    const cursor = window.getComputedStyle(el).cursor;
    if (cursor === "col-resize" || cursor === "ew-resize") return true;
    return false;
};

export const TableMenu = ({ editor }: Props) => {
    //State
    const [open, setOpen] = useState(false);
    const [refCell, setRefCell] = useState<HTMLElement | null>(null);
    const [bg, setBg] = useState("#FFF2CC");
    const [pickerOpen, setPickerOpen] = useState(false);

    //Ref
    const resizingRef = useRef(false);

    //Floating UI
    const { refs, floatingStyles, context, update } = useFloating({
        open,
        onOpenChange: (o) => {
            setOpen(o);
            if (!o) setPickerOpen(false);
        },
        placement: "bottom-start",
        strategy: "fixed",
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    });

    const dismiss = useDismiss(context, { outsidePressEvent: "pointerdown", escapeKey: true });
    const { getFloatingProps } = useInteractions([dismiss]);

    //Picker Floating
    const pickerFloating = useFloating({
        open: pickerOpen,
        onOpenChange: (o) => setPickerOpen(o),
        placement: "right-start",
        strategy: "fixed",
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    });

    const pickerDismiss = useDismiss(pickerFloating.context, { outsidePressEvent: "pointerdown", escapeKey: true });
    const pickerInteractions = useInteractions([pickerDismiss]);

    useEffect(() => {
        const onUp = () => {
            resizingRef.current = false;
        };
        window.addEventListener("pointerup", onUp, true);
        window.addEventListener("pointercancel", onUp, true);
        return () => {
            window.removeEventListener("pointerup", onUp, true);
            window.removeEventListener("pointercancel", onUp, true);
        };
    }, []);

    //Open on Click
    useEffect(() => {
        if (!editor) return;
        const root = editor.view.dom;
        const onPointerDownCapture = (e: PointerEvent) => {
            if (isTableResizeHandle(e.target)) {
                resizingRef.current = true;
                setPickerOpen(false);
                return;
            }
            if (resizingRef.current) return;

            const cell = getClosestCell(e.target);

            if (!cell) {
                setOpen(false);
                setRefCell(null);
                setPickerOpen(false);
                return;
            }

            refs.setReference(cell);
            setRefCell(cell);
            setOpen(true);

            requestAnimationFrame(() => {
                update();
            });
        };

        root.addEventListener("pointerdown", onPointerDownCapture, true);
        return () => root.removeEventListener("pointerdown", onPointerDownCapture, true);
    }, [editor, refs, update]);

    //Close
    useEffect(() => {
        if (!editor) return;

        const onSelectionUpdate = () => {
            if (!editor.isActive("table")) {
                setOpen(false);
                setRefCell(null);
                setPickerOpen(false);
            }
        };

        editor.on("selectionUpdate", onSelectionUpdate);

        return () => {
            editor.off("selectionUpdate", onSelectionUpdate);
        };
    }, [editor]);

    const run = useMemo(() => {
        return (fn: (ed: Editor) => void, close = true) => {
            if (!editor) return;
            fn(editor);
            if (close) {
                setOpen(false);
                setPickerOpen(false);
            }
        };
    }, [editor]);

    if (!editor || !open || !refCell) return null;

    return (
        <FloatingPortal>
            <div
                ref={refs.setFloating}
                style={floatingStyles as CSSProperties}
                className={"ritext:z-9999999 ritext:min-w-65 ritext:rounded-xl ritext:border ritext:border-gray-200 ritext:bg-white ritext:shadow-lg ritext:p-2"}
                {...getFloatingProps({
                    onPointerDownCapture: (e) => {
                        e.stopPropagation();
                    },
                })}
            >
                <div className="ritext:grid ritext:gap-1 ritext:text-sm">
                    <div className="ritext:px-2 ritext:py-1 ritext:text-xs ritext:font-semibold ritext:text-gray-500">Columns</div>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().addColumnBefore().run())}>
                        Insert column before
                    </button>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().addColumnAfter().run())}>
                        Insert column after
                    </button>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().deleteColumn().run())}>
                        Delete column
                    </button>

                    <div className="ritext:mt-1 ritext:px-2 ritext:py-1 ritext:text-xs ritext:font-semibold ritext:text-gray-500">Rows</div>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().addRowBefore().run())}>
                        Insert row above
                    </button>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().addRowAfter().run())}>
                        Insert row below
                    </button>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().deleteRow().run())}>
                        Delete row
                    </button>

                    <div className="ritext:mt-1 ritext:px-2 ritext:py-1 ritext:text-xs ritext:font-semibold ritext:text-gray-500">Cells</div>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().mergeCells().run())}>
                        Merge cells
                    </button>
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().splitCell().run())}>
                        Split cell
                    </button>

                    <div className="ritext:mt-1 ritext:px-2 ritext:py-1 ritext:text-xs ritext:font-semibold ritext:text-gray-500">Cell background</div>
                    <div className="ritext:flex ritext:items-center ritext:gap-2 ritext:px-2 ritext:py-1">
                        <button
                            ref={pickerFloating.refs.setReference}
                            type="button"
                            className="ritext:h-6 ritext:w-8 ritext:rounded ritext:border ritext:border-gray-200 ritext:cursor-pointer ritext:p-0"
                            style={{ background: bg }}
                            title="Pick color"
                            onClick={() => setPickerOpen((v) => !v)}
                        />
                        <button className="ritext:flex-1 ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100 ritext:text-left" onClick={() => run((ed) => ed.chain().focus().setCellAttribute("backgroundColor", bg).run())}>
                            Apply background
                        </button>

                        <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-gray-100" title="Clear" onClick={() => run((ed) => ed.chain().focus().setCellAttribute("backgroundColor", null as any).run())}>
                            ✕
                        </button>
                    </div>
                    {pickerOpen && (
                        <FloatingPortal>
                            <div
                                ref={pickerFloating.refs.setFloating}
                                style={pickerFloating.floatingStyles as CSSProperties}
                                className="ritext:z-99999999 ritext:rounded-xl ritext:border ritext:border-gray-200 ritext:bg-white ritext:shadow-lg ritext:p-2"
                                {...pickerInteractions.getFloatingProps({
                                    onPointerDownCapture: (e) => {
                                        e.stopPropagation();
                                    },
                                })}
                            >
                                <ColorPicker value={bg} onChange={setBg} />
                            </div>
                        </FloatingPortal>
                    )}

                    <div className="ritext:mt-1 ritext:border-t ritext:border-gray-200 ritext:pt-1" />
                    <button className="ritext:rounded-md ritext:px-2 ritext:py-1 ritext:hover:bg-red-50 ritext:text-left ritext:text-red-600" onClick={() => run((ed) => ed.chain().focus().deleteTable().run())}>
                        Delete table
                    </button>
                </div>
            </div>
        </FloatingPortal>
    );
};