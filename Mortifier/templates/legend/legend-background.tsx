import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1, defColor2, defColor3 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.legendBackgroundControls?.value;

export const legendBackgroundEnabled: ControlSetItem = {
  name: 'legendBackgroundEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBackgroundControls: ControlSetItem = {
  name: 'legendBackgroundControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBackgroundType: ControlSetItem = {
  name: 'legendBackgroundType',
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
export const legendBgColor: ControlSetItem = {
  name: 'legendBgColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Background Color'),
    description: t('Set a solid background color for the legend.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBgAngle: ControlSetItem = {
  name: 'legendBgAngle',
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
    controls?.legendBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBgStop1: ControlSetItem = {
  name: 'legendBgStop1',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 1'),
    description: t('Choose the first gradient stop color.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.legendBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBgStop1Pos: ControlSetItem = {
  name: 'legendBgStop1Pos',
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
    controls?.legendBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBgStop2: ControlSetItem = {
  name: 'legendBgStop2',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 2'),
    description: t('Choose the second gradient stop color.'),
    default: defColor2,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.legendBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBgStop2Pos: ControlSetItem = {
  name: 'legendBgStop2Pos',
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
    controls?.legendBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBgUseStop3: ControlSetItem = {
  name: 'legendBgUseStop3',
  config: {
    type: 'CheckboxControl',
    label: t('Add Third Stop'),
    description: t('Enable a third gradient stop.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.legendBackgroundType?.value === 'gradient',    
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendBgStop3: ControlSetItem = {
  name: 'legendBgStop3',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 3 (optional)'),
    description: t('Choose the third gradient stop color.'),
    default: defColor3,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.legendBackgroundType?.value === 'gradient'&& Boolean(controls?.legendBgUseStop3?.value),
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBgStop3Pos: ControlSetItem = {
  name: 'legendBgStop3Pos',
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
    controls?.legendBackgroundType?.value === 'gradient'&& Boolean(controls?.legendBgUseStop3?.value),
    disableStash: true,
    resetOnHide: false,
  },
};
export const legendBgRadius: ControlSetItem = {
  name: 'legendBgRadius',
  config: {
    type: 'SliderControl',
    label: t('Corner Radius'),
    description: t('Round the corners of the legend background (px).'),
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
