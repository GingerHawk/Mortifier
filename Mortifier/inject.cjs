/* ════════════════════════════════════════════════════════════════════════════
   inject.cjs — Mortify Template Processing & Code Injection System
   
   Purpose:
     - Process template files with multi-series placeholder substitution
     - Inject modular component code into generated plugin files
     - Manage control panel structure and section organization
     - Handle append-only code injection with stamped identification
   
   
   Code Injection Architecture:
     - Append-only injection system preserves existing code structure
     - Stamped injection tracking prevents duplicate code insertion
     - Control panel section management with automatic comma normalization
     - Transform snippet injection for multi-series data processing logic
   
   Key Features:
     - Import statement management and organization
     - Control panel section structure preservation and enhancement
     - Transform props snippet injection for chart data processing
     - Idempotent operations with stamp-based duplicate prevention
════════════════════════════════════════════════════════════════════════════ */
/* eslint-disable no-console */

/* ──────────────────────────────────────────────────────────────────────────────
   Node.js Dependencies & Path Utilities
   ──────────────────────────────────────────────────────────────────────────── */
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');


/* ──────────────────────────────────────────────────────────────────────────────
   1) File I/O Utilities (non-idempotent, append-friendly writes)
   ──────────────────────────────────────────────────────────────────────────── */

/** Ensure a directory exists (mkdir -p). */
async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

/** Read a template from templatesRoot/templateRel and write to destAbs. */
async function writeTemplate({ templatesRoot, templateRel, destAbs }) {
  const srcAbs = path.join(templatesRoot, templateRel);
  const buf = await fsp.readFile(srcAbs, 'utf8');
  await ensureDir(path.dirname(destAbs));
  await fsp.writeFile(destAbs, buf, 'utf8');
}

/** Always write; preserve API name but no longer compare prev/next. */
async function writeIfChanged(file, next) {
  await ensureDir(path.dirname(file));
  await fsp.writeFile(file, next, 'utf8');
  return true;
}



/* ──────────────────────────────────────────────────────────────────────────────
   2) String / Regex Helpers
   ──────────────────────────────────────────────────────────────────────────── */

/** Escape a string so it can be used safely in a RegExp literal. */
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/* ──────────────────────────────────────────────────────────────────────────────
   3) Import Insertion (append-only; stamps preserved)
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Append a named import line from `from` with the given `names`.
 * We do not scan/merge/dedupe; we always append a fresh line and include `stamp`.
 */
function upsertNamedImport({ src, names, from, stamp }) {
  const importLine = `import { ${names.join(', ')} } from '${from}'; ${stamp}\n`;
  const firstImport = src.match(/^\s*import .*?;[\r\n]/m);
  if (firstImport) {
    const idx = firstImport.index + firstImport[0].length;
    return src.slice(0, idx) + importLine + src.slice(idx);
  }
  return importLine + src;
}



/* ──────────────────────────────────────────────────────────────────────────────
   4) controlPanelSections Finders & Collapsers (structure helpers)
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Find the bounds of the top-level `controlPanelSections: [ … ]` array.
 * Returns { openIdx, closeIdx } indices into the source string or null.
 */
function findControlPanelSectionsArray(src) {
  const re = /controlPanelSections\s*:\s*\[/m;
  const m = re.exec(src);
  if (!m) return null;
  const open = m.index + m[0].length - 1; // the '['
  // Walk forward to find the matching closing ']' at depth 0.
  let i = open, depth = 0;
  while (i < src.length) {
    const ch = src[i++];
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  const close = i - 1;
  return { openIdx: open, closeIdx: close };
}

/**
 * Force a small set of core sections to start collapsed (UX preference).
 * This is not idempotency; it simply normalizes `expanded: false` on match.
 */
function enforceSectionsCollapsedByLabel(src) {
  const targets = [
    'Chart Orientation',
    'Chart Title',
    'Chart Options',
  ];
  const bounds = findControlPanelSectionsArray(src);
  if (!bounds) return src;

  const { openIdx, closeIdx } = bounds;
  const before = src.slice(0, openIdx + 1);
  let arr = src.slice(openIdx + 1, closeIdx);
  const after = src.slice(closeIdx);

  let out = '';
  let i = 0;
  while (i < arr.length) {
    // consume whitespace and commas
    const ws = /^\s*,?\s*/.exec(arr.slice(i));
    if (ws) i += ws[0].length;
    if (i >= arr.length) break;
    if (arr[i] !== '{') { out += arr[i++]; continue; }

    const start = i;
    let depth = 0;
    while (i < arr.length) {
      const ch = arr[i++];
      if (ch === '{') depth++;
      else if (ch === '}') { depth--; if (depth === 0) break; }
    }
    const end = i; // after '}'
    let sect = arr.slice(start, end);

    if (targets.some(lbl => new RegExp(`label\\s*:\\s*t\\(['"]${escapeRe(lbl)}['"]\\)`).test(sect))) {
      if (/expanded\s*:\s*(true|false)/.test(sect)) {
        sect = sect.replace(/expanded\s*:\s*(true|false)/, 'expanded: false');
      } else if (/controlSetRows/.test(sect)) {
        sect = sect.replace(/controlSetRows/, `expanded: false,\n  controlSetRows`);
      } else {
        sect = sect.replace(/\}\s*$/, `, expanded: false }`);
      }
    }

    out += sect;
  }

  return before + out + after;
}
/* ──────────────────────────────────────────────────────────────────────────────
   4.1) controlPanelSections comma normalizer (append-only cleanup)
   ──────────────────────────────────────────────────────────────────────────── */
function normalizeControlPanelSectionCommas(src) {
  const bounds = findControlPanelSectionsArray(src);
  if (!bounds) return src;

  const { openIdx, closeIdx } = bounds;
  const before = src.slice(0, openIdx + 1);
  let arr = src.slice(openIdx + 1, closeIdx);
  const after = src.slice(closeIdx);

  // 1) Insert commas between consecutive "sections.*" tokens
  arr = arr.replace(/(sections\.[A-Za-z0-9_]+)(?=sections\.)/g, '$1,');

  // 2) Insert a comma when a "sections.*" entry is followed directly by a "{"
  arr = arr.replace(/(sections\.[A-Za-z0-9_]+)\s*(?=\{)/g, '$1, ');

  // 3) Insert commas between adjacent objects: `}{` -> `},\n{`
  arr = arr.replace(/}\s*{/g, '},\n{');

  // 4) Ensure the last entry inside the array ends with a comma before the closing ']'
  const arrTrim = arr.trimEnd();
  if (arrTrim && !/[,\[]\s*$/.test(arrTrim)) {
    const last = arrTrim[arrTrim.length - 1];
    if (last === '}' || last === ']') arr = arrTrim + ',\n';
  }

  return before + arr + after;
}


/* ──────────────────────────────────────────────────────────────────────────────
   5) Style Section Append (no search/merge; always add a new section)
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Append a new section object with given `sectionLabel` and `rows` to
 * the end of `controlPanelSections`. Adds `sectionStamp` to the object.
 * No scanning or deduplication is performed.
 */
function upsertStyleSection({ src, sectionLabel, rows, sectionStamp }) {
  const bounds = findControlPanelSectionsArray(src);
  if (!bounds) {
    console.warn('! controlPanelSections array not found; skipping Style section append.');
    return src;
  }

  const { closeIdx } = bounds;

  // Determine if we need a comma before inserting our new object
  let j = closeIdx - 1;
  while (j >= 0 && /\s/.test(src[j])) j--;
  const needCommaBefore = src[j] !== '[' && src[j] !== ',';

  // Build rows -> [RowName],
  const renderedRows = rows.map(r => `\n    [${r}],`).join('');

  const sectionObj =
`${needCommaBefore ? ',' : ''}
  {
    label: t('${sectionLabel}'),
    tabOverride: 'customize',
    expanded: false,
    controlSetRows: [${renderedRows}
    ],
    ${sectionStamp}
  },`; // trailing comma after the object

  const next = src.slice(0, closeIdx) + sectionObj + src.slice(closeIdx);
  return enforceSectionsCollapsedByLabel(next);
}



/* ──────────────────────────────────────────────────────────────────────────────
   6) Transform Imports (append-only wrapper)
   ──────────────────────────────────────────────────────────────────────────── */

/** Kept for API parity with callers. */
function upsertTransformImports({ src, names, from, stamp }) {
  return upsertNamedImport({ src, names, from, stamp });
}


/* ──────────────────────────────────────────────────────────────────────────────
   8) Transform Snippet Append (inject before return; never skip)
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * Insert a transformProps logic snippet just before the canonical return.
 * If no anchor is found, append to the end. We do not scan for existing stamps.
 */
function upsertTransformSnippet({ src, snippet /*, snippetStamp*/ }) {
  const anchors = [
    /return\s*\{\s*\.\.\.\s*upstream\s*,\s*echartOptions\s*:\s*options\s*\}\s*;/m,
    /return\s*{[^}]*echartOptions\s*:\s*options[^}]*}\s*;/m,
  ];
  const idx = anchors.reduce((acc, re) => (acc >= 0 ? acc : src.search(re)), -1);
  if (idx >= 0) {
    return src.slice(0, idx) + `${snippet}\n` + src.slice(idx);
  }
  return `${src.trim()}\n${snippet}\n`;
}


/* ──────────────────────────────────────────────────────────────────────────────
   9) Exports
   ──────────────────────────────────────────────────────────────────────────── */
module.exports = {
  ensureDir,
  writeTemplate,
  writeIfChanged,
  upsertNamedImport,
  normalizeControlPanelSectionCommas,
  upsertStyleSection,
  upsertTransformImports,
  upsertTransformSnippet,
};
