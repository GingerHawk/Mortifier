// modules/shadow.cjs
const path = require('path');

module.exports = {
  id: 'shadow',
  label: 'Shadow',
  appliesTo: ['bar', 'line', 'area', 'scatter'],
  order: 120, // relative position among other modules (your injector sorts if you want)

  files: [
    {
      template: path.join('style', 'style-shadow.tsx'),
      dest: path.join('src', 'plugin', 'style', 'style-shadow.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'style', 'style-shadow').replace(/\\/g, '/'),
      names: [
        'styleShadowEnabled',
        'styleShadowShow',
        'styleShadowCurrentSeries',
        // All Series Controls
        'styleShadowColorAll',
        'styleShadowOpacityAll',
        'styleShadowOffsetXAll',
        'styleShadowOffsetYAll',
        'styleShadowBlurAll',
        // Series 1 Controls
        'styleShadowColor1',
        'styleShadowOpacity1',
        'styleShadowOffsetX1',
        'styleShadowOffsetY1',
        'styleShadowBlur1',
        // Series 2 Controls
        'styleShadowColor2',
        'styleShadowOpacity2',
        'styleShadowOffsetX2',
        'styleShadowOffsetY2',
        'styleShadowBlur2',
        // Series 3 Controls
        'styleShadowColor3',
        'styleShadowOpacity3',
        'styleShadowOffsetX3',
        'styleShadowOffsetY3',
        'styleShadowBlur3',
      ],
      stamp: '/* MortModule: shadow import */',
    },
    section: {
      tab: 'customize',
      label: 'Style',
      stamp: '/* MortModule: shadow section */',
      rows: [
        `<SubHeader label={t('Shadow')} tip={t('Adds drop shadow styling to series or chart elements.')} />`,
        'styleShadowEnabled',
        'styleShadowShow',
        'styleShadowCurrentSeries',
        // All Series Controls
        'styleShadowColorAll',
        'styleShadowOpacityAll',
        'styleShadowBlurAll',
        'styleShadowOffsetXAll',
        'styleShadowOffsetYAll',
        // Series 1 Controls
        'styleShadowColor1',
        'styleShadowOpacity1',
        'styleShadowBlur1',
        'styleShadowOffsetX1',
        'styleShadowOffsetY1',
        // Series 2 Controls
        'styleShadowColor2',
        'styleShadowOpacity2',
        'styleShadowBlur2',
        'styleShadowOffsetX2',
        'styleShadowOffsetY2',
        // Series 3 Controls
        'styleShadowColor3',
        'styleShadowOpacity3',
        'styleShadowBlur3',
        'styleShadowOffsetX3',
        'styleShadowOffsetY3',
      ],
    },
  },
needs: ['asNumber', 'rgba', 'mapSeries'],
  transformProps: {
    snippetStamp: '/* MortModule: shadow logic */',
    snippet: `(function applyStyleShadow() {
  if (!(formData && (formData as any).styleShadowEnabled)) return;

  const fd = (formData as any);

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.styleShadowCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  mapSeries(options,
    (s) =>
      s &&
      (s.type === 'bar' ||
       s.type === 'pictorialBar' ||
       s.type === 'line' ||
       s.type === 'area' ||
       s.type === 'scatter'),
    (s, actualSeriesIndex) => {
      const color = getSeriesValue('styleShadowColor', actualSeriesIndex);
      const opacity = asNumber(getSeriesValue('styleShadowOpacity', actualSeriesIndex));
      const blur = asNumber(getSeriesValue('styleShadowBlur', actualSeriesIndex));
      const offsetX = asNumber(getSeriesValue('styleShadowOffsetX', actualSeriesIndex));
      const offsetY = asNumber(getSeriesValue('styleShadowOffsetY', actualSeriesIndex));

      const shadowColor =
        typeof color === 'string'
          ? color
          : color && typeof color === 'object'
          ? rgba({ r: color.r, g: color.g, b: color.b, a: Number.isFinite(opacity) ? opacity : color.a })
          : undefined;

      const apply = (obj: any) => {
        if (!obj) return;
        if (shadowColor) obj.shadowColor = shadowColor;
        if (Number.isFinite(blur)) obj.shadowBlur = blur;
        if (Number.isFinite(offsetX)) obj.shadowOffsetX = offsetX;
        if (Number.isFinite(offsetY)) obj.shadowOffsetY = offsetY;
      };

      // Bars, pictorials, scatters, areas → itemStyle
      s.itemStyle = { ...(s.itemStyle || {}) };
      apply(s.itemStyle);

      // Lines → lineStyle always; areaStyle if present
      if (s.type === 'line') {
        s.lineStyle = { ...(s.lineStyle || {}) };
        apply(s.lineStyle);
        if (s.areaStyle) {
          s.areaStyle = { ...(s.areaStyle || {}) };
          apply(s.areaStyle);
        }
      }

      // Also apply to emphasis.itemStyle so hover matches
      s.emphasis = { ...(s.emphasis || {}) };
      s.emphasis.itemStyle = { ...(s.emphasis.itemStyle || {}) };
      apply(s.emphasis.itemStyle);

      return s;
    }
  );
})();
`.trim(),
  },
};
