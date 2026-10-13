"use client"
import { useEditorState } from "@tiptap/react";
import { useEditor } from "../context/editor.context";
import type { CharacterCountState } from "../types/character-count.types";

//Initial
const initialState: CharacterCountState = { charactersCount: 0, wordsCount: 0, percentage: 0, limit: null };

export const useCharacterCount = (): CharacterCountState => {
    const { editor: contextEditor } = useEditor();

    const state = useEditorState({
        editor: contextEditor,
        //Snapshot editor can be null or a destroyed instance
        selector: ({ editor: current }) => {
            const editor = contextEditor ?? current;
            if (!editor?.extensionManager) return initialState;

            const ext = editor.extensionManager.extensions.find((e) => e.name === "characterCount");
            if (!ext) return initialState;

            const limit: number | null = ext.options.limit || null;
            const charactersCount = editor.storage.characterCount.characters();
            const wordsCount = editor.storage.characterCount.words();
            const percentage = limit ? Math.min(100, Math.round((charactersCount / limit) * 100)) : 0;

            return { charactersCount, wordsCount, percentage, limit };
        },
    });

    return state ?? initialState;
};
