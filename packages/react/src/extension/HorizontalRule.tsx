import { HorizontalRule as TiptapHorizontalRule, HorizontalRuleOptions } from "@tiptap/extension-horizontal-rule";
import type { Node } from "@tiptap/react";
import { MinusIcon } from "../lib/icons";

//Components
import ButtonWithoutActive from "../lib/components/ButtonWithoutActive";
import type { ExtWithoutActiveOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtHorizontalRules = ExtWithoutActiveOptions<HorizontalRuleOptions>;

export const HorizontalRule: Node<ExtHorizontalRules> = TiptapHorizontalRule.extend<ExtHorizontalRules>({
    addOptions() {
        const parent = this.parent?.();
        return {
            ...(parent as HorizontalRuleOptions ?? {}),
            component: ({ editor, options, buttonClassName }) => {
                return (
                    <ButtonWithoutActive
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<MinusIcon />}
                        _onToggle={() => editor.chain().focus().setHorizontalRule().run()}
                        _tooltipContent="Horizontal Rules"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    }
});