import type { ComponentPropsWithRef, ReactNode } from "react";

//Interface
interface Props extends ComponentPropsWithRef<"input"> {
    id: string;
    label?: string;
    containerClassName?: string;
    icon?: ReactNode;
}

const InputComponent = ({ id, label, containerClassName = "", icon, ...rest }: Props) => {
    return (
        <div className={containerClassName}>
            {label &&
                <label htmlFor={id} className="ritext:block ritext:mb-1 ritext:text-gray-700 ritext:text-base ritext:font-medium">
                    {label}
                </label>
            }
            <div>
                <input
                    {...rest}
                    className="ritext:border ritext:border-solid ritext:border-gray-200 ritext:px-2 ritext:py-1.5 ritext:w-full ritext:rounded-md ritext:focus:outline-none"
                />
                {icon && <span>
                    {icon}
                </span>}
            </div>
        </div>
    );
};

export default InputComponent;