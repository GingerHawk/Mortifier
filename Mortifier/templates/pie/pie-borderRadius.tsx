import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1, defColor2, defColor3 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.pieBorderRadiusControls?.value;

export const pieBorderRadiusEnabled: ControlSetItem = {
  name: 'pieBorderRadiusEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieBorderRadiusControls: ControlSetItem = {
  name: 'pieBorderRadiusControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieSliceRadius: ControlSetItem = {
  name: 'pieSliceRadius',
  config: {
    type: 'SliderControl',
    label: t('Border Radius'),
    description: t('Round the outer/inner arc corners of each slice (px).'),
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

export const pieBorderColor: ControlSetItem = {
  name: 'pieBorderColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Border Color'),
    description: t('Set the slice border color.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieBorderWidth: ControlSetItem = {
  name: 'pieBorderWidth',
  config: {
    type: 'SliderControl',
    label: t('Border Width'),
    description: t('Thickness of the slice border (px).'),
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

export const pieBorderType: ControlSetItem = {
  name: 'pieBorderType',
  config: {
    type: 'RadioButtonControl',
    label: t('Border Type'),
    description: t('Choose the slice border style.'),
    options: [
      ['solid',  t('Solid') ],
       ['dashed',  t('Dashed')] ,
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
