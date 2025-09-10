const path = require('path');

module.exports = {
  id: 'legend-position',
  label: 'Legend - Position',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 540,

  files: [
    {
      template: path.join('legend', 'legend-position.tsx'),
      dest: path.join('src', 'plugin', 'legend', 'legend-position.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','legend','legend-position').replace(/\\/g,'/'),
      names: [
        'legendPositionEnabled',
        'legendPositionControls',
        'legendPositionLayout',
        'legendPositionAlign',
        'legendPositionTopOffset',
        'legendPositionSideOffset',
        'legendPositionItemGap',
        'legendPositionPadding',
      ],
      stamp: '/* MortModule: legend-position import */',
    },
    section: {
      tab: 'customize',
      label: 'Legend',
      stamp: '/* MortModule: legend-position section */',
      rows: [
        `<SubHeader label={t('Position')} tip={t('Controls legend layout, alignment, and offset positioning.')} />`,
        'legendPositionEnabled',
        'legendPositionControls',
        'legendPositionLayout',
        'legendPositionAlign',
        'legendPositionTopOffset',
        'legendPositionSideOffset',
        'legendPositionItemGap',
        'legendPositionPadding',
      ],
    },
  },
needs: ['asNumber'],
  transformProps: {
    snippetStamp: '/* MortModule: legend-position logic */',
    snippet: `/* MortModule: legend-position logic */
(function applyLegendPosition() {
  if (!(formData && (formData).legendPositionEnabled)) return;

  const orient = (formData).legendPositionLayout || 'horizontal';
  const align = (formData).legendPositionAlign || 'left';
  const topPx = asNumber((formData).legendPositionTopOffset);
  const sidePx = asNumber((formData).legendPositionSideOffset);
  const itemGap = asNumber((formData).legendPositionItemGap);
  const padding = asNumber((formData).legendPositionPadding);

  const clampNonNeg = (v: any) => (Number.isFinite(v) && v >= 0 ? v : 0);

  mapArrayProp(options, 'legend', (legend) => {
    const next = { ...legend };

    // Layout
    next.orient = orient;

    // Top offset is always respected
    next.top = clampNonNeg(topPx);

    // Align + side offset
    if (align === 'left') {
      next.left = clampNonNeg(sidePx);
      delete next.right;
    } else if (align === 'right') {
      next.right = clampNonNeg(sidePx);
      delete next.left;
    } else {
      // center
      next.left = 'center';
      delete next.right;
    }

    // Spacing
    if (Number.isFinite(itemGap)) next.itemGap = itemGap;
    if (Number.isFinite(padding)) next.padding = padding;

    return next;
  });
})();
`.trim(),
  },
};
