import { t } from '@superset-ui/core';
import { ControlSetItem, ControlStateMapping } from '@superset-ui/chart-controls';

/**
 * Tooltip › General (stripped)
 * - Toggle
 * - Trigger
 * Note: no Enable, no Delay/Position/Confine here (moved to Delay & Position subsection).
 */

export const tooltipToggle: ControlSetItem = {
  name: 'tooltipToggle',
  config: {
    type: 'RadioButtonControl',
    label: t('Toggle Tooltip'),
    description: t('Turn the tooltip display on or off.'),
    options: [
      ['on', t('On')],
      ['off', t('Off')],
    ],
    default: 'on',
    renderTrigger: true, // Mort rule
   
  },
};

export const tooltipTrigger: ControlSetItem = {
  name: 'tooltipTrigger',
  config: {
    type: 'RadioButtonControl',
    label: t('Trigger'),
    description: t('Choose whether tooltip triggers on axis or item.'),
    options: [
      ['axis', t('Axis')],
      ['item', t('Item')],
    ],
    default: 'axis',
    renderTrigger: true, // Mort rule
  
  },
};

export const controlOverrides: ControlStateMapping = {};
export default {};
