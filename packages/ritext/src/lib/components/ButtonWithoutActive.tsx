import type { ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "./_com/Tooltip";
import type { Placement } from "@floating-ui/react";

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
    _interShortcut?: string;
    tooltipPlacement?: Placement;
    _disabled?: boolean;
}

const ButtonWithoutActive = ({ className, icon, style, tooltip = true, tooltipClassName, tooltipPlacement, _internalIcon, _tooltipContent, _interShortcut, _onToggle, _buttonClassName, _disabled = false }: Props) => {

    const tooltipContent = (<p>
        {typeof tooltip === "string" ? tooltip : _tooltipContent}{_interShortcut &&
            <> <br /> {_interShortcut} </>}
    </p>);

    const btn = (
        <button
            onClick={_onToggle}
            disabled={_disabled}
            className={twMerge(
                "py-1.5 px-2.5 rounded-md hover:bg-gray-100",
                _disabled ? "opacity-20" : "",
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