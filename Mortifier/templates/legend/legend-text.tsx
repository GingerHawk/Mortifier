import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor3 } from '../../common/colors';
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


export const legendTextStyleEnabled: ControlSetItem = {
  name: 'legendTextStyleEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const legendTextStyleControls: ControlSetItem = {
  name: 'legendTextStyleControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const legendTextColor: ControlSetItem = {
  name: 'legendTextColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Text Color'),
    description: t('Set the text color for legend labels.'),
    default: defColor3,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
    visibility: ({ controls }: ControlPanelsContainerProps) =>!!controls?.legendTextStyleControls?.value
  },
};

export const legendTextFontFamily: ControlSetItem = {
  name: 'legendTextFontFamily',
  config: {
    type: 'SelectControl',
    label: t('Font Family'),
    description: t('Choose the font family for legend text.'),
    options: fonts,
    default: 'inherit',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>!!controls?.legendTextStyleControls?.value,

    disableStash: true,
    resetOnHide: false,
  },
};

export const legendTextFontSize: ControlSetItem = {
  name: 'legendTextFontSize',
  config: {
    type: 'SliderControl',
    label: t('Font Size'),
    description: t('Adjust font size of legend labels.'),
    default: 12,
    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>!!controls?.legendTextStyleControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendTextFontStyle: ControlSetItem = {
  name: 'legendTextFontStyle',
  config: {
    type: 'SelectControl',
    label: t('Font Style'),
    description: t('Choose normal, italic, or oblique style for text.'),
    options: [
      { value: 'normal', label: t('Normal') },
      { value: 'italic', label: t('Italic') },
      { value: 'oblique', label: t('Oblique') },
    ],
    default: 'normal',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>!!controls?.legendTextStyleControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendTextFontWeight: ControlSetItem = {
  name: 'legendTextFontWeight',
  config: {
    type: 'SelectControl',
    label: t('Font Weight'),
    description: t('Set the weight or boldness of legend text.'),
    options: [
      { value: 'normal', label: t('Normal') },
      { value: 'bold', label: t('Bold') },
      { value: 'bolder', label: t('Bolder') },
      { value: 'lighter', label: t('Lighter') },
      { value: '400', label: t('400') },
      { value: '500', label: t('500') },
      { value: '600', label: t('600') },
      { value: '700', label: t('700') },
      { value: '800', label: t('800') },
      { value: '900', label: t('900') },
    ],
    default: 'normal',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>!!controls?.legendTextStyleControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendTextLineHeight: ControlSetItem = {
  name: 'legendTextLineHeight',
  config: {
    type: 'SliderControl',
    label: t('Line Height'),
    description: t('Adjust line height of legend text in pixels.'),
    default: 16,
    min: 8,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>!!controls?.legendTextStyleControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
