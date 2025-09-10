import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1_1, defColor1_2, defColor1_3 } from '../../common/colors';

const visible = (controls: ControlStateMapping) => !!controls?.lineControls?.value;

export const lineEnabled: ControlSetItem = {
  name: 'lineEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineControls: ControlSetItem = {
  name: 'lineControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineCurrentSeries: ControlSetItem = {
  name: 'lineCurrentSeries',
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

export const lineColorAll: ControlSetItem = {
  name: 'lineColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Line Color (All)'),
    description: t('Set line color for all series'),
    renderTrigger: true,
    default: defColor1_1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineWidthAll: ControlSetItem = {
  name: 'lineWidthAll',
  config: {
    type: 'SliderControl',
    label: t('Width (All)'),
    description: t('Adjust line width for all series (px)'),
    default: 2,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineTypeAll: ControlSetItem = {
  name: 'lineTypeAll',
  config: {
    type: 'RadioButtonControl',
    label: t('Line Type (All)'),
    description: t('Choose line style for all series'),
    options: [
      ['solid', t('Solid')],
      ['dashed', t('Dashed')],
      ['dotted', t('Dotted')],
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineSmoothnessAll: ControlSetItem = {
  name: 'lineSmoothnessAll',
  config: {
    type: 'SliderControl',
    label: t('Smoothness (All)'),
    description: t('Set line curve smoothness for all series (0–1)'),
    default: 0,
    min: 0,
    max: 1,
    step: 0.1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineColor1: ControlSetItem = {
  name: 'lineColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Line Color (Series 1)'),
    description: t('Set line color (Series 1)'),
    renderTrigger: true,
    default: defColor1_1,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineWidth1: ControlSetItem = {
  name: 'lineWidth1',
  config: {
    type: 'SliderControl',
    label: t('Width (Series 1)'),
    description: t('Adjust line width (Series 1) (px)'),
    default: 2,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineType1: ControlSetItem = {
  name: 'lineType1',
  config: {
    type: 'RadioButtonControl',
    label: t('Line Type (Series 1)'),
    description: t('Choose line style (Series 1)'),
    options: [
      ['solid', t('Solid')],
      ['dashed', t('Dashed')],
      ['dotted', t('Dotted')],
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineSmoothness1: ControlSetItem = {
  name: 'lineSmoothness1',
  config: {
    type: 'SliderControl',
    label: t('Smoothness (Series 1)'),
    description: t('Set line curve smoothness (Series 1) (0–1)'),
    default: 0,
    min: 0,
    max: 1,
    step: 0.1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineColor2: ControlSetItem = {
  name: 'lineColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Line Color (Series 2)'),
    description: t('Set line color (Series 2)'),
    renderTrigger: true,
    default: defColor1_2,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineWidth2: ControlSetItem = {
  name: 'lineWidth2',
  config: {
    type: 'SliderControl',
    label: t('Width (Series 2)'),
    description: t('Adjust line width (Series 2) (px)'),
    default: 2,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineType2: ControlSetItem = {
  name: 'lineType2',
  config: {
    type: 'RadioButtonControl',
    label: t('Line Type (Series 2)'),
    description: t('Choose line style (Series 2)'),
    options: [
      ['solid', t('Solid')],
      ['dashed', t('Dashed')],
      ['dotted', t('Dotted')],
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineSmoothness2: ControlSetItem = {
  name: 'lineSmoothness2',
  config: {
    type: 'SliderControl',
    label: t('Smoothness (Series 2)'),
    description: t('Set line curve smoothness (Series 2) (0–1)'),
    default: 0,
    min: 0,
    max: 1,
    step: 0.1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const lineColor3: ControlSetItem = {
  name: 'lineColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Line Color (Series 3)'),
    description: t('Set line color (Series 3)'),
    renderTrigger: true,
    default: defColor1_3,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineWidth3: ControlSetItem = {
  name: 'lineWidth3',
  config: {
    type: 'SliderControl',
    label: t('Width (Series 3)'),
    description: t('Adjust line width (Series 3) (px)'),
    default: 3,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineType3: ControlSetItem = {
  name: 'lineType3',
  config: {
    type: 'RadioButtonControl',
    label: t('Line Type (Series 3)'),
    description: t('Choose line style (Series 3)'),
    options: [
      ['solid', t('Solid')],
      ['dashed', t('Dashed')],
      ['dotted', t('Dotted')],
    ],
    default: 'solid',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const lineSmoothness3: ControlSetItem = {
  name: 'lineSmoothness3',
  config: {
    type: 'SliderControl',
    label: t('Smoothness (Series 3)'),
    description: t('Set line curve smoothness (Series 3) (0–1)'),
    default: 0,
    min: 0,
    max: 1,
    step: 0.1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      visible(controls) && controls?.lineCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};