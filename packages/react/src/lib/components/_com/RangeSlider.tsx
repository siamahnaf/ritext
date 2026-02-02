"use client"
import { useRef, useLayoutEffect, useState, type KeyboardEvent } from "react";
import { twMerge } from "../../utils/tw";

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
        <div className={twMerge("ritext:relative ritext:flex ritext:items-center", className)}>
            <div ref={trackRef} className="ritext:relative ritext:w-full ritext:rounded-full" style={{ height: `${height}px`, background: trackColor }}>
                {/* Controller */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="ritext:absolute ritext:inset-0 ritext:w-full ritext:h-full ritext:opacity-0 ritext:cursor-pointer ritext:z-10 ritext:peer"
                />

                {/* Track Bar */}

                <div className="ritext:absolute ritext:h-full ritext:rounded-full ritext:bg-gray-700" style={{ width: `${percentage}%` }} />

                {/* Thumb */}
                <div className="ritext:w-4.5 ritext:h-4.5 ritext:absolute ritext:top-1/2 ritext:-translate-1/2 ritext:group" style={{ left: getThumbPosition() }}>
                    <div className="ritext:absolute ritext:w-full ritext:h-full ritext:bg-white ritext:rounded-full ritext:border ritext:border-solid ritext:border-gray-300 ritext:shadow-3xl ritext:z-99" />
                    <div className="ritext:absolute ritext:bg-gray-200 ritext:-top-2.5 ritext:-left-2.5 ritext:-right-2.5 ritext:-bottom-2.5 ritext:rounded-full ritext:opacity-0 ritext:group-peer-active:opacity-100 ritext:z-9" />
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
                    className="ritext:ml-4 ritext:w-12 ritext:text-center ritext:border ritext:border-gray-200 ritext:rounded ritext:px-1 ritext:py-1.5 ritext:text-sm ritext:focus:outline-none ritext:focus:border-gray-400"
                    aria-label="Range value"
                />
            )}
        </div>
    );
};

export default RangeSlider;
