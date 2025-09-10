import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
 
} from '@superset-ui/chart-controls';
import { defColor1_1, defColor3_1, defColor1_2, defColor3_2,defColor1_3, defColor3_3} from '../../common/colors';

const borderShow1 = (controls: ControlStateMapping) => !!controls?.valBorderShow1?.value;
const borderShow2 = (controls: ControlStateMapping) => !!controls?.valBorderShow2?.value;
const borderShow3 = (controls: ControlStateMapping) => !!controls?.valBorderShow3?.value;
const borderShowAll = (controls: ControlStateMapping) => !!controls?.valBorderShowAll?.value;
const visible = (c: ControlStateMapping) => Boolean(c?.valBgBorderControls?.value);


export const valBgBorderEnabled: ControlSetItem = {
  name: 'valBgBorderEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBgBorderControls: ControlSetItem = {
  name: 'valBgBorderControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const valBgBorderCurrentSeries: ControlSetItem = {
  name: 'valBgBorderCurrentSeries',
  config: {
    type: 'SelectControl',
    label: t('Configure Series'),
    description: t('Select which series to configure'),
    renderTrigger: true,
    default: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls),
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


export const valBgColor1: ControlSetItem = {
  name: 'valBgColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set solid background color for value labels (Series 1)'),
    default: defColor1_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 1, 
    disableStash: true,
    resetOnHide: false,
  },
};


export const valBgRadius1: ControlSetItem = {
  name: 'valBgRadius1',
  config: {
    type: 'SliderControl',
    label: t('Corner Radius'),
    description: t('Set corner radius of the value background (px) (Series 1)'),
    default: 0,
    min: 0,
    max: 24,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 1,     disableStash: true,
    resetOnHide: false,
  },
};

export const valBgPadding1: ControlSetItem = {
  name: 'valBgPadding1',
  config: {
    type: 'SliderControl',
    label: t('Background Padding'),
    description: t('Adjust inner padding of the value background (px) (Series 1)'),
    default: 5,
    min: 0,
    max: 40,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 1,     disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderShow1: ControlSetItem = {
  name: 'valBorderShow1',
  config: {
    type: 'CheckboxControl',
    label: t('Show Border'),
    description: t('Toggle display of a border around the value background (Series 1)'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 1, 
  },
};

export const valBorderColor1: ControlSetItem = {
  name: 'valBorderColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the border color (Series 1)'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 1 && borderShow1(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderWidth1: ControlSetItem = {
  name: 'valBorderWidth1',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width (px) (Series 1)'),
    default: 1,
    min: 4,
    max: 12,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 1 && borderShow1(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderType1: ControlSetItem = {
  name: 'valBorderType1',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Choose border style (Series 1)'),
    options: [
     ['solid',  t('Solid') ] ,
     ['dashed',  t('Dashed')]  ,
     ['dotted',  t('Dotted')] ,
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 1 && borderShow1(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBgColor2: ControlSetItem = {
  name: 'valBgColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set solid background color for value labels (Series 2)'),
    default: defColor1_2,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 2, 
    disableStash: true,
    resetOnHide: false,
  },
};


export const valBgRadius2: ControlSetItem = {
  name: 'valBgRadius2',
  config: {
    type: 'SliderControl',
    label: t('Corner Radius'),
    description: t('Set corner radius of the value background (px) (Series 2)'),
    default: 0,
    min: 0,
    max: 24,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 2,     disableStash: true,
    resetOnHide: false,
  },
};

export const valBgPadding2: ControlSetItem = {
  name: 'valBgPadding2',
  config: {
    type: 'SliderControl',
    label: t('Background Padding'),
    description: t('Adjust inner padding of the value background (px) (Series 2)'),
    default: 5,
    min: 0,
    max: 40,
    step: 1,
    renderTrigger: true,
  visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 2,     disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderShow2: ControlSetItem = {
  name: 'valBorderShow2',
  config: {
    type: 'CheckboxControl',
    label: t('Show Border'),
    description: t('Toggle display of a border around the value background (Series 2)'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 2, 
  },
};

export const valBorderColor2: ControlSetItem = {
  name: 'valBorderColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the border color (Series 2)'),
    default: defColor3_2,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 2 && borderShow2(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderWidth2: ControlSetItem = {
  name: 'valBorderWidth2',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width (px) (Series 2)'),
    default: 2,
    min: 4,
    max: 22,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 2 && borderShow2(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderType2: ControlSetItem = {
  name: 'valBorderType2',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Choose border style (Series 2)'),
    options: [
     ['solid',  t('Solid') ] ,
     ['dashed',  t('Dashed')]  ,
     ['dotted',  t('Dotted')] ,
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 2 && borderShow2(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBgColor3: ControlSetItem = {
  name: 'valBgColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set solid background color for value labels (Series 3)'),
    default: defColor1_3,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 3, 
    disableStash: true,
    resetOnHide: false,
  },
};


export const valBgRadius3: ControlSetItem = {
  name: 'valBgRadius3',
  config: {
    type: 'SliderControl',
    label: t('Corner Radius'),
    description: t('Set corner radius of the value background (px) (Series 3)'),
    default: 0,
    min: 0,
    max: 34,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 3,    disableStash: true,
    resetOnHide: false,
  },
};

export const valBgPadding3: ControlSetItem = {
  name: 'valBgPadding3',
  config: {
    type: 'SliderControl',
    label: t('Background Padding'),
    description: t('Adjust inner padding of the value background (px) (Series 3)'),
    default: 5,
    min: 0,
    max: 40,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 3,    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderShow3: ControlSetItem = {
  name: 'valBorderShow3',
  config: {
    type: 'CheckboxControl',
    label: t('Show Border'),
    description: t('Toggle display of a border around the value background (Series 3)'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 3, 
  },
};

export const valBorderColor3: ControlSetItem = {
  name: 'valBorderColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the border color (Series 3)'),
    default: defColor3_3,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 3 && borderShow3(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderWidth3: ControlSetItem = {
  name: 'valBorderWidth3',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width (px) (Series 3)'),
    default: 3,
    min: 4,
    max: 33,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 3 && borderShow3(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderType3: ControlSetItem = {
  name: 'valBorderType3',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Choose border style (Series 3)'),
    options: [
     ['solid',  t('Solid') ] ,
     ['dashed',  t('Dashed')]  ,
     ['dotted',  t('Dotted')] ,
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 3 && borderShow3(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBgColorAll: ControlSetItem = {
  name: 'valBgColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set solid background color for value labels (Series All)'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 'all', 
    disableStash: true,
    resetOnHide: false,
  },
};


export const valBgRadiusAll: ControlSetItem = {
  name: 'valBgRadiusAll',
  config: {
    type: 'SliderControl',
    label: t('Corner Radius'),
    description: t('Set corner radius of the value background (px) (Series All)'),
    default: 0,
    min: 0,
    max: 34,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 'all',     
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBgPaddingAll: ControlSetItem = {
  name: 'valBgPaddingAll',
  config: {
    type: 'SliderControl',
    label: t('Background Padding'),
    description: t('Adjust inner padding of the value background (px) (Series All)'),
    default: 5,
    min: 0,
    max: 40,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls)  && controls?.valBgBorderCurrentSeries?.value === 'all',     
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderShowAll: ControlSetItem = {
  name: 'valBorderShowAll',
  config: {
    type: 'CheckboxControl',
    label: t('Show Border'),
    description: t('Toggle display of a border around the value background (Series All)'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 'all', 
  },
};

export const valBorderColorAll: ControlSetItem = {
  name: 'valBorderColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Color'),
    description: t('Set the border color (Series All)'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 'all' && borderShowAll(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderWidthAll: ControlSetItem = {
  name: 'valBorderWidthAll',
  config: {
    type: 'SliderControl',
    label: t('Width'),
    description: t('Adjust the border width (px) (Series All)'),
    default: 3,
    min: 4,
    max: 33,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 'all' && borderShowAll(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export const valBorderTypeAll: ControlSetItem = {
  name: 'valBorderTypeAll',
  config: {
    type: 'RadioButtonControl',
    label: t('Type'),
    description: t('Choose border style (Series All)'),
    options: [
     ['solid',  t('Solid') ] ,
     ['dashed',  t('Dashed')]  ,
     ['dotted',  t('Dotted')] ,
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => visible(controls) && controls?.valBgBorderCurrentSeries?.value === 'all' && borderShowAll(controls), 
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
