"use client"
import { ReactNode } from "react";
import { twMerge } from "../utils/tw";

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
        <div className={twMerge(`ritext:flex ritext:items-start ${labelPlacement === "left" ? "ritext:gap-7" : "ritext:gap-2"} ${bottomSpace && "ritext:mb-6"}`, containerClassName)}>
            {label && labelPlacement === "left" &&
                <label htmlFor={id} className={`ritext:select-none ritext:cursor-pointer ritext:block ritext:text-[15px] ${errorMessage ? "ritext:text-error" : "ritext:text-gray-700"}`}>
                    {label}
                </label>
            }
            {(customLabel && labelPlacement === "left") && customLabel}
            <div className="ritext:relative ritext:mt-0.5">
                <input
                    type="checkbox"
                    id={id}
                    className={`ritext:peer ritext:appearance-none ritext:border ritext:border-gray-300 ritext:w-4 ritext:h-4 ritext:rounded ritext:align-middle ritext:block ritext:bg-white ritext:checked:border-gray-700 ritext:checked:bg-gray-700 ritext:cursor-pointer ${className}`}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="ritext:absolute ritext:top-1/2 ritext:left-1/2 ritext:-translate-x-1/2 ritext:-translate-y-1/2 ritext:text-white ritext:p-px ritext:pointer-events-none ritext:opacity-0 ritext:invisible ritext:peer-checked:opacity-100 ritext:peer-checked:visible">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ritext:h-3.5 ritext:w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
            </div>
            {(customLabel && labelPlacement === "right") && customLabel}
            {label && labelPlacement === "right" &&
                <label htmlFor={id} className={`ritext:select-none ritext:cursor-pointer ritext:block ritext:text-[15px] ${errorMessage ? "ritext:text-error" : "ritext:text-gray-700"}`}>
                    {label}
                </label>
            }
        </div>
    );
};

export default CheckboxComponent;
