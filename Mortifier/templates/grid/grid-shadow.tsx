import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.gridControls?.value;

export const gridShadowEnabled: ControlSetItem = {
  name: 'gridShadowEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Enable Shadow'),
    description: t('Enable shadow styling for the grid.'),
    default: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridShadowColor: ControlSetItem = {
  name: 'gridShadowColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color'),
    description: t('Color of the shadow.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.gridShadowEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridShadowBlur: ControlSetItem = {
  name: 'gridShadowBlur',
  config: {
    type: 'SliderControl',
    label: t('Blur'),
    description: t('Blur radius of the shadow (px).'),
    default: 8,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.gridShadowEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridShadowOffsetX: ControlSetItem = {
  name: 'gridShadowOffsetX',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Horizontal offset of the shadow (px).'),
    default: 0,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.gridShadowEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridShadowOffsetY: ControlSetItem = {
  name: 'gridShadowOffsetY',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Vertical offset of the shadow (px).'),
    default: 4,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.gridShadowEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
