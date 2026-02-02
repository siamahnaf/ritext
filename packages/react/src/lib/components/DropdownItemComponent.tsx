import { twMerge } from "tailwind-merge";
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
        <div className={twMerge(
            "flex items-center gap-x-2.5 transition-all duration-100 cursor-pointer select-none px-2 py-1.5 rounded-md",
            _itemClassName,
            editorState?.isActive ? "bg-gray-200/60" : "hover:bg-gray-100",
            itemClassName,
            editorState?.isActive ? activeClassName : "hover:bg-gray-100"
        )} onClick={onSelect}>
            {item.icon}
            <span className={twMerge("flex-1 text-base", spClass)} style={item.style}>{item.text}</span>
            {showKeyShortcutText && item.keyBind &&
                <span className="ml-6 text-gray-400">{item.keyBind}</span>
            }
        </div>
    );
};

export default DropdownItemComponent;