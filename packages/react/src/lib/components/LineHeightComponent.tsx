import { twMerge } from "../utils/tw";
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
            "ritext:flex ritext:items-center ritext:gap-x-2.5 ritext:transition-all ritext:duration-100 ritext:cursor-pointer ritext:select-none ritext:px-2 ritext:py-1.5 ritext:rounded-md",
            _itemClassName,
            editorState?.isActive ? "ritext:bg-gray-200/60" : "ritext:hover:bg-gray-100",
            itemClassName,
            editorState?.isActive ? activeClassName : "ritext:hover:bg-gray-100"
        )} onClick={onSelect}>
            <span className={twMerge("ritext:flex-1 ritext:text-base", spClass)}>{item}</span>
        </div>
    );
};

export default LineHeightComponent;