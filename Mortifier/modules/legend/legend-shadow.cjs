// modules/legend/legend-shadow.cjs
const path = require('path');

module.exports = {
  id: 'legend-shadow',
  label: 'Legend - Shadow',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 510,

  files: [
    {
      template: path.join('legend', 'legend-shadow.tsx'),
      dest: path.join('src', 'plugin', 'legend', 'legend-shadow.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','legend','legend-shadow').replace(/\\/g,'/'),
      names: [
        'legendShadowEnabled',
        'legendShadowControls',
        'legendShadowColor',
        'legendShadowBlur',
        'legendShadowOffsetX',
        'legendShadowOffsetY',
      ],
      stamp: '/* MortModule: legend-shadow import */',
    },
    section: {
      tab: 'customize',
      label: 'Legend',
      stamp: '/* MortModule: legend-shadow section */',
      rows: [
        `<SubHeader label={t('Shadow')} tip={t('Adds a drop shadow effect behind the legend box.')} />`,
        'legendShadowEnabled',
        'legendShadowControls',
        'legendShadowColor',
        'legendShadowBlur',
        'legendShadowOffsetX',
        'legendShadowOffsetY',
      ],
    },
  },
needs: ['rgba','asNumber'], 
  transformProps: {
    snippetStamp: '/* MortModule: legend-shadow logic */',
    snippet: `/* MortModule: legend-shadow logic */
(function applyLegendShadow() {
  if (!(formData && (formData).legendShadowEnabled)) return;

  const c = (formData).legendShadowColor;
  const blur = asNumber((formData).legendShadowBlur);
  const ox = asNumber((formData).legendShadowOffsetX);
  const oy = asNumber((formData).legendShadowOffsetY);

  mapArrayProp(options, 'legend', (legend) => { 
    const next = { ...legend };

    if (c && typeof c === 'object') next.shadowColor = rgba(c);
    if (Number.isFinite(blur)) next.shadowBlur = blur;
    if (Number.isFinite(ox)) next.shadowOffsetX = ox;
    if (Number.isFinite(oy)) next.shadowOffsetY = oy;

    return next;
  });
})();
`.trim(),
  },
};
