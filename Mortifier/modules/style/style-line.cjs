// modules/style/line.cjs
const path = require('path');

module.exports = {
  id: 'line',
  label: 'Line',
  appliesTo: ['line'], // specifically impacts line series
  order: 110, // position among other modules; adjust as you like

  files: [
    {
      template: path.join('style', 'style-line.tsx'),
      dest: path.join('src', 'plugin', 'style', 'style-line.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path
        .join('..', '..', '..', 'plugin', 'style', 'style-line')
        .replace(/\\/g, '/'),
      names: [
        'lineEnabled',
        'lineControls',
        'lineCurrentSeries',
        // All Series Controls
        'lineColorAll',
        'lineWidthAll',
        'lineTypeAll',
        'lineSmoothnessAll',
        // Series 1 Controls
        'lineColor1',
        'lineWidth1',
        'lineType1',
        'lineSmoothness1',
        // Series 2 Controls
        'lineColor2',
        'lineWidth2',
        'lineType2',
        'lineSmoothness2',
        // Series 3 Controls
        'lineColor3',
        'lineWidth3',
        'lineType3',
        'lineSmoothness3',
      ],
    },
    // Inserted into the Style section (idempotent; rows appended if missing)
    section:{
      tab: 'customize',
      label: 'Style',
      stamp: '/* Line Stamp*/',
      rows: [
        `<SubHeader label={t('Line')} tip={t('Controls the styling of line elements in the chart.')} />`,
        'lineEnabled',
        'lineControls',
        'lineCurrentSeries',
        // All Series Controls
        'lineColorAll',
        'lineWidthAll',
        'lineTypeAll',
        'lineSmoothnessAll',
        // Series 1 Controls
        'lineColor1',
        'lineWidth1',
        'lineType1',
        'lineSmoothness1',
        // Series 2 Controls
        'lineColor2',
        'lineWidth2',
        'lineType2',
        'lineSmoothness2',
        // Series 3 Controls
        'lineColor3',
        'lineWidth3',
        'lineType3',
        'lineSmoothness3',
      ],
  },
  },
needs: ['mapSeries', 'rgba'],
transformProps: {
    snippetStamp: '/* MortModule: line logic */',
    snippet: `(function applyStyleLine() {
  const fd = (formData as any);
  if (!fd?.lineEnabled) return;

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.lineCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  mapSeries(
    options,
    s => s && (s.type === 'line'),
    (s, actualSeriesIndex) => {
      const colorValue = getSeriesValue('lineColor', actualSeriesIndex);
      const color = colorValue ? (typeof colorValue === 'string' ? colorValue : rgba(colorValue)) : undefined;
      const width = getSeriesValue('lineWidth', actualSeriesIndex);
      const lineType = getSeriesValue('lineType', actualSeriesIndex);
      const smoothness = getSeriesValue('lineSmoothness', actualSeriesIndex);

      // Apply the styles
      if (color) {
        s.lineStyle = { ...(s.lineStyle || {}), color };
      }
      
      if (width !== undefined) {
        s.lineStyle = { ...(s.lineStyle || {}), width };
      }
      
      if (lineType) {
        const dashMap = {
          solid: 'solid',
          dashed: [5, 5],
          dotted: [2, 2]
        };
        s.lineStyle = { ...(s.lineStyle || {}), type: dashMap[lineType] || 'solid' };
      }
      
      if (smoothness !== undefined) {
        s.smooth = smoothness;
      }
      
      return s;
    }
  );
})();`,
},
};
