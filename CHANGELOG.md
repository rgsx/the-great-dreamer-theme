# Change Log

All notable changes to the "great-dreamer" extension will be documented in this file.

## 1.2.0

- Five new Lovecraftian variants: The Great Deep (R'lyeh and Innsmouth: greenish-black, sea-glass greens, whitish gold), The Great Blight (The Colour Out of Space and its 2019 film: magenta-black night, fuchsia, electric violet, crystal cyan, infrared coral and toxic green), The Great Grimoire (the Necronomicon: ink brown, parchment, rubricated red and tarnished gold), The Great Gilded (the foil colors of a Lovecraft book cover: violet-black boards, embossed slime-green tentacles, gold title foil, violet smoke and a magenta frame) and The Great Abyss (the same book under cool light: deep indigo, magenta and violet foil, teal-green tentacles and gold accents).
- Per-theme generator: a palette can override the shared syntax colors with its own `syntax`, and the selection, inactive selection, line highlight, find match, indent guide, whitespace, suggest widget border, cursor, inactive tab and ignored/untracked git colors are now palette slots instead of fixed values.
- Terminal fixes in all seven themes: the character under the block cursor is visible again, the button-like bright blue makes labels such as "History restored" match each theme's buttons, and The Great Dreamer and The Great Sleeper get cool, slightly dimmed whites instead of warm off-whites.
- Custom JSX and TSX components (`<Ritual />`) now get the component color in JavaScript and TypeScript React files.
- Rust support in every theme: macros, attributes, lifetimes, modules, `self`/`super`, the `?` operator, format placeholders and doc comments get their own colors.
- Sharper 256 px icon built from a new 2048 px master logo, new screenshots, and a smaller, reorganized set of demo files (config, web, app and backend, now with Rust and Svelte).
- Syntax colors, comments, secondary text, terminal colors and the debugging status bar of the new themes meet WCAG contrast targets (4.5:1 for text, 3:1 for comments and line numbers).

## 1.1.0

- Licensed under MIT. The original project is no longer maintained; this fork links to it and credits its author.
- Fork maintained at rgsx/the-great-dreamer-theme, with support for current VS Code and Cursor.
- About 260 new UI colors per theme from each theme's own palette: Cursor chat and inline edits, command center, sticky scroll, bracket pair colors, inlay hints, ghost text, minimap, scrollbars, diff and merge editor, notifications.
- Semantic highlighting turned on, with semantic token colors for deprecated symbols, readonly variables, enum members and TS/JS namespaces.
- Vue support: template tags, blocks, directives, shorthands (`:`, `@`, `#`), attributes and `{{ }}` interpolation are colored like HTML/JSX. Works with Vue - Official and znck's Vue extension.
- Readable diffs: inserted and removed text use the theme green and red.
- Better contrast for descriptions, placeholders, line numbers, ghost text, inlay hints, the status bar, inactive activity bar icons and comments.
- Fixed token rules that never matched (`meta.method-call` / `meta.method`, `invalid.illegal`, font styles with a leading space) and made deprecated code readable (grey with strikethrough).
- Fixed the swapped theme names inside the theme files. Theme files renamed to `great-dreamer-color-theme.json` and `great-sleeper-color-theme.json`.
- Both themes are now generated from a single source (`npm run build`). Smaller package: demo files and screenshots are no longer included.

## 1.0.2

- Hotfix for consistency between both themes

## 1.0.1

- Add compatibility to wsl based clients of jsx syntax.

## 1.0.0

- Add the new theme variant The Great Sleeper, with darker colors but still based on the same color scheme. Token colors and code identifiers remain with the same palette

## 0.0.4

- Expand Ruby coverage with semantic coloring

## 0.0.3

- Add Changelog and Fix Marketplace Design

## 0.0.2

- Publish Fixes

## 0.0.1

- Initial release
