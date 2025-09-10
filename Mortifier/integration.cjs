/* ════════════════════════════════════════════════════════════════════════════
   integration.cjs — Mortify Superset Integration & Registration System
   
   Purpose:
     - Integrate generated multi-series plugins into Superset monorepo structure
     - Patch TypeScript configuration for custom plugin compilation
     - Register plugins in MainPreset for runtime discovery and loading
     - Handle both array-based and eager registration patterns
   
   Multi-Series Plugin Integration:
     - Automatic tsconfig.json patching to include plugins/Mort-Viz directory
     - Plugin class registration in MainPreset with timestamp tracking
     - Support for both plugins: [...] array and eager .register() patterns
     - Idempotent operations prevent duplicate registrations
   
   Key Integration Features:
     - JSONC (JSON with comments) parsing for robust tsconfig handling
     - MainPreset auto-discovery across .ts/.tsx/.js file variants
     - Relative import path calculation for plugin references
     - Timestamp-based registration tracking for regeneration detection
   
   Architecture:
     - Preserve existing MainPreset structure and imports
     - Non-destructive patching with fallback mechanisms
     - Cross-platform path handling for monorepo plugin references
     - Hot reload compatibility through proper module registration
════════════════════════════════════════════════════════════════════════════ */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function nowStamp(displayName) {
  const d = new Date();
  const m = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const ord = (n => (n % 10 === 1 && n % 100 !== 11 ? 'st' :
                     n % 10 === 2 && n % 100 !== 12 ? 'nd' :
                     n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th'))(day);
  const time = d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  return `${displayName} Installed on ${m} ${day}${ord} ${time}`;
}

// robust JSONC => JSON parse
function parseJsonc(text) {
  const noBlock = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const noLine = noBlock.replace(/(^|[^:])\/\/.*$/gm, '$1');
  const noTrailing = noLine.replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(noTrailing);
}
function patchTsconfigIncludeAndExclude(feRoot) {
  const tsconfigPath = path.join(feRoot, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    console.warn('! tsconfig.json not found; skipping include/exclude patch');
    return;
  }
  
  const raw = fs.readFileSync(tsconfigPath, 'utf8');
  const MORT_VIZ_MARKER = '// MORTIFIER: Custom plugin directory - remove this line and "plugins/Mort-Viz" from include to disable';
  
  // Skip if already patched (check for explicit entries or MORTIFIER comment)
  if (raw.includes('plugins/Mort-Viz') || raw.includes('MORTIFIER:')) {
    console.log('• tsconfig.json already configured for Mort-Viz plugins');
    return;
  }
  
  try {
    const data = parseJsonc(raw);
    let modified = false;
    
    // Add plugins/Mort-Viz to include array
    const inc = Array.isArray(data.include) ? data.include : (data.include ? [data.include] : ['src']);
    if (!inc.includes('plugins/Mort-Viz')) {
      inc.push('plugins/Mort-Viz');
      data.include = inc;
      modified = true;
    }
    
    // Remove any exclude patterns that block plugins/*
    if (Array.isArray(data.exclude)) {
      const originalLength = data.exclude.length;
      data.exclude = data.exclude.filter(e => !(typeof e === 'string' && e.startsWith('plugins')));
      if (data.exclude.length !== originalLength) {
        modified = true;
        console.log('• Removed plugins/* exclusions from tsconfig.json');
      }
    }
    
    if (modified) {
      // Add marker comment and write file
      const jsonStr = JSON.stringify(data, null, 2);
      const withComment = jsonStr.replace('  "include":', `  ${MORT_VIZ_MARKER}\n  "include":`);
      fs.writeFileSync(tsconfigPath, withComment + '\n', 'utf8');
      console.log('• tsconfig.json patched to include plugins/Mort-Viz');
    }
    
  } catch (e) {
    console.warn('! tsconfig.json parsing failed:', e.message);
    console.warn('! Please manually add "plugins/Mort-Viz" to the include array in tsconfig.json');
  }
}

function findMainPreset(feRoot) {
  const candidates = [
    path.join(feRoot, 'src', 'visualizations', 'presets', 'MainPreset.ts'),
    path.join(feRoot, 'src', 'visualizations', 'presets', 'MainPreset.tsx'),
    path.join(feRoot, 'src', 'visualizations', 'presets', 'MainPreset.js'),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  throw new Error('MainPreset file not found (looked for ts/tsx/js).');
}

function relImportFromMainPreset(monorepoDir, feRoot) {
  const from = path.join(feRoot, 'src', 'visualizations', 'presets');
  const to = path.join(monorepoDir, 'src');
  let rel = path.relative(from, to).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

function patchMainPreset({ feRoot, monorepoDir, className, vizKey, displayName }) {
  const file = findMainPreset(feRoot);
  let src = fs.readFileSync(file, 'utf8');
  const importPath = relImportFromMainPreset(monorepoDir, feRoot);
  const stamp = nowStamp(displayName);

  const importLine = `import ${className} from '${importPath}'; // ${stamp}`;
  const regLineInArray = `    new ${className}().configure({ key: '${vizKey}' }), // ${stamp}`;
  const eagerRegisterLine = `new ${className}().configure({ key: '${vizKey}' }).register(); // ${stamp} (eager)`;

  // 1) Ensure import (idempotent)
  if (!new RegExp(`import\\s+${className}\\s+from\\s+['"]${importPath}['"]`).test(src)) {
    const lastImportIdx = src.lastIndexOf('import ');
    if (lastImportIdx >= 0) {
      const nextNL = src.indexOf('\n', lastImportIdx);
      src = src.slice(0, nextNL + 1) + importLine + '\n' + src.slice(nextNL + 1);
    } else {
      src = importLine + '\n' + src;
    }
    console.log(`• MainPreset: added import for ${className}`);
  } else if (!src.includes(`// ${stamp}`)) {
    src = src.replace(
      new RegExp(`(import\\s+${className}\\s+from\\s+['"]${importPath}['"];).*`),
      `$1 // ${stamp}`
    );
  }

  // 2) Try to inject into plugins: [ ... ] if present
  let placedInArray = false;
  const pluginsArrayIdx = src.search(/plugins\s*:\s*\[/m);
  if (pluginsArrayIdx !== -1) {
    // find the matching ']' for that '[' (simple bracket depth walk)
    const openIdx = src.indexOf('[', pluginsArrayIdx);
    if (openIdx !== -1) {
      let i = openIdx + 1, depth = 1;
      while (i < src.length && depth > 0) {
        const ch = src[i];
        if (ch === '[') depth++;
        else if (ch === ']') depth--;
        i++;
      }
      const closeIdx = i - 1;
      if (closeIdx > openIdx) {
        const before = src.slice(0, closeIdx);
        const after = src.slice(closeIdx);
        if (!before.includes(`new ${className}().configure`)) {
          src = before + '\n' + regLineInArray + '\n' + after;
          placedInArray = true;
          console.log('• MainPreset: registered plugin in plugins array');
        } else if (!before.includes(`// ${stamp}`)) {
          src = src.replace(
            new RegExp(`(new\\s+${className}\\(\\)\\.configure\\(\\{\\s*key:\\s*['"]${vizKey}['"]\\s*\\}\\s*\\),?)(.*)`),
            `$1 // ${stamp}`
          );
          placedInArray = true;
        } else {
          placedInArray = true;
        }
      }
    }
  }

  // 3) Fallback: eager register right after import if not in array
  if (!placedInArray) {
    if (!src.includes(eagerRegisterLine)) {
      // insert after our import (or at top if import not found for some reason)
      const impRe = new RegExp(`import\\s+${className}\\s+from\\s+['"]${importPath}['"].*\\n`);
      const m = impRe.exec(src);
      if (m) {
        const idx = m.index + m[0].length;
        src = src.slice(0, idx) + eagerRegisterLine + '\n' + src.slice(idx);
      } else {
        src = eagerRegisterLine + '\n' + src;
      }
      console.log('• MainPreset: injected eager register (fallback)');
    }
  }

  fs.writeFileSync(file, src, 'utf8');
  return file;
}


function printNextSteps({ feRoot, monorepoDir }) {
  console.log('\n✅ Plugin scaffolded in the monorepo.');
  console.log('Next: start the FE dev server (hot reload will pick up your plugin):');
  console.log(`  cd "${feRoot}" && npm run dev\n`);
  console.log('Edit your plugin at:');
  console.log(`  ${path.join(monorepoDir, 'src')}\n`);
}

module.exports = { patchTsconfigIncludeAndExclude, patchMainPreset, printNextSteps };
