"use client"
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

//Interface
interface Props {
    id: string;
    checked: boolean;
    onChange: (e: boolean) => void;
    label?: string;
    className?: string;
    labelPlacement?: "left" | "right";
    bottomSpace?: boolean;
    customLabel?: ReactNode;
    errorMessage?: boolean;
    containerClassName?: string;
}

const CheckboxComponent = ({ id, checked, onChange, className, label, labelPlacement = "right", bottomSpace = true, customLabel, errorMessage = false, containerClassName = "" }: Props) => {
    return (
        <div className={twMerge(`flex items-start ${labelPlacement === "left" ? "gap-7" : "gap-2"} ${bottomSpace && "mb-6"}`, containerClassName)}>
            {label && labelPlacement === "left" &&
                <label htmlFor={id} className={`select-none cursor-pointer block text-[15px] ${errorMessage ? "text-error" : "text-gray-700"}`}>
                    {label}
                </label>
            }
            {(customLabel && labelPlacement === "left") && customLabel}
            <div className="relative mt-0.5">
                <input
                    type="checkbox"
                    id={id}
                    className={`peer appearance-none border border-gray-300 w-4 h-4 rounded align-middle block bg-white checked:border-gray-700 checked:bg-gray-700 cursor-pointer ${className}`}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
            </div>
            {(customLabel && labelPlacement === "right") && customLabel}
            {label && labelPlacement === "right" &&
                <label htmlFor={id} className={`select-none cursor-pointer block text-[15px] ${errorMessage ? "text-error" : "text-gray-700"}`}>
                    {label}
                </label>
            }
        </div>
    );
};

export default CheckboxComponent;