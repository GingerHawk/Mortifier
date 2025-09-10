// modules/axis-y.cjs
const path = require('path');

module.exports = {
  id: 'axis-y',
  label: 'Axis - Y',
  appliesTo: ['bar', 'line', 'area', 'scatter'],
  order: 421,

  files: [
    {
      template: path.join('axis', 'axis-y.tsx'),
      dest: path.join('src', 'plugin', 'axis', 'axis-y.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'axis', 'axis-y').replace(/\\/g, '/'),
      names: [
        'yAxisEnabled',
        'yAxisControls',
        'yAxisMin',
        'yAxisMax',
        'yAxisPosition',
        'yAxisSplitLineEnabled',
        'yAxisSplitLineColor',
        'yAxisSplitLineType',
        'yAxisLineWidth',
        'yAxisTitleOffsetY',
        'yAxisTitleOffsetX',
        'yAxisTitlePosition',
        'yAxisTitleText',
        'yAxisTitleFontStyle',
        'yAxisTitleFontSize',
        'yAxisTitleFontFamily',
        'yAxisTitleColor', 
        'yAxisTitleControls',   
      ],
      stamp: '/* MortModule: axis-y import */',
    },
    section: {
      tab: 'customize',
      label: 'Axis',
      stamp: '/* MortModule: axis-y section */',
      rows: [
        `<SubHeader label={t('Y-Axis')} tip={t('Configures Y-axis values, position, and split line display.')} />`,
        'yAxisEnabled',
        'yAxisControls',
        'yAxisTitleControls',
        'yAxisTitleText',
        'yAxisTitleFontFamily',
        'yAxisTitleFontSize',
        'yAxisTitleFontStyle',
        'yAxisTitleColor', 
        'yAxisTitlePosition',
        'yAxisTitleOffsetX',
        'yAxisTitleOffsetY',
        'yAxisMin',
        'yAxisMax',
        'yAxisPosition',
        'yAxisLineWidth',        
        'yAxisSplitLineEnabled',
        'yAxisSplitLineColor',
        'yAxisSplitLineType',
      ],
    },
  },
needs: ['asNumber', 'rgba','AnyDict'],
  transformProps: {  
    snippetStamp: '/* MortModule: axis-y logic */',
    snippet: `/* MortModule: axis-y logic (title with % offsets, always apply provided styles) */
(function applyYAxis() {
  const fd = (typeof formData !== 'undefined' ? formData : {}) as AnyDict;
  if (!fd?.yAxisEnabled) return;

  mapArrayProp(options, 'yAxis', (base: AnyDict) => {
    const next: AnyDict = { ...(base || {}) };

    // ── Title ────────────────────────────────────────────────────────────────
    const titleText = String(fd.yAxisTitleText ?? '').trim();
    if (titleText) {
      next.name = titleText;
      next.nameLocation = fd.yAxisTitlePosition || 'middle';

      const nts: AnyDict = { ...(next.nameTextStyle || {}) };

      // Percent-based offsets → convert to px relative to font size (100% ≈ 4×fontSize)
      const fsTitle = Number.isFinite(asNumber(fd.yAxisTitleFontSize))
        ? asNumber(fd.yAxisTitleFontSize)
        : (Number.isFinite(nts.fontSize) ? Number(nts.fontSize) : 12);
      const scalePx = (pct: unknown) => {
        const p = asNumber(pct, 0);
        return Math.round((p / 100) * (4 * fsTitle));
      };

      const offYpx = scalePx(fd.yAxisTitleOffsetY); // top pad
      const offXpx = scalePx(fd.yAxisTitleOffsetX); // left pad
      nts.padding = [offYpx, 0, 0, offXpx];

      // Always apply provided style choices (no gating)
      const col = rgba(fd.yAxisTitleColor);
      if (col) nts.color = col;
      
      // IMPORTANT: when 'inherit' (Theme), do NOT set fontFamily — let theme cascade.
      const fam = fd.yAxisTitleFontFamily;
      if (fam && fam !== 'inherit' && fam !== 'theme' && fam !== 'Theme') {
        nts.fontFamily = String(fam);
      }
      
      if (Number.isFinite(asNumber(fd.yAxisTitleFontSize))) nts.fontSize = asNumber(fd.yAxisTitleFontSize);

      const fw = String(fd.yAxisTitleFontStyle ?? '').trim();
      if (fw) {
        if (fw === 'normal' || fw === 'italic' || fw === 'oblique') nts.fontStyle = fw;
        if (fw === 'lighter' || fw === 'bold' || fw === 'bolder') nts.fontWeight = fw;
        if (/^\d{3}$/.test(fw)) nts.fontWeight = fw; // '400'..'900'
      }

      next.nameTextStyle = nts;
    } else {
      delete next.name;
    }

    // ── Min/Max ──────────────────────────────────────────────────────────────
    const minRaw = fd.yAxisMin;
    const maxRaw = fd.yAxisMax;
    if (minRaw !== '' && minRaw != null) next.min = asNumber(minRaw);
    if (maxRaw !== '' && maxRaw != null) next.max = asNumber(maxRaw);

    // Position (left/right)
    if (fd.yAxisPosition) next.position = fd.yAxisPosition;

    // ── Split line ──────────────────────────────────────────────────────────
    next.splitLine = {
      ...(base?.splitLine || {}),
      show: !!fd.yAxisSplitLineEnabled,
      lineStyle: {
        ...(base?.splitLine?.lineStyle || {}),
        color: rgba(fd.yAxisSplitLineColor),
        type: fd.yAxisSplitLineType || 'solid',
        width: asNumber(fd.yAxisLineWidth, base?.splitLine?.lineStyle?.width),
      },
    };

    return next;
  });
})();

`.trim(),
  },
};
