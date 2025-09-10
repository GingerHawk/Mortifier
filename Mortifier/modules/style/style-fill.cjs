// modules/style/fill.cjs
const path = require('path');

module.exports = {
  id: 'fill',
  label: 'Fill',
  appliesTo: ['bar', 'line', 'area', 'scatter'],
  order: 100,

  files: [
    {
      template: path.join('style', 'style-fill.tsx'),
      dest: path.join('src', 'plugin', 'style', 'style-fill.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path
        .join('..', '..', '..', 'plugin', 'style', 'style-fill')
        .replace(/\\/g, '/'),
      names: [
        'styleFillShow',
        'styleFillEnabled',
        'styleFillCurrentSeries',
        // Fill Type Controls
        'styleFillTypeAll',
        'styleFillType1',
        'styleFillType2',
        'styleFillType3', 
        // All Series Controls
        'styleFillSolidColorAll',
        'styleFillAngleAll',
        'styleFillStop1ColorAll',
        'styleFillStop1OffsetAll',
        'styleFillStop2ColorAll',
        'styleFillStop2OffsetAll',
        'styleFillUseStop3All',
        'styleFillStop3ColorAll',
        'styleFillStop3OffsetAll',
        // Series 1 Controls
        'styleFillSolidColor1',
        'styleFillAngle1',
        'styleFillStop1Color1',
        'styleFillStop1Offset1',
        'styleFillStop2Color1',
        'styleFillStop2Offset1',
        'styleFillUseStop3Series1',
        'styleFillStop3Color1',
        'styleFillStop3Offset1',
        // Series 2 Controls
        'styleFillSolidColor2',
        'styleFillAngle2',
        'styleFillStop1Color2',
        'styleFillStop1Offset2',
        'styleFillStop2Color2',
        'styleFillStop2Offset2',
        'styleFillUseStop3Series2',
        'styleFillStop3Color2',
        'styleFillStop3Offset2',
        // Series 3 Controls
        'styleFillSolidColor3',
        'styleFillAngle3',
        'styleFillStop1Color3',
        'styleFillStop1Offset3',
        'styleFillStop2Color3',
        'styleFillStop2Offset3',
        'styleFillUseStop3Series3',
        'styleFillStop3Color3',
        'styleFillStop3Offset3',
      ],
      stamp: '/* MortModule: fill import */',
    },

    section: {
      tab: 'customize',
      label: 'Style',
      stamp: '/* MortModule: fill section */',
      rows: [
        `<SubHeader label={t('Fill')} tip={t('Fills chart areas with solid or gradient colors.')} />`,
        'styleFillEnabled',
        'styleFillShow',
        'styleFillCurrentSeries',
        // Fill Type Controls
        'styleFillTypeAll',
        'styleFillType1',
        'styleFillType2',
        'styleFillType3', 
        // All Series Controls
        'styleFillSolidColorAll',
        'styleFillAngleAll',
        'styleFillStop1ColorAll',
        'styleFillStop1OffsetAll',
        'styleFillStop2ColorAll',
        'styleFillStop2OffsetAll',
        'styleFillUseStop3All',
        'styleFillStop3ColorAll',
        'styleFillStop3OffsetAll',
        // Series 1 Controls
        'styleFillSolidColor1',
        'styleFillAngle1',
        'styleFillStop1Color1',
        'styleFillStop1Offset1',
        'styleFillStop2Color1',
        'styleFillStop2Offset1',
        'styleFillUseStop3Series1',
        'styleFillStop3Color1',
        'styleFillStop3Offset1',
        // Series 2 Controls
        'styleFillSolidColor2',
        'styleFillAngle2',
        'styleFillStop1Color2',
        'styleFillStop1Offset2',
        'styleFillStop2Color2',
        'styleFillStop2Offset2',
        'styleFillUseStop3Series2',
        'styleFillStop3Color2',
        'styleFillStop3Offset2',
        // Series 3 Controls
        'styleFillSolidColor3',
        'styleFillAngle3',
        'styleFillStop1Color3',
        'styleFillStop1Offset3',
        'styleFillStop2Color3',
        'styleFillStop2Offset3',
        'styleFillUseStop3Series3',
        'styleFillStop3Color3',
        'styleFillStop3Offset3',
      ],
    },
  },
needs: ['asNumber', 'rgba', 'toLinearGradient', 'asPercent01'],
  transformProps: {
    snippetStamp: '/* MortModule: fill logic */',
    snippet: `(function applyStyleFill() {
  const fd = (formData as any);
  if (!fd?.styleFillEnabled) return;

  // Get fill type with per-series support
  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.styleFillCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
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
    s => s && (s.type === 'bar' || s.type === 'pictorialBar' || s.type === 'line' || s.type === 'area'),
    (s, actualSeriesIndex) => {
      const kind = getSeriesValue('styleFillType', actualSeriesIndex, 'solid');
      
      if (kind === 'solid') {
        const colorValue = getSeriesValue('styleFillSolidColor', actualSeriesIndex);
        if (colorValue) {
          const color = rgba(colorValue);
          if (s.type === 'bar' || s.type === 'pictorialBar') {
            s.itemStyle = { ...(s.itemStyle || {}), color };
          } else {
            s.areaStyle = { ...(s.areaStyle || {}), color };
          }
        }
        return s;
      }

      // ── gradient (via helper) ─────────────────────────────────────────────
      const angle = asNumber(getSeriesValue('styleFillAngle', actualSeriesIndex), 90);
      const stop1Color = getSeriesValue('styleFillStop1Color', actualSeriesIndex);
      const stop1Offset = asPercent01(getSeriesValue('styleFillStop1Offset', actualSeriesIndex), 30);
      const stop2Color = getSeriesValue('styleFillStop2Color', actualSeriesIndex);
      const stop2Offset = asPercent01(getSeriesValue('styleFillStop2Offset', actualSeriesIndex), 70);
      const useStop3 = getSeriesValue('styleFillUseStop3', actualSeriesIndex) || getSeriesValue('styleFillUseStop3Series', actualSeriesIndex);
      const stop3Color = getSeriesValue('styleFillStop3Color', actualSeriesIndex);
      const stop3Offset = asPercent01(getSeriesValue('styleFillStop3Offset', actualSeriesIndex), 90);

      const stops = [
        { offset: stop1Offset, color: stop1Color },
        { offset: stop2Offset, color: stop2Color },
      ];

      // Add third stop if enabled
      if (useStop3 && stop3Color) {
        stops.push({ offset: stop3Offset, color: stop3Color });
      }

      const gradient = toLinearGradient(angle, stops);
      if (!gradient) return s;

      if (s.type === 'bar' || s.type === 'pictorialBar') {
        s.itemStyle = { ...(s.itemStyle || {}), color: gradient };
      } else {
        s.areaStyle = { ...(s.areaStyle || {}), color: gradient };
      }
      return s;
    },
  );
})();
`,
  },
};
