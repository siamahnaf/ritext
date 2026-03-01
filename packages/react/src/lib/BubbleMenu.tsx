import { Fragment } from "react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { NodeSelection } from "@tiptap/pm/state";
import { useEditor } from "./context/editor.context";

const BubbleMenu = () => {
    //Editor
    const { editor } = useEditor();

    if (!editor) return null;

    //Entries
    const entries = editor.extensionManager.extensions
        .map((ext) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const anyExt = ext as any;

            const renderButton =
                anyExt.options?.component as undefined | ((args: any) => React.ReactNode);
            if (!renderButton || !anyExt.options?.surface?.bubbleMenu) return null;

            return {
                name: anyExt.name as string,
                renderButton,
                options: anyExt.options,
                buttonClassName: anyExt.buttonClassName,
                dropdownContainerClassName: anyExt.dropdownContainerClassName,
                dropdownItemClassName: anyExt.dropdownItemClassName,
                bubbleMenuOrder: anyExt.options?.order?.bubbleMenu as number | undefined,
            };
        })
        .filter(Boolean) as Array<{
            name: string;
            renderButton: (args: {
                editor: typeof editor;
                /* eslint-disable @typescript-eslint/no-explicit-any */
                options: any;
                buttonClassName: string;
                dropdownContainerClassName?: string;
                dropdownItemClassName?: string;
            }) => React.ReactNode;
            /* eslint-disable @typescript-eslint/no-explicit-any */
            options: any;
            bubbleMenuOrder?: number;
            buttonClassName?: string;
            dropdownContainerClassName?: string;
            dropdownItemClassName?: string;
        }>;
    const desiredOrder = new Map(
        editor.options.extensions.map((ext, i) => [ext.name, i]),
    );
    entries.sort((a, b) => {
        const ap =
            typeof a.bubbleMenuOrder === "number"
                ? a.bubbleMenuOrder
                : Number.POSITIVE_INFINITY;
        const bp =
            typeof b.bubbleMenuOrder === "number"
                ? b.bubbleMenuOrder
                : Number.POSITIVE_INFINITY;
        if (ap !== bp) return ap - bp;

        const ai = desiredOrder.get(a.name) ?? Number.MAX_SAFE_INTEGER;
        const bi = desiredOrder.get(b.name) ?? Number.MAX_SAFE_INTEGER;
        if (ai !== bi) return ai - bi;

        return a.name.localeCompare(b.name);
    });

    if (!entries.length) return null;

    return (
        <TiptapBubbleMenu
            editor={editor}
            options={{ placement: "top", offset: 10, flip: true }}
            shouldShow={({ editor, state, from, to }) => {
                const { selection } = state;
                if (selection instanceof NodeSelection) return false;
                if (editor.isActive("image")) return false;
                return from !== to && editor.isFocused;
            }}
        >
            <div className="ritext:bg-white ritext:flex ritext:gap-x-1 ritext:py-1 ritext:px-1 ritext:rounded-md ritext:border ritext:border-gray-200/60!  ritext:relative ritext:z-99999">
                {entries.map(({ name, renderButton, options }) => (
                    <Fragment key={name}>
                        {renderButton({
                            editor,
                            options,
                            buttonClassName: "",
                            dropdownContainerClassName: "",
                            dropdownItemClassName: ""
                        })}
                    </Fragment>
                ))}
            </div>
        </TiptapBubbleMenu>
    );
};

export default BubbleMenu;
