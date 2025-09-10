// modules/pie-borderRadius.cjs
const path = require('path');

module.exports = {
  id: 'pie-borderRadius',
  label: 'Style — Pie Border & Radius',
  appliesTo: ['pie'],
  order: 110,

  files: [
    {
      template: path.join('pie', 'pie-borderRadius.tsx'),
      dest: path.join('src', 'plugin', 'pie', 'pie-borderRadius.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'pie', 'pie-borderRadius').replace(/\\/g, '/'),
      names: [
        'pieBorderRadiusEnabled',
        'pieBorderRadiusControls',
        'pieSliceRadius',
        'pieBorderColor',
        'pieBorderWidth',
        'pieBorderType',
      ],
    },
    section: {
      tab: 'customize',
      label: 'Style',
      stamp: '/* MortModule: pie-borderRadius import */',
      rows: [
        `<SubHeader label={t('Border & Radius')} tip={t('Adjust slice border color, width, type, and corner radius.')} />`,
        'pieBorderRadiusEnabled',
        'pieBorderRadiusControls',
        'pieSliceRadius',
        'pieBorderColor',
        'pieBorderWidth',
        'pieBorderType',
      ],
    },
  },

  needs: ['mapSeries', 'asNumber', 'rgba'],

  transformProps: {
    snippetStamp: '/* snippet:pie-borderRadius */',
    snippet: `
/* snippet:pie-borderRadius */
(() => {
  const fd = (formData || {}) as any;
  if (!fd.pieBorderRadiusEnabled) return;

  mapSeries(options, s => s?.type === 'pie', (s) => {
    // Ensure we have an array of data items to style
    const data = Array.isArray(s.data) ? s.data : [];
    if (!data.length) return s;

    const br = asNumber(fd.pieSliceRadius, 0);
    const bw = asNumber(fd.pieBorderWidth, 0);
    const bc = rgba(fd.pieBorderColor);
    const bt = fd.pieBorderType || 'solid';

    s.data = data.map((d) => {
      const it = { ...(d || {}) };
      const istyle = { ...(it.itemStyle || {}) };

      // Apply only if user provided values; do not clobber existing explicit item settings
      if (bc) istyle.borderColor = bc;
      if (bw >= 0) istyle.borderWidth = bw;
      if (bt) istyle.borderType = bt;
      if (Number.isFinite(br) && br >= 0) istyle.borderRadius = br;

      it.itemStyle = istyle;
      return it;
    });

    return s;
  });
})();
`.trim(),
  },
};
