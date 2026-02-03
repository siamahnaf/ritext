import { twMerge } from "../utils/tw";
import { useEditor } from "../context/editor.context";
import { useEditorState } from "@tiptap/react";

//Interface
import type { ExtDropdownItemProps } from "../types/tiptap-ext.type";
interface Props {
    item: ExtDropdownItemProps;
    onSelect?: () => void;
    spClass?: string;
    itemClassName: string;
    activeClassName: string;
    showKeyShortcutText?: boolean;
    _itemClassName: string;
}

const DropdownItemComponent = ({ item, onSelect, activeClassName, itemClassName, _itemClassName, showKeyShortcutText = true, spClass }: Props) => {
    //Editor
    const { editor } = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({ isActive: editor?.isActive(item.name, item.ext ? { level: item.ext } : undefined) || false })
    });

    return (
        <div
            className={twMerge(
                "ritext:flex ritext:items-center ritext:gap-x-2.5 ritext:transition-all ritext:duration-100 ritext:cursor-pointer ritext:select-none ritext:px-2 ritext:py-1.5 ritext:rounded-md",
                _itemClassName,
                editorState?.isActive ? "ritext:bg-gray-200/60" : "ritext:hover:bg-gray-100",
                itemClassName,
                editorState?.isActive ? activeClassName : "ritext:hover:bg-gray-100"
            )}
            onClick={onSelect}
        >
            {item.icon}
            <span className={twMerge("ritext:flex-1 ritext:text-base", spClass)} style={item.style}>{item.text}</span>
            {showKeyShortcutText && item.keyBind &&
                <span className="ritext:ml-6 ritext:text-xs ritext:text-gray-400">{item.keyBind}</span>
            }
        </div>
    );
};

export default DropdownItemComponent;
