import * as React from "react";
import { useEditor } from "./context/editor.context";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    buttonClassName?: string;
}

const Toolbar = ({ className, buttonClassName }: Props) => {
    const { editor } = useEditor();
    if (!editor) return null;
    const entries = editor.extensionManager.extensions
        .map((ext) => {
            const anyExt = ext as any;
            const renderButton =
                (anyExt.options?.component as undefined | ((args: any) => React.ReactNode))

            return renderButton
                ? { name: anyExt.name as string, renderButton, options: anyExt.options, buttonClassName: anyExt.buttonClassName }
                : null;
        })
        .filter(Boolean) as Array<{
            name: string;
            renderButton: (args: { editor: typeof editor; options: any, buttonClassName: string }) => React.ReactNode;
            options: any;
        }>;

    if (!entries.length) return null;

    return (
        <div className={twMerge("flex gap-x-1.5", className)}>
            {entries.map(({ name, renderButton, options }) => (
                <React.Fragment key={name}>
                    {renderButton({ editor, options, buttonClassName: buttonClassName || "" })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Toolbar;