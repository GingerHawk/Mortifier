import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1, defColor2, defColor3 } from '../../common/colors';

const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.gridBackgroundControls?.value;

export const gridBackgroundEnabled: ControlSetItem = {
  name: 'gridBackgroundEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridBackgroundControls: ControlSetItem = {
  name: 'gridBackgroundControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const gridBackgroundType: ControlSetItem = {
  name: 'gridBackgroundType',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Select solid or gradient background fill.'),
    options: [
      ['solid',  t('Solid')],
      [ 'gradient', t('Gradient') ],
    ],
    default: 'Gradient',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBgColor: ControlSetItem = {
  name: 'gridBgColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Background Color'),
    description: t('Set a solid background color for the grid.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls) && controls?.gridBackgroundType?.value === 'solid',
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBgAngle: ControlSetItem = {
  name: 'gridBgAngle',
  config: {
    type: 'SliderControl',
    label: t('Gradient Angle'),
    description: t('Set gradient angle (°).'),
    default: 270,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.gridBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridBgStop1: ControlSetItem = {
  name: 'gridBgStop1',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 1'),
    description: t('Choose the first gradient stop color.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.gridBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBgStop1Pos: ControlSetItem = {
  name: 'gridBgStop1Pos',
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
    controls?.gridBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridBgStop2: ControlSetItem = {
  name: 'gridBgStop2',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 2'),
    description: t('Choose the second gradient stop color.'),
    default: defColor2,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.gridBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBgStop2Pos: ControlSetItem = {
  name: 'gridBgStop2Pos',
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
    controls?.gridBackgroundType?.value === 'gradient',
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBgUseStop3: ControlSetItem = {
  name: 'gridBgUseStop3',
  config: {
    type: 'CheckboxControl',
    label: t('Add Third Stop'),
    description: t('Enable a third gradient stop.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.gridBackgroundType?.value === 'gradient',    
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridBgStop3: ControlSetItem = {
  name: 'gridBgStop3',
  config: {
    type: 'ColorPickerControl',
    label: t('Gradient Stop 3 (optional)'),
    description: t('Choose the third gradient stop color.'),
    default: defColor3,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>controlsVisible(controls)&&
    controls?.gridBackgroundType?.value === 'gradient'&& Boolean(controls?.gridBgUseStop3?.value),
    disableStash: true,
    resetOnHide: false,
  },
};
export const gridBgStop3Pos: ControlSetItem = {
  name: 'gridBgStop3Pos',
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
    controls?.gridBackgroundType?.value === 'gradient'&& Boolean(controls?.gridBgUseStop3?.value),
    disableStash: true,
    resetOnHide: false,
  },
};


export default {};
