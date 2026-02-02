import { TableCell, TableHeader } from "@tiptap/extension-table";

export const CellWithBg = TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            backgroundColor: {
                default: null,
                parseHTML: (el) => (el as HTMLElement).getAttribute("data-bg") || (el as HTMLElement).style.backgroundColor || null,
                renderHTML: (attrs) => {
                    const bg = attrs.backgroundColor;
                    if (!bg) return {};
                    // inline style for portability
                    return { "data-bg": bg, style: `background-color: ${bg};` };
                },
            },
        };
    },
});

export const HeaderWithBg = TableHeader.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            backgroundColor: {
                default: null,
                parseHTML: (el) => (el as HTMLElement).getAttribute("data-bg") || (el as HTMLElement).style.backgroundColor || null,
                renderHTML: (attrs) => {
                    const bg = attrs.backgroundColor;
                    if (!bg) return {};
                    return { "data-bg": bg, style: `background-color: ${bg};` };
                },
            },
        };
    },
});
