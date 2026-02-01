import type { IconProps } from "../types/icon.type";

export const AlignLeft = ({ size = 17, className, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 5H3" /><path d="M15 12H3" /><path d="M17 19H3" />
    </svg>
);

export const AlignCenter = ({ size = 17, className, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 5H3" /><path d="M17 12H7" /><path d="M19 19H5" />
    </svg>
);

export const AlignRight = ({ size = 17, className, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 5H3" /><path d="M21 12H9" /><path d="M21 19H7" />
    </svg>
);

export const AlignJustify = ({ size = 17, className, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M3 5h18" /><path d="M3 12h18" /><path d="M3 19h18" />
    </svg>
);