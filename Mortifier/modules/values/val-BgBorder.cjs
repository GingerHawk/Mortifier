const path = require('path');

module.exports = {
  id: 'values-bgborder',
  label: 'Values - Background & Border',
  appliesTo: ['bar','line','area','scatter', 'pie'],
  order: 310,

  files: [
    {
      template: path.join('values','val-BgBorder.tsx'),
      dest: path.join('src','plugin','values','val-BgBorder.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','values','val-BgBorder').replace(/\\/g,'/'),
      names: [
        'valBgBorderEnabled',
        'valBgBorderControls',
        'valBgBorderCurrentSeries',
        // Series 1 Controls
        'valBgColor1',
        'valBgPadding1',
        'valBgRadius1',
        'valBorderShow1',
        'valBorderColor1',
        'valBorderWidth1',
        'valBorderType1',
        // Series 2 Controls
        'valBgColor2',
        'valBgPadding2',
        'valBgRadius2',
        'valBorderShow2',
        'valBorderColor2',
        'valBorderWidth2',
        'valBorderType2',
        // Series 3 Controls
        'valBgColor3',
        'valBgPadding3',
        'valBgRadius3',
        'valBorderShow3',
        'valBorderColor3',
        'valBorderWidth3',
        'valBorderType3',
        // All Series Controls
        'valBgColorAll',
        'valBgPaddingAll',
        'valBgRadiusAll',
        'valBorderShowAll',
        'valBorderColorAll',
        'valBorderWidthAll',
        'valBorderTypeAll',
      ],
      stamp: '/* MortModule: values-bgborder import */',
    },
    section: {
      tab: 'customize',
      label: 'Values',
      stamp: '/* MortModule: values-bgborder section */',
      rows: [
        `<SubHeader label={t('Background & Border')} tip={t('Configure value label backgrounds and borders with per-series support.')} />`,
        'valBgBorderEnabled',
        'valBgBorderControls',
        'valBgBorderCurrentSeries',
        // Series 1 Controls
        'valBgColor1',
        'valBgPadding1',
        'valBgRadius1',
        'valBorderShow1',
        'valBorderColor1',
        'valBorderWidth1',
        'valBorderType1',
        // Series 2 Controls
        'valBgColor2',
        'valBgPadding2',
        'valBgRadius2',
        'valBorderShow2',
        'valBorderColor2',
        'valBorderWidth2',
        'valBorderType2',
        // Series 3 Controls
        'valBgColor3',
        'valBgPadding3',
        'valBgRadius3',
        'valBorderShow3',
        'valBorderColor3',
        'valBorderWidth3',
        'valBorderType3',
        // All Series Controls
        'valBgColorAll',
        'valBgPaddingAll',
        'valBgRadiusAll',
        'valBorderShowAll',
        'valBorderColorAll',
        'valBorderWidthAll',
        'valBorderTypeAll',
      ],
    },
  },
needs: ['rgba','asNumber','AnyDict','mapSeries'],
  transformProps: {
    snippetStamp: '/* MortModule: values-bgborder transform */',
    snippet: `/* MortModule: values-bgborder transform - background and border only */
(function applyValuesBgBorder() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;

  // Main enable check
  if (!fd.valBgBorderEnabled) return;

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.valBgBorderCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  // Apply background + border styling (per series)
  mapSeries(options, () => true, (s: AnyDict, actualSeriesIndex: number) => {
    const lbl = { ...(s.label || {}) } as AnyDict;

    // Background styling
    const valBgColor = getSeriesValue('valBgColor', actualSeriesIndex);
    if (valBgColor) {
      lbl.backgroundColor = typeof valBgColor === 'string'
        ? valBgColor
        : rgba(valBgColor);
      
      const rad = asNumber(getSeriesValue('valBgRadius', actualSeriesIndex));
      if (Number.isFinite(rad)) lbl.borderRadius = rad;

      const pad = asNumber(getSeriesValue('valBgPadding', actualSeriesIndex));
      if (Number.isFinite(pad)) lbl.padding = pad;
    }

    // Border styling
    const valBorderShow = getSeriesValue('valBorderShow', actualSeriesIndex);
    if (valBorderShow) {
      // If border is shown but no background, add transparent background
      if (!valBgColor) {
        lbl.backgroundColor = 'transparent';
      }
      
      const valBorderColor = getSeriesValue('valBorderColor', actualSeriesIndex);
      if (valBorderColor) {
        lbl.borderColor = typeof valBorderColor === 'string'
          ? valBorderColor
          : rgba(valBorderColor);
      }
      const bw = asNumber(getSeriesValue('valBorderWidth', actualSeriesIndex));
      if (Number.isFinite(bw)) lbl.borderWidth = bw;
      const valBorderType = getSeriesValue('valBorderType', actualSeriesIndex);
      if (valBorderType) lbl.borderType = valBorderType;
    } else {
      lbl.borderWidth = 0;
    }

    s.label = lbl;
    return s;
  });
})();
`.trim(),
  },
};
