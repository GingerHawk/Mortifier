const path = require('path');

module.exports = {
  id: 'values-shadow',
  label: 'Values - Shadow Enhanced',
  appliesTo: ['bar','line','area','scatter', 'pie'],
  order: 330,

  files: [
    {
      template: path.join('values','val-shadow.tsx'),
      dest: path.join('src','plugin','values','val-shadow.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','values','val-shadow').replace(/\\/g,'/'),
      names: [
        'valShadowEnabled',
        'valShadowControls',
        'valShadowCurrentSeries',
        // Series 1 Controls
        'valShadowColor1',
        'valShadowOpacity1',
        'valShadowBlur1',
        'valShadowOffsetX1',
        'valShadowOffsetY1',
        // Series 2 Controls
        'valShadowColor2',
        'valShadowOpacity2',
        'valShadowBlur2',
        'valShadowOffsetX2',
        'valShadowOffsetY2',
        // Series 3 Controls
        'valShadowColor3',
        'valShadowOpacity3',
        'valShadowBlur3',
        'valShadowOffsetX3',
        'valShadowOffsetY3',
        // All Series Controls
        'valShadowColorAll',
        'valShadowOpacityAll',
        'valShadowBlurAll',
        'valShadowOffsetXAll',
        'valShadowOffsetYAll',
      ],
      stamp: '/* MortModule: values-shadow import */',
    },
    section: {
      tab: 'customize',
      label: 'Values',
      stamp: '/* MortModule: values-shadow section */',
      rows: [
        `<SubHeader label={t('Shadow')} tip={t('Configure shadow effects for value labels with per-series support.')} />`,
        'valShadowEnabled',
        'valShadowControls',
        'valShadowCurrentSeries',
        // Series 1 Controls
        'valShadowColor1',
        'valShadowOpacity1',
        'valShadowBlur1',
        'valShadowOffsetX1',
        'valShadowOffsetY1',
        // Series 2 Controls
        'valShadowColor2',
        'valShadowOpacity2',
        'valShadowBlur2',
        'valShadowOffsetX2',
        'valShadowOffsetY2',
        // Series 3 Controls
        'valShadowColor3',
        'valShadowOpacity3',
        'valShadowBlur3',
        'valShadowOffsetX3',
        'valShadowOffsetY3',
        // All Series Controls
        'valShadowColorAll',
        'valShadowOpacityAll',
        'valShadowBlurAll',
        'valShadowOffsetXAll',
        'valShadowOffsetYAll',
      ],
    },
  },
  needs: ['rgba','asNumber','AnyDict','mapSeries'],
  transformProps: {
    snippetStamp: '/* MortModule: values-shadow transform */',
    snippet: `/* MortModule: values-shadow transform - per series support */
(function applyValuesShadowEnhanced() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;

  // Main enable check
  if (!fd.valShadowEnabled) return;

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.valShadowCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  // Apply shadow effects per series
  mapSeries(options, () => true, (s: AnyDict, actualSeriesIndex: number) => {
    if (!fd.valShadowEnabled) return s;
    
    const lbl = { ...(s.label || {}) } as AnyDict;
    
    // Build shadow string
    const color = getSeriesValue('valShadowColor', actualSeriesIndex);
    const opacity = asNumber(getSeriesValue('valShadowOpacity', actualSeriesIndex, 0.5));
    const blur = asNumber(getSeriesValue('valShadowBlur', actualSeriesIndex, 10));
    const offsetX = asNumber(getSeriesValue('valShadowOffsetX', actualSeriesIndex, 0));
    const offsetY = asNumber(getSeriesValue('valShadowOffsetY', actualSeriesIndex, 4));
    
    if (color) {
      // Convert color to RGBA with opacity
      const shadowColor = typeof color === 'string' 
        ? color 
        : rgba(color);
      
      // Apply opacity to shadow color
      let finalColor = shadowColor;
      if (opacity !== 1 && shadowColor) {
        // If it's a hex color, convert to rgba
        if (shadowColor.startsWith('#')) {
          const r = parseInt(shadowColor.slice(1, 3), 16);
          const g = parseInt(shadowColor.slice(3, 5), 16);
          const b = parseInt(shadowColor.slice(5, 7), 16);
          finalColor = \`rgba(\${r}, \${g}, \${b}, \${opacity})\`;
        } else if (shadowColor.startsWith('rgb(')) {
          // Convert rgb to rgba
          finalColor = shadowColor.replace('rgb(', 'rgba(').replace(')', \`, \${opacity})\`);
        } else if (shadowColor.startsWith('rgba(')) {
          // Replace existing alpha
          finalColor = shadowColor.replace(/,[\\s]*[\\d.]+\\)/, \`, \${opacity})\`);
        }
      }
      
      // Apply shadow properties
      lbl.shadowColor = finalColor;
      lbl.shadowBlur = blur;
      lbl.shadowOffsetX = offsetX;
      lbl.shadowOffsetY = offsetY;
    }
    
    s.label = lbl;
    return s;
  });
})();
`.trim(),
  },
};