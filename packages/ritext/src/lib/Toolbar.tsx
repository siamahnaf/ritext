import * as React from "react";
import { useEditor } from "./context/editor.context";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    buttonClassName?: string;
    dropdownContainerClassName?: string;
    dropdownItemClassName?: string;

}

const Toolbar = ({ className, buttonClassName, dropdownContainerClassName, dropdownItemClassName }: Props) => {
    const { editor } = useEditor();
    if (!editor) return null;
    const entries = editor.extensionManager.extensions
        .map((ext) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const anyExt = ext as any;
            const renderButton =
                /* eslint-disable @typescript-eslint/no-explicit-any */
                (anyExt.options?.component as undefined | ((args: any) => React.ReactNode))

            return renderButton
                ? {
                    name: anyExt.name as string,
                    renderButton,
                    options: anyExt.options,
                    buttonClassName: anyExt.buttonClassName,
                    dropdownContainerClassName: anyExt.dropdownContainerClassName,
                    dropdownItemClassName: anyExt.dropdownItemClassName,
                }
                : null;
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
        }>;

    if (!entries.length) return null;

    return (
        <div className={twMerge("flex gap-x-1.5", className)}>
            {entries.map(({ name, renderButton, options }) => (
                <React.Fragment key={name}>
                    {renderButton({
                        editor,
                        options,
                        buttonClassName: buttonClassName || "",
                        dropdownContainerClassName: dropdownContainerClassName || "",
                        dropdownItemClassName: dropdownItemClassName || ""
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Toolbar;