// modules/animation/ani-advanced.cjs
const path = require('path');

module.exports = {
  id: 'ani-advanced',
  label: 'Animation Advanced',
  appliesTo: ['all'],
  order: 820,

  files: [
    {
      template: path.join('animation', 'ani-advanced.tsx'),
      dest: path.join('src', 'plugin', 'animation', 'ani-advanced.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'animation', 'ani-advanced').replace(/\\/g, '/'),
      names: [
        'aniAdvEnabled',
        'animAdvControls',
        // All Series Controls
        'universalTransitionAll',
        'staggerSeriesMsAll',


      ],
      stamp: '/* MortModule: ani-advanced import */',
    },
    section: {
      tab: 'customize',
      label: 'Animation',
      stamp: '/* MortModule: ani-advanced section */',
      rows: [
        `<SubHeader label={t('Animation (Advanced)')} tip={t('Provides advanced animation options like univeral transitions and staggered series delays.')} />`,
        'aniAdvEnabled',
        'animAdvControls',
       // All Series Controls
        'universalTransitionAll',
        'staggerSeriesMsAll',


      ],
    },
  },

  needs: ['asNumber', 'mapSingle', 'mapSeries','AnyDict'],

  transformProps: {
    snippetStamp: '/* MortModule: ani-advanced transform v3 - universal controls */',
    snippet: `/* MortModule: ani-advanced transform - universal controls applied to all series */
(function applyAdvancedAnimation() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;

  // Main enable check
  if (!fd.aniAdvEnabled) return;

  // Ensure master animation is on when Apply is enabled
  mapSingle(options, 'animation', () => true);

  // Universal values applied to all series
  const doMorph = !!(fd as AnyDict).universalTransitionAll;
  const sSeries = asNumber((fd as AnyDict).staggerSeriesMsAll);

  mapSeries(options, null, (s: AnyDict, si: number) => {
    // 1) Universal transition (morphing between states)
    if (doMorph) {
      s.universalTransition = true;
    }

    // 2) Per-series stagger delay (non-destructive): only set when numeric > 0 and no existing function
    const hasSeries = Number.isFinite(sSeries) && sSeries > 0;

    if (hasSeries) {
      const seriesDelay = si * sSeries;
      
      // Apply to enter animation if no existing delay function
      if (typeof s.animationDelay !== 'function') {
        s.animationDelay = (idx: number) => seriesDelay;
      }
      
      // Apply to update animation if no existing delay function
      if (typeof s.animationDelayUpdate !== 'function') {
        s.animationDelayUpdate = (idx: number) => seriesDelay;
      }
    }
    
    return s;
  });
})();
`.trim(),
  },
};
