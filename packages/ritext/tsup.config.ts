// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        "extension/bold": "src/extension/Bold.tsx",
        "extension/base": "src/extension/base.ts",
        "extension/italic": "src/extension/Italic.tsx",
        "extension/underline": "src/extension/Underline.tsx",
        "extension/strike": "src/extension/Strike.tsx",
        "extension/subscript": "src/extension/Subscript.tsx",
        "extension/superscript": "src/extension/Superscript.tsx",
        "extension/subandsuperscript": "src/extension/SubAndSuperscript.tsx",
        "extension/clearformat": "src/extension/ClearFormat.tsx",
        "extension/heading": "src/extension/Heading.tsx",
        "extension/font-family": "src/extension/FontFamily.tsx",
        "extension/font-size": "src/extension/FontSize.tsx",
        "extension/history": "src/extension/History.tsx",
        "extension/color": "src/extension/Color.tsx",
        "extension/backgroundcolor": "src/extension/BackgroundColor.tsx",
        "extension/bulletlist": "src/extension/Bulletlist.tsx",
        "extension/orderedlist": "src/extension/Orderlist.tsx",
        "extension/textalign": "src/extension/TextAlign.tsx",
        "extension/indentoutdent": "src/extension/IndentOutdent.tsx",
        "extension/lineheight": "src/extension/LineHeight.tsx",
        "extension/tasklist": "src/extension/TaskList.tsx",
        "extension/link": "src/extension/Link.tsx",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    outDir: "dist",
});
