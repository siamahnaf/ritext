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
    tooltipPlacement?: Placement;
}

const ButtonWithoutActive = ({ className, icon, style, tooltip = true, tooltipClassName, tooltipPlacement, _internalIcon, _tooltipContent, _onToggle, _buttonClassName }: Props) => {

    const tooltipContent = (<p>
        {typeof tooltip === "string" ? tooltip : _tooltipContent}<br />
    </p>);

    const btn = (
        <button
            onClick={_onToggle}
            className={twMerge(
                "p-1.5 rounded-md hover:bg-gray-100",
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