import { ReactNode, CSSProperties } from "react";
import { Placement } from "@floating-ui/react";
import { Editor } from "@tiptap/react";

export type ExtButtonOptions = {
    className?: string;
    activeClassName?: string;
    icon?: ReactNode,
    style?: CSSProperties,
    tooltip?: boolean | string;
    tooltipClassName?: string;
    tooltipPlacement?: Placement;
    button: (args: { options: ExtButtonOptions, editor: Editor, buttonClassName: string }) => ReactNode;
}