// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        "extension/bold": "src/extension/Bold.tsx",
        "extension/italic": "src/extension/Italic.tsx",
        "extension/underline": "src/extension/Underline.tsx",
        "extension/strike": "src/extension/Strike.tsx",
        "extension/subscript": "src/extension/Subscript.tsx",
        "extension/superscript": "src/extension/Superscript.tsx",
        "extension/subandsuperscript": "src/extension/SubAndSuperscript.tsx",
        "extension/clearformat": "src/extension/ClearFormat.tsx",
        "extension/heading": "src/extension/Heading.tsx",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    outDir: "dist",
});
