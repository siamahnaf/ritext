import type { ReactNode, CSSProperties } from "react";
import type { Placement } from "@floating-ui/react";
import type { Editor } from "@tiptap/react";

export type ExtButtonOptions = {
    className?: string;
    activeClassName?: string;
    icon?: ReactNode,
    style?: CSSProperties,
    tooltip?: boolean | string;
    tooltipClassName?: string;
    tooltipPlacement?: Placement;
    component: (args: { options: ExtButtonOptions, editor: Editor, buttonClassName: string }) => ReactNode;
}

export type ExtButtonCustomOptions = Omit<ExtButtonOptions, "component">;

export type ExtWithoutActiveOptions = Omit<ExtButtonOptions, "activeClassName" | "component"> & {
    component: (args: { options: ExtWithoutActiveOptions, editor: Editor, buttonClassName: string }) => ReactNode;
};

export type ExtDropdownOptions = {
    className?: string;
    showArrow?: boolean;
    content?: ReactNode;
    dropdownClassName?: string;
    itemClassName?: string;
    activeClassName?: string;
    style?: CSSProperties;
    tooltip?: boolean | string;
    tooltipClassName?: string;
    tooltipPlacement?: Placement;
}

export type ExtDropdownItemProps = {
    icon?: ReactNode;
    text: string;
    keyBind?: string;
    onClick: () => void;
    name: string;
    style?: CSSProperties;
    ext?: number | string;
    id: string;
}