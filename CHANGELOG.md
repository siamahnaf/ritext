# Changelog

All notable changes to **ritext** are documented here.

---

## [Unreleased]

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
