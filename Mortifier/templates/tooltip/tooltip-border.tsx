import { t } from '@superset-ui/core';
import { ControlSetItem } from '@superset-ui/chart-controls';

export const TEAL1 = { r: 0, g: 191, b: 165, a: 0.95 };

export const tooltipBorderEnabled: ControlSetItem = {
  name: 'tooltipBorderEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const tooltipBorderControls: ControlSetItem = {
  name: 'tooltipBorderControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const tooltipBorderType: ControlSetItem = {
  name: 'tooltipBorderType',
  config: {
    type: 'SelectControl',
    label: t('Type'),
    description: t('Choose border style: solid, dashed, dotted, or double.'),
    options: [
      { value: 'solid', label: t('Solid') },
      { value: 'dashed', label: t('Dashed') },
      { value: 'dotted', label: t('Dotted') },
      { value: 'double', label: t('Double') },
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipBorderControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBorderColor: ControlSetItem = {
  name: 'tooltipBorderColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the border color.'),
    default: TEAL1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipBorderControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBorderWidth: ControlSetItem = {
  name: 'tooltipBorderWidth',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width (px).'),
    default: 1,
    min: 0,
    max: 12,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipBorderControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBorderRadius: ControlSetItem = {
  name: 'tooltipBorderRadius',
  config: {
    type: 'SliderControl',
    label: t('Radius'),
    description: t('Round the corners of the tooltip border (px).'),
    default: 4,
    min: 0,
    max: 24,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipBorderControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
