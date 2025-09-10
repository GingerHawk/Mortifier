// modules/pie-chart-controls.cjs
const path = require('path');

module.exports = {
  id: 'pie-layout',
  label: 'Pie Chart Layout',
  appliesTo: ['pie'],
  order: 100,

  files: [
    {
      template: path.join('pie', 'pie-layout.tsx'),
      dest: path.join('src', 'plugin', 'pie', 'pie-layout.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'pie', 'pie-layout').replace(/\\/g, '/'),
      names: [
        'pieEnabled',
        'pieControls',
        'pieRadius',
        'pieInnerRadius',
        'pieStartAngle',
        'pieRoseType',
        'piePadAngle',
      ],
      stamp: '/* MortModule: pie-chart-controls import */',
    },
    section: {
      tab: 'customize',
      label: 'Style',
      stamp: '/* MortModule: pie-chart-controls section */',
      rows: [
        `<SubHeader label={t('Layout')} tip={t('Controls the overall layout and size of the pie chart.')} />`,
        'pieEnabled',
        'pieControls',
        'pieRadius',
        'pieInnerRadius',
        'pieStartAngle',
        'pieRoseType',
        'piePadAngle',
      ],
    },
  },
needs: ['mapSeries', 'asNumber'],
  transformProps: {
    snippetStamp: '/* MortModule: pie-chart-controls logic */',
    snippet: `/* MortModule: pie-chart-controls logic */
(function applyPieChartControls() {
  if (!(formData && (formData as any).pieEnabled)) return;

  const fd = (formData as any);

  mapSeries(options, (s) => s && s.type === 'pie', (s) => {
    const next = { ...s };

    const outerRadius = asNumber(fd.pieRadius);
    const innerRadius = asNumber(fd.pieInnerRadius);
    
    // Set radius as an array for doughnut charts or single value for pie charts.
    if (Number.isFinite(outerRadius) && Number.isFinite(innerRadius) && innerRadius < outerRadius) {
      next.radius = [\`\${innerRadius}%\`, \`\${outerRadius}%\`];
    } else if (Number.isFinite(outerRadius)) {
      next.radius = \`\${outerRadius}%\`;
    }

    const startAngle = asNumber(fd.pieStartAngle);
    if (Number.isFinite(startAngle)) {
      next.startAngle = startAngle;
    }
    
    if (fd.pieRoseType) {
      next.roseType = fd.pieRoseType === 'null' ? null : fd.pieRoseType;
    }

    const padAngle = asNumber(fd.piePadAngle);
    if (Number.isFinite(padAngle)) {
      next.padAngle = padAngle;
    }

    return next;
  });
})();
`.trim(),
  },
};
