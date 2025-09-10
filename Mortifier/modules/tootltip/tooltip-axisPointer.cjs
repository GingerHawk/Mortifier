// modules/tooltip-axisPointer.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-axisPointer',
  label: 'Tooltip - Axis Pointer',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],

  order: 250,

  files: [
    {
      template: path.join('tooltip', 'tooltip-axisPointer.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-axisPointer.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-axisPointer').replace(/\\/g, '/'),
      names: [
        'axisPointerEnabled',
        'axisPointerControls',
        'axisPointerType',
        'axisPointerColor',
        'axisPointerWidth',
        'axisPointerShadowColor',
      ],
      stamp: '/* MortModule: tooltip-axisPointer import */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-axisPointer section */',
      rows: [
        `<SubHeader label={t('Axis Pointer')} tip={t('Controls the type, color, and width of axis pointer indicators.')} />`,
        'axisPointerEnabled',
        'axisPointerControls',
        'axisPointerType',
        'axisPointerColor',
        'axisPointerWidth',
        'axisPointerShadowColor',
      ],
    },
  },
needs: ['rgba', 'asNumber'],
transformProps: {  
  snippetStamp: '/* MortModule: tooltip-axisPointer logic v3 */',
  snippet: `/* MortModule: tooltip-axisPointer logic v3 */
(function applyTooltipAxisPointerV3() {
  if (!(formData && formData.axisPointerEnabled)) return;

  mapSingle(options, 'tooltip', (base) => {
    const ap   = { ...(base.axisPointer || {}) };
    const type = formData.axisPointerType || 'line';
    ap.type    = type;

    const clearStylesExcept = (keep: string) => {
      if (keep !== 'lineStyle')   delete ap.lineStyle;
      if (keep !== 'crossStyle')  delete ap.crossStyle;
      if (keep !== 'shadowStyle') delete ap.shadowStyle;
    };

    if (type === 'shadow') {
      const sc = formData.axisPointerShadowColor;
      if (sc) {
        ap.shadowStyle = { ...(ap.shadowStyle || {}), color: rgba(sc) };
      }
      clearStylesExcept('shadowStyle');
    } else {
      const c = formData.axisPointerColor;
      const w = asNumber(formData.axisPointerWidth);
      const styleKey = (type === 'cross') ? 'crossStyle' : 'lineStyle';
      const styleObj = { ...(ap[styleKey] || {}) };
      if (c) styleObj.color = rgba(c);
      if (Number.isFinite(w)) styleObj.width = w;
      ap[styleKey] = styleObj;
      clearStylesExcept(styleKey);

      if (type === 'cross') {
        const colorVal = c ? rgba(c) : undefined;
        const widthVal = Number.isFinite(w) ? w : undefined;
        const applyAxisLineStyle = (ax: any) => {
          const ap2 = { ...(ax.axisPointer || {}) };
          const ls  = { ...(ap2.lineStyle || {}) };
          if (colorVal) ls.color = colorVal;
          if (Number.isFinite(widthVal)) ls.width = widthVal;
          ap2.lineStyle = ls;
          return { ...ax, axisPointer: ap2 };
        };
        mapArrayProp(options, 'xAxis', applyAxisLineStyle);
        mapArrayProp(options, 'yAxis', applyAxisLineStyle);
      }
    }
    return { ...base, axisPointer: ap };
  });
})();
`.trim(),
},

};
