import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1_1 } from '../../common/colors';
const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.axisPointerControls?.value;

export const axisPointerEnabled: ControlSetItem = {
  name: 'axisPointerEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const axisPointerControls: ControlSetItem = {
  name: 'axisPointerControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

// Main style controls for the axis pointer
export const axisPointerType: ControlSetItem = {
  name: 'axisPointerType',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Choose the axis pointer style: line, shadow, or cross.'),
    options: [
        ['line',  t('Line')] ,
        ['shadow',  t('Shadow')] ,
        ['cross',  t('Cross') ],
    ],
    default: 'line',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisPointerColor: ControlSetItem = {
  name: 'axisPointerColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the color of the line or cross pointer.'),
    renderTrigger: true,
    default: defColor1_1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls) && controls.axisPointerType?.value !== 'shadow',
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisPointerWidth: ControlSetItem = {
  name: 'axisPointerWidth',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the line width (px).'),
    default: 1,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls) && controls.axisPointerType?.value !== 'shadow',
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisPointerShadowColor: ControlSetItem = {
  name: 'axisPointerShadowColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color'),
    description: t('Set the color of the shadow pointer.'),
    renderTrigger: true,
    default: defColor1_1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls) && controls.axisPointerType?.value === 'shadow',
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
