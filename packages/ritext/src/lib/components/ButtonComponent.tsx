import type { ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "./_com/Tooltip";
import type { Placement } from "@floating-ui/react";
import { useEditor } from "../context/editor.context";
import { useEditorState } from "@tiptap/react";

//Interface
interface Props {
    className?: string;
    activeClassName?: string;
    icon?: ReactNode;
    style?: CSSProperties;
    tooltip?: boolean | string;
    tooltipClassName?: string;
    _extName: string;
    _tooltipContent?: string;
    _internalIcon?: ReactNode;
    _onToggle?: () => void;
    _interShortcut?: string;
    _buttonClassName?: string;
    tooltipPlacement?: Placement;
}

const ButtonComponent = ({ className, activeClassName, icon, style, tooltip = true, tooltipClassName, tooltipPlacement, _extName, _internalIcon, _tooltipContent, _onToggle, _interShortcut, _buttonClassName }: Props) => {
    //Editor
    const { editor } = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({ isActive: editor?.isActive(_extName) || false })
    });

    const tooltipContent = (<p>
        {typeof tooltip === "string" ? tooltip : _tooltipContent}<br />
        {_interShortcut}
    </p>);

    const btn = (
        <button
            onClick={_onToggle}
            className={twMerge(
                "p-1.5 rounded-md",
                _buttonClassName,
                editorState?.isActive ? "bg-gray-200/60" : "hover:bg-gray-100",
                className,
                editorState?.isActive ? activeClassName : "hover:bg-gray-100"
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

export default ButtonComponent;