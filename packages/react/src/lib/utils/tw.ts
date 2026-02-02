import { extendTailwindMerge } from "tailwind-merge";

const merge = extendTailwindMerge({
    experimentalParseClassName: ({ className, parseClassName }) => {
        const normalized = className.split(":").filter((p) => p !== "ritext").join(":");
        return parseClassName(normalized);
    },
});

export const twMerge = (...classes: Array<string | undefined | null | false>) => merge(...classes.filter(Boolean));