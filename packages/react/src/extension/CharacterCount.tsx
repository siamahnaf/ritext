import type { Extension } from "@tiptap/react";
import { CharacterCount as TiptapCharacterCount, type CharacterCountOptions, type CharacterCountStorage } from "@tiptap/extensions";

export const CharacterCount: Extension<CharacterCountOptions, CharacterCountStorage> = TiptapCharacterCount.extend();

export { useCharacterCount } from "../lib/hooks/useCharacterCount";
export { default as CharacterCountUI } from "../lib/components/CharacterCountComponent";
export type { CharacterCountState } from "../lib/types/character-count.types";
export type { CharacterCountOptions };
