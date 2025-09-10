// modules/axis-x.cjs
const path = require('path');

module.exports = {
  id: 'axis-x',
  label: 'Axis - X',
  appliesTo: ['bar', 'line', 'area', 'scatter'],
  order: 410,

  files: [
    {
      template: path.join('axis', 'axis-x.tsx'),
      dest: path.join('src', 'plugin', 'axis', 'axis-x.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'axis', 'axis-x').replace(/\\/g, '/'),
      names: [
        'xAxisEnabled',
        'xAxisControls',
        'xAxisRotate',
        'xAxisInterval',
        'xAxisShowMinLabel',
        'xAxisShowMaxLabel',
        'xAxisPosition',
        'xAxisSplitLineEnabled',
        'xAxisSplitLineColor',
        'xAxisSplitLineType',
        'xAxisTitleOffsetY',
        'xAxisTitleOffsetX',
        'xAxisTitlePosition',
        'xAxisTitleText',
        'xAxisTitleFontStyle',
        'xAxisTitleFontSize',
        'xAxisTitleFontFamily',
        'xAxisTitleColor', 
        'xAxisTitleControls',       
      ],
      stamp: '/* MortModule: axis-x import */',
    },
    section: {
      tab: 'customize',
      label: 'Axis',
      stamp: '/* MortModule: axis-x section */',
      rows: [
        `<SubHeader label={t('X-Axis')} tip={t('Configures the X-axis position, label display, rotation, and split lines.')} />`,
        'xAxisEnabled',
        'xAxisControls',
        'xAxisTitleControls',
        'xAxisTitleText',
        'xAxisTitleFontFamily',
        'xAxisTitleFontSize',
        'xAxisTitleFontStyle',
        'xAxisTitleColor', 
        'xAxisTitlePosition',
        'xAxisTitleOffsetX',
        'xAxisTitleOffsetY',
        'xAxisRotate',
        'xAxisInterval',
        'xAxisShowMinLabel',
        'xAxisShowMaxLabel',
        'xAxisPosition',
        'xAxisSplitLineEnabled',
        'xAxisSplitLineColor',
        'xAxisSplitLineType',
      ],
    },
  },
needs: ['asNumber', 'rgba','AnyDict'],
  transformProps: {
    snippetStamp: '/* MortModule: axis-x logic */',
    snippet: `/* MortModule: axis-x logic (title with % offsets, always apply provided styles) */
(function applyXAxis() {
  const fd = (formData as AnyDict);
  if (!fd?.xAxisEnabled) return;

  mapArrayProp(options, 'xAxis', (base: AnyDict) => {
    const next: AnyDict = { ...(base || {}) };
    const axisLabel: AnyDict = { ...(next.axisLabel || {}) };

    // ── Title (percent-based offsets) ────────────────────────────────────────
    const titleText = String(fd.xAxisTitleText ?? '').trim();
    if (titleText) {
      next.name = titleText;
      next.nameLocation = fd.xAxisTitlePosition || 'middle';

      const nts: AnyDict = { ...(next.nameTextStyle || {}) };

      // Convert % sliders to px relative to title font size (100% ≈ 4×fontSize)
      const fsTitle = Number.isFinite(asNumber(fd.xAxisTitleFontSize))
        ? asNumber(fd.xAxisTitleFontSize)
        : (Number.isFinite(nts.fontSize) ? Number(nts.fontSize) : 12);
      const scalePx = (pct: unknown) => {
        const p = asNumber(pct, 0);
        return Math.round((p / 100) * (4 * fsTitle));
      };

      const offYpx = scalePx(fd.xAxisTitleOffsetY); // top pad
      const offXpx = scalePx(fd.xAxisTitleOffsetX); // left pad
      nts.padding = [offYpx, 0, 0, offXpx];

      // Always apply provided style choices (no gating)
      const col = rgba(fd.xAxisTitleColor);
      if (col) nts.color = col;
      
      // IMPORTANT: when 'inherit' (Theme), do NOT set fontFamily — let theme cascade.
      const fam = fd.xAxisTitleFontFamily;
      if (fam && fam !== 'inherit' && fam !== 'theme' && fam !== 'Theme') {
        nts.fontFamily = String(fam);
      }
      
      if (Number.isFinite(asNumber(fd.xAxisTitleFontSize))) nts.fontSize = asNumber(fd.xAxisTitleFontSize);

      const fw = String(fd.xAxisTitleFontStyle ?? '').trim();
      if (fw) {
        if (fw === 'normal' || fw === 'italic' || fw === 'oblique') nts.fontStyle = fw;
        if (fw === 'lighter' || fw === 'bold' || fw === 'bolder') nts.fontWeight = fw;
        if (/^\d{3}$/.test(fw)) nts.fontWeight = fw; // '400'..'900'
      }

      next.nameTextStyle = nts;
    } else {
      delete next.name;
    }

    // ── Label rotate/interval/min/max ───────────────────────────────────────
    const rot = asNumber(fd.xAxisRotate, 0);
    axisLabel.rotate = Number.isFinite(rot) ? rot : 0;

    const intvRaw = fd.xAxisInterval;
    axisLabel.interval = (intvRaw === 'auto') ? 'auto' : asNumber(intvRaw, NaN);

    axisLabel.showMinLabel = !!fd.xAxisShowMinLabel;
    axisLabel.showMaxLabel = !!fd.xAxisShowMaxLabel;
    next.axisLabel = axisLabel;

    if (fd.xAxisPosition) next.position = fd.xAxisPosition;

    next.splitLine = {
      ...(base?.splitLine || {}),
      show: !!fd.xAxisSplitLineEnabled,
      lineStyle: {
        ...(base?.splitLine?.lineStyle || {}),
        color: rgba(fd.xAxisSplitLineColor),
        type: fd.xAxisSplitLineType || 'solid',
      },
    };

    return next;
  });
})();

`.trim(),
  },
};
