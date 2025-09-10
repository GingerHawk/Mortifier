// modules/tooltip-general.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-general',
  label: 'Tooltip - General (Stripped)',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 200,

  files: [
    {
      template: path.join('tooltip', 'tooltip-general.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-general.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-general').replace(/\\/g, '/'),
      names: ['tooltipToggle', 'tooltipTrigger'],
      stamp: '/* MortModule: tooltip-general import v2 */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-general section v2 */',
      rows: [
        'tooltipToggle',
        'tooltipTrigger',
      ],
    },
  },

  transformProps: {
    snippetStamp: '/* MortModule: tooltip-general logic v2 */',
    snippet: `/* MortModule: tooltip-general logic v2 */
(function applyTooltipGeneralV2() {
  mapSingle(options, 'tooltip', (base) => {
    const tgl = (formData && formData.tooltipToggle) || 'on';
    const trig = (formData && formData.tooltipTrigger) || 'axis';
    const next = { ...base, show: tgl === 'on', trigger: trig };
    if (trig === 'axis') {
      const ap = { ...(next.axisPointer || {}) };
      ap.type = ap.type || 'line';
      next.axisPointer = ap;
    }
    return next;
  });
})();
`.trim(),
  },
};
