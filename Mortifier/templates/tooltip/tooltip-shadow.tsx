import { t } from '@superset-ui/core';
import { ControlSetItem } from '@superset-ui/chart-controls';
import { defColor1_1 } from '../../common/colors';


export const tooltipShadowEnabled: ControlSetItem = {
  name: 'tooltipShadowEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const tooltipShadowControls: ControlSetItem = {
  name: 'tooltipShadowControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const tooltipShadowColor: ControlSetItem = {
  name: 'tooltipShadowColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the shadow color.'),
    default: defColor1_1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipShadowControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipShadowOpacity: ControlSetItem = {
  name: 'tooltipShadowOpacity',
  config: {
    type: 'SliderControl',
    label: t('Opacity'),
    description: t('Adjust shadow opacity (0–1).'),
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipShadowControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipShadowBlur: ControlSetItem = {
  name: 'tooltipShadowBlur',
  config: {
    type: 'SliderControl',
    label: t('Blur'),
    description: t('Set shadow blur radius (px).'),
    default: 10,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipShadowControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipShadowOffsetX: ControlSetItem = {
  name: 'tooltipShadowOffsetX',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Horizontal shadow offset (px).'),
    default: 0,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipShadowControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipShadowOffsetY: ControlSetItem = {
  name: 'tooltipShadowOffsetY',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Vertical shadow offset (px).'),
    default: 4,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipShadowControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
