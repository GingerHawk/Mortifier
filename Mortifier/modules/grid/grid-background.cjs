const path = require('path');

module.exports = {
  id: 'grid-background',
  label: 'Grid - Background',
  appliesTo: ['bar','line','area','scatter'],
  order: 700,

  files: [
    {
      template: path.join('grid','grid-background.tsx'),
      dest: path.join('src','plugin','grid','grid-background.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','grid','grid-background').replace(/\\/g,'/'),
      names: [
        'gridBackgroundEnabled',
        'gridBackgroundControls',
        'gridBackgroundType',
        'gridBgColor',
        'gridBgAngle',
        'gridBgStop1',
        'gridBgStop1Pos',
        'gridBgStop2',
        'gridBgStop2Pos',
        'gridBgUseStop3',
        'gridBgStop3',
        'gridBgStop3Pos',
      ],
      stamp: '/* MortModule: grid-background import */',
    },
    section: {
      tab: 'customize',
      label: 'Grid',
      stamp: '/* MortModule: grid-background section */',
      rows: [
        `<SubHeader label={t('Background')} tip={t('Solid color or angled gradient behind the plotting grid.')} />`,
        'gridBackgroundEnabled',
        'gridBackgroundControls',
        'gridBackgroundType',
        'gridBgColor',
        'gridBgAngle',
        'gridBgStop1',
        'gridBgStop1Pos',
        'gridBgStop2',
        'gridBgStop2Pos',
        'gridBgUseStop3',
        'gridBgStop3',
        'gridBgStop3Pos',
      ],
    },
  },

  needs: ['rgba','asNumber','asPercent01','toLinearGradient','mapArrayProp'],

  transformProps: {
    snippetStamp: '/* MortModule: grid-background transform */',
    snippet: `/* MortModule: grid-background transform */
(function applyGridBackground() {
  const fd = (typeof formData !== 'undefined' ? formData : {}) || {};
  if (!fd.gridBackgroundEnabled) return;

  // Support single or multi-grid layouts
  mapArrayProp(options, 'grid', (base) => {
    // ✅ Ensure the grid actually renders its box so background is visible
    const next = { ...(base || {}), show: true };

    const type = fd.gridBackgroundType || 'solid';
    if (type === 'solid') {
      const solid = rgba(fd.gridBgColor);
      if (solid) next.backgroundColor = solid;
      return next;
    }

    // Gradient – align semantics with styleFill/toLinearGradient
    const angle = asNumber(fd.gridBgAngle, 0);
    const stops = [
      { offset: asPercent01(fd.gridBgStop1Pos, 0),   color: fd.gridBgStop1 },
      { offset: asPercent01(fd.gridBgStop2Pos, 100), color: fd.gridBgStop2 },
    ];
    if (fd.gridBgUseStop3) {
      stops.splice(1, 0, {
        offset: asPercent01(fd.gridBgStop3Pos, 50),
        color: fd.gridBgStop3,
      });
    }

    const gradient = toLinearGradient(angle, stops);
    next.backgroundColor = gradient || rgba(fd.gridBgStop1) || 'rgba(0,0,0,0)';
    return next;
  });
})();

`.trim(),
  },
};
