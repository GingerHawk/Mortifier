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

const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.axisCommonControls?.value;

export const axisCommonEnabled: ControlSetItem = {
  name: 'axisCommonEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisCommonControls: ControlSetItem = {
  name: 'axisCommonControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

// Axis Line
export const axisLineEnabled: ControlSetItem = {
  name: 'axisLineEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Show Axis Line'),
    description: t('Toggle display of the axis line.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisLineColor: ControlSetItem = {
  name: 'axisLineColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Line Color'),
    description: t('Set the color of the axis line.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisLineWidth: ControlSetItem = {
  name: 'axisLineWidth',
  config: {
    type: 'SliderControl',
    label: t('Line Width'),
    description: t('Adjust the axis line thickness.'),
    default: 1,
    min: 0,
    max: 10,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

// Axis Labels
export const axisLabelEnabled: ControlSetItem = {
  name: 'axisLabelEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Show Labels'),
    description: t('Toggle display of axis labels.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisLabelColor: ControlSetItem = {
  name: 'axisLabelColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Label Color'),
    description: t('Set the color of the axis labels.'),
    default: defColor1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisLabelFontFamily: ControlSetItem = {
  name: 'axisLabelFontFamily',
  config: {
    type: 'SelectControl',
    label: t('Font Family'),
    description: t('Choose a font family. "Theme" uses the application default.'),
    clearable: false,
    default: 'inherit',
    options: fonts,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisLabelFontSize: ControlSetItem = {
  name: 'axisLabelFontSize',
  config: {
    type: 'SliderControl',
    label: t('Font Size'),
    description: t('Adjust the font size of axis labels.'),
    default: 12,
    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const axisLabelFontStyle: ControlSetItem = {
  name: 'axisLabelFontStyle',
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
    renderTrigger: true,
    sortComparator: (a: { label: string; value: any }, b: { label: string; value: any }) => 0,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
