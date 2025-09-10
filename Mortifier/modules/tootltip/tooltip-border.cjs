// modules/tooltip-border.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-border',
  label: 'Tooltip - Border',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 240,

  files: [
    {
      template: path.join('tooltip', 'tooltip-border.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-border.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-border').replace(/\\\\/g, '/'),
      names: [
        'tooltipBorderEnabled',
        'tooltipBorderControls',
        'tooltipBorderType',
        'tooltipBorderColor',
        'tooltipBorderWidth',
        'tooltipBorderRadius',
      ],
      stamp: '/* MortModule: tooltip-border import */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-border section */',
      rows: [
        `<SubHeader label={t('Border')} tip={t('Sets tooltip border color, width, style, and corner radius.')} />`,
        'tooltipBorderEnabled',
        'tooltipBorderControls',
        'tooltipBorderType',
        'tooltipBorderColor',
        'tooltipBorderWidth',
        'tooltipBorderRadius',
      ],
    },
  },
needs: ['asNumber', 'rgba', 'mergeCssText'],
  transformProps: {
    snippetStamp: '/* MortModule: tooltip-border logic */',
    snippet: `/* MortModule: tooltip-border logic */
(function applyTooltipBorder() {
  if (!(formData && formData.tooltipBorderEnabled)) return;

  mapSingle(options, 'tooltip', (base) => {
    const type = formData.tooltipBorderType || 'solid';
    const c = formData.tooltipBorderColor;
    const w = asNumber(formData.tooltipBorderWidth);
    const r = asNumber(formData.tooltipBorderRadius);
    const color = (c && typeof c === 'object') ? rgba(c) : undefined;
    const next = {
      ...base,
      ...(color ? { borderColor: color } : {}),
      ...(Number.isFinite(w) ? { borderWidth: w } : {}),
      ...(Number.isFinite(r) ? { borderRadius: r } : {}),
    };
    if (type) next.extraCssText = mergeCssText(base.extraCssText, 'border-style:' + type + ';');
    return next;
  });
})();
`.trim(),
  },
};
