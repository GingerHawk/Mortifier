const path = require('path');

module.exports = {
  id: 'axis-common',
  label: 'Axis — Common',
  appliesTo: ['bar', 'line', 'area', 'scatter'],
  order: 400,

  files: [
    {
      template: path.join('axis', 'axis-common.tsx'),
      dest: path.join('src', 'plugin', 'axis', 'axis-common.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..','..','..','plugin','axis','axis-common').replace(/\\/g,'/'),
      names: [
        'axisCommonEnabled',
        'axisCommonControls',
        'axisLineEnabled',
        'axisLineColor',
        'axisLineWidth',
        'axisLabelEnabled',
        'axisLabelColor',
        'axisLabelFontFamily',
        'axisLabelFontSize',
        'axisLabelFontStyle',
      ],
    },
    section: {
      tab: 'customize',
      label: 'Axis',
      rows: [
        `<SubHeader label={t('Common')} tip={t('Controls axis line and label styling, including color, width, and font.')} />`,
        'axisCommonEnabled',
        'axisCommonControls',
        'axisLineEnabled',
        'axisLineColor',
        'axisLineWidth',
        'axisLabelEnabled',
        'axisLabelColor',
        'axisLabelFontFamily',
        'axisLabelFontSize',
        'axisLabelFontStyle',
      ],
    },
  },

  needs: ['mapArrayProp','rgba','asNumber'],

  transformProps: {
    snippetStamp: '/* snippet:axis-common */',
    snippet: `
/* snippet:axis-common */
(function applyAxisCommon() {
  const fd = (typeof formData !== 'undefined' ? formData : {}) as any;
  if (!fd?.axisCommonEnabled) return;

  ['xAxis', 'yAxis'].forEach((key) => {
    mapArrayProp(options, key, (base) => {
      const next = { ...(base || {}) };

      // Axis line
      if (fd.axisLineEnabled) {
        const lineColor = rgba(fd.axisLineColor);
        const lineWidth = asNumber(fd.axisLineWidth, 1);
        next.axisLine = {
          ...(base?.axisLine || {}),
          show: true,
          lineStyle: {
            ...(base?.axisLine?.lineStyle || {}),
            ...(lineColor ? { color: lineColor } : {}),
            ...(Number.isFinite(lineWidth) ? { width: lineWidth } : {}),
          },
        };
      }

      // Axis labels
      if (fd.axisLabelEnabled) {
        const lbl = { ...(base?.axisLabel || {}), show: true };

        const col = rgba(fd.axisLabelColor);
        if (col) lbl.color = col;

        // IMPORTANT: when 'inherit' (Theme), do NOT set fontFamily — let theme cascade.
        const fam = fd.axisLabelFontFamily;
        if (fam && fam !== 'inherit' && fam !== 'theme' && fam !== 'Theme') {
          lbl.fontFamily = String(fam);
        }

        const fs = asNumber(fd.axisLabelFontSize);
        if (Number.isFinite(fs)) lbl.fontSize = fs;

        // Combined style/weight classifier
        const sw = fd.axisLabelFontStyle;
        if (sw !== null && sw !== undefined && sw !== '') {
          const v = String(sw);
          const lower = v.toLowerCase();
          const isNumericWeight = /^[1-9]00$/.test(lower); // 100..900
          const isWeightKeyword = lower === 'bold' || lower === 'bolder' || lower === 'lighter' || lower === 'normal';
          const isStyleKeyword  = lower === 'italic' || lower === 'oblique' || lower === 'normal';

          if (lower === 'normal') {
            lbl.fontStyle = 'normal';
            lbl.fontWeight = 'normal';
          } else {
            if (isStyleKeyword)  lbl.fontStyle  = lower; // italic/oblique
            if (isWeightKeyword || isNumericWeight) lbl.fontWeight = v; // bold/bolder/lighter/400..900
          }
        }

        next.axisLabel = lbl;
      } else {
        // Explicitly hide labels when unchecked
        next.axisLabel = { ...(base?.axisLabel || {}), show: false };
      }

      return next;
    });
  });
})(); 
`.trim(),
  },
};
