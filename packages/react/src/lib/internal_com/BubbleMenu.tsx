import { Fragment } from "react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";

type Props = { editor: Editor };

const BubbleMenu = ({ editor }: Props) => {
    const entries = editor.extensionManager.extensions
        .map((ext) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const anyExt = ext as any;

            const renderButton =
                anyExt.options?.component as undefined | ((args: any) => React.ReactNode);
            if (!renderButton || !anyExt.options?.showInBubbleMenu) return null;

            return {
                name: anyExt.name as string,
                renderButton,
                options: anyExt.options,
                buttonClassName: anyExt.buttonClassName,
                dropdownContainerClassName: anyExt.dropdownContainerClassName,
                dropdownItemClassName: anyExt.dropdownItemClassName,
                bubbleMenuPosition: anyExt.options?.bubbleMenuPosition as number | undefined,
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
            bubbleMenuPosition?: number;
            buttonClassName?: string;
            dropdownContainerClassName?: string;
            dropdownItemClassName?: string;
        }>;
    const desiredOrder = new Map(
        editor.options.extensions.map((ext, i) => [ext.name, i]),
    );
    entries.sort((a, b) => {
        const ap =
            typeof a.bubbleMenuPosition === "number"
                ? a.bubbleMenuPosition
                : Number.POSITIVE_INFINITY;
        const bp =
            typeof b.bubbleMenuPosition === "number"
                ? b.bubbleMenuPosition
                : Number.POSITIVE_INFINITY;
        if (ap !== bp) return ap - bp;

        const ai = desiredOrder.get(a.name) ?? Number.MAX_SAFE_INTEGER;
        const bi = desiredOrder.get(b.name) ?? Number.MAX_SAFE_INTEGER;
        if (ai !== bi) return ai - bi;

        return a.name.localeCompare(b.name);
    });

    if (!entries.length) return null;

    return (
        <TiptapBubbleMenu editor={editor} options={{ placement: "top", offset: 10, flip: true }}>
            <div className="bg-white flex gap-x-1 py-2 px-2 rounded-md border border-gray-200">
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
