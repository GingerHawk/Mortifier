// modules/legend/legend-border.cjs
const path = require('path');

module.exports = {
  id: 'legend-border',
  label: 'Legend - Border',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 530,

  files: [
    {
      template: path.join('legend', 'legend-border.tsx'),
      dest: path.join('src', 'plugin', 'legend', 'legend-border.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','legend','legend-border').replace(/\\/g,'/'),
      names: [
        'legendBorderEnabled',
        'legendBorderControls',
        'legendBorderColor',
        'legendBorderWidth',
        'legendBorderType',
        'legendBorderRadius',
      ],
      stamp: '/* MortModule: legend-border import */',
    },
    section: {
      tab: 'customize',
      label: 'Legend',
      stamp: '/* MortModule: legend-border section */',
      rows: [
        `<SubHeader label={t('Border')} tip={t('Sets the legend border’s color, width, style, and corner radius.')} />`,
        'legendBorderEnabled',
        'legendBorderControls',
        'legendBorderColor',
        'legendBorderWidth',
        'legendBorderType',
        'legendBorderRadius',
      ],
    },
  },
needs: ['rgba','asNumber'],
  transformProps: {
    snippetStamp: '/* MortModule: legend-border logic */',
    snippet: `/* MortModule: legend-border logic */
(function applyLegendBorder() {
  if (!(formData && (formData).legendBorderEnabled)) return;

  const c = (formData).legendBorderColor;
  const w = asNumber((formData).legendBorderWidth);
  const type = (formData).legendBorderType;
  const radius = asNumber((formData).legendBorderRadius);

  mapArrayProp(options, 'legend', (legend) => {
    const next = { ...legend };

    if (c && typeof c === 'object') next.borderColor = rgba(c);
    if (Number.isFinite(w)) next.borderWidth = w;
    if (type) next.borderType = type;
    if (Number.isFinite(radius)) next.borderRadius = radius;

    return next;
  });
})();
`.trim(),
  },
};
