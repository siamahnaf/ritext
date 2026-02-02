"use client"
import { ReactNode } from "react";
import { m, AnimatePresence, domAnimation, LazyMotion } from "motion/react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons";
import { twMerge } from "../../utils/tw";

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
                            className={`ritext:bg-black/55 ritext:fixed ritext:top-0 ritext:left-0 ritext:w-full ritext:h-full ritext:flex ritext:justify-center ritext:items-center ritext:z-9999999 ${backdropClassName}`}
                            initial="unmount"
                            exit="unmount"
                            animate={open ? "mount" : "unmount"}
                            variants={backdropAnimation}
                            transition={{ duration: 0.2 }}
                            onClick={onClose}
                        />
                        <m.div
                            className={twMerge("ritext:fixed ritext:inset-0 ritext:h-max ritext:m-auto ritext:z-9999999 ritext:overflow-auto ritext:bg-white ritext:rounded-2xl", className)}
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
        <div className={twMerge("ritext:flex ritext:items-center ritext:gap-4 ritext:text-strong", className)}>
            <h4 className={twMerge("ritext:text-xl ritext:flex-1 ritext:font-semibold", titleClassName)}>
                {title}
            </h4>
            {onClose &&
                <button className={twMerge("ritext:hover:bg-light ritext:p-1 ritext:rounded-md ritext:transition-all", buttonClassName)} onClick={onClose}>
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
        <div className={twMerge("ritext:max-h-[80vh] ritext:overflow-auto ritext:[&::-webkit-scrollbar]:w-1.5 ritext:[&::-webkit-scrollbar-track]:bg-transparent ritext:[&::-webkit-scrollbar-thumb]:bg-gray-200 ritext:[&::-webkit-scrollbar-thumb]:rounded-full", className)} id={id}>
            {children}
        </div>
    )
}

Dialog.Header = Header;
Dialog.Body = Body;

export default Dialog;
