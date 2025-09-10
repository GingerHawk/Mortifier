import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

const controlsVisible = (controls: ControlPanelsContainerProps) =>
  !!controls?.valControls?.value;

export const valEnabled: ControlSetItem = {
  name: 'valEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const valControls: ControlSetItem = {
  name: 'valControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const valPositionCurrentSeries: ControlSetItem = {
  name: 'valPositionCurrentSeries',
  config: {
    type: 'SelectControl',
    label: t('Configure Series'),
    description: t('Select which series to configure'),
    renderTrigger: true,
    default: 'all',
    options: [ { label: t('Per Series Styling'), 
                options: [  
                  { value: 1, label: t('Series 1')},
                  { value: 2, label: t('Series 2')},
                  { value: 3, label: t('Series 3')},],
                },         
               {
                label: t('All Series (Caution: Overrides Individual Series Settings)'),
                options: [ 
                  { value: 'all', label: t('All Series')},],
                },   
              ],
    disableStash: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    controlsVisible(controls),
    resetOnHide: false,
  },
};
export const valPosition1: ControlSetItem = {
  name: 'valPosition1',
  config: {
    type: 'SelectControl',
    label: t('Position'),
    description: t('Set value label position relative to the marker.'),
    options: [
      { value: 'top', label: t('Top') },
      { value: 'bottom', label: t('Bottom') },
      { value: 'left', label: t('Left') },
      { value: 'right', label: t('Right') },
      { value: 'inside', label: t('Inside') },
    ],
    default: 'top',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 1, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetX1: ControlSetItem = {
  name: 'valOffsetX1',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Adjust horizontal offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 1, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetY1: ControlSetItem = {
  name: 'valOffsetY1',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Adjust vertical offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 1, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valAngle1: ControlSetItem = {
  name: 'valAngle1',
  config: {
    type: 'SliderControl',
    label: t('Value Angle'),
    description: t('Adjust the angle of the Value.'),
    default: 0,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 1, 
    disableStash: true,
    resetOnHide: false,
  },
};
export const valPosition2: ControlSetItem = {
  name: 'valPosition2',
  config: {
    type: 'SelectControl',
    label: t('Position'),
    description: t('Set value label position relative to the marker.'),
    options: [
      { value: 'top', label: t('Top') },
      { value: 'bottom', label: t('Bottom') },
      { value: 'left', label: t('Left') },
      { value: 'right', label: t('Right') },
      { value: 'inside', label: t('Inside') },
    ],
    default: 'top',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 2, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetX2: ControlSetItem = {
  name: 'valOffsetX2',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Adjust horizontal offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 2, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetY2: ControlSetItem = {
  name: 'valOffsetY2',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Adjust vertical offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 2, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valAngle2: ControlSetItem = {
  name: 'valAngle2',
  config: {
    type: 'SliderControl',
    label: t('Value Angle'),
    description: t('Adjust the angle of the Value.'),
    default: 0,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 2, 
    disableStash: true,
    resetOnHide: false,
  },
};
export const valPosition3: ControlSetItem = {
  name: 'valPosition3',
  config: {
    type: 'SelectControl',
    label: t('Position'),
    description: t('Set value label position relative to the marker.'),
    options: [
      { value: 'top', label: t('Top') },
      { value: 'bottom', label: t('Bottom') },
      { value: 'left', label: t('Left') },
      { value: 'right', label: t('Right') },
      { value: 'inside', label: t('Inside') },
    ],
    default: 'top',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 3, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetX3: ControlSetItem = {
  name: 'valOffsetX3',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Adjust horizontal offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 3, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetY3: ControlSetItem = {
  name: 'valOffsetY3',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Adjust vertical offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 3, 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valAngle3: ControlSetItem = {
  name: 'valAngle3',
  config: {
    type: 'SliderControl',
    label: t('Value Angle'),
    description: t('Adjust the angle of the Value.'),
    default: 0,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 3, 
    disableStash: true,
    resetOnHide: false,
  },
};
export const valPositionAll: ControlSetItem = {
  name: 'valPositionAll',
  config: {
    type: 'SelectControl',
    label: t('Position'),
    description: t('Set value label position relative to the marker.'),
    options: [
      { value: 'top', label: t('Top') },
      { value: 'bottom', label: t('Bottom') },
      { value: 'left', label: t('Left') },
      { value: 'right', label: t('Right') },
      { value: 'inside', label: t('Inside') },
    ],
    default: 'top',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 'all', 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetXAll: ControlSetItem = {
  name: 'valOffsetXAll',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Adjust horizontal offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 'all', 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valOffsetYAll: ControlSetItem = {
  name: 'valOffsetYAll',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Adjust vertical offset of the value (px).'),
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 'all', 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valAngleAll: ControlSetItem = {
  name: 'valAngleAll',
  config: {
    type: 'SliderControl',
    label: t('Value Angle'),
    description: t('Adjust the angle of the Value.'),
    default: 0,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valPositionCurrentSeries?.value === 'all', 
    disableStash: true,
    resetOnHide: false,
  },
};