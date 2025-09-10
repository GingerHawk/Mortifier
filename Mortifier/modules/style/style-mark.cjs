// modules/style/mark.cjs
const path = require('path');


module.exports = {
  id: 'mark',
  label: 'Mark',
  appliesTo: ['line', 'area', 'scatter'],
  order: 140,

  files: [
    {
      template: path.join('style', 'style-mark.tsx'),
      dest: path.join('src', 'plugin', 'style', 'style-mark.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'style', 'style-mark').replace(/\\/g, '/'),
      names: [
        'markEnabled',
        'markControls',
        'markCurrentSeries',
        // All Series Controls
        'markTargetAll',
        'markShowAll',
        'markSymbolTypeAll',
        'markSizeAll',
        'markColorAll',
        // Series 1 Controls
        'markTarget1',
        'markShow1',
        'markSymbolType1',
        'markSize1',
        'markColor1',
        // Series 2 Controls
        'markTarget2',
        'markShow2',
        'markSymbolType2',
        'markSize2',
        'markColor2',
        // Series 3 Controls
        'markTarget3',
        'markShow3',
        'markSymbolType3',
        'markSize3',
        'markColor3',
      ],
      stamp: '/* MortModule: style-mark import */',
    },
    section: {
      tab: 'customize',
      label: 'Style',
      stamp: '/* MortModule: style-mark section */',
      rows: [
        `<SubHeader label={t('Mark')} tip={t('Controls visibility, shape, size, and color of data point marks.')} />`,
        'markEnabled',
        'markControls',
        'markCurrentSeries',
        // All Series Controls
        'markTargetAll',
        'markShowAll',
        'markSymbolTypeAll',
        'markSizeAll',
        'markColorAll',
        // Series 1 Controls
        'markTarget1',
        'markShow1',
        'markSymbolType1',
        'markSize1',
        'markColor1',
        // Series 2 Controls
        'markTarget2',
        'markShow2',
        'markSymbolType2',
        'markSize2',
        'markColor2',
        // Series 3 Controls
        'markTarget3',
        'markShow3',
        'markSymbolType3',
        'markSize3',
        'markColor3',
      ],
    },
  },
needs: ['rgba', 'asNumber','AnyDict', 'mapSeries'],
transformProps: {
  snippetStamp: '/* MortModule: style-mark transform v7 */',
  snippet: `(function applyMarksV11() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;
  if (!fd.markEnabled) return;

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.markCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
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
    (s: AnyDict) => s && (s.type === 'line' || s.type === 'scatter'),
    (s: AnyDict, actualSeriesIndex: number) => {
      const target = getSeriesValue('markTarget', actualSeriesIndex);
      const show = getSeriesValue('markShow', actualSeriesIndex);
      const symbolType = getSeriesValue('markSymbolType', actualSeriesIndex);
      const sizeValue = getSeriesValue('markSize', actualSeriesIndex);
      const size = sizeValue !== undefined ? asNumber(sizeValue) : undefined;
      const color = getSeriesValue('markColor', actualSeriesIndex);
      
      // Apply the values
      if (typeof show === 'boolean') s.showSymbol = show;
      if (symbolType) s.symbol = symbolType;
      if (Number.isFinite(size)) s.symbolSize = size;

      // 2) Before touching symbol color, capture the stroke that the line should keep.
      //    Priority: an already explicit lineStyle.color (from other controls) → else the current series/itemStyle color.
      const explicitLineStroke =
        s.lineStyle && (s.lineStyle as AnyDict).color != null
          ? (s.lineStyle as AnyDict).color
          : undefined;

      const seriesItemColorBefore =
        s.itemStyle && (s.itemStyle as AnyDict).color != null
          ? (s.itemStyle as AnyDict).color
          : undefined;

      // Cache once so future mark color changes don’t overwrite the locked stroke
      if ((s as AnyDict).__mortLineStroke == null) {
        (s as AnyDict).__mortLineStroke = explicitLineStroke ?? seriesItemColorBefore;
      } else if (explicitLineStroke != null) {
        // If another control later sets an explicit line stroke, adopt that as the locked value
        (s as AnyDict).__mortLineStroke = explicitLineStroke;
      }

      // 3) Apply marker (symbol) color ONLY — never set series-wide color
      const markColor =
        typeof color === 'string'
          ? color
          : color && typeof color === 'object'
          ? rgba(color)
          : undefined;

      if (markColor) {
        if (target === 'emphasis') {
          s.emphasis = { ...(s.emphasis || {}) };
          (s.emphasis as AnyDict).itemStyle = {
            ...((s.emphasis as AnyDict).itemStyle || {}),
            color: markColor,
          };
        } else {
          s.itemStyle = { ...(s.itemStyle || {}), color: markColor };
        }
      }

      // 4) Re-assert the line stroke so it never inherits the mark color.
      if (s.type === 'line') {
        const locked = (s as AnyDict).__mortLineStroke;
        if (locked != null) {
          s.lineStyle = { ...(s.lineStyle || {}), color: locked } as AnyDict;
          if (s.emphasis) {
            (s.emphasis as AnyDict).lineStyle = {
              ...((s.emphasis as AnyDict).lineStyle || {}),
              color: locked,
            };
          }
        }
      }

      return s;
    },
  );
})();
`.trim(),
},



};
