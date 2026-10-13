"use client"
import type { CSSProperties, ReactNode } from "react";
import { twMerge } from "../utils/tw";
import { useCharacterCount } from "../hooks/useCharacterCount";
import type { CharacterCountState } from "../types/character-count.types";

//Interface
interface Props {
    className?: string;
    style?: CSSProperties;
    color?: string;
    warningColor?: string;
    trackColor?: string;
    size?: number;
    showChart?: boolean;
    showWords?: boolean;
    content?: (state: CharacterCountState) => ReactNode;
}

const CIRCUMFERENCE = 2 * Math.PI * 8;

const CharacterCountComponent = ({ className, style, color = "#6a00f5", warningColor = "#ef4444", trackColor = "#e9ecef", size = 20, showChart = true, showWords = true, content }: Props) => {
    const state = useCharacterCount();
    const { charactersCount, wordsCount, percentage, limit } = state;
    const isWarning = !!limit && charactersCount >= limit;

    return (
        <div
            className={twMerge("ritext:flex ritext:items-center ritext:gap-2 ritext:text-xs ritext:text-gray-500", className)}
            style={{ ...(isWarning ? { color: warningColor } : {}), ...style }}
        >
            {showChart && limit &&
                <svg width={size} height={size} viewBox="0 0 20 20" className="ritext:shrink-0">
                    <circle r="8" cx="10" cy="10" fill="none" stroke={trackColor} strokeWidth="4" />
                    <circle
                        r="8"
                        cx="10"
                        cy="10"
                        fill="none"
                        stroke={isWarning ? warningColor : color}
                        strokeWidth="4"
                        strokeDasharray={`${(percentage * CIRCUMFERENCE) / 100} ${CIRCUMFERENCE}`}
                        transform="rotate(-90 10 10)"
                    />
                </svg>
            }
            {content ? content(state) : (
                <p>
                    {limit ? `${charactersCount} / ${limit} characters` : `${charactersCount} characters`}
                    {showWords &&
                        <>
                            <br />
                            {wordsCount} words
                        </>
                    }
                </p>
            )}
        </div>
    );
};

export default CharacterCountComponent;
