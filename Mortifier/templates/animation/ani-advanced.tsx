import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,} from '@superset-ui/chart-controls';

const controlsVisible = (c: ControlStateMapping) => Boolean(c?.animAdvControls?.value);

 export const aniAdvEnabled: ControlSetItem = {
  name: 'aniAdvEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const animAdvControls: ControlSetItem = {
  name: 'animAdvControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    // Not gated by Enable
    disableStash: true,
    resetOnHide: false},
}; 

export const universalTransitionAll: ControlSetItem = {
  name: 'universalTransitionAll',
  config: {
    type: 'CheckboxControl',
    label: t('Universal Transition - Series All'),
    description: t('Morph between chart structures when data shape changes.'),
    default: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const staggerSeriesMsAll: ControlSetItem = {
  name: 'staggerSeriesMsAll',
  config: {
    type: 'SliderControl',
    label: t('Per-Series Delay (ms) - Series All'),
    description: t('Add delay per series index for staggered entry.'),
    default: 0,
    min: 0,
    max: 2000,
    step: 25,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

