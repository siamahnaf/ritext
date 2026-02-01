"use client"
import { useState, Fragment } from "react";
import { ColorPicker } from "@siamf/react-color-pick";
import "@siamf/react-color-pick/dist/index.css";
import { Palette } from "../icon/IconColor";

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
            <button className="flex gap-x-2 items-center" onClick={() => (onPick("#000000"), onClose?.())}>
                <Palette className="text-sm" />
                <span>Default</span>
            </button>

            <div className="grid grid-cols-10 gap-1 mt-2">
                {items.map((item) => (
                    <button key={item} className="w-5.5 h-5.5 p-px border border-solid border-gray-200 cursor-pointer rounded-sm" onClick={() => (onPick(item), onClose?.())}>
                        <div style={{ background: item }} className="w-full h-full rounded-sm" />
                    </button>
                ))}
            </div>
            <h6 className="mt-2">Recent Color</h6>
            {recents.length > 0 && (
                <div className="grid grid-cols-10 gap-1 mt-2">
                    {recents.map((c) => (
                        <button key={c} className="w-5.5 h-5.5 p-px border border-solid border-gray-200 cursor-pointer rounded-sm" onClick={() => (onPick(c), onClose?.())}>
                            <div style={{ background: c }} className="w-full h-full rounded-sm" />
                        </button>
                    ))}
                </div>
            )}
            <button onClick={() => setOpen(!open)} className="mt-2">
                More Color
            </button>
            {open &&
                <div>
                    <ColorPicker
                        value={value}
                        onChange={setValue}
                    />
                    <button className="mt-2 w-full bg-gray-800 text-white py-1.5 rounded-lg" onClick={() => (onPick(value), onClose?.())}>
                        Set Color
                    </button>
                </div>
            }
        </Fragment>
    );
};

export default ColorComponent;