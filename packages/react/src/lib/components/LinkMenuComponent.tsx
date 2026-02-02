"use client";
import { type CSSProperties, useEffect, useState } from "react";
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
        <div ref={refs.setFloating} style={floatingStyles as CSSProperties} {...getFloatingProps()} className="ritext:z-99999999 ritext:w-66 ritext:rounded-xl ritext:border ritext:border-gray-200 ritext:bg-white ritext:p-3 ritext:shadow-lg">
            <InputComponent
                id="link"
                label="Link"
                value={pop.href}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => setPop((s) => (s.open ? { ...s, href: e.target.value } : s))}
                placeholder="https://yourlink.com"
                containerClassName="ritext:mb-2.5"
            />
            <CheckboxComponent
                id="openNewTab"
                checked={pop.targetBlank}
                onChange={(e) => setPop((s) => (s.open ? { ...s, targetBlank: e } : s))}
                label="Open in a new tab?"
                bottomSpace={false}
            />
            <div className="ritext:mt-3 ritext:flex ritext:gap-2">
                <button className="ritext:rounded-lg ritext:border ritext:bg-gray-700 ritext:text-white ritext:border-gray-700 ritext:px-3 ritext:py-1 ritext:text-sm" onMouseDown={(e) => e.stopPropagation()} onClick={applyLink}>
                    Apply
                </button>
                <button className="ritext:rounded-lg ritext:border ritext:border-gray-200 ritext:px-3 ritext:py-1 ritext:text-sm" onMouseDown={(e) => e.stopPropagation()} onClick={removeLink}>
                    Unlink
                </button>
                <button className="ritext:ml-auto ritext:rounded-lg ritext:border ritext:border-gray-200 ritext:px-3 ritext:py-1 ritext:text-sm" onMouseDown={(e) => e.stopPropagation()} onClick={() => setPop({ open: false })}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LinkMenuComponent;