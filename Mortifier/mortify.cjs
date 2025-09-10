#!/usr/bin/env node
/* eslint-disable no-console */

/* #############################################################################
   MORTIFIER â€” Main Generator Entry Point
   
   Purpose:
     - Generate Apache Superset ECharts plugins with modular customization system
     - Support multi-series controls with consistent "All Series" vs per-series patterns
     - Copy minimal upstream foundation + inject modular components dynamically
     - Integrate seamlessly into Superset monorepo with hot reload support

   Key Features:
     - Interactive prompts with section-based module selection (Style, Animation, Values, etc.)
     - Quick mode support via command line args: node mortify.cjs -MyChart --line
     - Per-series controls with 3-series support
     - Enhanced color system: generates defColor1-N, defColor2-N, defColor3-N variants
     - Foundation-based architecture: copies upstream to foundation/ + generates plugin/
     - Automatic tsconfig.json patching and MainPreset registration

   External Dependencies:
     - prompts.cjs's Interactive question flow with section grouping
     - copyUpstream.cjs's Minimal selective upstream copy into foundation/
     - integration.cjs's Superset integration (tsconfig, MainPreset registration)
     - inject.cjs's Template rendering and code injection utilities
     - modules/index.cjs's Module registry with appliesTo filtering and getSeriesValue patterns
     - templates/'s Base plugin templates (index.ts, transformProps.ts, controlPanel.tsx)
     - utilities.ts's Common utility functions copied to each plugin's plugin/common/

   Architecture Notes:
     - Modules use consistent getSeriesValue() pattern for "All Series" vs individual series
     - Fixed resetOnHide: false on per-series controls to preserve user selections
     - Template-based code generation with snippet injection system
     - Foundation pattern isolates upstream dependencies from generated plugin code
############################################################################# */

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const os = require('os');

/* [1] #########################################################################
   Imports from sibling generator modules
   ########################################################################### */
const { askQuestions } = require('./prompts.cjs');
const { copySelected } = require('./copyUpstream.cjs');
const {
  patchTsconfigIncludeAndExclude,
  patchMainPreset,
  printNextSteps,
} = require('./integration.cjs');

const { MODULES } = require('./modules/index.cjs');
const {
  ensureDir,
  writeTemplate,
  writeIfChanged,
  upsertNamedImport,
  upsertStyleSection,
  upsertTransformSnippet,
  normalizeControlPanelSectionCommas,
} = require('./inject.cjs');


/* [2] #########################################################################
   String & Naming Utilities
   ########################################################################### */
// Convert display name to kebab-case for folder/package names
function toKebab(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate TypeScript class name from display name (e.g., "My Chart"'s "MyChartPlugin")
function toClassName(displayName) {
  const base = String(displayName || 'Custom')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\s+/g, '');
  return `${base}Plugin`;
}

/* [2.1] #####################################################################
   Color Processing Utilities (for multi-series color generation)
   ########################################################################### */
// Math utility for RGB clamping
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

// Parse #hex colors (3 or 6 digit)
function hexToRgb(str) {
  const s = String(str || '').trim();
  const m3 = /^#([0-9a-f]{3})$/i.exec(s);
  const m6 = /^#([0-9a-f]{6})$/i.exec(s);
  if (m3) {
    const h = m3[1];
    return { r: parseInt(h[0]+h[0], 16), g: parseInt(h[1]+h[1], 16), b: parseInt(h[2]+h[2], 16) };
  }
  if (m6) {
    const h = m6[1];
    return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
  }
  return null;
}

// Parse rgb() function strings
function rgbStringToRgb(str) {
  const m = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/i.exec(String(str || '').trim());
  if (!m) return null;
  return { r: clamp(+m[1],0,255), g: clamp(+m[2],0,255), b: clamp(+m[3],0,255) };
}

// Unified color parser: accepts '#hex' or 'rgb(r,g,b)'; returns {r,g,b,a:1}
function parseToRgbaObject(input, fallback = { r: 0, g: 191, b: 165 }) {
  const rgb = hexToRgb(input) || rgbStringToRgb(input) || fallback;
  return { ...rgb, a: 1 };
}

// Generate darker variants for multi-series color schemes
function darkenRGBA(rgba, pct = 0.25) {
  const f = 1 - pct;
  return {
    r: clamp(Math.round(rgba.r * f), 0, 255),
    g: clamp(Math.round(rgba.g * f), 0, 255),
    b: clamp(Math.round(rgba.b * f), 0, 255),
    a: rgba.a,
  };
}

// Variant's upstream control panel path
function controlPanelRelPath(variant) {
  switch (String(variant || '').toLowerCase()) {
    case 'area':    return 'Timeseries/Area/controlPanel';
    case 'scatter': return 'Timeseries/Regular/Scatter/controlPanel';
    case 'line':    return 'Timeseries/Regular/Line/controlPanel';
    case 'smooth':  return 'Timeseries/Regular/SmoothLine/controlPanel';
    case 'step':    return 'Timeseries/Regular/Step/controlPanel';
    case 'bar':     return 'Timeseries/Regular/Bar/controlPanel';
    case 'pie':     return 'Pie/controlPanel';
    default:        return 'Timeseries/Regular/Line/controlPanel';
  }
}
function familyFromVariant(variant) {
  return String(variant || '').toLowerCase() === 'pie' ? 'Pie' : 'Timeseries';
}
// search for: function escapeRe( or any small helpers block )
function moveSubHeaderImportToEnd(src) {
  const re = /(^|\n)\s*import\s*{\s*SubHeader\s*}\s*from\s*['"]\.\/common\/SubHeader['"]\s*;[^\n]*\n?/;
  const m = src.match(re);
  if (!m) return src;

  const line = m[0];
  let without = src.replace(re, '');
  // find last import
  const imports = [...without.matchAll(/(^|\n)\s*import\s.+?;[^\n]*\n/g)];
  if (!imports.length) return line + without;
  const last = imports[imports.length - 1];
  const pos = last.index + last[0].length;
  return without.slice(0, pos) + line + without.slice(pos);
}


function parseQuickArgs(argv) {
  const raw = argv.slice(2).join(' ');
  const nameMatch = raw.match(/^\s*-(.+?)(?=\s+--|$)/); // -Name with spaces
  const typeMatch = raw.match(/--type\s+(\w+)/i);       // --type line|pie
  return {
    quickName: nameMatch ? nameMatch[1].trim() : null,
    quickType: typeMatch ? typeMatch[1].toLowerCase() : null,
  };
}
//wipe dir of plugin
async function removeDirRecursive(dir) {
  try { await fsp.rm(dir, { recursive: true, force: true }); } catch (_) {}
}
function collectUtilitiesNeeds(selectedModules) {
  const set = new Set();
  for (const m of selectedModules || []) {
    // Support both schema shapes:
    // 1) needs: ['asNumber', 'rgba', ...]
    // 2) needs: { transformProps: ['asNumber', 'rgba', ...] }
    const arr1 = Array.isArray(m?.needs) ? m.needs : [];
    const arr2 = Array.isArray(m?.needs?.transformProps) ? m.needs.transformProps : [];
    for (const name of [...arr1, ...arr2]) {
      if (name && typeof name === 'string' && name.trim()) set.add(name.trim());
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}


function filterKnownUtilities(names) {
  try {
    const uPath = path.join(__dirname, 'utilities.ts');
    const u = fs.readFileSync(uPath, 'utf8');
    const exp = new Set();
    let m;
    const reFn = /export\s+function\s+([A-Za-z0-9_]+)/g;
    const reType = /export\s+type\s+([A-Za-z0-9_]+)/g;
    const reConst = /export\s+(?:const|let|var)\s+([A-Za-z0-9_]+)/g;
    while ((m = reFn.exec(u))) exp.add(m[1]);
    while ((m = reType.exec(u))) exp.add(m[1]);
    while ((m = reConst.exec(u))) exp.add(m[1]);
    return names.filter(n => exp.has(n));
  } catch {
    return names;
  }
}



/* [3] #########################################################################
   Path resolution
   ########################################################################### */
function resolvePathsAndGuards({ supersetRoot, pluginFolder }) {
  const feRoot       = path.join(supersetRoot, 'superset-frontend');
  const monorepoDir  = path.join(feRoot, 'plugins', 'Mort-Viz', pluginFolder);
  const upstreamRoot = path.join(feRoot, 'plugins', 'plugin-chart-echarts', 'src');
  if (!fs.existsSync(feRoot)) throw new Error(`FE root not found: ${feRoot}`);
  if (!fs.existsSync(upstreamRoot)) throw new Error(`Upstream not found: ${upstreamRoot}`);
  return { feRoot, monorepoDir, upstreamRoot };
}


/* [4] #########################################################################
   Utilities.ts copy â€” from generator root's plugin/common (Step 4)
   ########################################################################### */
async function copyUtilitiesToPlugin(pluginSrcRoot) {
  const destCommonDir = path.join(pluginSrcRoot, 'plugin', 'common');
  const destFile = path.join(destCommonDir, 'utilities.ts');
  const srcFile = path.join(__dirname, 'utilities.ts'); // must exist in generator root
  await fs.promises.mkdir(destCommonDir, { recursive: true });
  if (!fs.existsSync(srcFile)) {
    throw new Error(`utilities.ts not found in generator root: ${srcFile}`);
  }
  if (!fs.existsSync(destFile)) {
    await fs.promises.copyFile(srcFile, destFile);
  }
}


/* [5] #########################################################################
   ControlPanel rewrite (family-aware import patching)
   ########################################################################### */
function patchControlPanelImports(src, variant) {
  const family = familyFromVariant(variant);
  let next = src;

  if (family === 'Pie') {
    next = next
      .replace(/from\s+['"]\.\/types['"]/g,       `from '../foundation/Pie/types'`)
      .replace(/from\s+['"]\.\.\/types['"]/g,     `from '../foundation/Pie/types'`)
      .replace(/from\s+['"]\.\/constants['"]/g,   `from '../foundation/Pie/constants'`)
      .replace(/from\s+['"]\.\.\/constants['"]/g, `from '../foundation/Pie/constants'`)
      .replace(/from\s+['"]\.\/controls['"]/g,    `from '../foundation/controls'`)
      .replace(/from\s+['"]\.\.\/controls['"]/g,  `from '../foundation/controls'`);
  } else {
    next = next
      .replace(/from\s+['"][.\/]+(?:\.\.\/)*types(?:\.tsx?)?['"]/g, `from '../foundation/types'`)
      .replace(/from\s+['"][.\/]+(?:\.\.\/)*(?:Timeseries\/)?constants(?:\.tsx?)?['"]/g, `from '../foundation/Timeseries/constants'`)
      .replace(/from\s+['"][^'"]*controls\/([^'"]+)['"]/g, `from './controls/$1'`)
      .replace(/from\s+['"][.\/]+(?:\.\.\/)*controls['"]/g, `from '../foundation/controls'`);
  }

  // Ensure SubHeader import presence (idempotent)
  if (!/import\s+\{\s*SubHeader\s*\}\s+from\s+['"]\.\/common\/SubHeader['"]/.test(next)) {
    next = `import { SubHeader } from './common/SubHeader'; /* MortInject: SubHeader import */\n` + next;
  }
  return next;
}


/* [6] #########################################################################
   TransformProps: write from template AND ensure utilities import exactly once
   ########################################################################### */
async function writeTransformPropsWithUtilities(pluginSrcRoot, variant, utilNames = []) {
  const templatesRoot = path.join(__dirname, 'templates');
  const dest = path.join(pluginSrcRoot, 'plugin', 'transformProps.ts');
  const family = familyFromVariant(variant);

  // 1) Write from template
  const tplPath = path.join(templatesRoot, 'transformProps.monorepo.ts.txt');
  if (!fs.existsSync(tplPath)) throw new Error(`Template missing: ${tplPath}`);
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const DEFAULTS =
    String(variant).toLowerCase() === 'bar'
      ? `const defaults = { seriesType: 'bar', area: false } as any;`
      : `const defaults = { } as any;`;
  const out = tpl.replace(/__DEFAULTS__/g, DEFAULTS).replace(/__FAMILY__/g, family);
  await writeIfChanged(dest, out);

  // 2) One dynamic utilities import (only what modules need)
  utilNames = Array.from(new Set(utilNames || [])).sort((a, b) => a.localeCompare(b));
  if (utilNames.length > 0) {
    let src = fs.readFileSync(dest, 'utf8');
    const stamp = '/* Mort:tp-import:utils */';
    const importLine = `import { ${utilNames.join(', ')} } from './common/utilities'; ${stamp}\n`;

    // Insert after the last import line (or at top if none)
    const allImports = [...src.matchAll(/(^|\n)\s*import\s.+?;[^\n]*\n/g)];
    if (allImports.length > 0) {
      const last = allImports[allImports.length - 1];
      const pos = last.index + last[0].length;
      src = src.slice(0, pos) + importLine + src.slice(pos);
    } else {
      src = importLine + src;
    }
    await writeIfChanged(dest, src);
  }
}



/* [7] #########################################################################
   Module expansion (load list's filter by appliesTo's order by .order)
   ########################################################################### */
function expandModules(moduleIds, variant) {
  const ids = new Set([].concat(moduleIds || []));
  const applies = (m) => !m?.appliesTo || m.appliesTo.includes(variant) || m.appliesTo.includes('all');
  const sel = MODULES.filter(m => ids.has(m.id) && applies(m));
  sel.sort((a, b) => (a.order || 0) - (b.order || 0));
  return sel;
}


/* [8] #########################################################################
   Main Orchestration
   ########################################################################### */
async function main() {
  try {
  // 8.1 Answers (Quick mode or interactive)
      let ans;

      const argv = process.argv.slice(2);

      // Find the first single-dash token as the display name anchor (supports spaces)
      const nameIdx = argv.findIndex(a => /^-[^-]/.test(a));
      let quickDisplayName = null;
      if (nameIdx !== -1) {
        const nameParts = [];
        for (let i = nameIdx; i < argv.length; i++) {
          const tok = argv[i];
          if (/^--/.test(tok)) break;                 // stop at the first flag
          if (i === nameIdx) nameParts.push(tok.replace(/^-+/, '')); // strip leading '-'
          else nameParts.push(tok);
        }
        quickDisplayName = nameParts.join(' ').trim();
      }

      // Accept a simple variant flag like: --line, --pie, etc.
      const flag = argv.find(a => /^--[a-zA-Z]+$/.test(a));
      const rawVariant = flag ? flag.replace(/^--/, '').toLowerCase() : null;

      // Normalize variant (default to 'line' if unknown/missing)
      const knownVariants = new Set(['line', 'pie']);
      const quickVariant = knownVariants.has(rawVariant) ? rawVariant : 'line';

      const isQuick = Boolean(quickDisplayName || rawVariant);

      if (isQuick) {
        const supersetRoot = process.env.SUPERSET_ROOT || path.join(os.homedir(), 'superset');
        const safeDisplayName = quickDisplayName || 'Mort v5';
        const pluginFolder = toKebab(safeDisplayName);
        const packageName = pluginFolder;
        const defaultColor = '#30baac';
        const seriesColors = ['#30baac', '#ba9c30', '#3050ba'];

        const allForVariant = MODULES
          .filter(m => (m.appliesTo || []).includes('all') || (m.appliesTo || []).includes(quickVariant))
          .map(m => m.id);

        ans = {
          supersetRoot,
          displayName: safeDisplayName,
          pluginFolder,
          packageName,
          description: '',
          variant: quickVariant,
          thumbnailPath: '',
          defaultColor,
          seriesColors,
          moduleIds: allForVariant,
          tags: ['Quick'],
        };

        console.log(`\nâš¡ Quick mode: "${ans.displayName}" â€¢ variant=${ans.variant} â€¢ modules=${allForVariant.length}\n`);
      } else {
        ans = await askQuestions();
      }

    const {
      supersetRoot,
      displayName,
      pluginFolder,
      packageName,
      description,
      variant,
      thumbnailPath,
      defaultColor,
      seriesColors = [],
      moduleIds = [],
      tags = [],
    } = ans;

    // 8.2 Paths & guards
const { feRoot, monorepoDir, upstreamRoot } = resolvePathsAndGuards({ supersetRoot, pluginFolder });
const pluginRoot = monorepoDir;
const pluginSrc  = path.join(pluginRoot, 'src');

// Fresh/overwrite behavior (delete BEFORE we create/write anything)
if (isQuick) {
  console.log(`\nðŸ§¹ Quick mode: removing ${pluginRoot} for a fresh buildâ€¦`);
  await removeDirRecursive(pluginRoot);
} else if (fs.existsSync(pluginRoot)) {
  const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  const ask = q => new Promise(res => rl.question(q, res));
  const ansOverwrite = (await ask(`Directory "${pluginFolder}" exists. Overwrite ALL files? (y/N): `)).trim().toLowerCase();
  rl.close();
  if (ansOverwrite === 'y' || ansOverwrite === 'yes') {
    console.log(`\nðŸ§¹ Overwriting ${pluginRoot}â€¦`);
    await removeDirRecursive(pluginRoot);
  } else {
    console.log('Aborting without changes.');
    process.exit(0);
  }
}

// Recreate clean layout
await ensureDir(pluginSrc);


    
    // 8.3 Enhanced Colors (Always 3 series with variations)
    // Generate defColor1-3, defColor2-3, defColor3-3 for 3 series
    const seriesColorObjects = [];
    const defaultColorFallbacks = ['#30baac', '#ba9c30', '#3050ba'];
    const seriesCount = 3; // Always support 3 series
    
    // Ensure we have enough colors, cycling through defaults if needed
    const actualSeriesColors = [...(seriesColors || [])];
    while (actualSeriesColors.length < seriesCount) {
      const index = actualSeriesColors.length % defaultColorFallbacks.length;
      actualSeriesColors.push(defaultColorFallbacks[index]);
    }
    
    // Generate color variations for each series
    for (let i = 0; i < seriesCount; i++) {
      const baseColor = parseToRgbaObject(actualSeriesColors[i] || defaultColor);
      seriesColorObjects.push({
        base: baseColor,
        variant2: darkenRGBA(baseColor, 0.25),
        variant3: darkenRGBA(baseColor, 0.50)
      });
    }
    
    // Keep backward compatibility
    const defColor1 = seriesColorObjects[0]?.base || parseToRgbaObject(defaultColor);
    const defColor2 = seriesColorObjects[0]?.variant2 || darkenRGBA(defColor1, 0.25);
    const defColor3 = seriesColorObjects[0]?.variant3 || darkenRGBA(defColor2, 0.25);

    // 8.4 Foundation: minimal upstream copy
    await copySelected({
      upstreamRoot,
      destSrc: pluginSrc,
      variant,
      mode: 'minimal',
      proxies: 'none',
    });

    // 8.5 Common scaffolding: SubHeader.tsx, colors.ts, images/thumbnail.png
    await ensureDir(path.join(pluginSrc, 'plugin', 'common'));
    const subHeaderPath = path.join(pluginSrc, 'plugin', 'common', 'SubHeader.tsx');
    const subHeaderTpl = fs.readFileSync(path.join(__dirname, 'templates', 'SubHeader.tsx'), 'utf8');
    await writeIfChanged(subHeaderPath, `/* MortInject: SubHeader component */\n${subHeaderTpl}\n`);

    const colorsPath = path.join(pluginSrc, 'plugin', 'common', 'colors.ts');
    
    // Generate enhanced colors.ts with defColor1-N through defColor3-N
    let colorsTs = `// AUTO-GENERATED by Mortify generator
export type RGBA = { r: number; g: number; b: number; a: number };

// Legacy colors for backward compatibility
export const defColor1: RGBA = { r: ${defColor1.r}, g: ${defColor1.g}, b: ${defColor1.b}, a: ${defColor1.a} };
export const defColor2: RGBA = { r: ${defColor2.r}, g: ${defColor2.g}, b: ${defColor2.b}, a: ${defColor2.a} };
export const defColor3: RGBA = { r: ${defColor3.r}, g: ${defColor3.g}, b: ${defColor3.b}, a: ${defColor3.a} };

`;

    // Generate defColor1-N, defColor2-N, defColor3-N for each series
    for (let seriesIndex = 0; seriesIndex < seriesCount; seriesIndex++) {
      const seriesNum = seriesIndex + 1;
      const colors = seriesColorObjects[seriesIndex];
      
      colorsTs += `// Series ${seriesNum} Colors
export const defColor1_${seriesNum}: RGBA = { r: ${colors.base.r}, g: ${colors.base.g}, b: ${colors.base.b}, a: ${colors.base.a} };
export const defColor2_${seriesNum}: RGBA = { r: ${colors.variant2.r}, g: ${colors.variant2.g}, b: ${colors.variant2.b}, a: ${colors.variant2.a} };
export const defColor3_${seriesNum}: RGBA = { r: ${colors.variant3.r}, g: ${colors.variant3.g}, b: ${colors.variant3.b}, a: ${colors.variant3.a} };

`;
    }
    
    colorsTs += `export function rgbaToCss(c: RGBA): string { return \`rgba(\${c.r},\${c.g},\${c.b},\${c.a})\`; }
`;
    
    await writeIfChanged(colorsPath, colorsTs);

    const commonDir = path.join(pluginSrc, 'plugin', 'common');
    await ensureDir(commonDir);
    const destThumb = path.join(commonDir, 'thumbnail.png');
    const providedThumb = (thumbnailPath && thumbnailPath.trim()) ? thumbnailPath.trim() : null;
    const generatorDefaultThumb = path.join(__dirname, 'thumb.png');
    fs.copyFileSync(providedThumb || generatorDefaultThumb, destThumb);

    // 8.6 Copy utilities.ts into plugin/common (Step 4)
    await copyUtilitiesToPlugin(pluginSrc);

    // 8.7 Create controlPanel.tsx from upstream, patch imports, ensure SubHeader import
    const controlPanelRel = controlPanelRelPath(variant);
    const controlPanelAbs = path.join(pluginSrc, 'plugin', 'controlPanel.tsx');
    const upstreamCpAbs = path.join(upstreamRoot, controlPanelRel + '.tsx');
    if (!fs.existsSync(upstreamCpAbs)) {
      throw new Error(`controlPanel not found: ${upstreamCpAbs}`);
    }
    if (!fs.existsSync(controlPanelAbs)) {
      const cpRaw = fs.readFileSync(upstreamCpAbs, 'utf8');
      const cpPatched = patchControlPanelImports(cpRaw, variant);
      await writeIfChanged(controlPanelAbs, cpPatched);
    }

    // 8.8 Write index.ts and transformProps.ts from templates (with utilities import)
    const templatesRoot = path.join(__dirname, 'templates');
    const className = toClassName(displayName);
    const family = familyFromVariant(variant);

    // index.ts
    const tplIndex = fs.readFileSync(path.join(templatesRoot, 'pluginClass.monorepo.ts.txt'), 'utf8');
    const thumbExpr = `require('./plugin/common/thumbnail.png')`;
    const baseTags = ['ECharts', family, 'Mort'];
    const tagsLiteral = `[${[...baseTags, ...(Array.isArray(tags) ? tags : [])].map(t => JSON.stringify(t)).join(', ')}]`;
    const indexOut = tplIndex
      .replace(/__DISPLAY_NAME__/g, displayName)
      .replace(/__DESCRIPTION__/g, description || '')
      .replace(/__THUMB__/g, thumbExpr)
      .replace(/__VIZ_KEY__/g, packageName)
      .replace(/__CONTROL_PANEL_PATH__/g, './plugin/controlPanel')
      .replace(/__CLASS_NAME__/g, className)
      .replace(/__TAGS__/g, tagsLiteral)
      .replace(/__FAMILY__/g, family);
    await writeIfChanged(path.join(pluginSrc, 'index.ts'), indexOut);

   // transformProps.ts (+ utilities import) and module wiring

// 8.9 Modules: write control files + inject controlPanel + inject TP snippets
const selectedModules = expandModules(moduleIds, variant);

// 8.9.0 Collect utilities from module needs (dynamic TP import)
const utilNeeds = collectUtilitiesNeeds(selectedModules);

// 8.9.1 Write transformProps with a single dynamic utilities import
await writeTransformPropsWithUtilities(pluginSrc, variant, utilNeeds);

// 8.9.2 Write module files (as-is from module templates), with correct paths
for (const mod of selectedModules) {
  if (!Array.isArray(mod.files)) continue;
  for (const f of mod.files) {
    // Normalize: strip leading src/ or plugin/
    const cleanRel = f.dest.replace(/^src[\\/]/, '').replace(/^plugin[\\/]/, '');
    // If cleanRel already starts with "controls/", write under plugin/cleanRel.
    // Otherwise, write under plugin/controls/cleanRel.
    const adjustedRel = /^controls[\\/]/.test(cleanRel)
      ? path.join('plugin', cleanRel)
      : path.join('plugin', 'controls', cleanRel);

    const destAbs = path.join(pluginSrc, adjustedRel);
    await writeTemplate({
      templatesRoot,
      templateRel: f.template,
      destAbs,
    });
  }
}

// 8.9.3 Inject imports + sections into controlPanel.tsx

let cpSrc = fs.readFileSync(controlPanelAbs, 'utf8');

// Normalize stale import paths to ./controls/*
cpSrc = cpSrc
  .replace(/from\s+['"][^'"]*plugin\/controls\/([^'"]+)['"]/g, "from './controls/$1'")
  .replace(/from\s+['"][^'"]*plugin\/([^'"]+)['"]/g, "from './controls/$1'")
  .replace(/from\s+['"][.\/]+(?:\.\.\/)*controls\/([^'"]+)['"]/g, "from './controls/$1'");

// 8.9.3.a Append imports per module (append-only; skip SubHeader â€” provided elsewhere)
for (const mod of selectedModules) {
  const { controlPanel } = mod;
  if (!controlPanel?.import) continue;

  const rawFrom = (controlPanel.import.from || '').replace(/\\/g, '/');
  let normalizedFrom = rawFrom;
  if (/controls\//.test(normalizedFrom)) {
    normalizedFrom = normalizedFrom.replace(/^.*controls\//, './controls/');
  } else if (/plugin\//.test(normalizedFrom)) {
    normalizedFrom = normalizedFrom.replace(/^.*plugin\//, './controls/');
  }

  if (!(controlPanel.import.names || []).includes('SubHeader')) {
    cpSrc = upsertNamedImport({
      src: cpSrc,
      names: controlPanel.import.names,
      from: normalizedFrom,
      stamp: controlPanel.import.stamp,
    });
  }
}

// 8.9.3.b Batch rows by section label's one section per label
const rowsByLabel = new Map();
for (const mod of selectedModules) {
  const section = mod.controlPanel?.section;
  if (!section?.label || !section?.rows) continue;
  const acc = rowsByLabel.get(section.label) || [];
  acc.push(...section.rows);
  rowsByLabel.set(section.label, acc);
}

// 8.9.3.c Append exactly one section per label (append-only, stamped)
for (const [label, rows] of rowsByLabel.entries()) {
  cpSrc = upsertStyleSection({
    src: cpSrc,
    sectionLabel: label,
    rows,
    sectionStamp: `/* Mort:section:${label} */`,
  });
}

// 8.9.3.d Tidy commas and move SubHeader import to end of imports
cpSrc = normalizeControlPanelSectionCommas(cpSrc);
cpSrc = moveSubHeaderImportToEnd(cpSrc);
await writeIfChanged(controlPanelAbs, cpSrc);

// 8.9.3.e (Optional UX) Collapse Title section once
const TITLE_WRAP_STAMP = '/* MortWrap:TitleCollapsed */';
if (!cpSrc.includes(TITLE_WRAP_STAMP)) {
  cpSrc = cpSrc.replace(
    /\bsections\.titleControls\b/,
    '{ ...sections.titleControls, expanded: false } ' + TITLE_WRAP_STAMP
  );
  await writeIfChanged(controlPanelAbs, cpSrc);
}

// 8.9.4 Inject module transform snippets (NO helper prelude)
const transformAbs = path.join(pluginSrc, 'plugin', 'transformProps.ts');
let tpSrc = fs.readFileSync(transformAbs, 'utf8');

for (const mod of selectedModules) {
  const tp = mod.transformProps;
  if (!tp?.snippet) continue;
  tpSrc = upsertTransformSnippet({
    src: tpSrc,
    snippet: `{\n${tp.snippet}\n}`,   // local-scope braces
    snippetStamp: tp.snippetStamp || `/* MortModule: ${mod.id} */`,
  });
}
await writeIfChanged(transformAbs, tpSrc);

    // 8.10 Integrate into Superset (tsconfig include + MainPreset registration)
    patchTsconfigIncludeAndExclude(feRoot);
    const mainPresetPath = patchMainPreset({
      feRoot,
      monorepoDir,
      className,
      vizKey: packageName,
      displayName,
    });
    console.log(`â€¢ Updated MainPreset: ${mainPresetPath}`);

    // 8.11 Next steps
    printNextSteps({ feRoot, monorepoDir });
  } catch (e) {
    console.error('âœ– Error:', e && e.message ? e.message : e);
    process.exit(1);
  }
}

main();