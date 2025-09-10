import React from 'react';
import { t } from '@superset-ui/core';
import { ControlSetItem, ControlStateMapping, ControlPanelsContainerProps } from '@superset-ui/chart-controls';
import { defColor1_1, defColor2_1, defColor3_1 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.tooltipBackgroundControls?.value;

export const tooltipBackgroundEnabled: ControlSetItem = {
  name: 'tooltipBackgroundEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const tooltipBackgroundControls: ControlSetItem = {
  name: 'tooltipBackgroundControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

// Radio type (Solid | Gradient)
export const tooltipBackgroundType: ControlSetItem = {
  name: 'tooltipBackgroundType',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Select solid or gradient background fill.'),
    options: [
      ['solid',  t('Solid')],
      [ 'gradient', t('Gradient') ],
    ],
    default: 'solid',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

// Solid color
export const tooltipBg: ControlSetItem = {
  name: 'tooltipBg',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Solid background color (used when type = solid).'),
    default: defColor1_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

// Gradient angle + stops (color + position)
export const tooltipBgAngle: ControlSetItem = {
  name: 'tooltipBgAngle',
  config: {
    type: 'SliderControl',
    label: t('Gradient Angle'),
    description: t('Set gradient angle (°).'),
    default: 0,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBgStop1: ControlSetItem = {
  name: 'tooltipBgStop1',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 1'),
    description: t('Choose the first gradient stop color.'),
    default: defColor1_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const tooltipBgStop1Pos: ControlSetItem = {
  name: 'tooltipBgStop1Pos',
  config: {
    type: 'SliderControl',
    label: t('Stop 1 Position (%)'),
    description: t('Position of the first gradient stop (%).'),
    default: 30,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBgStop2: ControlSetItem = {
  name: 'tooltipBgStop2',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 2'),
    description: t('Choose the second gradient stop color.'),
    default: defColor2_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const tooltipBgStop2Pos: ControlSetItem = {
  name: 'tooltipBgStop2Pos',
  config: {
    type: 'SliderControl',
    label: t('Stop 2 Position (%)'),
    description: t('Position of the second gradient stop (%).'),
    default: 70,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const tooltipBgUseStop3: ControlSetItem = {
  name: 'tooltipBgUseStop3',
  config: {
    type: 'CheckboxControl',
    label: t('Add Third Stop'),
    description: t('Enable a third gradient stop.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient',    
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBgStop3: ControlSetItem = {
  name: 'tooltipBgStop3',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 3 (optional)'),
    description: t('Choose the third gradient stop color.'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient'&& Boolean(controls?.tooltipBgUseStop3?.value),
    disableStash: true,
    resetOnHide: false,
  },
};
export const tooltipBgStop3Pos: ControlSetItem = {
  name: 'tooltipBgStop3Pos',
  config: {
    type: 'SliderControl',
    label: t('Stop 3 Position (%)'),
    description: t('Position of the third gradient stop (%).'),
    default: 90,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.tooltipBackgroundType?.value === 'gradient'&& Boolean(controls?.tooltipBgUseStop3?.value),
    disableStash: true,
    resetOnHide: false,
  },
};

// Padding + Radius (both types)
export const tooltipBgPadding: ControlSetItem = {
  name: 'tooltipBgPadding',
  config: {
    type: 'SliderControl',
    label: t('Padding'),
    description: t('Set inner padding (px).'),
    default: 8,
    min: 0,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipBackgroundControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipBgRadius: ControlSetItem = {
  name: 'tooltipBgRadius',
  config: {
    type: 'SliderControl',
    label: t('Radius'),
    description: t('Set corner radius (px).'),
    default: 4,
    min: 0,
    max: 24,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipBackgroundControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
