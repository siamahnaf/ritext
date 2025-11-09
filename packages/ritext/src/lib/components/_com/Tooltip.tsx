import { useState, Fragment, type ReactNode, cloneElement, isValidElement, type Ref, type RefObject, useId } from "react";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useHover, useDismiss, type Placement, FloatingPortal } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

//Interface
interface Props {
    placement?: Placement;
    children?: ReactNode;
    content: string | ReactNode;
    className?: string;
}

const Tooltip = ({ placement = "top", children, content, className }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Floating UI
    const { x, y, refs, strategy, context, placement: resolvedPlacement } = useFloating({
        open,
        onOpenChange: setOpen,
        placement,
        middleware: [offset(8), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });
    const hover = useHover(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss]);

    //Accessibility
    const id = useId();

    //Helpers
    function mergeRefs<T>(...refsToMerge: Array<Ref<T> | undefined>) {
        return (node: T) => {
            for (const r of refsToMerge) {
                if (!r) continue;
                if (typeof r === "function") r(node);
                else (r as RefObject<T | null>).current = node;
            }
        };
    }

    //Animations
    const side = resolvedPlacement.split("-")[0] as "top" | "bottom" | "left" | "right";
    const enterOffset = 6;
    const getInitial = () => {
        switch (side) {
            case "top":
                return { opacity: 0, y: enterOffset };
            case "bottom":
                return { opacity: 0, y: -enterOffset };
            case "left":
                return { opacity: 0, x: enterOffset };
            case "right":
                return { opacity: 0, x: -enterOffset };
            default:
                return { opacity: 0 };
        }
    };
    const getExit = () => ({ ...getInitial(), opacity: 0 });

    return (
        <Fragment>
            {isValidElement(children)
                ? cloneElement(children, {
                    ...(getReferenceProps({
                        onFocus: () => setOpen(true),
                        onBlur: () => setOpen(false),
                        "aria-describedby": open ? id : undefined,
                        /* eslint-disable @typescript-eslint/no-explicit-any */
                    }) as any),
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    ref: mergeRefs((children as any).props.ref, refs.setReference),
                })
                : children}
            <FloatingPortal>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="tooltip"
                            ref={refs.setFloating}
                            {...getFloatingProps({
                                role: "tooltip",
                                id,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                    pointerEvents: "none",
                                },
                            })}
                            initial={getInitial()}
                            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            exit={getExit()}
                            transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.6 }}
                            className={twMerge("bg-white border border-solid border-gray-200/50 py-1 px-3 rounded-lg text-sm shadow-lg shadow-gray-50 text-center", className)}
                        >
                            {content}
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </Fragment>
    );
};

export default Tooltip;