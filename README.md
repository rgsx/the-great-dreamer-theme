# The Great Dreamer :octopus:

<p align="center"><img src="https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/images/dreamer-logo.png" width="100" height="100"></p>

A Visual Studio Code theme for the **Great Dreamers** all over the place, best suited for intensive use-cases specially during night. The color palette and overall theme is heavily inspired by Lovecraft Myths and overall feel.

This is a maintained fork of [The Great Dreamer](https://github.com/arthur404dev/the-great-dreamer-theme) by Arthur Andrade ([arthurdiegoo](https://marketplace.visualstudio.com/items?itemName=arthurdiegoo.great-dreamer)). All credit for the original design goes to him. The fork updates both themes for current VS Code and **Cursor**: it covers the newer UI (chat and inline edits, command center, sticky scroll, bracket pairs, inlay hints, diffs and merge editor), adds semantic highlighting, and improves contrast.

Feel free to contribute and help to improve the language coverage of the Theme!

## The Great Dreamer

![The Great Dreamer in Cursor, editor with GitLens blame, terminal and agent chat](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/dreamer-1.png)
![The Great Dreamer in Cursor, split editors with SCSS, Markdown and TypeScript](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/dreamer-2.png)
![The Great Dreamer in Cursor, inline TypeScript errors while the agent works](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/dreamer-3.png)

## The Great Sleeper

Same palette with darker visuals.

![The Great Sleeper in Cursor, editor with GitLens blame, terminal and agent chat](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/sleeper-1.png)
![The Great Sleeper in Cursor, split editors with SCSS, Markdown and TypeScript](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/sleeper-2.png)
![The Great Sleeper in Cursor, inline TypeScript errors while the agent works](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/sleeper-3.png)

# Installation

Search for `great-dreamer` in the Extensions view of VS Code or Cursor, install it, then pick **The Great Dreamer** or **The Great Sleeper** under Preferences: Color Theme.

## Build and install locally

Both themes are generated from one source, so edit `src/` rather than `themes/*.json`:

- `src/palettes.js`: the palette of each theme
- `src/ui-colors.js`: workbench colors
- `src/token-colors.js` and `src/semantic-token-colors.js`: syntax colors

```sh
npm run build      # regenerates themes/*.json (Node only, no dependencies)
npm run package    # builds great-dreamer-<version>.vsix
```

To try changes, open the folder in VS Code or Cursor and press F5. To install the packaged theme, run **Extensions: Install from VSIX...** from the Command Palette and pick the `.vsix` file, or use `cursor --install-extension great-dreamer-1.1.0.vsix` (`code --install-extension ...` for VS Code).

# Changelog

### 1.1.0

- Support for current VS Code and **Cursor**: about 260 new UI colors per theme, covering chat and inline edits, the command center, sticky scroll, bracket pairs, inlay hints, diffs and the merge editor.
- Vue template support (tags, directives, shorthands and `{{ }}`).
- Semantic highlighting, readable diffs and better contrast for secondary text and comments.
- Fixed token rules that never matched and the swapped theme names.
- Both themes are generated from a single source, and the package is much smaller.

See [CHANGELOG.md](CHANGELOG.md) for the full history.

# License

[MIT](LICENSE). Based on [The Great Dreamer](https://github.com/arthur404dev/the-great-dreamer-theme) by Arthur Andrade, which is no longer maintained.
