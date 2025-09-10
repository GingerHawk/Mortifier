// modules/pie-shadow.cjs
const path = require('path');

module.exports = {
  id: 'pie-shadow',
  label: 'Pie Shadow',
  appliesTo: ['pie'],
  order: 120,

  files: [
    {
      template: path.join('pie', 'pie-shadow.tsx'),
      dest: path.join('src', 'plugin', 'pie', 'pie-shadow.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'pie', 'pie-shadow').replace(/\\\\/g, '/'),
      names: [
        'pieShadowEnabled',
        'pieShadowControls',
        'pieShadowColor',
        'pieShadowBlur',
        'pieShadowOffsetX',
        'pieShadowOffsetY',
      ],
      stamp: '/* MortModule: pie-shadow import */',
    },
    section: {
      tab: 'customize',
      label: 'Style',
      stamp: '/* MortModule: pie-shadow section */',
      rows: [
        `<SubHeader label={t('Shadow')} tip={t('Adds a drop shadow effect to the pie slices.')} />`,
        'pieShadowEnabled',
        'pieShadowControls',
        'pieShadowColor',
        'pieShadowBlur',
        'pieShadowOffsetX',
        'pieShadowOffsetY',
      ],
    },
  },
needs: ['mapSeries', 'asNumber', 'rgba'],
  transformProps: {
    snippetStamp: '/* MortModule: pie-shadow logic */',
    snippet: `/* MortModule: pie-shadow logic */
(function applyPieShadow() {
  if (!(formData && (formData as any).pieShadowEnabled)) return;

  const fd = (formData as any);

  mapSeries(options, (s) => s && s.type === 'pie', (s) => {
    const next = { ...s };
    next.itemStyle = { ...(s.itemStyle || {}) };

    const c = fd.pieShadowColor;
    const blur = asNumber(fd.pieShadowBlur);
    const offX = asNumber(fd.pieShadowOffsetX);
    const offY = asNumber(fd.pieShadowOffsetY);
    const color = rgba(c);
    
    if (color) next.itemStyle.shadowColor = color;
    if (Number.isFinite(blur)) next.itemStyle.shadowBlur = blur;
    if (Number.isFinite(offX)) next.itemStyle.shadowOffsetX = offX;
    if (Number.isFinite(offY)) next.itemStyle.shadowOffsetY = offY;
    
    return next;
  });
})();
`.trim(),
  },
};
