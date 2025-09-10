/* ════════════════════════════════════════════════════════════════════════════
   prompts.cjs — Mortify Interactive Multi-Series Chart Generator Prompts
   
   Purpose:
     - Provide interactive CLI prompts for multi-series chart plugin generation
     - Support 3-series configuration with dynamic color management
     - Enable section-based module selection (Tooltip, Style, Legend, Labels, Animation)
     - Handle both chart families: Multi-series Timeseries and single-series Pie
   
   Multi-Series Features:
     - 3-series support with per-series color input
     - Hex validation and default fallbacks for colors
     - Section-first approach groups related modules for intuitive selection
   
   Interactive Flow:
     1. Basic plugin metadata (name, description, variant)
     2. Section selection (All/Choose specific/None)
     3. Color specification (3 hex colors for series)
     4. Build options and final confirmation
   
   Architecture:
     - Robust validation with fallback defaults for color specification
     - Module grouping by functional sections for organized selection
     - Section-to-module mapping with applicability filtering per chart variant
════════════════════════════════════════════════════════════════════════════ */
const path = require('path');
const os = require('os');
const { MODULES } = require('./modules/index.cjs');

let prompts;
try {
  prompts = require('prompts');
} catch {
  console.error('\nThis generator requires the "prompts" package for interactive UI.\n');
  console.error('Install it with:  npm i prompts\n');
  process.exit(1);
}

/* ── tiny helpers ─────────────────────────────────────────────────────────── */
const C = {
  cyan: s => `\x1b[36m${s}\x1b[0m`,
  bold: s => `\x1b[1m${s}\x1b[0m`,
  dim: s => `\x1b[2m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  green: s => `\x1b[32m${s}\x1b[0m`,
};
function banner() {
  console.log(C.cyan(`
╔═══════════════════════╗
║  Mortify Your Charts  ║
╚═══════════════════════╝
`));
}
function defaultSupersetRoot() {
  return path.join(os.homedir(), 'superset');
}
function toKebab(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ── variants (restricted) ────────────────────────────────────────────────── */
const VARIANTS = [
  { title: 'Echarts Timeseries Line/Bar/Step/Scatter', value: 'line' },
  { title: 'Pie', value: 'pie' },
];

/* ── grouping: infer a section name for each module ───────────────────────── */
const DEFAULT_SECTIONS = ['Style', 'Legend', 'Tooltip', 'Values', 'Axis', 'Grid', 'Animation'];
function inferSection(mod) {
  // Prefer explicit section name if module defines one
  if (mod?.section?.name) return mod.section.name;
  const label = String(mod?.label || '');
  const id = String(mod?.id || '');
  
  // Check label and id patterns for proper section mapping
  if (/^tooltip/i.test(label)) return 'Tooltip';
  if (/^legend/i.test(label)) return 'Legend';
  if (/^values/i.test(label) || /^values-/i.test(id)) return 'Values';
  if (/^animation/i.test(label) || /^ani-/i.test(id)) return 'Animation';
  if (/^axis/i.test(label) || /^axis-/i.test(id)) return 'Axis';
  if (/^grid/i.test(label) || /^grid-/i.test(id)) return 'Grid';
  
  // fall back to Style (most cosmetic modules)
  return 'Style';
}
function appliesToVariant(mod, variant) {
  const a = Array.isArray(mod?.appliesTo) ? mod.appliesTo : [];
  return a.includes(variant) || a.includes('all');
}
function groupModulesBySection(variant) {
  const groups = new Map(DEFAULT_SECTIONS.map(s => [s, []]));
  for (const m of MODULES) {
    if (!appliesToVariant(m, variant)) continue;
    const sec = inferSection(m);
    if (!groups.has(sec)) groups.set(sec, []);
    groups.get(sec).push(m);
  }
  // sort modules within each section by label for a tidy display
  for (const sec of groups.keys()) {
    groups.get(sec).sort((a, b) => String(a.label || '').localeCompare(String(b.label || '')));
  }
  return groups;
}

/* ── main prompt flow ─────────────────────────────────────────────────────── */
async function askQuestions() {
  banner();

  /** @type {import('prompts').PromptObject[]} */
  const questions = [
    {
      type: 'text',
      name: 'supersetRoot',
      message: C.cyan('Superset Repo'),
      initial: defaultSupersetRoot(),
      validate: v => (String(v || '').trim() ? true : 'Required'),
    },
    {
      type: 'text',
      name: 'displayName',
      message: C.cyan('Display Name'),
      initial: '',
      validate: v => (String(v || '').trim() ? true : 'Required'),
    },
    {
      type: 'text',
      name: 'pluginFolder',
      message: C.cyan('Folder'),
      initial: (prev, values) => toKebab(values.displayName || ''),
    },
    {
      type: 'text',
      name: 'packageName',
      message: C.cyan('Package Name (npm-style, kebab-case)'),
      initial: (prev, values) => toKebab(values.displayName || ''),
      validate: v => (/^[a-z0-9-]+$/.test(String(v || '')) ? true : 'Use lowercase letters, numbers, and hyphens'),
    },
    {
      type: 'text',
      name: 'description',
      message: C.cyan('Description'),
      initial: '',
    },
    {
      type: 'select',
      name: 'variant',
      message: C.cyan('Chart Variant'),
      choices: VARIANTS.map(v => ({ title: v.title, value: v.value })),
      initial: 0,
    },
    {
      type: 'text',
      name: 'thumbnailPath',
      message: C.cyan('Optional thumbnail path (leave blank to skip)'),
      initial: '',
    },
    {
      type: 'list',
      name: 'tags',
      message: C.cyan('Tags (comma-separated)'),
      initial: '',
      separator: ',',
    },

    // ── sections selection: All / Choose / None ─────────────────────────────
    {
      type: 'select',
      name: 'sectionMode',
      message: C.cyan('Sections to include'),
      choices: [
        { title: 'All', value: 'all' },
        { title: 'Choose…', value: 'choose' },
        { title: 'None', value: 'none' },
      ],
      initial: 0,
    },
    {
      // If "Choose", show the sections as the *only* selectable items.
      // Under each section title, show a dim description listing the modules that will be included.
      type: (prev, values) => (values.sectionMode === 'choose' ? 'multiselect' : null),
      name: 'sections',
      message: C.cyan('Select sections (space = select, enter = confirm)'),
      instructions: false,
      choices: (prev, values) => {
        const variant = values.variant || 'line';
        const groups = groupModulesBySection(variant);
        // Build a choice per section; disabled (none) sections are hidden
        const items = [];
        for (const sec of DEFAULT_SECTIONS) {
          const mods = groups.get(sec) || [];
          if (!mods.length) continue; // hide empty sections for the chosen chart
          
          // Create a formatted list with colored module names
          const moduleList = mods.map(m => C.yellow(m.label || m.id)).join(C.dim(', '));
          const count = C.green(`(${mods.length})`);
          const description = mods.length > 0 
            ? C.dim(`Modules: `) + moduleList + ` ${count}`
            : C.dim('No modules available');
          
          items.push({
            title: C.bold(sec),
            value: sec,
            description: description,
          });
        }
        return items;
      },
      hint: C.dim('Pick whole sections; the listed modules will be included automatically.'),
    },

    // ── Series colors: always 3 hex colors ──────────────────────────────────
    {
      type: 'list',
      name: 'seriesColors',
      message: C.cyan('Enter 3 hex colors for your series (comma-separated)'),
      initial: '#30baac, #ba9c30, #3050ba',
      separator: ',',
      validate: (value) => {
        const colors = Array.isArray(value) ? value : String(value || '').split(',').map(s => s.trim());
        
        if (colors.filter(c => c).length !== 3) {
          return 'Please provide exactly 3 colors';
        }
        
        const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        for (const color of colors) {
          const trimmed = String(color || '').trim();
          if (trimmed && !hexPattern.test(trimmed)) {
            return `"${trimmed}" is not a valid hex color (use format #30baac)`;
          }
        }
        return true;
      },
    },

    // ── Legacy default color (kept for backwards compatibility) ─────────────────
    {
      type: null, // Hidden but keep in data structure
      name: 'defaultColor',
      initial: '#30baac',
    },

  ];

  const raw = await prompts(questions, {
    onCancel: () => {
      console.log(C.dim('\nCancelled.\n'));
      process.exit(1);
    },
  });

  // Normalize
  const displayName = String(raw.displayName || '').trim() || 'Custom Chart';
  const pluginFolder = String(raw.pluginFolder || '').trim() || toKebab(displayName);
  const packageName = String(raw.packageName || '').trim() || toKebab(displayName);
  const supersetRoot = String(raw.supersetRoot || '').trim() || defaultSupersetRoot();
  const description = String(raw.description || '').trim();
  const variant = String(raw.variant || 'line').trim();
  const thumbnailPath = String(raw.thumbnailPath || '').trim();
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map(s => String(s || '').trim()).filter(Boolean)
    : String(raw.tags || '').split(',').map(s => s.trim()).filter(Boolean);
  const defaultColor = String(raw.defaultColor || '#30baac').trim();
  const seriesCount = 3; // Always support 3 series
  
  // Process series colors
  const seriesColors = Array.isArray(raw.seriesColors) 
    ? raw.seriesColors.map(s => String(s || '').trim()).filter(Boolean)
    : String(raw.seriesColors || '').split(',').map(s => s.trim()).filter(Boolean);
  
  // Ensure we have the right number of colors, fill with defaults if needed
  const defaultColors = ['#30baac', '#ba9c30', '#3050ba'];
  while (seriesColors.length < seriesCount) {
    const index = seriesColors.length % defaultColors.length;
    seriesColors.push(defaultColors[index]);
  }
  seriesColors.splice(seriesCount); // Trim to exact count

  // Sections → modules
  const groups = groupModulesBySection(variant);
  /** @type {string[]} */
  let selectedSections = [];
  const mode = String(raw.sectionMode || 'all');
  if (mode === 'all') {
    selectedSections = DEFAULT_SECTIONS.filter(sec => (groups.get(sec) || []).length > 0);
  } else if (mode === 'none') {
    selectedSections = [];
  } else {
    selectedSections = Array.isArray(raw.sections) ? raw.sections : [];
  }

  // Flatten selected groups into moduleIds (dedupe)
  const moduleIdSet = new Set();
  for (const sec of selectedSections) {
    const mods = groups.get(sec) || [];
    for (const m of mods) moduleIdSet.add(m.id);
  }
  const moduleIds = Array.from(moduleIdSet);

  return {
    supersetRoot,
    displayName,
    pluginFolder,
    packageName,
    description,
    variant,
    thumbnailPath,
    tags,
    defaultColor,
    seriesCount,
    seriesColors,
    moduleIds,
  };
}

module.exports = {
  askQuestions,
  VARIANTS,
  toKebab,
};
