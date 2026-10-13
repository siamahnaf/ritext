# Changelog

All notable changes to **ritext** are documented here.

---

## [2.1.0]

### Added

- **`Youtube` extension** (`ritext/extension/youtube`) — toolbar dropdown to embed a YouTube video with URL, width, height, alignment, controls, autoplay, and loop. Select a video and reopen the dropdown to edit it. Every other player option (`nocookie`, `ccLanguage`, `progressBarColor`, `rel`, `playlist`, etc.) is available through `.configure()`.
  - `controls`, `autoplay`, `loop`, and `textAlign` are stored per video (Tiptap applies them editor-wide) and are read back from saved HTML.
  - Loop works on single videos (`playlist=<id>` is added automatically), and `youtu.be` links keep their player parameters.
- **`CharacterCount` extension** (`ritext/extension/charactercount`) — headless character/word counter with all Tiptap options (`limit`, `mode`, `autoTrim`, `textCounter`, `wordCounter`). Ships with:
  - **`useCharacterCount()`** — returns `{ charactersCount, wordsCount, percentage, limit }`.
  - **`CharacterCountUI`** — progress ring and counter text, usable anywhere inside `<Editor>`. Customizable via `color`, `warningColor`, `trackColor`, `size`, `showChart`, `showWords`, and a `content` render prop.
- **`Details` extension** (`ritext/extension/details`) — collapsible sections. The toolbar button wraps the current block in a details box, or removes it when the cursor is already inside one. `DetailsSummary` and `DetailsContent` are included automatically. Supports `persist`, `openClassName`, `renderToggleButton`, and `HTMLAttributes`. Saved HTML uses native `<details>`, so it works in `Renderer` without JavaScript.

### Changed

- **`TextAlign`** now also aligns a selected YouTube video.
- **Dependencies** — Tiptap packages upgraded from `^3.20.0` to `^3.31.4`; `motion` to `^14.1.0`, `react-easy-crop` to `^6.2.4`, `@floating-ui/react` to `^0.27.20`, `tailwind-merge` to `^3.7.0`, `yjs` to `^13.6.33`.

---

## [2.0.0]

### Added

- **`SlashCommand` component** — standalone slash-command menu (type `/` to trigger). Accepts a mixed `items` prop: `Array<SlashCommandItem | string>` where strings become group headers.
- **`SlashItems`** — pre-built item dictionary (`SlashItems.Paragraph`, `SlashItems.Heading1`–`Heading6`, `SlashItems.BulletList`, `SlashItems.OrderedList`, `SlashItems.TaskList`, `SlashItems.BlockQuote`, `SlashItems.Image`, `SlashItems.Table`, `SlashItems.HorizontalRule`).
- **`SlashCommandItem` type** — exported from the package. Supports an optional `panel` / `panelAsDialog` for items that open a sub-UI (e.g. `Image` opens the existing `ImageDialog`).
- **`SlashItems.Image`** — opens the `ImageDialog` (with upload/URL tabs) automatically, reading the Image extension's `upload`, `maxSize`, `enableAlt`, and `aspect` options from the editor.
- **`SlashItems.Table`** — inserts a 3 × 3 table directly.
- **Keyboard navigation** in `SlashCommand`: `↑` / `↓` to move, `Enter` to select, `Escape` to dismiss. Active item scrolls into view automatically.
- **Floating UI positioning** in `SlashCommand` — uses `@floating-ui/react` with `autoUpdate` so the menu follows the cursor on scroll/resize (no manual scroll listener needed). `useDismiss` handles click-outside.
- **`borderRadius` node attribute** on the `Image` extension — persisted to HTML via `data-border-radius` / inline style so it survives serialisation and re-hydration.

### Fixed

- **`SlashCommand` insertion position** — content is now always inserted at a clean top-level paragraph. When the triggering block was a heading, nested list item, or blockquote that only contained the slash query, the entire block is atomically replaced with a fresh paragraph before the command runs, preventing content from landing inside the wrong node type.
- **`RiDragHandler` "+" button** — the slash paragraph is now inserted after the block the drag handle is **hovering over** (tracked via `onNodeChange`), not after the block where the editor cursor happens to be.

---

## [1.2.11] — Previous Release

- ImageView floating toolbar with border-radius presets, resize handles, and alignment controls.
- `BubbleMenu` component refactored from `internal_com` to top-level `lib/`.
- Surface / order system for controlling which extensions appear in toolbar vs bubble menu and in what order.
- Full extension set: Bold, Italic, Underline, Strike, Subscript, Superscript, SubAndSuperscript, ClearFormat, Heading, FontFamily, FontSize, Color, BackgroundColor, LineHeight, BulletList, OrderedList, TaskList, TextAlign, IndentOutdent, History, HardBreak, Link, Image, Table, Emoji, BlockQuote, HorizontalRule.
