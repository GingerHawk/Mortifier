// modules/tooltip-template.cjs
const path = require('path');

module.exports = {
  id: 'tooltip-template',
  label: 'Tooltip - Template',
  appliesTo: ['bar', 'line', 'area', 'scatter','pie'],
  order: 270,

  files: [
    {
      template: path.join('tooltip', 'tooltip-template.tsx'),
      dest: path.join('src', 'plugin', 'tooltip', 'tooltip-template.tsx'),
    },
  ],

  controlPanel: {
    import: {
      from: path.join('..', '..', '..', 'plugin', 'tooltip', 'tooltip-template').replace(/\\/g, '/'),
      names: [
        'tooltipTemplateEnabled',
        'tooltipTemplateControls',
        'tooltipTemplateMode',
        'tooltipTemplatePreset',
        'tooltipTemplateText',
        'tooltipTemplateFields',
        'tooltipNumberFormat',
        'tooltipDateFormat',
        'tooltipHtmlAllowed',
        'tooltipHtmlClass',
      ],
      stamp: '/* MortModule: tooltip-template import */',
    },
    section: {
      tab: 'customize',
      label: 'Tooltip',
      stamp: '/* MortModule: tooltip-template section */',
      rows: [
        `<SubHeader label={t('Template')} tip={t('Enables custom tooltip templates using tokens or HTML.')} />`,
        'tooltipTemplateEnabled',
        'tooltipTemplateControls',
        'tooltipNumberFormat',
        'tooltipDateFormat',
        'tooltipTemplateMode',
        'tooltipTemplatePreset',
        'tooltipTemplateText',
        'tooltipTemplateFields',
        'tooltipHtmlAllowed',
        'tooltipHtmlClass',
      ],
    },
  },
needs: ['asNumber', 'renderTokens', 'getSeriesContext', 'ALL_TOKENS', 'getNumberFormatter'],
transformProps: {  
  snippetStamp: '/* MortModule: tooltip-template logic v3 */',
  snippet: `
;(function applyTooltipTemplate() {
  if (!(formData && (formData).tooltipTemplateEnabled)) return;

  mapSingle(options, 'tooltip', function (base: any) {
    const mode: 'auto' | 'text' | 'html' = String(((formData as any).tooltipTemplateMode || 'auto')) as any;
    let tpl: string = String(((formData as any).tooltipTemplateText || '')).trim();

    // Only apply template when mode is explicitly 'text' or 'html' AND user has provided template text
    // For 'template' mode with no text, preserve default behavior but apply formatting
    if (mode === 'auto' || (mode === 'template' && !tpl)) {
      // Don't override - just apply number/date formatting to default tooltips
      // Exit early if no custom formatting is needed
      if (!((formData as any).tooltipNumberFormat || (formData as any).tooltipDateFormat)) {
        return base; // Preserve default tooltip behavior
      }
    }

    // If mode is text/html but no template, use presets
    if ((mode === 'text' || mode === 'html') && !tpl) {
      const preset: any = (formData as any).tooltipTemplatePreset || null;
      if (preset === 'series_value') tpl = '{{seriesName}}: {{value}}';
      else if (preset === 'axis_table') tpl = '{{name}}\\n{{#each}}- {{seriesName}}: {{y}}\\n{{/each}}';
      else if (preset === 'minimal') tpl = '{{name}}: {{y}}';
    }

    const numFmt: string  = String(((formData as any).tooltipNumberFormat || '')).trim();
    const dateFmt: string = String(((formData as any).tooltipDateFormat  || '')).trim();

    const escapeHtml = function (s: any) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };
    const safe = function (v: any) { return String(v == null ? '' : v); };

    // Enhanced numeric formatter using Superset's getNumberFormatter
    const formatNumber = function (val: any) {
      if (!numFmt) return val;
      try {
        if (numFmt && typeof getNumberFormatter === 'function') {
          const formatter = getNumberFormatter(numFmt);
          return formatter(val);
        }
      } catch {}
      
      // Fallback to simple formatting
      const n = asNumber(val);
      if (!Number.isFinite(n)) return val;
      return typeof n === 'number' && Number.isFinite(n) ? n.toLocaleString() : String(val);
    };

    // minimal date formatter for tokens we support
    const tryDate = function (v: any) {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    };
    const formatDate = function (val: any) {
      if (!dateFmt) return val;
      const d = tryDate(val);
      if (!d) return val;
      const pad = function (x: any) { return String(x).padStart(2, '0'); };
      return dateFmt
        .replace('YYYY', String(d.getFullYear()))
        .replace('MM',   pad(d.getMonth() + 1))
        .replace('DD',   pad(d.getDate()))
        .replace('HH',   pad(d.getHours()))
        .replace('mm',   pad(d.getMinutes()))
        .replace('ss',   pad(d.getSeconds()));
    };

    // Enhanced token context for multi-series support
    const seriesContext = getSeriesContext(options);
    seriesContext.formatNumber = formatNumber;
    seriesContext.formatDate = formatDate;

    // Use the enhanced renderTokens function from utilities
    const renderTokensWithContext = function (template: string, p: any, seriesIndex?: number) {
      const context = { ...seriesContext, seriesIndex };
      const result = renderTokens(template, p, context);
      return mode === 'html' ? result : escapeHtml(result);
    };

    const renderTemplate = function (template: string, params: any) {
      if (Array.isArray(params)) {
        const axisNameRaw = (params[0] && (params[0].axisValueLabel || params[0].name)) || '';
        const axisName    = formatDate(axisNameRaw);
        let out = template.split('{{name}}').join(mode === 'html' ? axisName : escapeHtml(axisName));

        const start = out.indexOf('{{#each}}');
        const end   = out.indexOf('{{/each}}');
        if (start !== -1 && end !== -1 && end > start) {
          const before = out.slice(0, start);
          const body   = out.slice(start + 9, end);
          const after  = out.slice(end + 9);
          const rows   = params.map(function (p: any, idx: number) { 
            return renderTokensWithContext(body, p, idx); 
          }).join('');
          return before + rows + after;
        }
        const first = params[0] || {};
        const merged = Object.assign({}, first, { name: axisName });
        return renderTokensWithContext(out, merged, 0);
      }
      return renderTokensWithContext(template, params || {});
    };

    const formatter = function (params: any) {
      try {
        if (tpl) return renderTemplate(tpl, params);
        const defaultAxisTpl = '{{name}}\\n{{#each}}- {{seriesName}}: {{y}}\\n{{/each}}';
        const defaultItemTpl = '{{name}} — {{seriesName}}: {{y}}';
        return Array.isArray(params)
          ? renderTemplate(defaultAxisTpl, params)
          : renderTokensWithContext(defaultItemTpl, params || {});
      } catch (e) {
        return mode === 'html' ? 'Template error' : escapeHtml('Template error');
      }
    };

    return Object.assign({}, base || {}, { formatter });
  });
})();
  `.trim(),
},

};
