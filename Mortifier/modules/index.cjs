// modules/index.cjs
// Auto-discovers every module file recursively (except this file).

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function walkCjsFiles(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      out.push(...walkCjsFiles(abs));
      continue;
    }
    if (!name.endsWith('.cjs')) continue;
    // Skip this index file
    if (path.resolve(abs) === path.resolve(__filename)) continue;
    out.push(abs);
  }
  return out;
}

function collectModules() {
  const files = walkCjsFiles(ROOT);
  const found = [];

  for (const file of files) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const mod = require(file);

    // Allow: module.exports = { id, ... }
    if (mod && typeof mod === 'object' && mod.id) {
      found.push(mod);
      continue;
    }

    // Allow multiple named exports: module.exports.foo = {...}, module.exports.bar = {...}
    if (mod && typeof mod === 'object') {
      for (const v of Object.values(mod)) {
        if (v && typeof v === 'object' && v.id) {
          found.push(v);
        }
      }
      continue;
    }

    // Otherwise ignore silently (keeps the scanner robust)
  }

  // Optional: sort by order (stable)
  found.sort((a, b) => {
    const ao = Number.isFinite(a.order) ? a.order : 0;
    const bo = Number.isFinite(b.order) ? b.order : 0;
    return ao - bo;
  });

  return found;
}

const MODULES = collectModules();
module.exports = { MODULES };
