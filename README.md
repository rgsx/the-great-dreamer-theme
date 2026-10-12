# The Great Dreamer

<p align="center"><img src="https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/images/dreamer-logo.png" width="100" height="100"></p>

A Visual Studio Code and Cursor theme for the **Great Dreamers** out there. Built for long sessions, especially at night, with colors inspired by Lovecraft's Mythos.

This is a maintained fork of [The Great Dreamer](https://github.com/arthur404dev/the-great-dreamer-theme) by Arthur Andrade ([arthurdiegoo](https://marketplace.visualstudio.com/items?itemName=arthurdiegoo.great-dreamer)). All credit for the original design goes to him. The fork updates the original two themes for current VS Code and **Cursor**, and adds five new Lovecraftian variants. It covers the newer UI (chat and inline edits, command center, sticky scroll, bracket pairs, inlay hints, diffs and merge editor), adds semantic highlighting, and improves contrast.

Feel free to contribute and help to improve the language coverage of the Theme!

## The Great Dreamer

![The Great Dreamer in Cursor, split editors with JSX, CSS, TSX and Python, a GitLens hover, split terminals and agent chat](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/dreamer-1.png)
![The Great Dreamer in Cursor, three Rust files side by side (traits, generics, lifetimes, macros) and a terminal](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/dreamer-2.png)

## The Great Sleeper

Same palette with darker visuals.

![The Great Sleeper in Cursor, split editors with JSX, CSS, TSX and Python, a GitLens hover, split terminals and agent chat](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/sleeper-1.png)
![The Great Sleeper in Cursor, three Rust files side by side (traits, generics, lifetimes, macros) and a terminal](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/sleeper-2.png)

## The Lovecraftian variants

Five darker variants, each built around a different corner of the Mythos.

![The five Lovecraftian variants side by side in one Cursor window, from left to right The Great Abyss, Blight, Deep, Gilded and Grimoire: JSX, CSS, Python and TSX editors, a git log and Homebrew output in the terminals, and agent chat](https://raw.githubusercontent.com/rgsx/the-great-dreamer-theme/master/assets/screenshots/lovecraft-collage.png)

- **The Great Deep**: Greenish-black stone with golden flecks, sea-glass greens and greyish-blue types, after R'lyeh, Cthulhu's idol and the Deep Ones of Innsmouth.
- **The Great Blight**: A magenta-black night on the Gardner farm, after *The Colour Out of Space* and its 2019 film: fuchsia keywords in a colour that should not be there, electric violet, crystal cyan, infrared coral and a toxic green glow.
- **The Great Grimoire**: Ink-brown pages, parchment text, rubricated reds and tarnished gold, after the Necronomicon and other forbidden books.
- **The Great Gilded**: Violet-black boards with embossed slime-green tentacles, gold title foil, violet smoke and a magenta frame, inspired by the foil colors of a Lovecraft book cover.
- **The Great Abyss**: The same book under cool light: deep indigo boards, magenta and violet holographic foil, teal-green tentacles and gold accents.

# Installation

Search for `great-dreamer` in the Extensions view of VS Code or Cursor, install it, then pick **The Great Dreamer**, **The Great Sleeper**, **The Great Deep**, **The Great Blight**, **The Great Grimoire**, **The Great Gilded** or **The Great Abyss** under Preferences: Color Theme.

## Build and install locally

All seven themes are generated from one source, so edit `src/` rather than `themes/*.json`:

- `src/palettes.js`: the palette of each theme (a theme can override the shared syntax colors with its own `syntax`)
- `src/ui-colors.js`: workbench colors
- `src/token-colors.js` and `src/semantic-token-colors.js`: syntax colors

```sh
npm run build      # regenerates themes/*.json (Node only, no dependencies)
npm run package    # builds great-dreamer-<version>.vsix
```

To try changes, open the folder in VS Code or Cursor and press F5. To install the packaged theme, run **Extensions: Install from VSIX...** from the Command Palette and pick the `.vsix` file, or use `cursor --install-extension great-dreamer-1.2.0.vsix` (`code --install-extension ...` for VS Code).

# Changelog

### 1.2.0

- Five Lovecraftian variants: **The Great Deep**, **The Great Blight**, **The Great Grimoire**, **The Great Gilded** and **The Great Abyss**.
- Each theme can now have its own syntax colors and editor details (selection, line highlight, indent guides, find matches, whitespace), so the variants are more than a recolored background.
- Rust highlighting, clearer terminal colors (visible cursor character, button-like labels) and colored JSX/TSX components in all seven themes.

### 1.1.0

- Support for current VS Code and **Cursor**: about 260 new UI colors per theme, covering chat and inline edits, the command center, sticky scroll, bracket pairs, inlay hints, diffs and the merge editor.
- Vue template support (tags, directives, shorthands and `{{ }}`).
- Semantic highlighting, readable diffs and better contrast for secondary text and comments.
- Fixed token rules that never matched and the swapped theme names.
- Both themes are generated from a single source, and the package is much smaller.

See [CHANGELOG.md](CHANGELOG.md) for the full history.

# License

[MIT](LICENSE). Based on [The Great Dreamer](https://github.com/arthur404dev/the-great-dreamer-theme) by Arthur Andrade, which is no longer maintained.

:octopus:
