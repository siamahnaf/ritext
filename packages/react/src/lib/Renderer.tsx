"use client"
import type { ComponentPropsWithoutRef } from "react";

//Interface
type Props = ComponentPropsWithoutRef<"div"> & {
    content?: string | null
}

const Renderer = ({ content, className = "", ...props }: Props) => {
    //Return null
    if (!content) return null;

    return (
        <div
            className={`ProseMirror ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
            {...props}
        />
    );
};

export default Renderer;