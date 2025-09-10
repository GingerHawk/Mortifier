import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.legendShadowControls?.value;

export const legendShadowEnabled: ControlSetItem = {
  name: 'legendShadowEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendShadowControls: ControlSetItem = {
  name: 'legendShadowControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const legendShadowColor: ControlSetItem = {
  name: 'legendShadowColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color'),
    description: t('Choose the color of the legend shadow.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendShadowBlur: ControlSetItem = {
  name: 'legendShadowBlur',
  config: {
    type: 'SliderControl',
    label: t('Blur'),
    description: t('Set blur radius of the shadow.'),
    default: 8,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendShadowOffsetX: ControlSetItem = {
  name: 'legendShadowOffsetX',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Shift the shadow horizontally.'),
    default: 0,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendShadowOffsetY: ControlSetItem = {
  name: 'legendShadowOffsetY',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Shift the shadow vertically.'),
    default: 4,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
