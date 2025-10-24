import * as React from "react";
import { useEditor } from "./context/editor.context";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

const Toolbar = ({ className }: Props) => {
    const { editor } = useEditor();
    if (!editor) return null;
    const entries = editor.extensionManager.extensions
        .map((ext) => {
            const anyExt = ext as any;
            const renderButton =
                (anyExt.options?.button as undefined | ((args: any) => React.ReactNode)) ||
                (anyExt.options?.ui?.button as undefined | ((args: any) => React.ReactNode));

            return renderButton
                ? { name: anyExt.name as string, renderButton, options: anyExt.options }
                : null;
        })
        .filter(Boolean) as Array<{
            name: string;
            renderButton: (args: { editor: typeof editor; options: any }) => React.ReactNode;
            options: any;
        }>;

    if (!entries.length) return null;

    return (
        <div className={twMerge("", className)}>
            {entries.map(({ name, renderButton, options }) => (
                <React.Fragment key={name}>
                    {renderButton({ editor, options })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Toolbar;