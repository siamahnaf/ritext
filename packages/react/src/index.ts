import "./global.css";
import "@siamf/react-color-pick/dist/index.css";

export { default as Editor } from "./lib/Editor";
export { default as Toolbar } from "./lib/Toolbar";
export { default as Content } from "./lib/Content";
export { default as Renderer } from "./lib/Renderer";
export { default as BubbleMenu } from "./lib/BubbleMenu";
export { default as SlashCommand } from "./lib/SlashCommand";
export { SlashItems } from "./lib/SlashItems";

export type { EditorRef } from "./lib/types/editor.types";
export type { SlashCommandItem, SlashCommandGroup } from "./lib/types/tiptap-ext.type";