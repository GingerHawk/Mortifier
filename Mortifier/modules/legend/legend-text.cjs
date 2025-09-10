// modules/legend/legend-text.cjs
const path = require('path');

module.exports = {
  id: 'legend-text',
  label: 'Legend - Text',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 520, // place after general style modules; adjust as you like

  files: [
    {
      template: path.join('legend', 'legend-text.tsx'),
      dest: path.join('src', 'plugin', 'legend', 'legend-text.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','legend','legend-text').replace(/\\/g,'/'),
      names: [
        'legendTextStyleEnabled',
        'legendTextStyleControls',
        'legendTextColor',
        'legendTextFontFamily',
        'legendTextFontSize',
        'legendTextFontStyle',
        'legendTextFontWeight',
        'legendTextLineHeight',
      ],
      stamp: '/* MortModule: legend-text import */',
    },
    section: {
      tab: 'customize',
      label: 'Legend',
      stamp: '/* MortModule: legend-text section */',
      rows: [
        `<SubHeader label={t('Text')} tip={t('Customizes legend text color, font, size, and spacing.')} />`,
        'legendTextStyleEnabled',
        'legendTextStyleControls',
        'legendTextColor',
        'legendTextFontFamily',
        'legendTextFontSize',
        'legendTextFontStyle',
        'legendTextFontWeight',
        'legendTextLineHeight',
      ],
    },
  },
needs: ['rgba'],
  transformProps: {
    snippetStamp: '/* MortModule: legend-text logic */',
    snippet: `/* MortModule: legend-text logic */
(function applyLegendText() {
  // Gate strictly on Enable. Visibility "Controls" toggles (when present) are for UI only.
  if (!(formData && (formData).legendTextStyleEnabled)) return;

  const colorVal = (formData).legendTextColor;
  const ff = (formData).legendTextFontFamily;
  const fs = (formData).legendTextFontSize;
  const fstyle = (formData).legendTextFontStyle;
  const fweight = (formData).legendTextFontWeight;
  const lh = asNumber((formData).legendTextLineHeight);

  mapArrayProp(options, 'legend', (legend) => {
  const next = { ...legend };
  const ts = { ...(next.textStyle || {}) };

    if (colorVal && typeof colorVal === 'object') ts.color = rgba(colorVal);
    
    // IMPORTANT: when 'inherit' (Theme), do NOT set fontFamily — let theme cascade.
    if (ff && ff !== 'inherit' && ff !== 'theme' && ff !== 'Theme') {
      ts.fontFamily = ff;
    }
    
    if (Number.isFinite(fs)) ts.fontSize = fs;
    if (fstyle) ts.fontStyle = fstyle;
    if (fweight) ts.fontWeight = fweight;
    if (Number.isFinite(lh)) ts.lineHeight = lh;

    next.textStyle = ts;
    return next;
  });
})();
`.trim(),
  },
};
