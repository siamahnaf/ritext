import type { ReactNode, CSSProperties } from "react";
import type { Placement } from "@floating-ui/react";
import type { Editor } from "@tiptap/react";

export type ExtButtonBaseOptions = {
    className?: string;
    activeClassName?: string;
    icon?: ReactNode;
    style?: CSSProperties;
    tooltip?: boolean | string;
    tooltipClassName?: string;
    tooltipPlacement?: Placement;
};

export type ExtDropdownBaseOptions = {
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
};

export type ExtButtonComponentArgs<O, Extra extends object = {}> = {
    options: O;
    editor: Editor;
    buttonClassName: string;
} & Extra;

export type ExtDropdownComponentArgs<O, Extra extends object = {}> = {
    options: O;
    editor: Editor;
} & Extra;

export type ExtButtonOptions<
    RootExtra extends object = {},
    ComponentExtra extends object = {},
    Base extends object = ExtButtonBaseOptions
> =
    Base &
    RootExtra & {
        component: (args: ExtButtonComponentArgs<Base & RootExtra, ComponentExtra>) => ReactNode;
    };

export type ExtDropdownOptions<
    RootExtra extends object = {},
    ComponentExtra extends object = {},
    Base extends object = ExtDropdownBaseOptions
> =
    Base &
    RootExtra & {
        component: (args: ExtDropdownComponentArgs<Base & RootExtra, ComponentExtra>) => ReactNode;
    };

export type ExtWithoutActiveOptions<
    RootExtra extends object = {},
    ComponentExtra extends object = {}
> = ExtButtonOptions<
    RootExtra,
    ComponentExtra,
    Omit<ExtButtonBaseOptions, "activeClassName">
>;

export type ExtDropdownItemProps = {
    icon?: ReactNode;
    text: string;
    keyBind?: string;
    onClick: () => void;
    name: string;
    style?: CSSProperties;
    ext?: number | string;
    id: string;
};