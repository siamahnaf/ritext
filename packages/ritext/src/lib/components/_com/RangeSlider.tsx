"use client"
import { useRef, useLayoutEffect, useState, KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";

//Interface
interface Props {
    min?: number;
    max?: number;
    step?: number;
    onChange: (e: number) => void;
    value: number;
    className?: string;
    showInput?: boolean;
    height?: number;
    trackColor?: string;
}

const RangeSlider = ({ min = 0, max = 100, step = 1, onChange, value, className = "", height = 4, trackColor = "#d7dbe0", showInput = true }: Props) => {
    //Ref
    const trackRef = useRef<HTMLDivElement>(null);
    const [trackWidth, setTrackWidth] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<{ isFocus: boolean, value: string }>({ isFocus: false, value: value?.toString() });

    //Handler
    const percentage = ((value - min) / (max - min)) * 100
    const getThumbPosition = () => {
        if (!trackWidth) return `${percentage}%`

        const thumbWidth = 18

        const pixelPosition = (percentage / 100) * (trackWidth - thumbWidth) + thumbWidth / 2

        return `${(pixelPosition / trackWidth) * 100}%`
    }

    const validateAndUpdateValue = () => {
        let newValue = Number(inputValue.value)
        if (isNaN(newValue)) {
            setInputValue({ isFocus: false, value: value.toString() })
            return
        }
        if (newValue < min) newValue = min
        if (newValue > max) newValue = max
        if (step !== 1) {
            const steps = Math.round((newValue - min) / step)
            newValue = min + steps * step
        }
        onChange(newValue)
        setInputValue({ isFocus: false, value: newValue.toString() })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            validateAndUpdateValue()
        }
    }

    const handleBlur = () => {
        validateAndUpdateValue()
    }

    const handleFocus = () => {
        setInputValue({ isFocus: true, value: value.toString() })
    }

    useLayoutEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.clientWidth);
        }
    }, []);

    return (
        <div className={twMerge("relative flex items-center", className)}>
            <div ref={trackRef} className="relative w-full rounded-full" style={{ height: `${height}px`, background: trackColor }}>
                {/* Controller */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 peer"
                />

                {/* Track Bar */}

                <div className="absolute h-full rounded-full bg-gray-700" style={{ width: `${percentage}%` }} />

                {/* Thumb */}
                <div className="w-4.5 h-4.5 absolute top-1/2 -translate-1/2 group" style={{ left: getThumbPosition() }}>
                    <div className="absolute w-full h-full bg-white rounded-full border border-solid border-gray-300 shadow-3xl z-99" />
                    <div className="absolute bg-gray-200 -top-2.5 -left-2.5 -right-2.5 -bottom-2.5 rounded-full opacity-0 group-peer-active:opacity-100 z-9" />
                </div>
            </div>
            {showInput && (
                <input
                    type="text"
                    value={inputValue.isFocus ? inputValue.value : value}
                    onChange={(e) => setInputValue(p => ({ ...p, value: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className="ml-4 w-12 text-center border border-gray-200 rounded px-1 py-1.5 text-sm focus:outline-none focus:border-gray-400"
                    aria-label="Range value"
                />
            )}
        </div>
    );
};

export default RangeSlider;