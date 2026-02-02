import { Fragment } from "react";
import type { Extension } from "@tiptap/react";
import { TableKit, type TableKitOptions } from "@tiptap/extension-table";
import { TabelIcon } from "../lib/icons";
import DropdownComponent from "../lib/components/DropdownComponent";
import { TableMenu } from "../lib/components/TableMenu";
import TableInsertComponent from "../lib/components/TableInsertComponent";
import type { ExtDropdownOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtTableOptions = ExtDropdownOptions<TableKitOptions, { dropdownContainerClassName: string }>;

export const Table: Extension<ExtTableOptions> = TableKit.extend<ExtTableOptions>({
    addExtensions() {
        const parentExts = this.parent?.() ?? [];
        return parentExts.map((ext: any) => {
            if (ext?.name === "tableCell" || ext?.name === "tableHeader") {
                return ext.extend({
                    addAttributes() {
                        const parentAttrs = this.parent?.() ?? {};
                        return {
                            ...parentAttrs,
                            backgroundColor: {
                                default: null,
                                parseHTML: (el: HTMLElement) =>
                                    el.getAttribute("data-bg") || el.style.backgroundColor || null,
                                renderHTML: (attrs: any) => {
                                    if (!attrs.backgroundColor) return {};
                                    return {
                                        "data-bg": attrs.backgroundColor,
                                        style: `background-color: ${attrs.backgroundColor};`,
                                    };
                                },
                            },
                        };
                    },
                });
            }
            return ext;
        });
    },

    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as TableKitOptions ?? {}),
            table: {
                resizable: true,
            },
            component: ({ options, editor, dropdownContainerClassName }) => (
                <Fragment>
                    <DropdownComponent
                        className={options.className}
                        showArrow={options.showArrow || false}
                        content={options.content}
                        dropdownClassName={options.dropdownClassName}
                        style={options.style}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _tooltipContent="Table"
                        _internalContent={<TabelIcon />}
                        _dropdownClassName={"ritext:w-70 " + dropdownContainerClassName}
                    >
                        <TableInsertComponent editor={editor} />
                    </DropdownComponent>
                    <TableMenu editor={editor} />
                </Fragment>
            ),
        };
    },
});
