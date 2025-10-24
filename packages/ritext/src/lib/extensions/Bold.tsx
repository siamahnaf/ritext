import { ReactNode, CSSProperties } from "react";
import TiptapBold from "@tiptap/extension-bold";
import BoldComponent from "../components/BoldComponent";
import { Placement } from "@floating-ui/react";
import { Mark } from "@tiptap/react";

//Interface
type BoldOptions = {
    className?: string;
    activeClassName?: string;
    icon?: ReactNode,
    style?: CSSProperties,
    tooltip?: boolean | string;
    tooltipClassName?: string;
    tooltipPlacement?: Placement;
    button: (args: { options: BoldOptions }) => ReactNode;
}

export const Bold: Mark<BoldOptions, any> = TiptapBold.extend<BoldOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            button: ({ options }) => {
                return (
                    <BoldComponent
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        activeClassName={options.activeClassName}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                    />
                )
            }
        }
    }
});