import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';
export const fonts = [
  {
    label: t('Theme & Generic'),
    options: [
      { value: 'inherit', label: t('Theme') },
      { value: 'sans-serif', label: t('Generic Sans-Serif') },
      { value: 'serif', label: t('Generic Serif') },
      { value: 'monospace', label: t('Generic Monospace') },
      { value: 'cursive', label: t('Generic Cursive') },
      { value: 'fantasy', label: t('Generic Fantasy') },
    ],
  },
  {
    label: t('Sans-Serif Fonts'),
    options: [
      { value: 'Arial, sans-serif', label: 'Arial' },
      { value: 'Helvetica, sans-serif', label: 'Helvetica' },
      { value: 'Verdana, sans-serif', label: 'Verdana' },
      { value: 'Tahoma, sans-serif', label: 'Tahoma' },
      { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
      { value: 'Lucida Sans Unicode, sans-serif', label: 'Lucida Sans Unicode' },
      { value: 'Gill Sans, sans-serif', label: 'Gill Sans' },
      { value: 'Futura, sans-serif', label: 'Futura' },
      { value: 'Impact, sans-serif', label: 'Impact' },
      { value: 'Inter, sans-serif', label: 'Inter' },
    ],
  },
  {
    label: t('Serif Fonts'),
    options: [
      { value: 'Times New Roman, serif', label: 'Times New Roman' },
      { value: 'Georgia, serif', label: 'Georgia' },
      { value: 'Palatino, serif', label: 'Palatino' },
      { value: 'Garamond, serif', label: 'Garamond' },
      { value: 'Bookman, serif', label: 'Bookman' },
    ],
  },
  {
    label: t('Monospace Fonts'),
    options: [
      { value: 'Courier New, monospace', label: 'Courier New' },
      { value: 'Lucida Console, monospace', label: 'Lucida Console' },
      { value: 'Monaco, monospace', label: 'Monaco' },
    ],
  },
  {
    label: t('Cursive Fonts'),
    options: [
      { value: 'Brush Script MT, cursive', label: 'Brush Script MT' },
      { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
    ],
  },
];

const controlsVisible = (controls: ControlStateMapping) => !!controls?.xAxisControls?.value;
const titleVisible = (controls: ControlStateMapping) => !!controls?.xAxisTitleControls?.value;

export const xAxisEnabled: ControlSetItem = {
  name: 'xAxisEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const xAxisControls: ControlSetItem = {
  name: 'xAxisControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};
export const xAxisTitleControls: ControlSetItem = {
  name: 'xAxisTitleControls',
  config: {
    type: 'CheckboxControl',
    label: t('Title Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisTitleText: ControlSetItem = {
  name: 'xAxisTitleText',
  config: {
    type: 'TextControl',
    label: t('X-Axis Title'),
    description: t('Enter a title for the X-axis.'),
    default: '',
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitlePosition: ControlSetItem = {
  name: 'xAxisTitlePosition',
  config: {
    type: 'SelectControl',
    label: t('Title Position'),
    description: t('Position of the axis title.'),
    choices: [
      ['start', t('Start')],
      ['middle', t('Middle')],
      ['end', t('End')],
    ],
    default: 'middle',
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitleOffsetX: ControlSetItem = {
  name: 'xAxisTitleOffsetX',
  config: {
    type: 'SliderControl',
    label: t('Title Offset X'),
    description: t('Horizontal offset for the axis title.'),
    default: 0,
    min: -1000,
    max: 1000,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitleOffsetY: ControlSetItem = {
  name: 'xAxisTitleOffsetY',
  config: {
    type: 'SliderControl',
    label: t('Title Offset Y'),
    description: t('Vertical offset for the axis title.'),
    default: 0,
    min: -1000,
    max: 1000,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitleColor: ControlSetItem = {
  name: 'xAxisTitleColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Label Color'),
    description: t('Set the color of the axis labels.'),
    default: defColor1,
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitleFontFamily: ControlSetItem = {
  name: 'xAxisTitleFontFamily',
  config: {
    type: 'SelectControl',
    label: t('Font Family'),
    description: t('Choose a font family. "Theme" uses the application default.'),
    clearable: false,
    default: 'inherit',
    options: fonts,
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitleFontSize: ControlSetItem = {
  name: 'xAxisTitleFontSize',
  config: {
    type: 'SliderControl',
    label: t('Font Size'),
    description: t('Adjust the font size of axis labels.'),
    default: 12,
    min: 8,
    max: 32,
    step: 1,
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const xAxisTitleFontStyle: ControlSetItem = {
  name: 'xAxisTitleFontStyle',
  config: {
    type: 'SelectControl',
    label: t('Font Style / Weight'),
    description: t('Choose text style or weight.'),
    // Two labeled groups: Style and Weight
    options: [
      {
        label: t('Style'),
        options: [
          { value: 'normal', label: t('Normal') },
          { value: 'italic', label: t('Italic') },
          { value: 'oblique', label: t('Oblique') },
          { value: 'lighter', label: t('Lighter') },
          { value: 'bold', label: t('Bold') },
          { value: 'bolder', label: t('Bolder') },
        ],
      },
      {
        label: t('Weight'),
        options: [

          { value: '400', label: t('400') },
          { value: '500', label: t('500') },
          { value: '600', label: t('600') },
          { value: '700', label: t('700') },
          { value: '800', label: t('800') },
          { value: '900', label: t('900') },
        ],
      },
    ],
    default: 'normal',
    clearable: false,
    sortComparator: (a: { label: string; value: any }, b: { label: string; value: any }) => 0,
    visibility: ({ controls }: ControlPanelsContainerProps) => titleVisible(controls),
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};


export const xAxisRotate: ControlSetItem = {
  name: 'xAxisRotate',
  config: {
    type: 'SliderControl',
    label: t('Label Rotation'),
    description: t('Rotate X-axis labels to reduce overlap.'),
    default: 0,
    min: -180,
    max: 180,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisInterval: ControlSetItem = {
  name: 'xAxisInterval',
  config: {
    type: 'SliderControl',
    label: t('Label Interval'),
    description: t('Set interval of displayed labels; 0 shows all.'),
    default: 0,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisShowMinLabel: ControlSetItem = {
  name: 'xAxisShowMinLabel',
  config: {
    type: 'CheckboxControl',
    label: t('Show Min Label'),
    description: t('Always display the first label on the axis.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisShowMaxLabel: ControlSetItem = {
  name: 'xAxisShowMaxLabel',
  config: {
    type: 'CheckboxControl',
    label: t('Show Max Label'),
    description: t('Always display the last label on the axis.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisPosition: ControlSetItem = {
  name: 'xAxisPosition',
  config: {
    type: 'RadioButtonControl',
    label: t('Position'),
    description: t('Position the X-axis at the top or bottom.'),
    options: [
      ['bottom', t('Bottom')]  ,
      ['top',  t('Top')] ,
    ],
    default: 'bottom',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisSplitLineEnabled: ControlSetItem = {
  name: 'xAxisSplitLineEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Show Split Lines'),
    description: t('Toggle display of split lines on the X-axis.'),
    default: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisSplitLineColor: ControlSetItem = {
  name: 'xAxisSplitLineColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Split Line Color'),
    description: t('Choose a color for X-axis split lines.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.xAxisSplitLineEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const xAxisSplitLineType: ControlSetItem = {
  name: 'xAxisSplitLineType',
  config: {
    type: 'RadioButtonControl',
    label: t('Split Line Type'),
    description: t('Set split line style to solid, dashed, or dotted.'),
    options: [
      ['solid',  t('Solid') ] ,
      ['dashed',  t('Dashed')]  ,
       ['dotted',  t('Dotted')] ,
    ],
    default: 'solid',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.xAxisSplitLineEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
