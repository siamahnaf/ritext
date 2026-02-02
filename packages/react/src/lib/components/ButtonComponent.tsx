import type { ReactNode, CSSProperties } from "react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "./_com/Tooltip";
import type { Placement } from "@floating-ui/react";
import { useEditor } from "../context/editor.context";
import { useEditorState, isMacOS } from "@tiptap/react";

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
    _interShortcut?: { win: string; mac: string };
    _buttonClassName?: string;
    tooltipPlacement?: Placement;
}

const ButtonComponent = ({ className, activeClassName, icon, style, tooltip = true, tooltipClassName, tooltipPlacement, _extName, _internalIcon, _tooltipContent, _onToggle, _interShortcut, _buttonClassName }: Props) => {
    const { editor } = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({ isActive: editor?.isActive(_extName) || false }),
    });

    const shortcutText = useMemo(() => {
        if (!_interShortcut) return "";
        return isMacOS() ? _interShortcut.mac : _interShortcut.win;
    }, [_interShortcut]);

    const tooltipContent = (
        <p>
            {typeof tooltip === "string" ? tooltip : _tooltipContent}
            {shortcutText ? (
                <>
                    <br />
                    <span className="opacity-70">{shortcutText}</span>
                </>
            ) : null}
        </p>
    );

    const btn = (
        <button onClick={_onToggle} className={twMerge("py-1.5 px-2.5 rounded-md", _buttonClassName, editorState?.isActive ? "bg-gray-200/60" : "hover:bg-gray-100", className, editorState?.isActive ? activeClassName : "hover:bg-gray-100")} style={style}>
            {icon ?? _internalIcon}
        </button>
    );

    if (tooltip === false) return btn;

    return (
        <Tooltip content={tooltipContent} className={tooltipClassName} placement={tooltipPlacement}>
            {btn}
        </Tooltip>
    );
};

export default ButtonComponent;
