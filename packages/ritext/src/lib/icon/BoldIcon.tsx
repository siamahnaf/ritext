import * as React from "react";

type BoldIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number | string;
};

const BoldIcon: React.FC<BoldIconProps> = ({
    size = 17,
    className,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
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
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
    </svg>
);

export default BoldIcon;
