import { twMerge } from "tailwind-merge";
import { useEditor } from "../context/editor.context";
import { useEditorState } from "@tiptap/react";

//Interface
interface Props {
    item: string;
    onSelect?: () => void;
    spClass?: string;
    itemClassName: string;
    activeClassName: string;
    _itemClassName: string;
}

const LineHeightComponent = ({ item, onSelect, activeClassName, itemClassName, _itemClassName, spClass }: Props) => {
    //Editor
    const { editor } = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({ isActive: editor?.isActive("textStyle", { lineHeight: item }) || false })
    });

    return (
        <div className={twMerge(
            "flex items-center gap-x-2.5 transition-all duration-100 cursor-pointer select-none px-2 py-1.5 rounded-md",
            _itemClassName,
            editorState?.isActive ? "bg-gray-200/60" : "hover:bg-gray-100",
            itemClassName,
            editorState?.isActive ? activeClassName : "hover:bg-gray-100"
        )} onClick={onSelect}>
            <span className={twMerge("flex-1 text-base", spClass)}>{item}</span>
        </div>
    );
};

export default LineHeightComponent;