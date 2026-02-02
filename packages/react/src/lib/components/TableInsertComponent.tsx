"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";

interface Props {
    onClose?: () => void;
    open?: boolean;
    editor: Editor;
}

const MAX = 10;
// clamp helper
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const TableInsertComponent = ({ editor, onClose, open }: Props) => {
    //Grid Ref
    const gridRef = useRef<HTMLDivElement | null>(null);

    //Hovers
    const [hover, setHover] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });

    //Effect
    useEffect(() => {
        if (open) setHover({ rows: 0, cols: 0 });
    }, [open]);

    const label = useMemo(() => {
        if (!hover.rows || !hover.cols) return "Select size";
        return `${hover.rows} × ${hover.cols}`;
    }, [hover]);

    const canInsert = !!editor && typeof (editor as any)?.chain === "function";

    const insert = (rows: number, cols: number) => {
        if (!canInsert || rows < 1 || cols < 1) return;

        editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
        onClose?.();
        setHover({ rows: 0, cols: 0 });
    };

    const updateFromPointer = (clientX: number, clientY: number) => {
        const el = gridRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
            setHover((s) => (s.rows || s.cols ? { rows: 0, cols: 0 } : s));
            return;
        }
        const col = clamp(Math.floor((x / rect.width) * MAX) + 1, 1, MAX);
        const row = clamp(Math.floor((y / rect.height) * MAX) + 1, 1, MAX);

        setHover((s) => (s.rows === row && s.cols === col ? s : { rows: row, cols: col }));
    };

    return (
        <div className="w-full p-2">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                    {label}
                </span>
            </div>
            <div
                ref={gridRef}
                className="grid gap-1 cursor-pointer select-none"
                style={{ gridTemplateColumns: `repeat(${MAX}, minmax(0, 1fr))` }}
                onMouseMove={(e) => updateFromPointer(e.clientX, e.clientY)}
                onMouseLeave={() => setHover({ rows: 0, cols: 0 })}
                onClick={() => (hover.rows && hover.cols ? insert(hover.rows, hover.cols) : null)}
            >
                {Array.from({ length: MAX * MAX }).map((_, i) => {
                    const r = Math.floor(i / MAX) + 1;
                    const c = (i % MAX) + 1;
                    const active = r <= hover.rows && c <= hover.cols;
                    return (
                        <button
                            key={i}
                            type="button"
                            className={[
                                "h-5 w-5 rounded-sm border transition",
                                active ? "border-gray-500 bg-gray-300" : "border-gray-200 bg-white hover:bg-gray-50",
                            ].join(" ")}
                            aria-label={`Insert ${r} by ${c} table`}
                            disabled={!canInsert}
                            tabIndex={-1}
                        />
                    );
                })}
            </div>
            {!canInsert && <p className="mt-2 text-xs text-red-500">Editor is not ready to insert a table.</p>}
        </div>
    );
};

export default TableInsertComponent;
