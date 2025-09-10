import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1_1,defColor1_2,defColor1_3 } from '../../common/colors';
const visible = (c: ControlStateMapping) => Boolean(c?.styleShadowShow?.value);

export const styleShadowEnabled: ControlSetItem = {
  name: 'styleShadowEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowShow: ControlSetItem = {
  name: 'styleShadowShow',
  config: { 
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleShadowCurrentSeries: ControlSetItem = {
  name: 'styleShadowCurrentSeries',
  config: {
    type: 'SelectControl',
    label: t('Configure Series'),
    description: t('Select which series to configure'),
    renderTrigger: true,
    default: 1,
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
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleShadowColor1: ControlSetItem = {
  name: 'styleShadowColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow color (Series 1)'),
    description: t('Set the shadow color.'),
    renderTrigger: true,
    default: defColor1_1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOpacity1: ControlSetItem = {
  name: 'styleShadowOpacity1',
  config: {
    type: 'SliderControl',
    label: t('Opacity (Series 1)'),
    description: t('Adjust opacity, 0 = transparent, 1 = opaque.'),
    renderTrigger: true,
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetX1: ControlSetItem = {
  name: 'styleShadowOffsetX1',
  config: {
    type: 'SliderControl',
    label: t('Offset X (Series 1)'),
    description: t('Horizontal offset of the shadow (px).'),
    renderTrigger: true,
    default: 10,
    min: -50,
    max: 50,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetY1: ControlSetItem = {
  name: 'styleShadowOffsetY1',
  config: {
    type: 'SliderControl',
    label: t('Offset Y (Series 1)'),
    description: t('Vertical offset of the shadow (px).'),
    renderTrigger: true,
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowBlur1: ControlSetItem = {
  name: 'styleShadowBlur1',
  config: {
    type: 'SliderControl',
    label: t('Blur (Series 1)'),
    description: t('Blur radius of the shadow (px).'),
    renderTrigger: true,
    default: 15,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleShadowColor2: ControlSetItem = {
  name: 'styleShadowColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow color (Series 2)'),
    description: t('Set the shadow color.'),
    renderTrigger: true,
    default: defColor1_2,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOpacity2: ControlSetItem = {
  name: 'styleShadowOpacity2',
  config: {
    type: 'SliderControl',
    label: t('Opacity (Series 2)'),
    description: t('Adjust opacity, 0 = transparent, 2 = opaque.'),
    renderTrigger: true,
    default: 0.5,
    min: 0,
    max: 2,
    step: 0.05,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetX2: ControlSetItem = {
  name: 'styleShadowOffsetX2',
  config: {
    type: 'SliderControl',
    label: t('Offset X (Series 2)'),
    description: t('Horizontal offset of the shadow (px).'),
    renderTrigger: true,
    default: 10,
    min: -50,
    max: 50,
    step: 2,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetY2: ControlSetItem = {
  name: 'styleShadowOffsetY2',
  config: {
    type: 'SliderControl',
    label: t('Offset Y (Series 2)'),
    description: t('Vertical offset of the shadow (px).'),
    renderTrigger: true,
    default: 0,
    min: -50,
    max: 50,
    step: 2,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowBlur2: ControlSetItem = {
  name: 'styleShadowBlur2',
  config: {
    type: 'SliderControl',
    label: t('Blur (Series 2)'),
    description: t('Blur radius of the shadow (px).'),
    renderTrigger: true,
    default: 15,
    min: 0,
    max: 200,
    step: 2,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleShadowColor3: ControlSetItem = {
  name: 'styleShadowColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow color (Series 3)'),
    description: t('Set the shadow color.'),
    renderTrigger: true,
    default: defColor1_3,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOpacity3: ControlSetItem = {
  name: 'styleShadowOpacity3',
  config: {
    type: 'SliderControl',
    label: t('Opacity (Series 3)'),
    description: t('Adjust opacity, 0 = transparent, 3 = opaque.'),
    renderTrigger: true,
    default: 0.5,
    min: 0,
    max: 3,
    step: 0.05,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetX3: ControlSetItem = {
  name: 'styleShadowOffsetX3',
  config: {
    type: 'SliderControl',
    label: t('Offset X (Series 3)'),
    description: t('Horizontal offset of the shadow (px).'),
    renderTrigger: true,
    default: 10,
    min: -50,
    max: 50,
    step: 3,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetY3: ControlSetItem = {
  name: 'styleShadowOffsetY3',
  config: {
    type: 'SliderControl',
    label: t('Offset Y (Series 3)'),
    description: t('Vertical offset of the shadow (px).'),
    renderTrigger: true,
    default: 0,
    min: -50,
    max: 50,
    step: 3,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowBlur3: ControlSetItem = {
  name: 'styleShadowBlur3',
  config: {
    type: 'SliderControl',
    label: t('Blur (Series 3)'),
    description: t('Blur radius of the shadow (px).'),
    renderTrigger: true,
    default: 15,
    min: 0,
    max: 300,
    step: 3,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleShadowColorAll: ControlSetItem = {
  name: 'styleShadowColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Shadow color'),
    description: t('Set the shadow color.'),
    renderTrigger: true,
    default: defColor1_1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOpacityAll: ControlSetItem = {
  name: 'styleShadowOpacityAll',
  config: {
    type: 'SliderControl',
    label: t('Opacity '),
    description: t('Adjust opacity, 0 = transparent, All = opaque.'),
    renderTrigger: true,
    default: 0.5,
    min: 0,
    max: 1,
    step: 0.05,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetXAll: ControlSetItem = {
  name: 'styleShadowOffsetXAll',
  config: {
    type: 'SliderControl',
    label: t('Offset X'),
    description: t('Horizontal offset of the shadow (px).'),
    renderTrigger: true,
    default: 10,
    min: -50,
    max: 50,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowOffsetYAll: ControlSetItem = {
  name: 'styleShadowOffsetYAll',
  config: {
    type: 'SliderControl',
    label: t('Offset Y'),
    description: t('Vertical offset of the shadow (px).'),
    renderTrigger: true,
    default: 0,
    min: -50,
    max: 50,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleShadowBlurAll: ControlSetItem = {
  name: 'styleShadowBlurAll',
  config: {
    type: 'SliderControl',
    label: t('Blur'),
    description: t('Blur radius of the shadow (px).'),
    renderTrigger: true,
    default: 10,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.styleShadowCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
