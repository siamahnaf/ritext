import { ComponentPropsWithRef, ReactNode } from "react";

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
                <label htmlFor={id} className="block mb-1 text-gray-700 text-base font-medium">
                    {label}
                </label>
            }
            <div>
                <input
                    {...rest}
                    className="border border-solid border-gray-200 px-2 py-1.5 w-full rounded-md focus:outline-none"
                />
                {icon && <span>
                    {icon}
                </span>}
            </div>
        </div>
    );
};

export default InputComponent;