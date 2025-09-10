// modules/tooltip-background.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-background',
  label: 'Tooltip - Background',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 210,

  files: [
    {
      template: path.join('tooltip', 'tooltip-background.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-background.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-background').replace(/\\/g, '/'),
      names: [
        'tooltipBackgroundEnabled',
        'tooltipBackgroundControls',
        'tooltipBackgroundType',
        'tooltipBg',
        'tooltipBgAngle',
        'tooltipBgStop1',
        'tooltipBgStop1Pos',
        'tooltipBgStop2',
        'tooltipBgStop2Pos',
        'tooltipBgStop3',
        'tooltipBgStop3Pos',
        'tooltipBgPadding',
        'tooltipBgRadius',
        'tooltipBgUseStop3',
      ],
      stamp: '/* MortModule: tooltip-background import */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-background section */',
      rows: [
        `<SubHeader label={t('Background')} tip={t('Configures the tooltip background with solid or gradient colors.')} />`,
        'tooltipBackgroundEnabled',
        'tooltipBackgroundControls',
        'tooltipBgPadding',
        'tooltipBgRadius',
        'tooltipBackgroundType',
        'tooltipBg',
        'tooltipBgAngle',
        'tooltipBgStop1',
        'tooltipBgStop1Pos',
        'tooltipBgStop2',
        'tooltipBgStop2Pos',
        'tooltipBgUseStop3',
        'tooltipBgStop3',
        'tooltipBgStop3Pos',

      ],
    },
  },
needs: ['asNumber', 'rgba', 'mergeCssText'],
  transformProps: {
   
    snippetStamp: '/* MortModule: tooltip-background logic */',
    snippet: `/* MortModule: tooltip-background logic */
(function applyTooltipBackground() {
  const fd = (formData as any);
  if (!fd?.tooltipBackgroundEnabled) return;

  mapSingle(options, 'tooltip', (base) => {
    const type = fd.tooltipBackgroundType || 'solid';
    const pad = asNumber(fd.tooltipBgPadding);
    const rad = asNumber(fd.tooltipBgRadius);
    const next = { ...(base || {}) };

    if (type === 'solid') {
      const c = rgba(fd.tooltipBg);
      if (c) next.backgroundColor = c;

      if (next.extraCssText) {
        next.extraCssText = String(next.extraCssText).replace(/background:[^;]+;?/g, '').trim();
      }
    } else {
      // Match styleFill angle behavior: CSS needs +90° to align with toLinearGradient
      const angle = asNumber(fd.tooltipBgAngle, 0);
      const cssAngle = (angle + 90) % 360;

      const stops = [
        { offset: asPercent01(fd.tooltipBgStop1Pos, 0),   color: rgba(fd.tooltipBgStop1) },
        { offset: asPercent01(fd.tooltipBgStop2Pos, 100), color: rgba(fd.tooltipBgStop2) },
      ];
      if (fd.tooltipBgUseStop3) {
        stops.splice(1, 0, {
          offset: asPercent01(fd.tooltipBgStop3Pos, 50),
          color: rgba(fd.tooltipBgStop3),
        });
      }

      const cssStops = stops
        .filter(s => typeof s.color === 'string')
        .sort((a, b) => a.offset - b.offset)
        .map(s => \`\${s.color} \${Math.round(s.offset * 100)}%\`)
        .join(', ');

      if (cssStops) {
        next.backgroundColor = rgba(fd.tooltipBgStop1) || 'rgba(0,0,0,0)';
        const css = \`background: linear-gradient(\${cssAngle}deg, \${cssStops}) !important;\`;
        next.extraCssText = mergeCssText(base?.extraCssText, css);
      }
    }

    if (Number.isFinite(pad)) next.padding = pad;
    if (Number.isFinite(rad)) next.borderRadius = rad;
    return next;
  });
})();

`.trim(),
  },
};
