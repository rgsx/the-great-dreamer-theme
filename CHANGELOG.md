# Change Log

All notable changes to the "great-dreamer" extension will be documented in this file.

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
