"use client";
import { useEffect, useState } from "react";
import { useFloating, autoUpdate, offset, flip, shift, useDismiss, useInteractions } from "@floating-ui/react";
import { useEditor } from "../context/editor.context";

//Components
import InputComponent from "./InputComponent";
import CheckboxComponent from "./CheckboxComponent";


//Interface
type PopState = { open: false } | { open: true; href: string; targetBlank: boolean };

const LinkMenuComponent = () => {
    const { editor } = useEditor();
    const [pop, setPop] = useState<PopState>({ open: false });

    const { refs, floatingStyles, context } = useFloating({
        open: pop.open,
        onOpenChange: (o) => setPop((s) => (o ? s : { open: false })),
        placement: "bottom-start",
        whileElementsMounted: autoUpdate,
        strategy: "fixed",
        middleware: [offset(8), flip(), shift({ padding: 8 })],
    });

    const dismiss = useDismiss(context, { outsidePressEvent: "pointerdown" });
    const { getFloatingProps } = useInteractions([dismiss]);

    useEffect(() => {
        if (!editor) return;

        const dom = editor.view.dom;

        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            const a = target.closest("a[href]") as HTMLAnchorElement | null;
            if (!a || !dom.contains(a)) return;

            if (e.metaKey || e.ctrlKey) return;

            e.preventDefault();
            e.stopPropagation();

            refs.setReference(a);

            const href = a.getAttribute("href") ?? "";
            const targetBlank = (a.getAttribute("target") ?? "") === "_blank";

            setPop({ open: true, href, targetBlank });
        };

        dom.addEventListener("click", onClick, true);
        return () => dom.removeEventListener("click", onClick, true);
    }, [editor, refs]);

    const applyLink = () => {
        if (!editor || !pop.open) return;
        editor.chain().focus().extendMarkRange("link").setLink({ href: pop.href, target: pop.targetBlank ? "_blank" : null }).run();
        setPop({ open: false });
    };

    const removeLink = () => {
        if (!editor) return;
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        setPop({ open: false });
    };

    if (!editor || !pop.open) return null;

    return (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="z-99999999 w-66 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            <InputComponent
                id="link"
                label="Link"
                value={pop.href}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => setPop((s) => (s.open ? { ...s, href: e.target.value } : s))}
                placeholder="https://yourlink.com"
                containerClassName="mb-2.5"
            />
            <CheckboxComponent
                id="openNewTab"
                checked={pop.targetBlank}
                onChange={(e) => setPop((s) => (s.open ? { ...s, targetBlank: e } : s))}
                label="Open in a new tab?"
                bottomSpace={false}
            />
            <div className="mt-3 flex gap-2">
                <button className="rounded-lg border bg-gray-700 text-white border-gray-700 px-3 py-1 text-sm" onMouseDown={(e) => e.stopPropagation()} onClick={applyLink}>
                    Apply
                </button>
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-sm" onMouseDown={(e) => e.stopPropagation()} onClick={removeLink}>
                    Unlink
                </button>
                <button className="ml-auto rounded-lg border border-gray-200 px-3 py-1 text-sm" onMouseDown={(e) => e.stopPropagation()} onClick={() => setPop({ open: false })}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LinkMenuComponent;
