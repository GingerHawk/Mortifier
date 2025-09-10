// modules/tooltip-shadow.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-shadow',
  label: 'Tooltip - Shadow',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 220,

  files: [
    {
      template: path.join('tooltip', 'tooltip-shadow.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-shadow.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-shadow').replace(/\\\\/g, '/'),
      names: [
        'tooltipShadowEnabled',
        'tooltipShadowControls',
        'tooltipShadowColor',
        'tooltipShadowOpacity',
        'tooltipShadowBlur',
        'tooltipShadowOffsetX',
        'tooltipShadowOffsetY',
      ],
      stamp: '/* MortModule: tooltip-shadow import */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-shadow section */',
      rows: [
        `<SubHeader label={t('Shadow')} tip={t('Adds a drop shadow effect behind the tooltip box.')} />`,
        'tooltipShadowEnabled',
        'tooltipShadowControls',
        'tooltipShadowColor',
        'tooltipShadowOpacity',
        'tooltipShadowBlur',
        'tooltipShadowOffsetX',
        'tooltipShadowOffsetY',
      ],
    },
  },
needs: ['asNumber', 'rgba'],
  transformProps: {
    snippetStamp: '/* MortModule: tooltip-shadow logic */',
    snippet: `/* MortModule: tooltip-shadow logic */
(function applyTooltipShadow() {
  if (!(formData && formData.tooltipShadowEnabled)) return;

  mapSingle(options, 'tooltip', (base) => {
    const c = formData.tooltipShadowColor;
    const op = asNumber(formData.tooltipShadowOpacity);
    const blur = asNumber(formData.tooltipShadowBlur);
    const offX = asNumber(formData.tooltipShadowOffsetX);
    const offY = asNumber(formData.tooltipShadowOffsetY);

    let shadowColor;
    if (c && typeof c === 'object') {
      const alpha = Number.isFinite(op) ? op : c.a;
      shadowColor = rgba({ r:c.r, g:c.g, b:c.b, a:alpha });
    }

    return {
      ...base,
      ...(shadowColor ? { shadowColor } : {}),
      ...(Number.isFinite(blur) ? { shadowBlur: blur } : {}),
      ...(Number.isFinite(offX) ? { shadowOffsetX: offX } : {}),
      ...(Number.isFinite(offY) ? { shadowOffsetY: offY } : {}),
    };
  });
})();
` .trim(),
  },
};
