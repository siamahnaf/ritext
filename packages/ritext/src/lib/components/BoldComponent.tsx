import { ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import BoldIcon from "../icon/BoldIcon";
import Tooltip from "./_com/Tooltip";
import { Placement } from "@floating-ui/react";
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
    tooltipPlacement?: Placement;
}

const BoldComponent = ({ className, activeClassName, icon, style, tooltip = true, tooltipClassName, tooltipPlacement }: Props) => {
    //Editor
    const { editor } = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({ isActive: editor?.isActive("bold") || false })
    });

    const tooltipContent = (<p>
        {typeof tooltip === "string" ? tooltip : "Bold"}<br />
        ⌘ + B
    </p>);

    const btn = (
        <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={twMerge(
                "p-1.5 rounded-md",
                editorState?.isActive ? "bg-gray-200" : "hover:bg-gray-100",
                className,
                editorState?.isActive ? activeClassName : "hover:bg-gray-100"
            )}
            style={style}
        >
            {icon ?? <BoldIcon />}
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

export default BoldComponent;