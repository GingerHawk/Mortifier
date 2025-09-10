// modules/grid-posDim.cjs
const path = require('path');

module.exports = {
  id: 'grid-posDim',
  label: 'Grid - Position & Size',
  appliesTo: ['bar', 'line', 'area', 'scatter', ],
  order: 720,

  files: [
    {
      template: path.join('grid', 'grid-posDim.tsx'),
      dest: path.join('src', 'plugin', 'grid', 'grid-posDim.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'grid', 'grid-posDim').replace(/\\/g, '/'),
      names: [
        'gridEnabled',
        'gridControls',
        'gridContainLabel',
        'gridX',
        'gridY',
        'gridWidthPct',
        'gridHeightPct',
      ],
      stamp: '/* MortModule: grid-posDim import */',
    },
    section: {
      tab: 'customize',
      label: 'Grid',
      stamp: '/* MortModule: grid-posDim section */',
      rows: [
        `<SubHeader label={t('Position & Size')} tip={t('Controls grid position and size relative to the chart canvas.')} />`,
        'gridEnabled',
        'gridControls',
        'gridContainLabel',
        'gridX',
        'gridY',
        'gridWidthPct',
        'gridHeightPct',
      ],
    },
  },
needs: ['asNumber', 'pct100'],
  transformProps: {
    snippetStamp: '/* MortModule: grid-posDim logic */',
    snippet: `/* MortModule: grid-posDim logic */
(function applyGridPosDim() {
  if (!(formData && (formData).gridEnabled)) return;

  mapArrayProp(options, 'grid', (g) => {
    const next = { ...g };
    next.containLabel = !!(formData as any).gridContainLabel;
    if ('right' in next) delete next.right;
    if ('bottom' in next) delete next.bottom;

    const x = asNumber((formData as any).gridX, next.left);
    const y = asNumber((formData as any).gridY, next.top);
    if (Number.isFinite(x)) next.left = x;
    if (Number.isFinite(y)) next.top  = y;

    const wp = asNumber((formData as any).gridWidthPct, NaN);
    const hp = asNumber((formData as any).gridHeightPct, NaN);
    if (Number.isFinite(wp)) next.width  = pct100(wp) + '%';
    if (Number.isFinite(hp)) next.height = pct100(hp) + '%';

    return next;
  });
})();
`.trim(),
  },
};
