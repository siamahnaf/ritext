"use client"
import { ComponentPropsWithoutRef } from "react";

//Interface
type Props = ComponentPropsWithoutRef<"div"> & {
    content?: string | null
}

const Renderer = ({ content, ...props }: Props) => {
    //Return null
    if (!content) return null;

    return (
        <div dangerouslySetInnerHTML={{ __html: content }} {...props} />
    );
};

export default Renderer;