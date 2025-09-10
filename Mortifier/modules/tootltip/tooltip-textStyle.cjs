// modules/tooltip-textStyle.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-textStyle',
  label: 'Tooltip - Text Style',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 230,

  files: [
    {
      template: path.join('tooltip', 'tooltip-textStyle.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-textStyle.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-textStyle').replace(/\\/g, '/'),
      names: [
        'tooltipTextEnabled',
        'tooltipTextControls',
        'tooltipTextColor',
        'tooltipTextFontFamily',
        'tooltipTextFontSize',
        'tooltipTextFontStyle',
        'tooltipTextLineHeight',
      ],
      stamp: '/* MortModule: tooltip-textStyle import */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-textStyle section */',
      rows: [
        `<SubHeader label={t('Text Style')} tip={t('Customizes tooltip text color, font, size, weight, and line height.')} />`,
        'tooltipTextEnabled',
        'tooltipTextControls',
        'tooltipTextColor',
        'tooltipTextFontFamily',
        'tooltipTextFontSize',
        'tooltipTextFontStyle',
        'tooltipTextLineHeight',
      ],
    },
  },
needs: ['rgba', 'asNumber', 'mergeCssText'],
  transformProps: {
   
    snippetStamp: '/* MortModule: tooltip-textStyle logic */',
    snippet: `/* MortModule: tooltip-textStyle logic (HTML-safe fonts via extraCssText) */
(function applyTooltipTextStyle() {
  const fd = (formData as any);
  if (!fd?.tooltipTextEnabled) return;

  mapSingle(options, 'tooltip', (base) => {
    const next = { ...(base || {}) };

    // Keep textStyle for non-HTML fallback (color/family still help)
    const ts = { ...(next.textStyle || {}) };
    const cRaw = fd.tooltipTextColor;
    if (cRaw) ts.color = (typeof cRaw === 'string') ? cRaw : rgba(cRaw);
    if (fd.tooltipTextFontFamily) ts.fontFamily = String(fd.tooltipTextFontFamily);

    // Build CSS for HTML renderMode (overrides reliably with !important)
    const cssParts: string[] = [];
    const fs = asNumber(fd.tooltipTextFontSize);
    if (Number.isFinite(fs)) cssParts.push('font-size:' + fs + 'px !important;');
    const lh = asNumber(fd.tooltipTextLineHeight);
    if (Number.isFinite(lh)) cssParts.push('line-height:' + lh + 'px !important;');
    if (fd.tooltipTextFontStyle)  cssParts.push('font-style:' + String(fd.tooltipTextFontStyle) + ' !important;');
    if (fd.tooltipTextFontStyle) cssParts.push('font-weight:' + String(fd.tooltipTextFontStyle) + ' !important;');

    // Clean any prior font declarations we injected, then merge
    let prev = (next.extraCssText ? String(next.extraCssText) : '')
      .replace(/font-size:\s*[^;]+;?/gi, '')
      .replace(/line-height:\s*[^;]+;?/gi, '')
      .replace(/font-style:\s*[^;]+;?/gi, '')
      .replace(/font-weight:\s*[^;]+;?/gi, '')
      .trim();

    const addCss = cssParts.join(' ');
    if (addCss) next.extraCssText = mergeCssText(base?.extraCssText, addCss);

    next.textStyle = ts;
    return next;
  });
})();

`.trim(),
  },
};
