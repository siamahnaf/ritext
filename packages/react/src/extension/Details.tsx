import { Details as TiptapDetails, DetailsSummary, DetailsContent, type DetailsOptions } from "@tiptap/extension-details";
import type { Node } from "@tiptap/react";
import { DetailsIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtDetailsOptions = ExtButtonOptions<DetailsOptions>;

export const Details: Node<ExtDetailsOptions> = TiptapDetails.extend<ExtDetailsOptions>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as DetailsOptions ?? {}),
            surface: { toolbar: true },
            component: ({ editor, options, buttonClassName }) => {
                return (
                    <ButtonComponent
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        activeClassName={options.activeClassName}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<DetailsIcon />}
                        _extName="details"
                        _onToggle={() => editor.isActive("details") ? editor.chain().focus().unsetDetails().run() : editor.chain().focus().setDetails().run()}
                        _tooltipContent="Details"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    },

    addExtensions() {
        return [DetailsSummary, DetailsContent];
    },
});
