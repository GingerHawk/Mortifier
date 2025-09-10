import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1_1, defColor1_2, defColor1_3 } from '../../common/colors';

const controlsVisible = (c: ControlStateMapping) => Boolean(c?.valShadowControls?.value);

export const valShadowEnabled: ControlSetItem = {
  name: 'valShadowEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowControls: ControlSetItem = {
  name: 'valShadowControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const valShadowCurrentSeries: ControlSetItem = {
  name: 'valShadowCurrentSeries',
  config: {
    type: 'SelectControl',
    label: t('Configure Series'),
    description: t('Select which series to configure'),
    renderTrigger: true,
    default: 1,
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
export const valShadowColor1: ControlSetItem = {
  name: 'valShadowColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color (Series 1)'),
    description: t('Set the shadow color (Series 1)'),
    default: defColor1_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOpacity1: ControlSetItem = {
  name: 'valShadowOpacity1',
  config: {
    type: 'SliderControl',
    label: t('Opacity (Series 1)'),
    description: t('Adjust shadow opacity (0–1)'),
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowBlur1: ControlSetItem = {
  name: 'valShadowBlur1',
  config: {
    type: 'SliderControl',
    label: t('Blur (Series 1)'),
    description: t('Set shadow blur radius (px) (Series 1)'),
    default: 10,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetX1: ControlSetItem = {
  name: 'valShadowOffsetX1',
  config: {
    type: 'SliderControl',
    label: t('Offset X (Series 1)'),
    description: t('Horizontal shadow offset (px) (Series 1)'),
    default: 0,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetY1: ControlSetItem = {
  name: 'valShadowOffsetY1',
  config: {
    type: 'SliderControl',
    label: t('Offset Y (Series 1)'),
    description: t('Vertical shadow offset (px).'),
    default: 4,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valShadowColor2: ControlSetItem = {
  name: 'valShadowColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color (Series 2)'),
    description: t('Set the shadow color (Series 2)'),
    default: defColor1_2,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOpacity2: ControlSetItem = {
  name: 'valShadowOpacity2',
  config: {
    type: 'SliderControl',
    label: t('Opacity (Series 2)'),
    description: t('Adjust shadow opacity (0–1)'),
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowBlur2: ControlSetItem = {
  name: 'valShadowBlur2',
  config: {
    type: 'SliderControl',
    label: t('Blur (Series 2)'),
    description: t('Set shadow blur radius (px) (Series 2)'),
    default: 10,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetX2: ControlSetItem = {
  name: 'valShadowOffsetX2',
  config: {
    type: 'SliderControl',
    label: t('Offset X (Series 2)'),
    description: t('Horizontal shadow offset (px) (Series 2)'),
    default: 0,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetY2: ControlSetItem = {
  name: 'valShadowOffsetY2',
  config: {
    type: 'SliderControl',
    label: t('Offset Y (Series 2)'),
    description: t('Vertical shadow offset (px).'),
    default: 4,
    min: -32,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valShadowColor3: ControlSetItem = {
  name: 'valShadowColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color (Series 3)'),
    description: t('Set the shadow color (Series 3)'),
    default: defColor1_3,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOpacity3: ControlSetItem = {
  name: 'valShadowOpacity3',
  config: {
    type: 'SliderControl',
    label: t('Opacity (Series 3)'),
    description: t('Adjust shadow opacity (0–1)'),
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowBlur3: ControlSetItem = {
  name: 'valShadowBlur3',
  config: {
    type: 'SliderControl',
    label: t('Blur (Series 3)'),
    description: t('Set shadow blur radius (px) (Series 3)'),
    default: 10,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetX3: ControlSetItem = {
  name: 'valShadowOffsetX3',
  config: {
    type: 'SliderControl',
    label: t('Offset X (Series 3)'),
    description: t('Horizontal shadow offset (px) (Series 3)'),
    default: 0,
    min: -33,
    max: 33,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetY3: ControlSetItem = {
  name: 'valShadowOffsetY3',
  config: {
    type: 'SliderControl',
    label: t('Offset Y (Series 3)'),
    description: t('Vertical shadow offset (px).'),
    default: 4,
    min: -33,
    max: 33,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valShadowColorAll: ControlSetItem = {
  name: 'valShadowColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow Color - Series All'),
    description: t('Set the shadow color - Series All'),
    default: defColor1_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOpacityAll: ControlSetItem = {
  name: 'valShadowOpacityAll',
  config: {
    type: 'SliderControl',
    label: t('Opacity - Series All'),
    description: t('Adjust shadow opacity (0–1)'),
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowBlurAll: ControlSetItem = {
  name: 'valShadowBlurAll',
  config: {
    type: 'SliderControl',
    label: t('Blur - Series All'),
    description: t('Set shadow blur radius (px) - Series All'),
    default: 10,
    min: 0,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetXAll: ControlSetItem = {
  name: 'valShadowOffsetXAll',
  config: {
    type: 'SliderControl',
    label: t('Offset X - Series All'),
    description: t('Horizontal shadow offset (px) - Series All'),
    default: 0,
    min: -33,
    max: 33,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const valShadowOffsetYAll: ControlSetItem = {
  name: 'valShadowOffsetYAll',
  config: {
    type: 'SliderControl',
    label: t('Offset Y - Series All'),
    description: t('Vertical shadow offset (px).'),
    default: 4,
    min: -33,
    max: 33,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export default {};
