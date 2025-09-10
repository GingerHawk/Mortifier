import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1_1, defColor2_1, defColor3_1,defColor1_2, defColor2_2, defColor3_2,defColor1_3, defColor2_3, defColor3_3, } from '../../common/colors';

const show = (c: ControlStateMapping) => Boolean(c?.styleFillShow?.value);
const showStop3All = (c: ControlStateMapping) => Boolean(c?.styleFillUseStop3All?.value);
const showStop3Series1 = (c: ControlStateMapping) => Boolean(c?.styleFillUseStop3Series1?.value);
const showStop3Series2 = (c: ControlStateMapping) => Boolean(c?.styleFillUseStop3Series2?.value);
const showStop3Series3 = (c: ControlStateMapping) => Boolean(c?.styleFillUseStop3Series3?.value);
const isGradientAll = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 'all' && (c?.styleFillTypeAll?.value === 'gradient');
const isSolidAll = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 'all' && (c?.styleFillTypeAll?.value === 'solid');
const isGradient1 = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 1 && (c?.styleFillType1?.value === 'gradient');
const isSolid1 = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 1 && (c?.styleFillType1?.value === 'solid');
const isGradient2 = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 2 && (c?.styleFillType2?.value === 'gradient');
const isSolid2 = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 2 && (c?.styleFillType2?.value === 'solid');
const isGradient3 = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 3 && (c?.styleFillType3?.value === 'gradient');
const isSolid3 = (c: ControlStateMapping) =>
  show(c) && c?.styleFillCurrentSeries?.value === 3 && (c?.styleFillType3?.value === 'solid');

export const styleFillShow: ControlSetItem = {
  name: 'styleFillShow',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillEnabled: ControlSetItem = {
  name: 'styleFillEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillCurrentSeries: ControlSetItem = {
  name: 'styleFillCurrentSeries',
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
    visibility: ({ controls }: ControlPanelsContainerProps) => show(controls),
    sortComparator: (a: { label: string; value: any }, b: { label: string; value: any }) => 0,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillTypeAll: ControlSetItem = {
  name: 'styleFillTypeAll',
  config: {
    type: 'RadioButtonControl',
    label: t('Fill Type'),
    description: t('Select solid or gradient fill.'),
    renderTrigger: true,
    default: 'gradient',
    options: [
      ['solid', t('Solid')],
      ['gradient', t('Gradient')],
    ],
    visibility: ({ controls }: ControlPanelsContainerProps) => show(controls)&& controls?.styleFillCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillType1: ControlSetItem = {
  name: 'styleFillType1',
  config: {
    type: 'RadioButtonControl',
    label: t('Fill Type'),
    description: t('Select solid or gradient fill.'),
    renderTrigger: true,
    default: 'gradient',
    options: [
      ['solid', t('Solid')],
      ['gradient', t('Gradient')],
    ],
    visibility: ({ controls }: ControlPanelsContainerProps) => show(controls)&& controls?.styleFillCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillType2: ControlSetItem = {
  name: 'styleFillType2',
  config: {
    type: 'RadioButtonControl',
    label: t('Fill Type'),
    description: t('Select solid or gradient fill.'),
    renderTrigger: true,
    default: 'gradient',
    options: [
      ['solid', t('Solid')],
      ['gradient', t('Gradient')],
    ],
    visibility: ({ controls }: ControlPanelsContainerProps) => show(controls)&& controls?.styleFillCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillType3: ControlSetItem = {
  name: 'styleFillType3',
  config: {
    type: 'RadioButtonControl',
    label: t('Fill Type'),
    description: t('Select solid or gradient fill.'),
    renderTrigger: true,
    default: 'gradient',
    options: [
      ['solid', t('Solid')],
      ['gradient', t('Gradient')],
    ],
    visibility: ({ controls }: ControlPanelsContainerProps) => show(controls)&& controls?.styleFillCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillSolidColorAll: ControlSetItem = {
  name: 'styleFillSolidColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Fill Color (All)'),
    description: t('Choose solid fill color for all series'),
    renderTrigger: true,
    default: defColor1_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isSolidAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillAngleAll: ControlSetItem = {
  name: 'styleFillAngleAll',
  config: {
    type: 'SliderControl',
    label: t('Angle (°) - All'),
    description: t('Set gradient angle for all series'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 360,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1ColorAll: ControlSetItem = {
  name: 'styleFillStop1ColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 1 Color (All)'),
    description: t('First gradient stop color for all series'),
    renderTrigger: true,
    default: defColor1_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1OffsetAll: ControlSetItem = {
  name: 'styleFillStop1OffsetAll',
  config: {
    type: 'SliderControl',
    label: t('Stop 1 Position (%) - All'),
    description: t('Position of first gradient stop for all series'),
    renderTrigger: true,
    default: 30,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2ColorAll: ControlSetItem = {
  name: 'styleFillStop2ColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 2 Color (All)'),
    description: t('Second gradient stop color for all series'),
    renderTrigger: true,
    default: defColor2_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2OffsetAll: ControlSetItem = {
  name: 'styleFillStop2OffsetAll',
  config: {
    type: 'SliderControl',
    label: t('Stop 2 Position (%) - All'),
    description: t('Position of second gradient stop for all series'),
    renderTrigger: true,
    default: 70,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillUseStop3All: ControlSetItem = {
  name: 'styleFillUseStop3All',
  config: {
    type: 'CheckboxControl',
    label: t('Use Third Stop (All)'),
    description: t('Add a third color stop to the gradient for all series'),
    renderTrigger: true,
    default: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop3ColorAll: ControlSetItem = {
  name: 'styleFillStop3ColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 3 Color (All)'),
    description: t('Third gradient stop color for all series'),
    renderTrigger: true,
    default: defColor3_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls) && showStop3All(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop3OffsetAll: ControlSetItem = {
  name: 'styleFillStop3OffsetAll',
  config: {
    type: 'SliderControl',
    label: t('Stop 3 Position (%) - All'),
    description: t('Position of third gradient stop for all series'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradientAll(controls) && showStop3All(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillSolidColor1: ControlSetItem = {
  name: 'styleFillSolidColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Fill Color (Series 1)'),
    description: t('Choose solid fill color (Series 1)'),
    renderTrigger: true,
    default: defColor1_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isSolid1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillAngle1: ControlSetItem = {
  name: 'styleFillAngle1',
  config: {
    type: 'SliderControl',
    label: t('Angle (°) (Series 1)'),
    description: t('Set gradient angle (Series 1)'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 360,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1Color1: ControlSetItem = {
  name: 'styleFillStop1Color1',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 1 Color (Series 1)'),
    description: t('First gradient stop color (Series 1)'),
    renderTrigger: true,
    default: defColor1_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1Offset1: ControlSetItem = {
  name: 'styleFillStop1Offset1',
  config: {
    type: 'SliderControl',
    label: t('Stop 1 Position (%) (Series 1)'),
    description: t('Position of first gradient stop (Series 1)'),
    renderTrigger: true,
    default: 30,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2Color1: ControlSetItem = {
  name: 'styleFillStop2Color1',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 2 Color (Series 1)'),
    description: t('Second gradient stop color (Series 1)'),
    renderTrigger: true,
    default: defColor2_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2Offset1: ControlSetItem = {
  name: 'styleFillStop2Offset1',
  config: {
    type: 'SliderControl',
    label: t('Stop 2 Position (%) (Series 1)'),
    description: t('Position of second gradient stop (Series 1)'),
    renderTrigger: true,
    default: 70,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillUseStop3Series1: ControlSetItem = {
  name: 'styleFillUseStop3Series1',
  config: {
    type: 'CheckboxControl',
    label: t('Use Third Stop (Series 1)'),
    description: t('Add a third color stop to the gradient (Series 1)'),
    renderTrigger: true,
    default: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillUseStop3Series2: ControlSetItem = {
  name: 'styleFillUseStop3Series2',
  config: {
    type: 'CheckboxControl',
    label: t('Use Third Stop (Series 2)'),
    description: t('Add a third color stop to the gradient (Series 2)'),
    renderTrigger: true,
    default: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillStop3Color2: ControlSetItem = {
  name: 'styleFillStop3Color2',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 3 Color (Series 2)'),
    description: t('Third gradient stop color (Series 2)'),
    renderTrigger: true,
    default: defColor3_2,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls) && showStop3Series2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillUseStop3Series3: ControlSetItem = {
  name: 'styleFillUseStop3Series3',
  config: {
    type: 'CheckboxControl',
    label: t('Use Third Stop (Series 3)'),
    description: t('Add a third color stop to the gradient (Series 3)'),
    renderTrigger: true,
    default: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls) && controls?.styleFillCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillStop3Color3: ControlSetItem = {
  name: 'styleFillStop3Color3',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 3 Color (Series 3)'),
    description: t('Third gradient stop color (Series 3)'),
    renderTrigger: true,
    default: defColor3_3,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls) && showStop3Series3(controls) && controls?.styleFillCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop3Color1: ControlSetItem = {
  name: 'styleFillStop3Color1',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 3 Color (Series 1)'),
    description: t('Third gradient stop color (Series 1)'),
    renderTrigger: true,
    default: defColor3_1,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls) && showStop3Series1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop3Offset1: ControlSetItem = {
  name: 'styleFillStop3Offset1',
  config: {
    type: 'SliderControl',
    label: t('Stop 3 Position (%) (Series 1)'),
    description: t('Position of third gradient stop (Series 1)'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient1(controls) && showStop3Series1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillSolidColor2: ControlSetItem = {
  name: 'styleFillSolidColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Fill Color (Series 2)'),
    description: t('Choose solid fill color (Series 2)'),
    renderTrigger: true,
    default: defColor2_2,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isSolid2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillAngle2: ControlSetItem = {
  name: 'styleFillAngle2',
  config: {
    type: 'SliderControl',
    label: t('Angle (°) (Series 2)'),
    description: t('Set gradient angle (Series 2)'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 360,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1Color2: ControlSetItem = {
  name: 'styleFillStop1Color2',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 1 Color (Series 2)'),
    description: t('First gradient stop color (Series 2)'),
    renderTrigger: true,
    default: defColor1_2,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1Offset2: ControlSetItem = {
  name: 'styleFillStop1Offset2',
  config: {
    type: 'SliderControl',
    label: t('Stop 1 Position (%) (Series 2)'),
    description: t('Position of first gradient stop (Series 2)'),
    renderTrigger: true,
    default: 30,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2Color2: ControlSetItem = {
  name: 'styleFillStop2Color2',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 2 Color (Series 2)'),
    description: t('Second gradient stop color (Series 2)'),
    renderTrigger: true,
    default: defColor2_2,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2Offset2: ControlSetItem = {
  name: 'styleFillStop2Offset2',
  config: {
    type: 'SliderControl',
    label: t('Stop 2 Position (%) (Series 2)'),
    description: t('Position of second gradient stop (Series 2)'),
    renderTrigger: true,
    default: 70,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop3Offset2: ControlSetItem = {
  name: 'styleFillStop3Offset2',
  config: {
    type: 'SliderControl',
    label: t('Stop 3 Position (%) (Series 2)'),
    description: t('Position of third gradient stop (Series 2)'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient2(controls) && showStop3Series2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleFillSolidColor3: ControlSetItem = {
  name: 'styleFillSolidColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Fill Color (Series 3)'),
    description: t('Choose solid fill color (Series 3)'),
    renderTrigger: true,
    default: defColor3_3,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isSolid3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillAngle3: ControlSetItem = {
  name: 'styleFillAngle3',
  config: {
    type: 'SliderControl',
    label: t('Angle (°) (Series 3)'),
    description: t('Set gradient angle (Series 3)'),
    renderTrigger: true,
    default: 90,
    min: 0,
    max: 360,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1Color3: ControlSetItem = {
  name: 'styleFillStop1Color3',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 1 Color (Series 3)'),
    description: t('First gradient stop color (Series 3)'),
    renderTrigger: true,
    default: defColor1_3,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop1Offset3: ControlSetItem = {
  name: 'styleFillStop1Offset3',
  config: {
    type: 'SliderControl',
    label: t('Stop 1 Position (%) (Series 3)'),
    description: t('Position of first gradient stop (Series 3)'),
    renderTrigger: true,
    default: 30,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2Color3: ControlSetItem = {
  name: 'styleFillStop2Color3',
  config: {
    type: 'ColorPickerControl',
    label: t('Stop 2 Color (Series 3)'),
    description: t('Second gradient stop color (Series 3)'),
    renderTrigger: true,
    default: defColor2_3,
    allowAlpha: true as any,
    enableAlpha: true as any,
    clearable: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleFillStop2Offset3: ControlSetItem = {
  name: 'styleFillStop2Offset3',
  config: {
    type: 'SliderControl',
    label: t('Stop 2 Position (%) (Series 3)'),
    description: t('Position of second gradient stop (Series 3)'),
    renderTrigger: true,
    default: 70,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};



export const styleFillStop3Offset3: ControlSetItem = {
  name: 'styleFillStop3Offset3',
  config: {
    type: 'SliderControl',
    label: t('Stop 3 Position (%) (Series 3)'),
    description: t('Position of third gradient stop (Series 3)'),
    renderTrigger: true,
    default: 70,
    min: 0,
    max: 100,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => 
      isGradient3(controls) && showStop3Series3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};