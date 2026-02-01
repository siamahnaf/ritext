"use client"
import { JSX } from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "../icon/AlignmentIcon";

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
        <div className="flex gap-x-1.5">
            {items.map((item) => (
                <button key={item} onClick={() => (onPick(item))} className="flex-1 p-1.5 rounded-md hover:bg-gray-100 text-center">
                    {iconMap[item]}
                </button>
            ))}
        </div>
    );
};

export default AlignmentComponent;