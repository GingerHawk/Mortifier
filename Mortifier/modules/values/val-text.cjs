const path = require('path');

module.exports = {
  id: 'values-text',
  label: 'Values - Text Formatting',
  appliesTo: ['bar','line','area','scatter', 'pie'],
  order: 320,

  files: [
    {
      template: path.join('values','val-text.tsx'),
      dest: path.join('src','plugin','values','val-text.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','values','val-text').replace(/\\/g,'/'),
      names: [
        'valTextStyleEnabled',
        'valTextStyleControls',
        'valTextCurrentSeries',
        // Series 1 Controls
        'valTextColor1',
        'valTextFontFamily1',
        'valTextFontSize1',
        'valTextFontStyle1',
        // Series 2 Controls
        'valTextColor2',
        'valTextFontFamily2',
        'valTextFontSize2',
        'valTextFontStyle2',
        // Series 3 Controls
        'valTextColor3',
        'valTextFontFamily3',
        'valTextFontSize3',
        'valTextFontStyle3',
        // All Series Controls
        'valTextColorAll',
        'valTextFontFamilyAll',
        'valTextFontSizeAll',
        'valTextFontStyleAll',
      ],
      stamp: '/* MortModule: values-text import */',
    },
    section: {
      tab: 'customize',
      label: 'Values',
      stamp: '/* MortModule: values-text section */',
      rows: [
        `<SubHeader label={t('Text Formatting')} tip={t('Configure text color, font, and style for value labels with per-series support.')} />`,
        'valTextStyleEnabled',
        'valTextStyleControls',
        'valTextCurrentSeries',
        // Series 1 Controls
        'valTextColor1',
        'valTextFontFamily1',
        'valTextFontSize1',
        'valTextFontStyle1',
        // Series 2 Controls
        'valTextColor2',
        'valTextFontFamily2',
        'valTextFontSize2',
        'valTextFontStyle2',
        // Series 3 Controls
        'valTextColor3',
        'valTextFontFamily3',
        'valTextFontSize3',
        'valTextFontStyle3',
        // All Series Controls
        'valTextColorAll',
        'valTextFontFamilyAll',
        'valTextFontSizeAll',
        'valTextFontStyleAll',
      ],
    },
  },
  needs: ['rgba','asNumber','AnyDict','mapSeries'],
  transformProps: {
    snippetStamp: '/* MortModule: values-text transform */',
    snippet: `/* MortModule: values-text transform - text formatting only */
(function applyValuesTextFormatting() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;

  // Main enable check
  if (!fd.valTextStyleEnabled) return;

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.valTextCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  // Apply text styles per series
  mapSeries(options, () => true, (s: AnyDict, actualSeriesIndex: number) => {
    const lbl = { ...(s.label || {}) } as AnyDict;
    
    // Text color
    const textColor = getSeriesValue('valTextColor', actualSeriesIndex);
    if (textColor) {
      lbl.color = typeof textColor === 'string' 
        ? textColor 
        : rgba(textColor);
    }
    
    // Font family
    const fontFamily = getSeriesValue('valTextFontFamily', actualSeriesIndex);
    if (fontFamily && fontFamily !== 'inherit') {
      lbl.fontFamily = fontFamily;
    }
    
    // Font size
    const fontSize = asNumber(getSeriesValue('valTextFontSize', actualSeriesIndex));
    if (Number.isFinite(fontSize)) {
      lbl.fontSize = fontSize;
    }
    
    // Font style/weight
    const fontStyle = getSeriesValue('valTextFontStyle', actualSeriesIndex);
    if (fontStyle) {
      // Handle special cases
      if (fontStyle === 'italic' || fontStyle === 'oblique') {
        lbl.fontStyle = fontStyle;
      } else if (fontStyle === 'lighter') {
        lbl.fontWeight = 'lighter';
      } else if (fontStyle === 'bold' || fontStyle === 'bolder') {
        lbl.fontWeight = fontStyle;
      } else if (/^\\d+$/.test(fontStyle)) {
        // Numeric weight values (400, 500, 600, etc.)
        lbl.fontWeight = fontStyle;
      } else if (fontStyle === 'normal') {
        lbl.fontWeight = 'normal';
        lbl.fontStyle = 'normal';
      }
    }
    
    s.label = lbl;
    return s;
  });
})();
`.trim(),
  },
};