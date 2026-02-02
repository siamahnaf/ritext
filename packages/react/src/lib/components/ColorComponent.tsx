"use client"
import { useState, Fragment } from "react";
import { ColorPicker } from "@siamf/react-color-pick";
import { Palette } from "../icons";

//Interface
interface Props {
    onPick: (e: string) => void;
    onClose?: () => void;
    items: string[];
    recents: string[];
}

const ColorComponent = ({ onPick, onClose, items, recents }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    return (
        <Fragment>
            <button className="ritext:flex ritext:gap-x-2 ritext:items-center" onClick={() => (onPick("#000000"), onClose?.())}>
                <Palette className="ritext:text-sm" />
                <span>Default</span>
            </button>

            <div className="ritext:grid ritext:grid-cols-10 ritext:gap-1 ritext:mt-2">
                {items.map((item) => (
                    <button key={item} className="ritext:w-5.5 ritext:h-5.5 ritext:p-px ritext:border ritext:border-solid ritext:border-gray-200 ritext:cursor-pointer ritext:rounded-sm" onClick={() => (onPick(item), onClose?.())}>
                        <div style={{ background: item }} className="ritext:w-full ritext:h-full ritext:rounded-sm" />
                    </button>
                ))}
            </div>
            <h6 className="ritext:mt-2">Recent Color</h6>
            {recents.length > 0 && (
                <div className="ritext:grid ritext:grid-cols-10 ritext:gap-1 ritext:mt-2">
                    {recents.map((c) => (
                        <button key={c} className="ritext:w-5.5 ritext:h-5.5 ritext:p-px ritext:border ritext:border-solid ritext:border-gray-200 ritext:cursor-pointer ritext:rounded-sm" onClick={() => (onPick(c), onClose?.())}>
                            <div style={{ background: c }} className="ritext:w-full ritext:h-full ritext:rounded-sm" />
                        </button>
                    ))}
                </div>
            )}
            <button onClick={() => setOpen(!open)} className="ritext:mt-2">
                More Color
            </button>
            {open &&
                <div>
                    <ColorPicker
                        value={value}
                        onChange={setValue}
                    />
                    <button className="ritext:mt-2 ritext:w-full ritext:bg-gray-800 ritext:text-white ritext:py-1.5 ritext:rounded-lg" onClick={() => (onPick(value), onClose?.())}>
                        Set Color
                    </button>
                </div>
            }
        </Fragment>
    );
};

export default ColorComponent;
