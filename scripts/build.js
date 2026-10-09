#!/usr/bin/env node
// Generates themes/*.json from src/. Plain Node, no dependencies.
// Usage: node scripts/build.js [--check]   (--check: fail if themes/ is out of date)
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { syntax, themes } = require('../src/palettes');
const uiColors = require('../src/ui-colors');
const tokenColors = require('../src/token-colors');
let semanticTokenColors = null;
try { semanticTokenColors = require('../src/semantic-token-colors'); } catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
}

const HEX = /^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/;

// Lowercase every color value and make sure it is a valid #rrggbb or #rrggbbaa.
function color(value, where) {
  const v = String(value).toLowerCase();
  if (!HEX.test(v)) throw new Error(`Invalid color ${value} at ${where}`);
  return v;
}

function buildColors(p) {
  const out = {};
  for (const [section, entries] of uiColors(p, syntax)) {
    for (const [key, value] of Object.entries(entries)) {
      if (value === undefined) continue; // not defined for this theme
      if (key in out) throw new Error(`${p.id}: duplicate color key ${key} (${section})`);
      out[key] = color(value, `${p.id} ${key}`);
    }
  }
  return out;
}

function normalizeSettings(settings, where) {
  const out = {};
  for (const [k, v] of Object.entries(settings)) {
    if (v === undefined) continue;
    out[k] = k === 'foreground' || k === 'background' ? color(v, where) : v;
  }
  return out;
}

function buildTheme(p) {
  const theme = {
    name: p.name,
    type: 'dark',
    semanticHighlighting: true,
    colors: buildColors(p),
  };
  if (semanticTokenColors) {
    const sem = {};
    for (const [k, v] of Object.entries(semanticTokenColors(p, syntax))) {
      sem[k] = typeof v === 'string' ? color(v, `${p.id} semantic ${k}`) : normalizeSettings(v, `${p.id} semantic ${k}`);
    }
    theme.semanticTokenColors = sem;
  }
  theme.tokenColors = tokenColors(p, syntax).map((rule, i) => ({
    ...(rule.name ? { name: rule.name } : {}),
    scope: rule.scope,
    settings: normalizeSettings(rule.settings, `${p.id} tokenColors[${i}]`),
  }));
  return theme;
}

function main() {
  const check = process.argv.includes('--check');
  let stale = false;
  for (const p of themes) {
    const file = path.join(root, 'themes', p.file);
    const text = JSON.stringify(buildTheme(p), null, 2) + '\n';
    if (check) {
      const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
      if (current !== text) { console.error(`out of date: themes/${p.file}`); stale = true; }
      continue;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
    const t = JSON.parse(text);
    console.log(`themes/${p.file}: ${Object.keys(t.colors).length} colors, ${t.tokenColors.length} token rules` +
      (t.semanticTokenColors ? `, ${Object.keys(t.semanticTokenColors).length} semantic rules` : ''));
  }
  if (stale) process.exit(1);
}

if (require.main === module) main();
module.exports = { buildTheme, themes, syntax };
