"use client";
import { CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useInteractions } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import Tooltip from "./_com/Tooltip";

//Icons
import { FlipHorizontal, FlipVertical, AlignLeft, AlignCenter, AlignRight, TrashIcon } from "../icons";


//Types
type Corner = "tl" | "tr" | "bl" | "br";
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const ImageView = (props: NodeViewProps) => {
    //Props
    const { node, selected, updateAttributes, deleteNode, editor, getPos } = props;

    //Refs
    const rootRef = useRef<HTMLSpanElement | null>(null);
    const boxRef = useRef<HTMLSpanElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const floatingWrapRef = useRef<HTMLDivElement | null>(null);
    const [resizing, setResizing] = useState(false);
    const [dragging, setDragging] = useState(false);

    //Dragging Ref
    const draggingRef = useRef(false);

    const isInline = !!node.attrs.inline;
    const align = (node.attrs.align || "left") as "left" | "center" | "right";
    const width = (node.attrs.width as number | null) ?? null;
    const height = (node.attrs.height as number | null) ?? null;
    const flipX = !!node.attrs.flipX;
    const flipY = !!node.attrs.flipY;

    const transform = useMemo(() => {
        const sx = flipX ? -1 : 1;
        const sy = flipY ? -1 : 1;
        return `scale(${sx}, ${sy})`;
    }, [flipX, flipY]);

    const keepSelected = () => {
        try {
            const pos = typeof getPos === "function" ? getPos() : null;
            if (typeof pos === "number") editor.commands.setNodeSelection(pos);
        } catch (e) {
            void e;
        }
    };

    const setAlign = (a: "left" | "center" | "right") => {
        keepSelected();
        updateAttributes({ align: a, inline: false });
        queueMicrotask(keepSelected);
    };

    const toggleFlipX = () => {
        keepSelected();
        updateAttributes({ flipX: !flipX });
        queueMicrotask(keepSelected);
    };

    const toggleFlipY = () => {
        keepSelected();
        updateAttributes({ flipY: !flipY });
        queueMicrotask(keepSelected);
    };

    // Menu visibility
    const isMenuVisible = selected && !resizing && !draggingRef.current;

    // Floating UI
    const { refs, floatingStyles, context, update } = useFloating({
        open: isMenuVisible,
        placement: "bottom",
        whileElementsMounted: autoUpdate,
        strategy: "fixed",
        middleware: [offset(14), flip({ padding: 10 }), shift({ padding: 8 })],
        onOpenChange: (open, ev) => {
            if (open) return;
            const target = ((ev as any)?.target ?? null) as Node | null;
            if (!target) return;
            const view = editor.view;
            if (view.dom.contains(target)) return;
            try {
                const pos = typeof getPos === "function" ? getPos() : null;
                if (typeof pos !== "number") return;

                const docSize = view.state.doc.content.size;
                const next = Math.min(pos + 1, docSize);

                const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, next));
                view.dispatch(tr);
            } catch (e) {
                void e;
            }
        },
    });

    const setReferenceEl = (el: HTMLSpanElement | null) => {
        boxRef.current = el;
        if (el) refs.setReference(el);
    };

    const setFloatingWrapEl = (el: HTMLDivElement | null) => {
        floatingWrapRef.current = el;
        if (el) refs.setFloating(el);
    };

    // Force recompute after open
    useLayoutEffect(() => {
        if (!isMenuVisible) return;
        requestAnimationFrame(() => requestAnimationFrame(() => update()));
    }, [isMenuVisible, update]);

    // Floating UI dismiss
    const dismiss = useDismiss(context, {
        outsidePressEvent: "pointerdown",
        outsidePress: (event) => {
            const t = event.target as Node | null;
            if (!t) return true;
            if (rootRef.current?.contains(t)) return false;
            if (floatingWrapRef.current?.contains(t)) return false;
            return true;
        },
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
    const startResize = (corner: Corner, e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const box = boxRef.current;
        const img = imgRef.current;
        if (!box || !img) return;

        keepSelected();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

        const rect = box.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        const startW = width ?? imgRect.width ?? 200;
        const startH = height ?? imgRect.height ?? 200;
        const ratio = startW > 0 ? startH / startW : 1;

        const anchor = (() => {
            if (corner === "tl") return { x: rect.right, y: rect.bottom };
            if (corner === "tr") return { x: rect.left, y: rect.bottom };
            if (corner === "bl") return { x: rect.right, y: rect.top };
            return { x: rect.left, y: rect.top };
        })();

        setResizing(true);

        let raf = 0;
        let lastW = startW;
        let lastH = startH;

        const apply = (w: number, h: number) => {
            if (Math.abs(w - lastW) < 1 && Math.abs(h - lastH) < 1) return;
            lastW = w;
            lastH = h;
            updateAttributes({ width: w, height: h });
        };

        const onMove = (ev: PointerEvent) => {
            const rawW = Math.abs(ev.clientX - anchor.x);
            const nextW = clamp(Math.round(rawW), 50, 4000);
            const nextH = clamp(Math.round(nextW * ratio), 50, 4000);

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => apply(nextW, nextH));
        };

        const finish = () => {
            if (raf) cancelAnimationFrame(raf);
            setResizing(false);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", finish);
            setTimeout(keepSelected, 0);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", finish, { once: true });
    };

    // Inline/Block Auto
    const applyInlineByDropContext = (dropEvent: DragEvent) => {
        requestAnimationFrame(() => {
            const view = editor.view;
            const { state, dispatch } = view;

            const sel = state.selection;
            let imagePos: number | null = null;
            let imageNode: any = null;

            if (sel instanceof NodeSelection && sel.node.type.name === node.type.name) {
                imagePos = sel.from;
                imageNode = sel.node;
            } else {
                const coords = view.posAtCoords({ left: dropEvent.clientX, top: dropEvent.clientY });
                const pos = coords?.pos ?? null;
                if (typeof pos === "number") {
                    const maybe = state.doc.nodeAt(pos);
                    if (maybe?.type?.name === node.type.name) {
                        imagePos = pos;
                        imageNode = maybe;
                    }
                }
            }

            if (!imageNode || typeof imagePos !== "number") return;

            const $pos = state.doc.resolve(imagePos);
            const shouldInline = $pos.parent.isTextblock;

            const tr = state.tr.setNodeMarkup(imagePos, undefined, {
                ...imageNode.attrs,
                inline: shouldInline,
            });

            if (tr.docChanged) dispatch(tr);
        });
    };

    //Dragging Cleanup
    useEffect(() => {
        if (!dragging) return;

        const stop = () => {
            draggingRef.current = false;
            setDragging(false);
        };

        window.addEventListener("dragend", stop, true);
        window.addEventListener("drop", stop, true);
        window.addEventListener("mouseup", stop, true);

        return () => {
            window.removeEventListener("dragend", stop, true);
            window.removeEventListener("drop", stop, true);
            window.removeEventListener("mouseup", stop, true);
        };
    }, [dragging]);

    //Drag Moves
    const onDragStartCapture = (e: React.DragEvent) => {
        draggingRef.current = true;
        setDragging(true);

        try {
            const pos = typeof getPos === "function" ? getPos() : null;
            if (typeof pos !== "number") return;
            const { state, dispatch } = editor.view;
            dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
            const slice = editor.view.state.selection.content();
            editor.view.dragging = { slice, move: true };
            try {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.dropEffect = "move";
                e.dataTransfer.setData("text/plain", " ");
            } catch { }
        } catch (e) {
            void e;
        }
    };

    const onDropCapture = (e: React.DragEvent) => {
        if (!draggingRef.current) return;
        applyInlineByDropContext(e.nativeEvent as DragEvent);
    };

    const onDragEnd = () => {
        draggingRef.current = false;
        setDragging(false);
        setTimeout(keepSelected, 0);
    };
    const wrapperStyle: React.CSSProperties = isInline
        ? { display: "inline-block", verticalAlign: "baseline", maxWidth: "100%" }
        : { display: "block", width: "100%", textAlign: align };

    const boxStyle: React.CSSProperties = {
        display: "inline-block",
        position: "relative",
        maxWidth: "100%",
        outline: selected ? "2px solid #111827" : undefined,
        outlineOffset: selected ? 2 : undefined,
    };

    const imgStyle: React.CSSProperties = {
        display: "block",
        maxWidth: "100%",
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : "auto",
        transform,
        userSelect: "none",
        opacity: dragging ? 0.7 : 1,
    };

    return (
        <NodeViewWrapper
            ref={rootRef}
            as="span"
            contentEditable={false}
            draggable={true}
            onDragStartCapture={onDragStartCapture}
            onDropCapture={onDropCapture}
            onDragEnd={onDragEnd}
            data-node="image"
            data-inline={isInline ? "true" : "false"}
            style={wrapperStyle}
        >
            <span
                ref={setReferenceEl}
                {...getReferenceProps({
                    onPointerDownCapture: () => {
                        keepSelected();
                        if (!dragging) draggingRef.current = false;
                    },
                })}
                style={boxStyle}
            >
                <img
                    ref={imgRef}
                    src={node.attrs.src}
                    alt={node.attrs.alt || ""}
                    title={node.attrs.title || ""}
                    draggable={false}
                    style={imgStyle}
                />

                {dragging && (
                    <span
                        style={{
                            pointerEvents: "none",
                            position: "absolute",
                            inset: 0,
                            borderRadius: 6,
                            boxShadow: "0 0 0 2px rgba(17,24,39,0.4) inset",
                        }}
                    />
                )}

                {selected && (
                    <>
                        <span onPointerDown={(e) => startResize("tl", e)} style={{ position: "absolute", top: -8, left: -8, height: 12, width: 12, background: "#111827", cursor: "nwse-resize" }} />
                        <span onPointerDown={(e) => startResize("tr", e)} style={{ position: "absolute", top: -8, right: -8, height: 12, width: 12, background: "#111827", cursor: "nesw-resize" }} />
                        <span onPointerDown={(e) => startResize("bl", e)} style={{ position: "absolute", bottom: -8, left: -8, height: 12, width: 12, background: "#111827", cursor: "nesw-resize" }} />
                        <span onPointerDown={(e) => startResize("br", e)} style={{ position: "absolute", bottom: -8, right: -8, height: 12, width: 12, background: "#111827", cursor: "nwse-resize" }} />
                    </>
                )}
            </span>

            <AnimatePresence>
                {isMenuVisible && (
                    <div
                        ref={setFloatingWrapEl}
                        style={floatingStyles as CSSProperties}
                        {...getFloatingProps()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -4 }}
                            transition={{ type: "tween", duration: 0.12 }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                borderRadius: 12,
                                border: "1px solid #e5e7eb",
                                background: "#ffffff",
                                padding: 6,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
                            }}
                        >
                            <Tooltip content="Flip Horizontal">
                                <button type="button" onClick={toggleFlipX} style={{ borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", padding: "6px 8px", fontSize: 12, cursor: "pointer" }}>
                                    <FlipVertical />
                                </button>
                            </Tooltip>

                            <Tooltip content="Flip Vertical">
                                <button type="button" onClick={toggleFlipY} style={{ borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", padding: "6px 8px", fontSize: 12, cursor: "pointer" }}>
                                    <FlipHorizontal />
                                </button>
                            </Tooltip>

                            <span style={{ width: 1, height: 16, background: "#e5e7eb", margin: "0 6px" }} />

                            <Tooltip content="Left">
                                <button type="button" onClick={() => setAlign("left")} style={{ borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", padding: "6px 8px", fontSize: 12, cursor: "pointer" }}>
                                    <AlignLeft />
                                </button>
                            </Tooltip>
                            <Tooltip content="Center">
                                <button type="button" onClick={() => setAlign("center")} style={{ borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", padding: "6px 8px", fontSize: 12, cursor: "pointer" }}>
                                    <AlignCenter />
                                </button>
                            </Tooltip>
                            <Tooltip content="Right">
                                <button type="button" onClick={() => setAlign("right")} style={{ borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", padding: "6px 8px", fontSize: 12, cursor: "pointer" }}>
                                    <AlignRight />
                                </button>
                            </Tooltip>

                            <span style={{ width: 1, height: 16, background: "#e5e7eb", margin: "0 6px" }} />

                            <Tooltip content="Remove">
                                <button
                                    type="button"
                                    onClick={deleteNode}
                                    style={{
                                        borderRadius: 10,
                                        border: "1px solid #fecaca",
                                        background: "#fff",
                                        padding: "6px 8px",
                                        fontSize: 12,
                                        cursor: "pointer",
                                        color: "#dc2626",
                                    }}
                                >
                                    <TrashIcon />
                                </button>
                            </Tooltip>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </NodeViewWrapper>
    );
};
