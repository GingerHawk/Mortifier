import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.legendBorderControls?.value;

export const legendBorderEnabled: ControlSetItem = {
  name: 'legendBorderEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const legendBorderControls: ControlSetItem = {
  name: 'legendBorderControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const legendBorderColor: ControlSetItem = {
  name: 'legendBorderColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Choose the border color for the legend box.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBorderWidth: ControlSetItem = {
  name: 'legendBorderWidth',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width.'),
    default: 1,
    min: 0,
    max: 12,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBorderType: ControlSetItem = {
  name: 'legendBorderType',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Set border style to solid, dashed, or dotted.'),
    options: [
     ['solid',  t('Solid') ] ,
     ['dashed',  t('Dashed')]  ,
     ['dotted',  t('Dotted')] ,
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBorderRadius: ControlSetItem = {
  name: 'legendBorderRadius',
  config: {
    type: 'SliderControl',
    label: t('Corner Radius'),
    description: t('Round the corners of the legend border (px).'),
    default: 0,
    min: 0,
    max: 24,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
