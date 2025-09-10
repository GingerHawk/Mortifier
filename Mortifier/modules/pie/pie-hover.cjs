// modules/pie-hover.cjs
const path = require('path');

module.exports = {
  id: 'pie-hover',
  label: 'Pie Hover',
  appliesTo: ['pie'],
  order: 400,

  files: [
    {
      template: path.join('pie', 'pie-hover.tsx'),
      dest: path.join('src', 'plugin', 'pie', 'pie-hover.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'pie', 'pie-hover').replace(/\\/g, '/'),
      names: [
        'pieHoverEnabled',
        'pieHoverColor',
        'pieHoverBorderColor',
        'pieHoverBorderWidth',
        'pieHoverOffset',
      ],
    },
    section: {
      tab: 'customize',
      label: 'Pie Hover Effects',
      stamp: '/* MortModule: pie-hover import */',
      rows: [
        `<SubHeader label={t('Hover Effects')} tip={t('Control the look of the slices when hovered over')} />`,
        'pieHoverEnabled',
        'pieHoverColor',
        'pieHoverBorderColor',
        'pieHoverBorderWidth',
        'pieHoverOffset',
      ],
    },
  },

  needs: ['mapSeries', 'asNumber', 'rgba'],

  transformProps: {
    snippetStamp: '/* snippet:pie-hover */',
    snippet: `/* snippet:pie-hover */
(() => {
  const fd = (formData || {}) as any;
  if (!fd.pieHoverEnabled) return;

  mapSeries(options, s => s?.type === 'pie', (s) => {
    const emphasis = { ...(s.emphasis || {}) };
    const itemStyle = { ...(emphasis.itemStyle || {}) };

    const hoverColor = rgba(fd.pieHoverColor);
    const hoverBorderColor = rgba(fd.pieHoverBorderColor);
    const hoverBorderWidth = asNumber(fd.pieHoverBorderWidth, 1);
    const hoverOffset = Math.max(0, asNumber(fd.pieHoverOffset, 5)); // pixels

    if (hoverColor) itemStyle.color = hoverColor;
    if (hoverBorderColor) itemStyle.borderColor = hoverBorderColor;
    if (Number.isFinite(hoverBorderWidth) && hoverBorderWidth >= 0) itemStyle.borderWidth = hoverBorderWidth;

    // Use emphasis scale for hover “pop” (pie ignores series.hoverOffset for hover)
    emphasis.itemStyle = itemStyle;
    emphasis.scale = true;
    emphasis.scaleSize = hoverOffset;    // ← this is the effective “offset” on hover
    emphasis.focus = emphasis.focus || 'self';

    // (Optional) make sure no other module disabled emphasis
    emphasis.disabled = false;

    s.emphasis = emphasis;
    return s;
  });
})();

`.trim(),
  },
};
