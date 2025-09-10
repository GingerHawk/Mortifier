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
const controlsVisible = (controls: ControlStateMapping) => !!controls?.yAxisControls?.value;
const titleVisible = (controls: ControlStateMapping) => !!controls?.yAxisTitleControls?.value;

export const yAxisEnabled: ControlSetItem = {
  name: 'yAxisEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const yAxisControls: ControlSetItem = {
  name: 'yAxisControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false
  },
};

export const yAxisTitleControls: ControlSetItem = {
  name: 'yAxisTitleControls',
  config: {
    type: 'CheckboxControl',
    label: t('Title Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const yAxisTitleText: ControlSetItem = {
  name: 'yAxisTitleText',
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

export const yAxisTitlePosition: ControlSetItem = {
  name: 'yAxisTitlePosition',
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

export const yAxisTitleOffsetX: ControlSetItem = {
  name: 'yAxisTitleOffsetX',
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

export const yAxisTitleOffsetY: ControlSetItem = {
  name: 'yAxisTitleOffsetY',
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

export const yAxisTitleColor: ControlSetItem = {
  name: 'yAxisTitleColor',
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

export const yAxisTitleFontFamily: ControlSetItem = {
  name: 'yAxisTitleFontFamily',
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

export const yAxisTitleFontSize: ControlSetItem = {
  name: 'yAxisTitleFontSize',
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

export const yAxisTitleFontStyle: ControlSetItem = {
  name: 'yAxisTitleFontStyle',
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


export const yAxisMin: ControlSetItem = {
  name: 'yAxisMin',
  config: {
    type: 'TextControl',
    label: t('Min Value'),
    description: t('Set minimum Y-axis value; leave blank for auto.'),
    default: null,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const yAxisMax: ControlSetItem = {
  name: 'yAxisMax',
  config: {
    type: 'TextControl',
    label: t('Max Value'),
    description: t('Set maximum Y-axis value; leave blank for auto.'),
    default: null,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const yAxisPosition: ControlSetItem = {
  name: 'yAxisPosition',
  config: {
    type: 'RadioButtonControl',
    label: t('Position'),
    description: t('Position the Y-axis on the left or right.'),
    options: [
       ['left',  t('Left')] ,
       ['right',  t('Right')] ,
    ],
    default: 'left',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const yAxisSplitLineEnabled: ControlSetItem = {
  name: 'yAxisSplitLineEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Show Split Lines'),
    description: t('Toggle display of split lines on the Y-axis.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const yAxisSplitLineColor: ControlSetItem = {
  name: 'yAxisSplitLineColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Split Line Color'),
    description: t('Choose a color for Y-axis split lines.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.yAxisSplitLineEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const yAxisSplitLineType: ControlSetItem = {
  name: 'yAxisSplitLineType',
  config: {
    type: 'RadioButtonControl',
    label: t('Split Line Type'),
    description: t('Set split line style to solid, dashed, or dotted.'),
    options: [
      [ 'solid', t('Solid') ],
      [ 'dashed', t('Dashed')] ,
      [ 'dotted', t('Dotted')] ,
    ],
    default: 'solid',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.yAxisSplitLineEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const yAxisLineWidth: ControlSetItem = {
  name: 'yAxisLineWidth',
  config: {
    type: 'SliderControl',
    label: t('Line Width'),
    description: t('Adjust the Y-axis line thickness in pixels.'),
    default: 1,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      !!controls?.yAxisSplitLineEnabled?.value && controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export default {};
