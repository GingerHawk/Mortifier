const path = require('path');

module.exports = {
  id: 'legend-background',
  label: 'Legend - Background',
  appliesTo: ['bar','line','area','scatter','pie'],
  order: 500,

  files: [
    {
      template: path.join('legend','legend-background.tsx'),
      dest: path.join('src','plugin','legend','legend-background.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','legend','legend-background').replace(/\\/g,'/'),
      names: [
        'legendBackgroundEnabled',
        'legendBackgroundControls',
        'legendBackgroundType',
        'legendBgColor',
        'legendBgAngle',
        'legendBgStop1',
        'legendBgStop1Pos',
        'legendBgStop2',
        'legendBgStop2Pos',
        'legendBgUseStop3',
        'legendBgStop3',
        'legendBgStop3Pos',
        'legendBgRadius',
      ],
      stamp: '/* MortModule: legend-background import */',
    },
    section: {
      tab: 'customize',
      label: 'Legend',
      stamp: '/* MortModule: legend-background section */',
      rows: [
         `<SubHeader label={t('Background')} tip={t('Solid color or angled gradient behind the legend box.')} />`,
        'legendBackgroundEnabled',
        'legendBackgroundControls',
        'legendBackgroundType',
        'legendBgColor',
        'legendBgAngle',
        'legendBgStop1',
        'legendBgStop1Pos',
        'legendBgStop2',
        'legendBgStop2Pos',
        'legendBgUseStop3',
        'legendBgStop3',
        'legendBgStop3Pos',
        'legendBgRadius',
      ],
    },
  },

  needs: ['rgba','asNumber','asPercent01','toLinearGradient','mapArrayProp'],

  transformProps: {
    snippetStamp: '/* MortModule: legend-background transform */',
    snippet: `
/* MortModule: legend-background transform */
(function applyLegendBackground() {
  const fd = (typeof formData !== 'undefined' ? formData : {}) || {};
  if (!fd.legendBackgroundEnabled) return;

  // Apply to all legend entries (array or object)
  mapArrayProp(options, 'legend', (base) => {
    const next = { ...(base || {}) };

    // Corner radius
    const rad = asNumber(fd.legendBgRadius);
    if (Number.isFinite(rad)) next.borderRadius = rad;

    // Solid vs Gradient
    const type = fd.legendBackgroundType || 'solid';
    if (type === 'solid') {
      const solid = rgba(fd.legendBgColor);
      if (solid) next.backgroundColor = solid;
      return next;
    }

    // Gradient: reuse the same angle/stop semantics as tooltip/styleFill
    const angle = asNumber(fd.legendBgAngle, 0);
    const stops = [
      { offset: asPercent01(fd.legendBgStop1Pos, 0),   color: fd.legendBgStop1 },
      { offset: asPercent01(fd.legendBgStop2Pos, 100), color: fd.legendBgStop2 },
    ];
    if (fd.legendBgUseStop3) {
      stops.splice(1, 0, {
        offset: asPercent01(fd.legendBgStop3Pos, 50),
        color: fd.legendBgStop3,
      });
    }

    // Build ECharts gradient object (not CSS); rgba() is applied inside helper
    const gradient = toLinearGradient(angle, stops);
    if (gradient) {
      next.backgroundColor = gradient;
    } else {
      // Fallback to first stop (or transparent) if gradient invalid
      next.backgroundColor = rgba(fd.legendBgStop1) || 'rgba(0,0,0,0)';
    }

    return next;
  });
})();
`.trim(),
  },
};
