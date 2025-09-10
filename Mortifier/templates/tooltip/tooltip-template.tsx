import { t } from '@superset-ui/core';
import { ControlSetItem } from '@superset-ui/chart-controls';
import { ALL_TOKENS } from '../common/utilities';

/**
 * Tooltip › Template (Controls 1–3 only)
 * 1) Enable & Visibility
 * 2) Mode & Source
 * 3) Template Inputs
 *
 * Notes:
 * - "Enable" gates transform logic (when we add it later).
 * - "Controls" only affects visibility of the inputs (no gating effect).
 * - No transform behavior is introduced yet; this is UI-only and inert.
 */

// 1) Enable & Visibility
export const tooltipTemplateEnabled: ControlSetItem = {
  name: 'tooltipTemplateEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const tooltipTemplateControls: ControlSetItem = {
  name: 'tooltipTemplateControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

// 2) Mode & Source
export const tooltipTemplateMode: ControlSetItem = {
  name: 'tooltipTemplateMode',
  config: {
    type: 'RadioButtonControl',
    label: t('Mode'),
    description: t('Choose template rendering mode: auto, tokens, or HTML.'),
    options: [
      ['auto', t('Auto (default)')],
      ['tokens', t('Tokens (escaped)')],
      ['html', t('HTML (sanitized)')],
    ],
    default: 'auto',
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipTemplateControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipTemplatePreset: ControlSetItem = {
  name: 'tooltipTemplatePreset',
  config: {
    type: 'SelectControl',
    label: t('Preset'),
    description: t('Insert a starter template preset.'),
    options: [
      { value: 'series_value', label: t('Series + Value') },
      { value: 'axis_table', label: t('Axis Table (all series)') },
      { value: 'minimal', label: t('Minimal (name: value)') },
    ],
    default: null,
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }) =>
      !!controls?.tooltipTemplateControls?.value &&
      controls?.tooltipTemplateMode?.value !== 'auto',
    disableStash: true,
    resetOnHide: false,
  },
};

// 3) Template Inputs
export const tooltipTemplateText: ControlSetItem = {
  name: 'tooltipTemplateText',
  config: {
    type: 'TextAreaControl',
    label: t('Template'),
    description: t('Define a custom tooltip template string or HTML.'),
    default: '',
    renderTrigger: true,
    visibility: ({ controls }) =>
      !!controls?.tooltipTemplateControls?.value &&
      (controls?.tooltipTemplateMode?.value === 'tokens' ||
        controls?.tooltipTemplateMode?.value === 'html'),
    
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipTemplateFields: ControlSetItem = {
  name: 'tooltipTemplateFields',
  config: {
    type: 'SelectControl',
    label: t('Token Reference'),
    description: t('Browse available template tokens. Click to copy token to clipboard.'),
    options: [
      {
        label: t('📝 Basic Tokens'),
        options: [
          { value: '{{name}}', label: '{{name}} - Data point name/label' },
          { value: '{{seriesName}}', label: '{{seriesName}} - Series name' },
          { value: '{{value}}', label: '{{value}} - Primary value (formatted)' },
          { value: '{{x}}', label: '{{x}} - X-axis value (date formatted)' },
          { value: '{{y}}', label: '{{y}} - Y-axis value (number formatted)' },
          { value: '{{dataIndex}}', label: '{{dataIndex}} - Data point index' },
          { value: '{{percent}}', label: '{{percent}} - Percentage value' },
          { value: '{{raw}}', label: '{{raw}} - Raw data object' },
        ]
      },
      {
        label: t('📊 Multi-Series Tokens'),
        options: [
          { value: '{{seriesCount}}', label: '{{seriesCount}} - Total number of series' },
          { value: '{{seriesIndex}}', label: '{{seriesIndex}} - Current series index (0-based)' },
          { value: '{{seriesIndex1}}', label: '{{seriesIndex1}} - Current series index (1-based)' },
          { value: '{{allSeriesNames}}', label: '{{allSeriesNames}} - All series names (comma-separated)' },
        ]
      },
      {
        label: t('🔗 Cross-Series Access'),
        options: [
          { value: '{{otherSeriesAt(0)}}', label: '{{otherSeriesAt(0)}} - Value from series at index 0' },
          { value: '{{otherSeriesAt(1)}}', label: '{{otherSeriesAt(1)}} - Value from series at index 1' },
          { value: '{{otherSeriesAt(2)}}', label: '{{otherSeriesAt(2)}} - Value from series at index 2' },
        ]
      },
      {
        label: t('📈 Aggregations'),
        options: [
          { value: '{{sumAllSeries}}', label: '{{sumAllSeries}} - Sum of all series values at this point' },
          { value: '{{avgAllSeries}}', label: '{{avgAllSeries}} - Average across all series' },
          { value: '{{minAllSeries}}', label: '{{minAllSeries}} - Minimum across all series' },
          { value: '{{maxAllSeries}}', label: '{{maxAllSeries}} - Maximum across all series' },
        ]
      },
      {
        label: t('🔄 Template Helpers'),
        options: [
          { value: '{{#each}}...{{/each}}', label: '{{#each}}...{{/each}} - Loop through multiple series' },
        ]
      }
    ],
    clearable: true,
    freeForm: false,
    multi: false,
    placeholder: t('Select a token to see its description...'),
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipTemplateControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

// Number format pattern using D3 format syntax
export const tooltipNumberFormat: ControlSetItem = {
  name: 'tooltipNumberFormat',
  config: {
    type: 'SelectControl',
    label: t('Number Format'),
    description: t('D3 format for numbers. See: https://github.com/d3/d3-format'),
    options: [
      // Default/Smart options
      { value: '', label: t('Default (raw value)') },
      { value: 'SMART_NUMBER', label: t('Adaptive formatting') },
      
      // Integer formats
      { value: ',d', label: ',d (1,234)' },
      { value: 'd', label: 'd (1234)' },
      
      // Decimal formats with commas
      { value: ',.0f', label: ',.0f (1,234)' },
      { value: ',.1f', label: ',.1f (1,234.5)' },
      { value: ',.2f', label: ',.2f (1,234.56)' },
      { value: ',.3f', label: ',.3f (1,234.567)' },
      
      // Decimal formats without commas
      { value: '.1f', label: '.1f (1234.5)' },
      { value: '.2f', label: '.2f (1234.56)' },
      { value: '.3f', label: '.3f (1234.567)' },
      
      // Percentage formats
      { value: ',.0%', label: ',.0% (123%)' },
      { value: ',.1%', label: ',.1% (123.4%)' },
      { value: ',.2%', label: ',.2% (123.45%)' },
      { value: '.0%', label: '.0% (123%)' },
      { value: '.1%', label: '.1% (123.4%)' },
      { value: '.2%', label: '.2% (123.45%)' },
      
      // SI prefix formats
      { value: '.1s', label: '.1s (1.2k)' },
      { value: '.2s', label: '.2s (1.23k)' },
      { value: '.3s', label: '.3s (1.234k)' },
      
      // Currency formats
      { value: '$,.0f', label: '$,.0f ($1,234)' },
      { value: '$,.2f', label: '$,.2f ($1,234.56)' },
      
      // Signed formats
      { value: '+,', label: '+, (+1,234)' },
      { value: '+,.1f', label: '+,.1f (+1,234.5)' },
      { value: '+,.2f', label: '+,.2f (+1,234.56)' },
    ],
    default: '',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipTemplateControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

// Date/time format pattern with comprehensive D3 time format options
export const tooltipDateFormat: ControlSetItem = {
  name: 'tooltipDateFormat',
  config: {
    type: 'SelectControl',
    label: t('Date Format'),
    description: t('D3 time format for dates. See: https://github.com/d3/d3-time-format'),
    options: [
      // Default/Smart options
      { value: '', label: t('Default (raw value)') },
      { value: 'SMART_DATE', label: t('Adaptive date formatting') },
      
      // Common date formats
      { value: '%Y-%m-%d', label: '%Y-%m-%d (2025-03-17)' },
      { value: '%m/%d/%Y', label: '%m/%d/%Y (03/17/2025)' },
      { value: '%d/%m/%Y', label: '%d/%m/%Y (17/03/2025)' },
      { value: '%d.%m.%Y', label: '%d.%m.%Y (17.03.2025)' },
      { value: '%b %d, %Y', label: '%b %d, %Y (Mar 17, 2025)' },
      { value: '%B %d, %Y', label: '%B %d, %Y (March 17, 2025)' },
      
      // Date with time
      { value: '%Y-%m-%d %H:%M', label: '%Y-%m-%d %H:%M (2025-03-17 14:05)' },
      { value: '%Y-%m-%d %H:%M:%S', label: '%Y-%m-%d %H:%M:%S (2025-03-17 14:05:09)' },
      { value: '%m/%d/%Y %H:%M', label: '%m/%d/%Y %H:%M (03/17/2025 14:05)' },
      { value: '%d-%m-%Y %H:%M:%S', label: '%d-%m-%Y %H:%M:%S (17-03-2025 14:05:09)' },
      
      // Time formats
      { value: '%H:%M', label: '%H:%M (14:05)' },
      { value: '%H:%M:%S', label: '%H:%M:%S (14:05:09)' },
      { value: '%I:%M %p', label: '%I:%M %p (2:05 PM)' },
      { value: '%I:%M:%S %p', label: '%I:%M:%S %p (2:05:09 PM)' },
      
      // Partial date formats
      { value: '%Y-%m', label: '%Y-%m (2025-03)' },
      { value: '%Y', label: '%Y (2025)' },
      { value: '%B %Y', label: '%B %Y (March 2025)' },
      { value: '%b %Y', label: '%b %Y (Mar 2025)' },
      
      // Day formats
      { value: '%A, %B %d', label: '%A, %B %d (Monday, March 17)' },
      { value: '%a, %b %d', label: '%a, %b %d (Mon, Mar 17)' },
      
      // ISO formats
      { value: '%Y-%m-%dT%H:%M:%S', label: '%Y-%m-%dT%H:%M:%S (ISO format)' },
    ],
    default: '',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipTemplateControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};
export const tooltipHtmlAllowed = {
  name: 'tooltipHtmlAllowed',
  config: {
    type: 'CheckboxControl',
    label: t('Allow HTML'),
    description: t('Allow rendering HTML when mode = HTML.'),
    default: false,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipTemplateControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

// Optional wrapper CSS class applied to the template root when HTML is allowed
export const tooltipHtmlClass = {
  name: 'tooltipHtmlClass',
  config: {
    type: 'TextControl',
    label: t('Wrapper CSS Class'),
    description: t('Optional CSS class wrapper for HTML templates.'),
    default: '',
    renderTrigger: true,
    visibility: ({ controls }) =>
      !!controls?.tooltipTemplateControls?.value &&
      !!controls?.tooltipHtmlAllowed?.value,
    disableStash: true,
    resetOnHide: false,
  },
};
export default {};
