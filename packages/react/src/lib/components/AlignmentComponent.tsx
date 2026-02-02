"use client"
import { JSX } from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "../icons";

//interface
interface Props {
    onSelect: () => void;
    onPick: (e: string) => void;
    items: string[];
}

const AlignmentComponent = ({ onSelect, onPick, items }: Props) => {
    //Icon Mapping
    const iconMap: Record<string, JSX.Element> = {
        "left": <AlignLeft />,
        "center": <AlignCenter />,
        "right": <AlignRight />,
        "justify": <AlignJustify />
    }

    return (
        <div className="ritext:flex ritext:gap-x-1.5">
            {items.map((item) => (
                <button type="button" key={item} onClick={() => (onPick(item))} className="ritext:flex-1 ritext:p-1.5 ritext:rounded-md ritext:hover:bg-gray-100 ritext:text-center">
                    {iconMap[item]}
                </button>
            ))}
        </div>
    );
};

export default AlignmentComponent;
