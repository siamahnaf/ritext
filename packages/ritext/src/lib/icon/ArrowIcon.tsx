import type { IconProps } from "../types/icon.type";

const ArrowIcon = ({ size = 17, className, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M36 19L24 31L12 19z" />
    </svg>
);

export default ArrowIcon;