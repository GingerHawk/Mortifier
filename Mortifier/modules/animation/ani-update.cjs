// modules/animation/ani-update.cjs
const path = require('path');

module.exports = {
  id: 'ani-update',
  label: 'Update Animation',
  appliesTo: ['all'],
  order: 810,

  files: [
    {
      template: path.join('animation', 'ani-update.tsx'),
      dest: path.join('src', 'plugin', 'animation', 'ani-update.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'animation', 'ani-update').replace(/\\/g, '/'),
      names: [
        'aniUpdateEnabled',
        'animUpdateControls',
        'animUpdateCurrentSeries',
        // Series 1 Controls
        'animUpdateDuration1',
        'animUpdateDelay1',
        'animUpdateEasing1',
        'animUpdatestaggerPointMs1',
        // Series 2 Controls
        'animUpdateDuration2',
        'animUpdateDelay2',
        'animUpdateEasing2',
        'animUpdatestaggerPointMs2',
        // Series 3 Controls
        'animUpdateDuration3',
        'animUpdateDelay3',
        'animUpdateEasing3',
        'animUpdatestaggerPointMs3',
        // All Series Controls
        'animUpdateDurationAll',
        'animUpdateDelayAll',
        'animUpdateEasingAll',
        'animUpdatestaggerPointMsAll',
      ],
      stamp: '/* MortModule: ani-update import */',
    },
    section: {
      tab: 'customize',
      label: 'Animation',
      stamp: '/* MortModule: ani-update section */',
      rows: [
        `<SubHeader label={t('Update Animation')} tip={t('Configures how elements animate when data updates occur.')} />`,
        'aniUpdateEnabled',
        'animUpdateControls',
        'animUpdateCurrentSeries',
        // Series 1 Controls
        'animUpdateEasing1',
        'animUpdateDuration1',
        'animUpdatestaggerPointMs1',
        'animUpdateDelay1',
               
        // Series 2 Controls
        'animUpdateEasing2',
        'animUpdateDuration2',
        'animUpdatestaggerPointMs2',
        'animUpdateDelay2',
        // Series 3 Controls
        'animUpdateEasing3',
        'animUpdateDuration3',
        'animUpdatestaggerPointMs3',
        'animUpdateDelay3',
        // All Series Controls
        'animUpdateEasingAll',
        'animUpdateDurationAll',
        'animUpdatestaggerPointMsAll',
        'animUpdateDelayAll',
      ],
    },
  },

  needs: ['asNumber', 'mapSingle', 'mapSeries','AnyDict'],

  transformProps: {
    snippetStamp: '/* MortModule: ani-update transform v3 - per series with stagger */',
    snippet: `/* MortModule: ani-update transform - per series support with per-point stagger */
(function applyUpdateAnimation() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;

  // Main enable check
  if (!fd.aniUpdateEnabled) return;

  // Ensure master animation is on when Apply is enabled
  mapSingle(options, 'animation', () => true);

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.animUpdateCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  // Apply animation settings per series
  mapSeries(options, () => true, (s: AnyDict, actualSeriesIndex: number) => {
    
    // Duration
    const dur = asNumber(getSeriesValue('animUpdateDuration', actualSeriesIndex));
    if (Number.isFinite(dur)) {
      s.animationDurationUpdate = dur;
    }
    
    // Base delay and per-point stagger
    const baseDelay = asNumber(getSeriesValue('animUpdateDelay', actualSeriesIndex));
    const pointStagger = asNumber(getSeriesValue('animUpdatestaggerPointMs', actualSeriesIndex));
    
    // If we have per-point stagger, create a function; otherwise use base delay
    if (Number.isFinite(pointStagger) && pointStagger > 0) {
      const delay = Number.isFinite(baseDelay) ? baseDelay : 0;
      s.animationDelayUpdate = (idx: number) => delay + (idx * pointStagger);
    } else if (Number.isFinite(baseDelay) && typeof s.animationDelayUpdate !== 'function') {
      s.animationDelayUpdate = baseDelay;
    }
    
    // Easing
    const ease = getSeriesValue('animUpdateEasing', actualSeriesIndex);
    if (typeof ease === 'string' && ease) {
      s.animationEasingUpdate = ease;
    }
    
    return s;
  });
})();
`.trim(),
  },
};
