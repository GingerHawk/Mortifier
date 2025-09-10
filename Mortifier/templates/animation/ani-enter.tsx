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
const controlsVisible = (c: ControlStateMapping) => Boolean(c?.animEnterControls?.value); 

export const aniEnterEnabled: ControlSetItem = {
  name: 'aniEnterEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const animEnterControls: ControlSetItem = {
  name: 'animEnterControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),

    default: false,
    renderTrigger: true,
    // Not gated by Enable
    disableStash: true,
    resetOnHide: false},
};
export const animEnterCurrentSeries: ControlSetItem = {
  name: 'animEnterCurrentSeries',
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
export const animEnterDuration1: ControlSetItem = {
  name: 'animEnterDuration1',
  config: {
    type: 'SliderControl',
    label: t('Enter Duration (ms) (Series 1)'),
    description: t('Set duration of enter animations in milliseconds.'),
    default: 0,
    min: 1000,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterstaggerPointMsAll: ControlSetItem = {
  name: 'animEnterstaggerPointMsAll',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series All)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterstaggerPointMs1: ControlSetItem = {
  name: 'animEnterstaggerPointMs1',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series 1)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterstaggerPointMs2: ControlSetItem = {
  name: 'animEnterstaggerPointMs2',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series 2)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterstaggerPointMs3: ControlSetItem = {
  name: 'animEnterstaggerPointMs3',
  config: {
    type: 'SliderControl',
    label: t('Per-Point Delay (ms) (Series 3)'),
    description: t('Delay multiplied by data index to stagger items within a series.'),
    default: 0,
    min: 0,
    max: 500,
    step: 10,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterDelay1: ControlSetItem = {
  name: 'animEnterDelay1',
  config: {
    type: 'SliderControl',
    label: t('Enter Delay (ms) (Series 1)'),
    description: t('Set delay before enter animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterEasing1: ControlSetItem = {
  name: 'animEnterEasing1',
  config: {
    type: 'SelectControl',
    label: t('Enter Easing (Series 1)'),
    description: t('Choose easing function for enter animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 1,    
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterDuration2: ControlSetItem = {
  name: 'animEnterDuration2',
  config: {
    type: 'SliderControl',
    label: t('Enter Duration (ms) (Series 2)'),
    description: t('Set duration of enter animations in milliseconds.'),
    default: 0,
    min: 1000,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 2,  
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterDelay2: ControlSetItem = {
  name: 'animEnterDelay2',
  config: {
    type: 'SliderControl',
    label: t('Enter Delay (ms) (Series 2)'),
    description: t('Set delay before enter animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 2,  
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterEasing2: ControlSetItem = {
  name: 'animEnterEasing2',
  config: {
    type: 'SelectControl',
    label: t('Enter Easing (Series 2)'),
    description: t('Choose easing function for enter animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterDuration3: ControlSetItem = {
  name: 'animEnterDuration3',
  config: {
    type: 'SliderControl',
    label: t('Enter Duration (ms) (Series 3)'),
    description: t('Set duration of enter animations in milliseconds.'),
    default: 0,
    min: 1000,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterDelay3: ControlSetItem = {
  name: 'animEnterDelay3',
  config: {
    type: 'SliderControl',
    label: t('Enter Delay (ms) (Series 3)'),
    description: t('Set delay before enter animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterEasing3: ControlSetItem = {
  name: 'animEnterEasing3',
  config: {
    type: 'SelectControl',
    label: t('Enter Easing (Series 3)'),
    description: t('Choose easing function for enter animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const animEnterDurationAll: ControlSetItem = {
  name: 'animEnterDurationAll',
  config: {
    type: 'SliderControl',
    label: t('Enter Duration (ms) (Series All)'),
    description: t('Set duration of enter animations in milliseconds.'),
    default: 0,
    min: 1000,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterDelayAll: ControlSetItem = {
  name: 'animEnterDelayAll',
  config: {
    type: 'SliderControl',
    label: t('Enter Delay (ms) (Series All)'),
    description: t('Set delay before enter animations start, in milliseconds.'),
    default: 0,
    min: 0,
    max: 5000,
    step: 50,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const animEnterEasingAll: ControlSetItem = {
  name: 'animEnterEasingAll',
  config: {
    type: 'SelectControl',
    label: t('Enter Easing (Series All)'),
    description: t('Choose easing function for enter animations.'),
    options: EASING_OPTIONS,
    default: 'cubicOut',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.animEnterCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};