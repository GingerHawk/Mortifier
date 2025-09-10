import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.pieShadowControls?.value;

export const pieShadowEnabled: ControlSetItem = {
  name: 'pieShadowEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieShadowControls: ControlSetItem = {
  name: 'pieShadowControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieShadowColor: ControlSetItem = {
  name: 'pieShadowColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieShadowBlur: ControlSetItem = {
  name: 'pieShadowBlur',
  config: {
    type: 'SliderControl',
    label: t('Blur'),
    default: 8,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieShadowOffsetX: ControlSetItem = {
  name: 'pieShadowOffsetX',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    default: 0,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieShadowOffsetY: ControlSetItem = {
  name: 'pieShadowOffsetY',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    default: 4,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
