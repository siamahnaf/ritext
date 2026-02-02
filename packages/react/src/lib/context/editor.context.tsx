import { createContext, useContext, type ReactNode } from "react";

//Types
import type { EditorContextType } from "../types/editor.types";
type EditorProviderProps = {
    children: ReactNode;
    value: EditorContextType;
}

export const EditorContext = createContext<EditorContextType>({ editor: null });

export const useEditor = () => {
    const ctx = useContext(EditorContext);
    if (!ctx) throw new Error("<Toolbar/> & <Content/> component must be used inside <Editor>...</Editor/>");
    return ctx;
}

export const EditorProvider = ({ children, value }: EditorProviderProps) => {
    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    )
}