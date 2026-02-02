import { type ReactNode, type CSSProperties, useMemo } from "react";
import { twMerge } from "../utils/tw";
import Tooltip from "./_com/Tooltip";
import type { Placement } from "@floating-ui/react";
import { isMacOS } from "@tiptap/react";

//Interface
interface Props {
    className?: string;
    icon?: ReactNode;
    style?: CSSProperties;
    tooltip?: boolean | string;
    tooltipClassName?: string;
    _tooltipContent?: string;
    _internalIcon?: ReactNode;
    _onToggle?: () => void;
    _buttonClassName?: string;
    _interShortcut?: { mac: string, win: string };
    tooltipPlacement?: Placement;
    _disabled?: boolean;
}

const ButtonWithoutActive = ({ className, icon, style, tooltip = true, tooltipClassName, tooltipPlacement, _internalIcon, _tooltipContent, _interShortcut, _onToggle, _buttonClassName, _disabled = false }: Props) => {

    const shortcutText = useMemo(() => {
        if (!_interShortcut) return "";
        return isMacOS() ? _interShortcut.mac : _interShortcut.win;
    }, [_interShortcut]);

    const tooltipContent = (<p>
        {typeof tooltip === "string" ? tooltip : _tooltipContent}{_interShortcut &&
            <> <br /> {shortcutText} </>}
    </p>);

    const btn = (
        <button
            type="button"
            onClick={_onToggle}
            disabled={_disabled}
            className={twMerge(
                "ritext:py-1.5 ritext:px-2.5 ritext:rounded-md ritext:hover:bg-gray-100",
                _disabled ? "ritext:opacity-20" : "",
                _buttonClassName,
                className
            )}
            style={style}
        >
            {icon ?? _internalIcon}
        </button>
    );

    if (tooltip === false) return btn;

    return (
        <Tooltip
            content={tooltipContent}
            className={tooltipClassName}
            placement={tooltipPlacement}
        >
            {btn}
        </Tooltip>
    );
};

export default ButtonWithoutActive;
