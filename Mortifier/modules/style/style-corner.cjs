// modules/style-corner.cjs
const path = require('path');

module.exports = {
  id: 'style-corner',
  label: 'Corners',
  appliesTo: ['line','bar', 'pictorialBar'],
  order: 130,
  stamp: 'Corner Stamp',
  files: [
    {
      template: path.join('style', 'style-corner.tsx'),
      dest: path.join('src', 'plugin', 'style', 'style-corner.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'style', 'style-corner').replace(/\\/g, '/'),
      names: [
        'styleCornersEnabled',
        'styleCornerShow',
        'styleCornerCurrentSeries',
        // All Series Controls
        'styleCornerTopAll',
        'styleCornerBottomAll',
        'styleCornerAdvancedAll',
        'styleCornerTlAll',
        'styleCornerTrAll',
        'styleCornerBlAll',
        'styleCornerBrAll',
        // Series 1 Controls
        'styleCornerTop1',
        'styleCornerBottom1',
        'styleCornerAdvanced1',
        'styleCornerTl1',
        'styleCornerTr1',
        'styleCornerBl1',
        'styleCornerBr1',
        // Series 2 Controls
        'styleCornerTop2',
        'styleCornerBottom2',
        'styleCornerAdvanced2',
        'styleCornerTl2',
        'styleCornerTr2',
        'styleCornerBl2',
        'styleCornerBr2',
        // Series 3 Controls 
        'styleCornerTop3',
        'styleCornerBottom3',
        'styleCornerAdvanced3',
        'styleCornerTl3',
        'styleCornerTr3',
        'styleCornerBl3',
        'styleCornerBr3',
      ],
    },
    section: {
      tab: 'customize',
      label: 'Style',
      rows: [
        `<SubHeader label={t('Corner Radius')} tip={t('Configures the radius of a combination or individual corners.')} />`,
        'styleCornersEnabled',
        'styleCornerShow',
        'styleCornerCurrentSeries',
        // All Series Controls
        'styleCornerTopAll',
        'styleCornerBottomAll',
        'styleCornerAdvancedAll',
        'styleCornerTlAll',
        'styleCornerTrAll',
        'styleCornerBlAll',
        'styleCornerBrAll',
        // Series 1 Controls
        'styleCornerTop1',
        'styleCornerBottom1',
        'styleCornerAdvanced1',
        'styleCornerTl1',
        'styleCornerTr1',
        'styleCornerBl1',
        'styleCornerBr1',
        // Series 2 Controls
        'styleCornerTop2',
        'styleCornerBottom2',
        'styleCornerAdvanced2',
        'styleCornerTl2',
        'styleCornerTr2',
        'styleCornerBl2',
        'styleCornerBr2',
        // Series 3 Controls
        'styleCornerTop3',
        'styleCornerBottom3',
        'styleCornerAdvanced3',
        'styleCornerTl3',
        'styleCornerTr3',
        'styleCornerBl3',
        'styleCornerBr3',
      ],
    },
  },

  needs: ['mapSeries', 'asNumber'],

  transformProps: {
    snippetStamp: '/* snippet:style-corner */',
    snippet: `/* snippet:style-corner */
(() => {
  const fd = (formData as any);
  if (!fd?.styleCornersEnabled) return;

  // Return number if provided (0 is valid); undefined only for null/undefined/''
  const get = (key: string) => {
    if (fd[key] === null || fd[key] === undefined || fd[key] === '') return undefined;
    const n = asNumber(fd[key]);
    return Number.isFinite(n) ? n : undefined;
  };

  // Normalize an existing radius (number | [tl,tr,br,bl]) to [tl,tr,br,bl]
  const norm4 = (r: any): [number, number, number, number] => {
    if (Array.isArray(r)) {
      // ECharts expects [topLeft, topRight, bottomRight, bottomLeft]
      const tl = asNumber(r[0], 0);
      const tr = asNumber(r[1], tl);
      const br = asNumber(r[2], tr);
      const bl = asNumber(r[3], tl);
      return [tl, tr, br, bl];
    }
    const v = asNumber(r, 0);
    return [v, v, v, v];
  };

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.styleCornersCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
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
    s => s && (s.type === 'bar' || s.type === 'pictorialBar'),
    (s, actualSeriesIndex) => {
      const itemStyle = { ...(s.itemStyle || {}) };
      let [tl, tr, br, bl] = norm4((s.itemStyle && s.itemStyle.borderRadius) ?? 0);

      const topValue = getSeriesValue('styleCornerTop', actualSeriesIndex);
      const bottomValue = getSeriesValue('styleCornerBottom', actualSeriesIndex);
      const top = topValue !== undefined ? asNumber(topValue) : undefined;
      const bottom = bottomValue !== undefined ? asNumber(bottomValue) : undefined;
      const advanced = getSeriesValue('styleCornerAdvanced', actualSeriesIndex);
      let tlAdv, trAdv, blAdv, brAdv;
      
      if (advanced) {
        const tlValue = getSeriesValue('styleCornerTl', actualSeriesIndex);
        const trValue = getSeriesValue('styleCornerTr', actualSeriesIndex);
        const blValue = getSeriesValue('styleCornerBl', actualSeriesIndex);
        const brValue = getSeriesValue('styleCornerBr', actualSeriesIndex);
        tlAdv = tlValue !== undefined ? asNumber(tlValue) : undefined;
        trAdv = trValue !== undefined ? asNumber(trValue) : undefined;
        blAdv = blValue !== undefined ? asNumber(blValue) : undefined;
        brAdv = brValue !== undefined ? asNumber(brValue) : undefined;
      }

      // Apply the values
      if (top !== undefined) { tl = top; tr = top; }
      if (bottom !== undefined) { bl = bottom; br = bottom; }

      // Individual overwrites (only when Advanced is on)
      if (advanced) {
        if (tlAdv !== undefined) tl = tlAdv;
        if (trAdv !== undefined) tr = trAdv;
        if (blAdv !== undefined) bl = blAdv;
        if (brAdv !== undefined) br = brAdv;
      }

      itemStyle.borderRadius = [tl, tr, br, bl]; // ECharts order
      s.itemStyle = itemStyle;
      return s;
    }
  );
})();
`.trim(),
  },
};
