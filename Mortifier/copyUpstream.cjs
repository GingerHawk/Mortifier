/* ════════════════════════════════════════════════════════════════════════════
   copyUpstream.cjs — Mortify Upstream Foundation Copy System
   
   Purpose:
     - Copy minimal required files from Superset's plugin-chart-echarts upstream
     - Create foundation/ directory structure with selective upstream mirroring
     - Support both Timeseries (line/bar/area/scatter/step/smooth) and Pie chart families
     - Enable multi-series plugin generation with modular component architecture
   
   Architecture:
     - Minimal Copy Mode: Copy only essential files per chart family (default)
     - Auto Mode: Fallback to broad copy if minimal fails (legacy support)
     - Foundation Pattern: All upstream code isolated in foundation/ subdirectory
     - Proxy Generation: Optional re-export files at src/ level for compatibility
   
   Multi-Series Support:
     - Chart family detection determines which upstream files to copy
     - Timeseries family supports 1-3 configurable series with per-series controls
     - Pie family maintains single-series upstream compatibility
     - Module system layers multi-series controls over foundation upstream code
   
   Key Features:
     - Selective file copying based on chart variant (pie, line, bar, area, etc.)
     - Foundation isolation prevents upstream dependency conflicts
     - Automatic directory structure creation and file mirroring
     - PNG thumbnail handling and image asset management
     - Cross-family dependency resolution (e.g., Pie → Timeseries types)
════════════════════════════════════════════════════════════════════════════ */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

const FOUNDATION_DIR = 'foundation';
const CODE_EXT_RE = /\.(ts|tsx|js|jsx)$/i;

// ──────────────────────────────────────────────────────────────────────────────
// Copy Configuration Options
//  - mode: 'minimal' | 'auto'    (minimal = chart-specific files only; auto = fallback to broad copy)
//  - proxies: 'none' | 'passthrough' (passthrough creates re-export files for compatibility)
// ──────────────────────────────────────────────────────────────────────────────
// MortInject: copy-options
function resolveCopyOptions(opts = {}) {
  const mode = opts.mode === 'minimal' ? 'minimal' : 'auto';
  const proxies = opts.proxies === 'none' ? 'none' : 'passthrough';
  return { mode, proxies, writeProxies: proxies !== 'none' };
}

async function ensureDir(p) { await fsp.mkdir(p, { recursive: true }); }

/** Write a passthrough proxy at destSrc/<rel> that re-exports from foundation/<rel>. Idempotent. */
async function writeProxy(rel, { destSrc, writeProxies }) {
  if (!writeProxies) return; // MortInject: copy-proxies-off
  if (!CODE_EXT_RE.test(rel)) return;

  const proxyAbs = path.join(destSrc, rel);
  await ensureDir(path.dirname(proxyAbs));

  const targetAbs = path.join(destSrc, FOUNDATION_DIR, rel);
  const relToFoundation = path
    .relative(path.dirname(proxyAbs), targetAbs)
    .split(path.sep)
    .join('/');

  const content =
`// AUTO-GENERATED passthrough by Mortify
export * from '${relToFoundation}';
export { default } from '${relToFoundation}';
`;

  let prev = '';
  try { prev = await fsp.readFile(proxyAbs, 'utf8'); } catch {}
  if (prev !== content) await fsp.writeFile(proxyAbs, content, 'utf8');
}

/** Copy one file into foundation/<rel>, then (optionally) write a proxy at <rel>. */
async function copyFileIntoFoundation(rel, { upstreamRoot, destSrc, writeProxies }) {
  const from = path.join(upstreamRoot, rel);
  if (!fs.existsSync(from)) return false;

  const toReal = path.join(destSrc, FOUNDATION_DIR, rel);
  await ensureDir(path.dirname(toReal));
  await fsp.copyFile(from, toReal);

  await writeProxy(rel, { destSrc, writeProxies });
  return true;
}

/** Copy a dir tree into foundation/<dirRel>, mirroring subdirs; PNGs are skipped. */
async function copyDirIntoFoundation(dirRel, ctx) {
  const { upstreamRoot, destSrc } = ctx;
  const srcDir = path.join(upstreamRoot, dirRel);
  if (!fs.existsSync(srcDir)) throw new Error(`Upstream folder missing: ${srcDir}`);

  const dstRealDir = path.join(destSrc, FOUNDATION_DIR, dirRel);
  await ensureDir(dstRealDir);

  for (const entry of await fsp.readdir(srcDir)) {
    const sAbs = path.join(srcDir, entry);
    const rel = path.join(dirRel, entry);
    const stat = await fsp.lstat(sAbs);

    if (stat.isDirectory()) {
      await copyDirIntoFoundation(rel, ctx);
    } else {
      if (entry.toLowerCase().endsWith('.png')) continue;
      await copyFileIntoFoundation(rel, ctx);
    }
  }
}

/** Backwards-compatible helper; now writes into foundation + optional proxy. */
async function ensureCopyIfExists(rel, ctx) {
  return copyFileIntoFoundation(rel, ctx);
}

// ──────────────────────────────────────────────────────────────────────────────
// Minimal selective copy manifest
// MortInject: selective-copy-manifest
// ──────────────────────────────────────────────────────────────────────────────
const MINIMAL_SHARED_DIRS = ['components', 'utils'];
const MINIMAL_SHARED_FILES = ['constants.ts', 'defaults.ts', 'types.ts', 'controls.ts', 'controls.tsx'];

const TIMESERIES_CORE_FILES = [
  path.join('Timeseries', 'buildQuery.ts'),
  path.join('Timeseries', 'transformProps.ts'),
  path.join('Timeseries', 'transformers.ts'),
  path.join('Timeseries', 'types.ts'),
  path.join('Timeseries', 'constants.ts'),
  path.join('Timeseries', 'index.ts'),
  path.join('Timeseries', 'EchartsTimeseries.tsx'),
];

// ─────────────────────────────────────────────────────────────────────────────
// Minimal mirror: Pie core files (foundation/Pie/**) + Timeseries deps Pie references
// ─────────────────────────────────────────────────────────────────────────────
const PIE_CORE_FILES = [
  path.join('Pie', 'buildQuery.ts'),
  path.join('Pie', 'transformProps.ts'),
  path.join('Pie', 'types.ts'),
  path.join('Pie', 'constants.ts'),
  path.join('Pie', 'index.ts'),
  path.join('Pie', 'EchartsPie.tsx'),
  path.join('Pie', 'utils.ts'),
];
const PIE_THUMBNAIL = path.join('Pie', 'images', 'thumbnail.png');
// Dependencies some Pie files import via relative paths
const PIE_TIMESERIES_DEPS = [
  path.join('Timeseries', 'types.ts'),
  path.join('Timeseries', 'constants.ts'),
];

const VARIANT_CP_REL = {
  pie:     path.join('Pie', 'controlPanel.tsx'),
  bar:     path.join('Timeseries', 'Regular', 'Bar', 'controlPanel.tsx'),
  line:    path.join('Timeseries', 'Regular', 'Line', 'controlPanel.tsx'),
  smooth:  path.join('Timeseries', 'Regular', 'SmoothLine', 'controlPanel.tsx'),
  step:    path.join('Timeseries', 'Step', 'controlPanel.tsx'),
  scatter: path.join('Timeseries', 'Regular', 'Scatter', 'controlPanel.tsx'),
  area:    path.join('Timeseries', 'Area', 'controlPanel.tsx'),
};

async function copyDirShallow(rel, ctx) {
  const { upstreamRoot, destSrc } = ctx;
  const srcDir = path.join(upstreamRoot, rel);
  if (!fs.existsSync(srcDir)) return false;

  const dstRealDir = path.join(destSrc, FOUNDATION_DIR, rel);
  await ensureDir(dstRealDir);

  for (const entry of await fsp.readdir(srcDir)) {
    const s = path.join(srcDir, entry);
    const relPath = path.join(rel, entry);
    const stat = await fsp.lstat(s);

    if (stat.isDirectory()) {
      await copyDirIntoFoundation(relPath, ctx);
    } else {
      if (entry.toLowerCase().endsWith('.png')) continue;
      await copyFileIntoFoundation(relPath, ctx);
    }
  }
  return true;
}

// Shallow-copy shared utils; for Pie, include series.ts and point it at root ../types
async function copyUtilsShallowWithPiePatch(ctx, variant) {
  const dirRel = 'utils';
  const dirAbs = path.join(ctx.upstreamRoot, dirRel);
  if (!fs.existsSync(dirAbs)) return;

  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.isDirectory()) {
      await copyDirIntoFoundation(path.join(dirRel, ent.name), ctx);
      continue;
    }
    if (ent.isFile()) {
      const rel = path.join(dirRel, ent.name);
      await copyFileIntoFoundation(rel, ctx);

if (String(variant).toLowerCase() === 'pie' && ent.name === 'series.ts') {
  const seriesAbs = path.join(ctx.destSrc, 'foundation', dirRel, ent.name);
  if (fs.existsSync(seriesAbs)) {
    const raw = fs.readFileSync(seriesAbs, 'utf8');
    // If the file imports EchartsTimeseriesSeriesType from ../types, add a dedicated import from ../Timeseries/types
    let next = raw;
    if (/EchartsTimeseriesSeriesType/.test(next)) {
      // ensure we have a direct import from ../Timeseries/types
      if (!/from\s+['"]\.\.\/Timeseries\/types['"]/.test(next)) {
        next = `import { EchartsTimeseriesSeriesType } from '../Timeseries/types';\n` + next;
      }
      // and remove EchartsTimeseriesSeriesType from any ../types import list
      next = next.replace(
        /import\s*\{\s*([^}]*)\}\s*from\s*['"]\.\.\/types['"]\s*;/g,
        (m, names) => {
          const cleaned = names
            .split(',')
            .map(s => s.trim())
            .filter(n => n && n !== 'EchartsTimeseriesSeriesType')
            .join(', ');
          return cleaned
            ? `import { ${cleaned} } from '../types';`
            : ``;
        }
      );
    }
    if (next !== raw) fs.writeFileSync(seriesAbs, next, 'utf8');
  }
}

    }
  }
}







async function copySelectedMinimal({ upstreamRoot, destSrc, variant, proxies = 'none' }) {
  // Shared context & helpers
  const ctx = {
    upstreamRoot,
    destSrc,
    proxies, // 'none' | 'passthrough'
  };

  // 1) Shared dirs/files everyone expects (components/, utils/, root constants/defaults/types/controls)
  for (const dir of MINIMAL_SHARED_DIRS) {
    const abs = path.join(upstreamRoot, dir);
    if (!fs.existsSync(abs)) continue;

    if (dir === 'utils') {
      await copyUtilsShallowWithPiePatch(ctx, variant);
    } else {
      await copyDirShallow(path.join(dir), ctx);
    }
  }
  for (const rel of MINIMAL_SHARED_FILES) {
    const abs = path.join(upstreamRoot, rel);
    if (fs.existsSync(abs)) {
      await copyFileIntoFoundation(rel, ctx);
    }
  }

  // 2) Variant control panel (placed under foundation/**/<variant path> for later rewire)
  const cpRel = VARIANT_CP_REL[String(variant || '').toLowerCase()];
  if (!cpRel) {
    console.warn(`! Unknown or unsupported variant "${variant}" for minimal copy; refusing fallback in minimal mode.`);
    return false;
  }
  const cpAbs = path.join(upstreamRoot, cpRel);
  if (!fs.existsSync(cpAbs)) {
    throw new Error(`Variant controlPanel not found at ${cpAbs}`);
  }
  await copyFileIntoFoundation(cpRel, ctx);

  // 3) Family-specific core mirror
  const v = String(variant || '').toLowerCase();

  if (v === 'pie') {
    // Copy core Pie files into foundation/Pie/**
    for (const rel of PIE_CORE_FILES) {
      const abs = path.join(upstreamRoot, rel);
      if (!fs.existsSync(abs)) {
        throw new Error(`Missing required Pie upstream file: ${abs}`);
      }
      await copyFileIntoFoundation(rel, ctx);
    }

    // Also copy Timeseries deps that Pie references via relative paths
    for (const rel of PIE_TIMESERIES_DEPS) {
      const abs = path.join(upstreamRoot, rel);
      if (!fs.existsSync(abs)) {
        throw new Error(`Missing required Pie dependency: ${abs}`);
      }
      await copyFileIntoFoundation(rel, ctx);
    }
    
    // Copy minimal image (thumbnail only)
    const thumbAbs = path.join(upstreamRoot, PIE_THUMBNAIL);
    if (fs.existsSync(thumbAbs)) {
      await copyFileIntoFoundation(PIE_THUMBNAIL, ctx);
    } else {
      console.warn(`! Pie thumbnail missing at ${thumbAbs} (continuing)`);
    }

  

    // Sanity check: ensure key file exists after copy
    const mustExist = path.join(destSrc, 'foundation', 'Pie', 'EchartsPie.tsx');
    if (!fs.existsSync(mustExist)) {
      throw new Error(`Minimal Pie copy failed (missing ${mustExist})`);
    }

    return true;
  }

  // Default: Timeseries family (bar/line/smooth/step/scatter/area)
  {
    for (const rel of TIMESERIES_CORE_FILES) {
      const abs = path.join(upstreamRoot, rel);
      if (!fs.existsSync(abs)) {
        throw new Error(`Missing required Timeseries upstream file: ${abs}`);
      }
      await copyFileIntoFoundation(rel, ctx);
    }

    // Sanity check
    const mustExist = path.join(destSrc, 'foundation', 'Timeseries', 'EchartsTimeseries.tsx');
    if (!fs.existsSync(mustExist)) {
      throw new Error(`Minimal Timeseries copy failed (missing ${mustExist})`);
    }

    return true;
  }
}


// ──────────────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────────────
module.exports.copySelected = async function copySelected({ upstreamRoot, destSrc, variant, mode, proxies }) {
  const { writeProxies, mode: effMode } = resolveCopyOptions({ mode, proxies });
  const ctx = { upstreamRoot, destSrc, writeProxies };

  // Prefer minimal copy if variant is provided
  if (variant) {
    const ok = await copySelectedMinimal({ upstreamRoot, destSrc, variant, writeProxies })
      .catch(e => { console.warn('! Minimal copy failed:', e.message); return false; });

    if (ok) return;

    if (effMode === 'minimal') {
      // MortInject: copy-mode-minimal-strict
      throw new Error('Minimal copy failed and mode is "minimal"; refusing broad fallback.');
    }
    console.warn('! Falling back to broad copy (Timeseries + optional MixedTimeseries).');
  }

  // Broad copy (foundation-only; proxies controlled by flag)
  await copyDirIntoFoundation('Timeseries', ctx);

  for (const maybe of ['components', 'utils']) {
    if (fs.existsSync(path.join(upstreamRoot, maybe))) {
      await copyDirIntoFoundation(maybe, ctx);
    }
  }

  if (fs.existsSync(path.join(upstreamRoot, 'MixedTimeseries'))) {
    await copyDirIntoFoundation('MixedTimeseries', ctx);
  }

  for (const f of ['constants.ts', 'defaults.ts', 'types.ts']) {
    await ensureCopyIfExists(f, ctx);
  }

  // controls.* can be .ts or .tsx depending on branch
  const controlsCandidates = ['controls.ts', 'controls.tsx'];
  let copied = false;
  for (const c of controlsCandidates) {
    if (await ensureCopyIfExists(c, ctx)) { copied = true; break; }
  }
  if (!copied) {
    console.warn('! controls.ts/tsx not found upstream; some controlPanels may fail to import ../../../controls');
  }

  // Sanity check (helps catch wrong upstreamRoot)
  if (!fs.existsSync(path.join(upstreamRoot, 'Timeseries', 'buildQuery.ts'))) {
    throw new Error('Timeseries/buildQuery.ts not found upstream');
  }
};
