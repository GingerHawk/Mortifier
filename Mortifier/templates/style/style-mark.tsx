import { t } from '@superset-ui/core';
import { ControlSetItem, ControlStateMapping, ControlPanelsContainerProps } from '@superset-ui/chart-controls';
import {  defColor3_1,defColor3_2,defColor3_3 } from '../../common/colors';

const visible = (controls: ControlStateMapping) => !!controls?.markControls?.value;

export const markEnabled: ControlSetItem = {
  name: 'markEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markControls: ControlSetItem = {
  name: 'markControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const markCurrentSeries: ControlSetItem = {
  name: 'markCurrentSeries',
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
    visibility: ({ controls }) => visible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const markTargetAll: ControlSetItem = {
  name: 'markTargetAll',
  config: {
    type: 'RadioButtonControl',
    label: t('Style Target'),
    description: t('Choose whether styles apply normally or on hover.'),
    options: [
      ['normal', t('Normal')],
      ['emphasis', t('Hover')],
    ],
    default: 'normal',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const markShowAll: ControlSetItem = {
  name: 'markShowAll',
  config: {
    type: 'CheckboxControl',
    label: t('Show Marks'),
    description: t('Toggle visibility of data point marks.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSymbolTypeAll: ControlSetItem = {
  name: 'markSymbolTypeAll',
  config: {
    type: 'RadioButtonControl',
    label: t('Mark Shape'),
    description: t('Select the shape of the data point marks.'),
    options: [
      ['circle', t('Circle')],
      ['rect', t('Rectangle')],
      ['roundRect', t('Rounded Rectangle')],
      ['triangle', t('Triangle')],
      ['diamond', t('Diamond')],
      ['pin', t('Pin')],
      ['arrow', t('Arrow')],
    ],
    default: 'circle',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSizeAll: ControlSetItem = {
  name: 'markSizeAll',
  config: {
    type: 'SliderControl',
    label: t('Mark Size'),
    description: t('Adjust the size of marks (px).'),
    default: 10,
    min: 0,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const markColorAll: ControlSetItem = {
  name: 'markColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Mark Color'),
    description: t('Set the fill color of marks.'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const markTarget1: ControlSetItem = {
  name: 'markTarget1',
  config: {
    type: 'RadioButtonControl',
    label: t('Style Target (Series 1)'),
    description: t('Choose whether styles apply normally or on hover.'),
    options: [
      ['normal', t('Normal')],
      ['emphasis', t('Hover')],
    ],
    default: 'normal',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markShow1: ControlSetItem = {
  name: 'markShow1',
  config: {
    type: 'CheckboxControl',
    label: t('Show Marks (Series 1)'),
    description: t('Toggle visibility of data point marks.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSymbolType1: ControlSetItem = {
  name: 'markSymbolType1',
  config: {
    type: 'RadioButtonControl',
    label: t('Mark Shape (Series 1)'),
    description: t('Select the shape of the data point marks.'),
    options: [
      ['circle', t('Circle')],
      ['rect', t('Rectangle')],
      ['roundRect', t('Rounded Rectangle')],
      ['triangle', t('Triangle')],
      ['diamond', t('Diamond')],
      ['pin', t('Pin')],
      ['arrow', t('Arrow')],
    ],
    default: 'circle',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSize1: ControlSetItem = {
  name: 'markSize1',
  config: {
    type: 'SliderControl',
    label: t('Mark Size (Series 1)'),
    description: t('Adjust the size of marks (px).'),
    default: 10,
    min: 0,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markColor1: ControlSetItem = {
  name: 'markColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Mark Color (Series 1)'),
    description: t('Set the fill color of marks.'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const markTarget2: ControlSetItem = {
  name: 'markTarget2',
  config: {
    type: 'RadioButtonControl',
    label: t('Style Target (Series 2)'),
    description: t('Choose whether styles apply normally or on hover.'),
    options: [
      ['normal', t('Normal')],
      ['emphasis', t('Hover')],
    ],
    default: 'normal',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markShow2: ControlSetItem = {
  name: 'markShow2',
  config: {
    type: 'CheckboxControl',
    label: t('Show Marks (Series 2)'),
    description: t('Toggle visibility of data point marks.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSymbolType2: ControlSetItem = {
  name: 'markSymbolType2',
  config: {
    type: 'RadioButtonControl',
    label: t('Mark Shape (Series 2)'),
    description: t('Select the shape of the data point marks.'),
    options: [
      ['circle', t('Circle')],
      ['rect', t('Rectangle')],
      ['roundRect', t('Rounded Rectangle')],
      ['triangle', t('Triangle')],
      ['diamond', t('Diamond')],
      ['pin', t('Pin')],
      ['arrow', t('Arrow')],
    ],
    default: 'circle',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSize2: ControlSetItem = {
  name: 'markSize2',
  config: {
    type: 'SliderControl',
    label: t('Mark Size (Series 2)'),
    description: t('Adjust the size of marks (px).'),
    default: 10,
    min: 0,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markColor2: ControlSetItem = {
  name: 'markColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Mark Color (Series 2)'),
    description: t('Set the fill color of marks.'),
    default: defColor3_2,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const markTarget3: ControlSetItem = {
  name: 'markTarget3',
  config: {
    type: 'RadioButtonControl',
    label: t('Style Target (Series 3)'),
    description: t('Choose whether styles apply normally or on hover.'),
    options: [
      ['normal', t('Normal')],
      ['emphasis', t('Hover')],
    ],
    default: 'normal',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markShow3: ControlSetItem = {
  name: 'markShow3',
  config: {
    type: 'CheckboxControl',
    label: t('Show Marks (Series 3)'),
    description: t('Toggle visibility of data point marks.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSymbolType3: ControlSetItem = {
  name: 'markSymbolType3',
  config: {
    type: 'RadioButtonControl',
    label: t('Mark Shape (Series 3)'),
    description: t('Select the shape of the data point marks.'),
    options: [
      ['circle', t('Circle')],
      ['rect', t('Rectangle')],
      ['roundRect', t('Rounded Rectangle')],
      ['triangle', t('Triangle')],
      ['diamond', t('Diamond')],
      ['pin', t('Pin')],
      ['arrow', t('Arrow')],
    ],
    default: 'circle',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markSize3: ControlSetItem = {
  name: 'markSize3',
  config: {
    type: 'SliderControl',
    label: t('Mark Size (Series 3)'),
    description: t('Adjust the size of marks (px).'),
    default: 10,
    min: 0,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const markColor3: ControlSetItem = {
  name: 'markColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Mark Color (Series 3)'),
    description: t('Set the fill color of marks.'),
    default: defColor3_3,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    visible(controls) && controls?.markCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export default {};
