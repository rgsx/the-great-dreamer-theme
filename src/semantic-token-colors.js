// Semantic token colors (used by TypeScript, Python, Rust, etc. language servers).
// They only fill gaps where the semantic fallback would otherwise lose a TextMate color,
// plus a few modifiers; they don't restyle the theme.
'use strict';

module.exports = (p, s) => ({
  // Deprecated APIs: keep their color, strike them through.
  '*.deprecated': { strikethrough: true },
  // const / readonly variables keep the variable color, in italics.
  'variable.readonly': { italic: true },
  // Enum members in the constant color (TextMate gives them the plain variable color).
  'enumMember': s.constant,
  // TS/JS namespaces: the semantic fallback (entity.name.namespace) matches no rule here,
  // while TextMate shows them as types. Scoped to TS/JS so other languages aren't restyled.
  'namespace:typescript': s.type,
  'namespace:typescriptreact': s.type,
  'namespace:javascript': s.type,
  'namespace:javascriptreact': s.type,
  // `self` / `this` keep the TextMate `variable.language.this` color.
  'selfKeyword': s.magenta,
});
