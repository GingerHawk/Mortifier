import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.gridBorderControls?.value;

export const gridBorderEnabled: ControlSetItem = {
  name: 'gridBorderEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBorderControls: ControlSetItem = {
  name: 'gridBorderControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const gridBorderColor: ControlSetItem = {
  name: 'gridBorderColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Choose the border color for the grid area.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridBorderWidth: ControlSetItem = {
  name: 'gridBorderWidth',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width in pixels.'),
    default: 1,
    min: 0,
    max: 12,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridBorderType: ControlSetItem = {
  name: 'gridBorderType',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Set the border style: solid, dashed, or dotted.'),
    options: [
    ['solid',  t('Solid') ],
    ['dashed',  t('Dashed')] ,
    ['dotted', t('Dotted')]  ,
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};


