"use client"
import { ReactNode } from "react";
import { m, AnimatePresence, domAnimation, LazyMotion } from "motion/react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons";
import { twMerge } from "tailwind-merge";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    backdropClassName?: string;
    className?: string;
}

const Dialog = ({ open, onClose, children, backdropClassName, className }: Props) => {
    const animation = {
        unmount: {
            opacity: 0,
            y: -8,
            transition: {
                duration: 0.15,
            },
        },
        mount: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.15,
            },
        },
    };
    const backdropAnimation = {
        unmount: {
            opacity: 0,
            transition: {
                delay: 0.1,
            },
        },
        mount: {
            opacity: 1,
        },
    };

    if (typeof window === "undefined") return null;

    return createPortal(
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {open &&
                    <>
                        <m.div
                            className={`bg-black/55 fixed top-0 left-0 w-full h-full flex justify-center items-center z-9999999 ${backdropClassName}`}
                            initial="unmount"
                            exit="unmount"
                            animate={open ? "mount" : "unmount"}
                            variants={backdropAnimation}
                            transition={{ duration: 0.2 }}
                            onClick={onClose}
                        />
                        <m.div
                            className={twMerge("fixed inset-0 h-max m-auto z-9999999 overflow-auto bg-white rounded-2xl", className)}
                            initial="unmount"
                            exit="unmount"
                            animate={open ? "mount" : "unmount"}
                            variants={animation}
                        >
                            {children}
                        </m.div>
                    </>
                }
            </AnimatePresence>
        </LazyMotion>,
        document.body
    );
};


//Interface
interface HeaderProps {
    title?: string;
    onClose?: () => void;
    className?: string;
    titleClassName?: string;
    buttonClassName?: string;
}

const Header = ({ title, className, titleClassName, buttonClassName, onClose }: HeaderProps) => {
    return (
        <div className={twMerge("flex items-center gap-4 text-strong", className)}>
            <h4 className={twMerge("text-xl flex-1 font-semibold", titleClassName)}>
                {title}
            </h4>
            {onClose &&
                <button className={twMerge("hover:bg-light p-1 rounded-md transition-all", buttonClassName)} onClick={onClose}>
                    <CloseIcon size={20} />
                </button>
            }
        </div>
    );
};

//Interface
interface BodyProps {
    className?: string;
    children?: ReactNode;
    id?: string;
}

const Body = ({ className, children, id }: BodyProps) => {
    return (
        <div className={twMerge("max-h-[80vh] overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full", className)} id={id}>
            {children}
        </div>
    )
}

Dialog.Header = Header;
Dialog.Body = Body;

export default Dialog;