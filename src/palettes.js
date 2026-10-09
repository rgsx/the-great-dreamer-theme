// Single source of truth for both themes.
// Each palette holds the shared UI roles plus the values that are unique to that theme.
'use strict';

// Syntax colors shared by both themes (TextMate token colors).
const syntax = {
  comment: '#5e6684', // was #555C77 (2.60:1 -> 3.03:1 on Dreamer editor)
  cssVariable: '#8088FF',
  keyword: '#7E7EDD',
  type: '#A571F4',
  constant: '#DDA2F6',
  pink: '#FF79C6',
  magenta: '#C74EB7',
  string: '#9AEFEA',
  tag: '#93DDFB',
  interpolation: '#4D8ACB',
  component: '#b293fb',
  variable: '#c7c7e4',
  punctuation: '#B9BED5',
  heading: '#F5FAFF',
  deprecated: '#7D839B', // was #523D14 (1.66:1); now the CSS-property grey + strikethrough
  invalid: '#FFFFFF',
  cssProperty: '#7D839B',
  info: '#6796E6',
  warn: '#CD9731',
  error: '#F44747',
  debug: '#B267E6',
};

const dreamer = {
  id: 'dreamer',
  name: 'The Great Dreamer',
  file: 'great-dreamer-color-theme.json',
  // Main roles
  bg: '#211c26',
  editorBg: '#1d1a24',
  contrastBg: '#483b57',
  border: '#3a3446',
  accent: '#705fbd',
  accentHover: '#9472c4',
  fg: '#b9bed5',
  cyan: '#9AEFEA',
  muted: '#8d809f', // was #8a7c9c (4.32:1 -> 4.54:1 on bg)
  lineNumber: '#6d627d', // was muted at 60% alpha (2.44:1 -> 3.01:1)
  activityBarInactiveForeground: '#75608d', // was contrastBg #483b57 (1.62:1 -> 3.03:1)
  light: '#d8c6ec',
  red: '#fe4450',
  green: '#72f1b8',
  modified: '#af7eff',
  orange: '#ffb86c',
  // Values unique to this theme
  activityBarForeground: '#d8c6ec',
  breadcrumbBackground: '#1d1922',
  breadcrumbForeground: '#d8c6ec',
  listSelection: '#3a3446',
  listErrorForeground: '#fe4450',
  statusBarForeground: '#79607c', // was #634f66 (2.26:1 -> 3.00:1)
  statusBarDebuggingBackground: '#230000',
  statusBarDebuggingForeground: '#ffffff',
  statusBarNoFolderBorder: '#211c26',
  tabActiveBorderTop: '#9aefe99c',
  terminalBorder: '#3a3446',
  terminal: {
    ansiBlack: '#21222c',
    ansiBlue: '#bd93f9',
    ansiBrightBlack: '#6272a4',
    ansiBrightBlue: '#d6acff',
    ansiBrightCyan: '#a4ffff',
    ansiBrightGreen: '#69ff94',
    ansiBrightMagenta: '#ff92df',
    ansiBrightRed: '#ff6e6e',
    ansiBrightWhite: '#f8f8f2',
    ansiBrightYellow: '#ffffa5',
    ansiCyan: '#8be9fd',
    ansiGreen: '#50fa7b',
    ansiMagenta: '#9472c4',
    ansiRed: '#ff5555',
    ansiWhite: '#f8f8f2',
    ansiYellow: '#ffb86c',
    foreground: '#f8f8f2',
    cursorBackground: '#c0c5ce',
    cursorForeground: '#c0c5ce',
  },
  // Extra scopes for the tag color rule
  extraTagScopes: [],
};

const sleeper = {
  id: 'sleeper',
  name: 'The Great Sleeper',
  file: 'great-sleeper-color-theme.json',
  bg: '#181b28',
  editorBg: '#161926',
  contrastBg: '#2a3049',
  border: '#343b46',
  accent: '#705fbd',
  accentHover: '#9472c4',
  fg: '#b9c3d5',
  cyan: '#9adeef',
  muted: '#7581b0', // was #4b5783 (2.44:1 -> 4.50:1 on bg)
  lineNumber: '#566396', // was muted at 60% alpha (1.67:1 -> 3.01:1)
  activityBarInactiveForeground: '#576498', // was contrastBg #2a3049 (1.32:1 -> 3.00:1)
  light: '#b293fb',
  red: '#fe4450',
  green: '#72f1b8',
  modified: '#af7eff',
  orange: '#fa8419',
  activityBarForeground: '#705fbd',
  breadcrumbBackground: '#151825',
  breadcrumbForeground: '#7581b0', // was #4b5783, the old muted; follows muted (2.51:1 -> 4.58:1)
  listSelection: '#2a3049',
  listErrorForeground: '#ff65f7',
  statusBarForeground: '#7581b0', // was #4b5783, the old muted; follows muted (2.44:1 -> 4.50:1)
  statusBarDebuggingBackground: '#fe4450',
  statusBarDebuggingForeground: '#181b28',
  statusBarNoFolderBorder: undefined,
  tabActiveBorderTop: '#9adeef9c',
  terminalBorder: '#161926',
  terminal: {
    ansiBlack: '#1a1a1a',
    ansiBlue: '#9d65ff',
    ansiBrightBlack: '#625e4c',
    ansiBrightBlue: '#9d65ff',
    ansiBrightCyan: '#58d1eb',
    ansiBrightGreen: '#98e024',
    ansiBrightMagenta: '#ff65f7',
    ansiBrightRed: '#f4005f',
    ansiBrightWhite: '#f6f6ef',
    ansiBrightYellow: '#fa8419',
    ansiCyan: '#58d1eb',
    ansiGreen: '#58ebd7',
    ansiMagenta: '#ff65f7',
    ansiRed: '#f4005f',
    ansiWhite: '#c4c5b5',
    ansiYellow: '#fa8419',
    foreground: '#c4c5b5',
    cursorBackground: '#c0c5ce',
    cursorForeground: '#c4c5b5',
  },
  extraTagScopes: ['support.class.component.open.jsx'],
};

module.exports = { syntax, themes: [dreamer, sleeper] };
