import { Fragment } from "react";
import { Extension } from "@tiptap/react";
import { IndentIcon, OutdentIcon } from "../lib/icons";

// Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtIndentOptions = ExtButtonOptions<
    {
        indentSize?: number;
        maxIndent?: number;
        types?: string[];
    }
>
declare module "@tiptap/react" {
    interface Commands<ReturnType> {
        indentOutdent: {
            indent: () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const toInt = (v: unknown) => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
};

export const IndentOutdent = Extension.create<ExtIndentOptions>({
    name: "indentOutdent",
    addOptions() {
        const parent = this.parent?.();

        return {
            ...parent,
            indentSize: 1,
            maxIndent: 7,
            types: ["paragraph", "heading", "blockquote"],
            component: ({ options, editor, buttonClassName }) => {
                return (
                    <Fragment>
                        <ButtonComponent
                            className={options.className}
                            icon={options.icon}
                            style={options.style}
                            activeClassName={options.activeClassName}
                            tooltip={options.tooltip}
                            tooltipClassName={options.tooltipClassName}
                            tooltipPlacement={options.tooltipPlacement}
                            _internalIcon={<IndentIcon />}
                            _extName="indent"
                            _onToggle={() => editor.chain().focus().indent().run()}
                            _interShortcut={{ win: "⇥", mac: "⇥" }}
                            _tooltipContent="Indent"
                            _buttonClassName={buttonClassName}
                        />

                        <ButtonComponent
                            className={options.className}
                            icon={options.icon}
                            style={options.style}
                            activeClassName={options.activeClassName}
                            tooltip={options.tooltip}
                            tooltipClassName={options.tooltipClassName}
                            tooltipPlacement={options.tooltipPlacement}
                            _internalIcon={<OutdentIcon />}
                            _extName="outdent"
                            _onToggle={() => editor.chain().focus().outdent().run()}
                            _interShortcut={{ win: "⇧ + ⇥", mac: "⇧ + ⇥" }}
                            _tooltipContent="Outdent"
                            _buttonClassName={buttonClassName}
                        />
                    </Fragment>
                );
            },
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types ?? [],
                attributes: {
                    indent: {
                        default: null,

                        parseHTML: (element) => {
                            const raw = element.getAttribute("data-indent");
                            const n = toInt(raw);
                            return n > 0 ? n : null;
                        },
                        renderHTML: (attributes) => {
                            const n = toInt(attributes.indent);
                            if (!n || n <= 0) return {};
                            return { "data-indent": String(n) };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const getTargets = (state: any) => {
            const allowed = new Set(this.options.types ?? []);
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const targets: { pos: number; node: any }[] = [];

            /* eslint-disable @typescript-eslint/no-explicit-any */
            state.doc.nodesBetween(state.selection.from, state.selection.to, (node: any, pos: number) => {
                if (!node?.type?.name) return;
                if (!allowed.has(node.type.name)) return;

                targets.push({ pos, node });
            });
            const $from = state.selection.$from;
            for (let d = $from.depth; d > 0; d--) {
                const node = $from.node(d);
                if (node?.type?.name && allowed.has(node.type.name)) {
                    targets.unshift({ pos: $from.before(d), node });
                    break;
                }
            }
            const seen = new Set<number>();
            return targets.filter((t) => (seen.has(t.pos) ? false : (seen.add(t.pos), true)));
        };

        const applyDelta = (delta: number) => {
            const step = Math.max(1, toInt(this.options.indentSize));
            const maxIndent = Math.max(1, toInt(this.options.maxIndent));

            /* eslint-disable @typescript-eslint/no-explicit-any */
            return ({ state, dispatch }: any) => {
                const targets = getTargets(state);
                if (!targets.length) return false;

                const tr = state.tr;
                let changed = false;

                for (const { pos, node } of targets) {
                    const current = toInt(node.attrs?.indent);
                    const next = clamp(current + delta * step, 0, maxIndent);

                    if (next === current) continue;

                    const attrs = { ...node.attrs };
                    if (next <= 0) {
                        delete attrs.indent;
                    } else {
                        attrs.indent = next;
                    }

                    tr.setNodeMarkup(pos, undefined, attrs, node.marks);
                    changed = true;
                }

                if (!changed) return false;
                if (dispatch) dispatch(tr);
                return true;
            };
        };

        return {
            indent: () => applyDelta(+1),
            outdent: () => applyDelta(-1),
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                return this.editor.commands.indent();
            },
            "Shift-Tab": () => {
                return this.editor.commands.outdent();
            },
        };
    },
});
