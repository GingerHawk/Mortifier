// modules/grid-border.cjs
const path = require('path');

module.exports = {
  id: 'grid-border',
  label: 'Grid - Border',
  appliesTo: ['bar', 'line', 'area', 'scatter', ],
  order: 710,

  files: [
    {
      template: path.join('grid', 'grid-border.tsx'),
      dest: path.join('src', 'plugin', 'grid', 'grid-border.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'grid', 'grid-border').replace(/\\/g, '/'),
      names: [
        'gridBorderEnabled',
        'gridBorderControls',
        'gridBorderColor',
        'gridBorderWidth',
        'gridBorderType',
       
      ],
      stamp: '/* MortModule: grid-border import */',
    },
    section: {
      tab: 'customize',
      label: 'Grid',
      stamp: '/* MortModule: grid-border section */',
      rows: [
        `<SubHeader label={t('Border')} tip={t('TODO: Add tooltip text')} />`,
        'gridBorderEnabled',
        'gridBorderControls',
        'gridBorderColor',
        'gridBorderWidth',
        'gridBorderType',
       
      ],
    },
  },
needs: ['asNumber', 'rgba'],
  transformProps: {
    snippetStamp: '/* MortModule: grid-border logic */',
    snippet: `/* MortModule: grid-border logic */
(function applyGridBorder() {
  if (!(formData && (formData).gridBorderEnabled)) return;

  mapArrayProp(options, 'grid', (g) => {
    const next = { ...g, show: true };
    next.borderColor = rgba((formData as any).gridBorderColor);
    next.borderWidth = asNumber((formData as any).gridBorderWidth, next.borderWidth || 0);
    next.borderType  = (formData as any).gridBorderType || next.borderType || 'solid';
    next.borderRadius = asNumber((formData as any).gridBorderRadius, next.borderRadius || 0);
    return next;
  });
})();
`.trim(),
  },
};
