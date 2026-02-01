import { type ReactNode, type CSSProperties, useState, Fragment, useId, Children, isValidElement, cloneElement, type ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "./_com/Tooltip";
import type { Placement } from "@floating-ui/react";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss, FloatingPortal } from "@floating-ui/react";
import { ArrowIcon } from "../icons";
import { AnimatePresence, motion } from "motion/react";

//Types
type SelectableChild = ReactElement<{
    onSelect?: () => void;
    open?: boolean;
    onClose?: () => void;
}>;

//Interface
interface Props {
    children?: ReactNode;
    className?: string;
    showArrow?: boolean;
    content?: ReactNode;
    dropdownClassName?: string;
    style?: CSSProperties;
    tooltip?: boolean | string;
    tooltipClassName?: string;
    tooltipPlacement?: Placement;
    _tooltipContent: string;
    _internalContent: ReactNode;
    _dropdownClassName: string;
}

const DropdownComponent = ({ children, className, showArrow = true, content, dropdownClassName, style, tooltip, tooltipClassName, tooltipPlacement, _tooltipContent, _internalContent, _dropdownClassName }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Floating UI
    const { x, y, refs, strategy, context, } = useFloating({
        open: open,
        onOpenChange: setOpen,
        placement: "bottom",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    })
    const click = useClick(context);
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    //Handler
    const listId = useId();

    const tooltipContent = (<p>
        {typeof tooltip === "string" ? tooltip : _tooltipContent}
    </p>);
    const initialMotion = { opacity: 0, scale: 0.95 };
    const animateMotion = { opacity: 1, scale: 1 };

    //Enhanced Child
    const enhancedChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        const prevOnSelect = (child as SelectableChild).props.onSelect;
        const combinedOnSelect = () => { prevOnSelect?.(); setOpen(false); };

        return cloneElement(child as SelectableChild, {
            onSelect: prevOnSelect ? combinedOnSelect : undefined,
            open: open,
            onClose: () => setOpen(false),
        });
    });

    const btn = (
        <button
            {...getReferenceProps({
                ref: refs.setReference,
                type: "button",
                "aria-controls": open ? listId : undefined,
            })}
            className={twMerge(
                "p-1.5 rounded-md hover:bg-gray-100 items-center flex gap-x-0.5",
                className
            )}
            style={style}
        >
            <span>{content ?? _internalContent}</span>
            {showArrow &&
                <ArrowIcon size={14} className="text-gray-500 block" />
            }
        </button>
    );

    return (
        <Fragment>
            {tooltip === false ? btn : (<Tooltip
                content={tooltipContent}
                className={tooltipClassName}
                placement={tooltipPlacement}
            >
                {btn}
            </Tooltip>)}
            <FloatingPortal>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                },
                                role: "listbox",
                                id: listId,
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            className={twMerge("bg-white border border-solid border-gray-200 p-2 space-y-1 rounded-lg shadow-sm shadow-gray-200/40 z-99999999 max-h-125 overflow-auto", _dropdownClassName, dropdownClassName)}
                        >
                            {enhancedChildren}
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </Fragment>
    );
};

export default DropdownComponent;