// modules/animation/ani-enter.cjs
const path = require('path');

module.exports = {
  id: 'ani-enter',
  label: 'Enter Animation',
  appliesTo: ['all'],
  order: 800,

  files: [
    {
      template: path.join('animation', 'ani-enter.tsx'),
      dest: path.join('src', 'plugin', 'animation', 'ani-enter.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'animation', 'ani-enter').replace(/\\/g, '/'),
      names: [
        'aniEnterEnabled',
        'animEnterControls',
        'animEnterCurrentSeries',
        // Series 1 Controls
        'animEnterDuration1',
        'animEnterDelay1',
        'animEnterEasing1',
        'animEnterstaggerPointMs1',
        // Series 2 Controls
        'animEnterDuration2',
        'animEnterDelay2',
        'animEnterEasing2',
        'animEnterstaggerPointMs2',
        // Series 3 Controls
        'animEnterDuration3',
        'animEnterDelay3',
        'animEnterEasing3',
        'animEnterstaggerPointMs3',
        // All Series Controls
        'animEnterDurationAll',
        'animEnterDelayAll',
        'animEnterEasingAll',
        'animEnterstaggerPointMsAll',
      ],
      stamp: '/* MortModule: ani-enter import */',
    },
    section: {
      tab: 'customize',
      label: 'Animation',
      stamp: '/* MortModule: ani-enter section */',
      rows: [
        `<SubHeader label={t('Enter Animation')} tip={t('Configures how elements animate when first entering the chart.')} />`,
        'aniEnterEnabled',
        'animEnterControls',
        'animEnterCurrentSeries',
        // Series 1 Controls
        'animEnterEasing1',
        'animEnterDuration1',
        'animEnterstaggerPointMs1',
        'animEnterDelay1',        
        // Series 2 Controls
        'animEnterEasing2',
        'animEnterDuration2',
        'animEnterstaggerPointMs2',
        'animEnterDelay2',    
        // Series 3 Controls
        'animEnterEasing3',
        'animEnterDuration3',
        'animEnterstaggerPointMs3',
        'animEnterDelay3',    
        // All Series Controls
        'animEnterEasingAll',
        'animEnterDurationAll',
        'animEnterstaggerPointMsAll',
        'animEnterDelayAll', 
      ],
    },
  },

  needs: ['asNumber', 'mapSingle', 'mapSeries','AnyDict'],

  transformProps: {
    snippetStamp: '/* MortModule: ani-enter transform v3 - per series with stagger */',
    snippet: `/* MortModule: ani-enter transform - per series support with per-point stagger and Advanced integration */
(function applyEnterAnimation() {
  const fd = ((typeof formData !== 'undefined' ? formData : {}) || {}) as AnyDict;

  // Main enable check
  if (!fd.aniEnterEnabled) return;

  // Always enable master animation when Apply is on
  mapSingle(options, 'animation', () => true);

  // Per-series value resolution helper
  const getSeriesValue = (baseName: string, seriesIndex: number, fallback?: any) => {
    // If user selected "All Series", prioritize the "All" value
    if (fd.animEnterCurrentSeries === 'all' && fd[baseName + 'All'] !== undefined) {
      return fd[baseName + 'All'];
    }
    
    // Otherwise use individual series values first
    if (seriesIndex === 0 && fd[baseName + '1'] !== undefined) return fd[baseName + '1'];
    if (seriesIndex === 1 && fd[baseName + '2'] !== undefined) return fd[baseName + '2'];
    if (seriesIndex === 2 && fd[baseName + '3'] !== undefined) return fd[baseName + '3'];
    if (fd[baseName + 'All'] !== undefined) return fd[baseName + 'All'];
    return fallback;
  };

  // Advanced stagger inputs (for backward compatibility)
  const advOn = !!(fd as AnyDict).aniAdvEnabled;
  const stagSer = asNumber((fd as AnyDict).staggerSeriesMsAll, 0);

  mapSeries(options, null, (s: AnyDict, si: number) => {
    s.animation = true;

    // Get per-series values
    const dur = asNumber(getSeriesValue('animEnterDuration', si));
    const del0 = asNumber(getSeriesValue('animEnterDelay', si));
    const ease = getSeriesValue('animEnterEasing', si);
    const pointStagger = asNumber(getSeriesValue('animEnterstaggerPointMs', si));

    // Per-point delay function combining base delay, series stagger, and point stagger
    const baseDelay = Number.isFinite(del0) ? (del0 as number) : 0;
    const seriesStagger = advOn && Number.isFinite(stagSer) && stagSer > 0 ? (si * stagSer) : 0;

    const mkDelay = (si: number) => (idx: number) => {
      let totalDelay = baseDelay + seriesStagger;
      
      // Add per-point stagger if configured
      if (Number.isFinite(pointStagger) && pointStagger > 0) {
        totalDelay += (idx * pointStagger);
      } else {
        // Independent default: 1ms per point so animation triggers visibly
        totalDelay += (idx * 1);
      }
      
      return totalDelay;
    };

    // Install the delay function unless user already provided one
    if (typeof s.animationDelay !== 'function') {
      s.animationDelay = mkDelay(si);
    }

    // Duration and easing per series (non-destructive)
    if (Number.isFinite(dur)) s.animationDuration = dur;
    if (typeof ease === 'string' && ease) s.animationEasing = ease;

    return s;
  });
})();
`.trim(),
  },
};
