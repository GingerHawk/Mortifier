import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

export const EASING_OPTIONS = [
  {
    label: t('Linear: Constant Speed'),
    options: [
      { value: 'linear', label: t('linear') },
    ],
  },
  {
    label: t('Quadratic: Starts and ends smoothly'),
    options: [
      { value: 'quadraticIn', label: t('quadraticIn') },
      { value: 'quadraticOut', label: t('quadraticOut') },
      { value: 'quadraticInOut', label: t('quadraticInOut') },
    ],
  },
  {
    label: t('Cubic: Starts and ends smoothly'),
    options: [
      { value: 'cubicIn', label: t('cubicIn') },
      { value: 'cubicOut', label: t('cubicOut') },
      { value: 'cubicInOut', label: t('cubicInOut') },
    ],
  },
  {
    label: t('Quartic: Very smooth acceleration'),
    options: [
      { value: 'quartIn', label: t('quartIn') },
      { value: 'quartOut', label: t('quartOut') },
      { value: 'quartInOut', label: t('quartInOut') },
    ],
  },
  {
    label: t('Quintic: Most dramatic smooth curve'),
    options: [
      { value: 'quintIn', label: t('quintIn') },
      { value: 'quintOut', label: t('quintOut') },
      { value: 'quintInOut', label: t('quintInOut') },
    ],
  },
  {
    label: t('Sinusoidal: Gentle, oscillating motion'),
    options: [
      { value: 'sinusoidalIn', label: t('sinusoidalIn') },
      { value: 'sinusoidalOut', label: t('sinusoidalOut') },
      { value: 'sinusoidalInOut', label: t('sinusoidalInOut') },
    ],
  },
  {
    label: t('Exponential: Very fast acceleration'),
    options: [
      { value: 'exponentialIn', label: t('exponentialIn') },
      { value: 'exponentialOut', label: t('exponentialOut') },
      { value: 'exponentialInOut', label: t('exponentialInOut') },
    ],
  },
  {
    label: t('Circular: Quick acceleration, fast finish'),
    options: [
      { value: 'circularIn', label: t('circularIn') },
      { value: 'circularOut', label: t('circularOut') },
      { value: 'circularInOut', label: t('circularInOut') },
    ],
  },
  {
    label: t('Elastic: Creates a rubber band effect'),
    options: [
      { value: 'elasticIn', label: t('elasticIn') },
      { value: 'elasticOut', label: t('elasticOut') },
      { value: 'elasticInOut', label: t('elasticInOut') },
    ],
  },
  {
    label: t('Back: Overshoots and snaps back'),
    options: [
      { value: 'backIn', label: t('backIn') },
      { value: 'backOut', label: t('backOut') },
      { value: 'backInOut', label: t('backInOut') },
    ],
  },
  {
    label: t('Bounce: Bounces back and forth'),
    options: [
      { value: 'bounceIn', label: t('bounceIn') },
      { value: 'bounceOut', label: t('bounceOut') },
      { value: 'bounceInOut', label: t('bounceInOut') },
    ],
  },
];
const controlsVisible = (c: ControlStateMapping) => Boolean(c?.animUpdateControls?.value); 

export const aniUpdateEnabled: ControlSetItem = {
  name: 'aniUpdateEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const animUpdateControls: ControlSetItem = {
  name: 'animUpdateControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    // Not gated by Enable
    disableStash: true,
    resetOnHide: false},
};
export const animUpdateCurrentSeries: ControlSetItem = {
  name: 'animUpdateCurrentSeries',
  config: {
    type: 'SelectControl',
    label: t('Configure Series'),
    description: t('Select which series to configure'),
    renderTrigger: true,
    default: 'all',
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
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
    resetOnHide: false,
  },
};
export const animUpdateDuration1: ControlSetItem = {
  name: 'animUpdateDuration1',
  config: {
    type: 'SliderControl',
    label: t('Update Duration (ms) (Series 1)'),
    description: t('Set duration of update animations in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateDelay1: ControlSetItem = {
  name: 'animUpdateDelay1',
  config: {
    type: 'SliderControl',
    label: t('Update Delay (ms) (Series 1)'),
    description: t('Set delay before update animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdatestaggerPointMs3: ControlSetItem = {
  name: 'animUpdatestaggerPointMs3',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series 3)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdatestaggerPointMs2: ControlSetItem = {
  name: 'animUpdatestaggerPointMs2',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series 2)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdatestaggerPointMs1: ControlSetItem = {
  name: 'animUpdatestaggerPointMs1',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series 1)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdatestaggerPointMsAll: ControlSetItem = {
  name: 'animUpdatestaggerPointMsAll',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) '),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdateEasing1: ControlSetItem = {
  name: 'animUpdateEasing1',
  config: {
    type: 'SelectControl',
    label: t('Update Easing (Series 1)'),
    description: t('Choose easing function for update animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdateDuration2: ControlSetItem = {
  name: 'animUpdateDuration2',
  config: {
    type: 'SliderControl',
    label: t('Update Duration (ms) (Series 2)'),
    description: t('Set duration of update animations in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateDelay2: ControlSetItem = {
  name: 'animUpdateDelay2',
  config: {
    type: 'SliderControl',
    label: t('Update Delay (ms) (Series 2)'),
    description: t('Set delay before update animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateEasing2: ControlSetItem = {
  name: 'animUpdateEasing2',
  config: {
    type: 'SelectControl',
    label: t('Update Easing (Series 2)'),
    description: t('Choose easing function for update animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdateDuration3: ControlSetItem = {
  name: 'animUpdateDuration3',
  config: {
    type: 'SliderControl',
    label: t('Update Duration (ms) (Series 3)'),
    description: t('Set duration of update animations in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateDelay3: ControlSetItem = {
  name: 'animUpdateDelay3',
  config: {
    type: 'SliderControl',
    label: t('Update Delay (ms) (Series 3)'),
    description: t('Set delay before update animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateEasing3: ControlSetItem = {
  name: 'animUpdateEasing3',
  config: {
    type: 'SelectControl',
    label: t('Update Easing (Series 3)'),
    description: t('Choose easing function for update animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animUpdateDurationAll: ControlSetItem = {
  name: 'animUpdateDurationAll',
  config: {
    type: 'SliderControl',
    label: t('Update Duration (ms) - Series All'),
    description: t('Set duration of update animations in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateDelayAll: ControlSetItem = {
  name: 'animUpdateDelayAll',
  config: {
    type: 'SliderControl',
    label: t('Update Delay (ms) - Series All'),
    description: t('Set delay before update animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const animUpdateEasingAll: ControlSetItem = {
  name: 'animUpdateEasingAll',
  config: {
    type: 'SelectControl',
    label: t('Update Easing - Series All'),
    description: t('Choose easing function for update animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animUpdateCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};