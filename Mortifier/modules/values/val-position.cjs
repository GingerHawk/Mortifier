const path = require('path');

module.exports = {
  id: 'values-position',
  label: 'Values - Position',
  appliesTo: ['bar','line','area','scatter', 'pie'],
  order: 340,

  files: [
    {
      template: path.join('values','val-position.tsx'),
      dest: path.join('src','plugin','values','val-position.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','values','val-position').replace(/\\/g,'/'),
      names: [
        'valEnabled',
        'valControls',
        'valPositionCurrentSeries',
        // Series 1 Controls
        'valPosition1',
        'valOffsetX1',
        'valOffsetY1',
        'valAngle1',
        // Series 2 Controls
        'valPosition2',
        'valOffsetX2',
        'valOffsetY2',
        'valAngle2',
        // Series 3 Controls
        'valPosition3',
        'valOffsetX3',
        'valOffsetY3',
        'valAngle3',
        // All Series Controls
        'valPositionAll',
        'valOffsetXAll',
        'valOffsetYAll',
        'valAngleAll',
      ],
      stamp: '/* MortModule: values-position import */',
    },
    section: {
      tab: 'customize',
      label: 'Values',
      stamp: '/* MortModule: values-position section */',
      rows: [
        `<SubHeader label={t('Position')} tip={t('Controls the position, angle & offset of value labels with per-series support.')} />`,
        'valEnabled',
        'valControls',
        'valPositionCurrentSeries',
        // Series 1 Controls
        'valPosition1',
        'valAngle1',
        'valOffsetX1',
        'valOffsetY1',
        // Series 2 Controls
        'valPosition2',
        'valAngle2',
        'valOffsetX2',
        'valOffsetY2',
        // Series 3 Controls
        'valPosition3',
        'valAngle3',
        'valOffsetX3',
        'valOffsetY3',
        // All Series Controls
        'valPositionAll',
        'valAngleAll',
        'valOffsetXAll',
        'valOffsetYAll',
      ],
    },
  },
needs: ['asNumber','mapSeries'],
  transformProps: {    
    snippetStamp: '/* MortModule: values-position transform */',
    snippet: `/* MortModule: values-position transform - per series support */
(function applyValuesPositionV2() {
  const fd = (typeof formData !== 'undefined' ? formData : {}) || {};
  if (!fd.valEnabled) return;

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.valPositionCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  mapSeries(options, () => true, (s, actualSeriesIndex) => {
    const lbl = { ...(s.label || {}) };

    if (fd.valControls) {
      const pos = getSeriesValue('valPosition', actualSeriesIndex);
      if (pos) lbl.position = pos;

      const ox = asNumber(getSeriesValue('valOffsetX', actualSeriesIndex));
      const oy = asNumber(getSeriesValue('valOffsetY', actualSeriesIndex));
      const offX = Number.isFinite(ox) ? ox : 0;
      const offY = Number.isFinite(oy) ? oy : 0;
      lbl.offset = [offX, offY];

      const ang = asNumber(getSeriesValue('valAngle', actualSeriesIndex));
      if (Number.isFinite(ang)) {
        // Common series label rotation
        lbl.rotate = ang;

        // For pie, ECharts often respects rotation via labelLayout.rotate
        if (s && s.type === 'pie') {
          s.labelLayout = { ...(s.labelLayout || {}), rotate: ang };
        }
      }
    }

    s.label = lbl;
    return s;
  });
})();
`.trim(),
  },
};
