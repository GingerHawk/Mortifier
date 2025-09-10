import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor3_1 } from '../../common/colors';
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
  !!controls?.tooltipTextControls?.value;

export const tooltipTextEnabled: ControlSetItem = {
  name: 'tooltipTextEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipTextControls: ControlSetItem = {
  name: 'tooltipTextControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

// Text style controls for the tooltip
export const tooltipTextColor: ControlSetItem = {
  name: 'tooltipTextColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Text Color'),
    description: t('Set the text color for tooltip content.'),
    default: defColor3_1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipTextFontFamily = {
  name: 'tooltipTextFontFamily',
  config: {
    type: 'SelectControl',
    label: t('Font Family'),
    description: t('Choose the font family for tooltip text.'),
    options: fonts,
    default: 'inherit',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }) => !!controls?.tooltipTextControls?.value,
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipTextFontSize: ControlSetItem = {
  name: 'tooltipTextFontSize',
  config: {
    type: 'SliderControl',
    label: t('Font Size'),
    description: t('Adjust font size (px).'),
    default: 16,
    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const tooltipTextFontStyle: ControlSetItem = {
  name: 'tooltipTextFontStyle',
  config: {
    type: 'SelectControl',
    label: t('Font Style'),
    description: t('Choose text style: normal, italic, or oblique.'),
    choices: [
      ['normal', t('Normal')],
      ['lighter', t('Lighter')],
      ['italic', t('Italic')],
      ['oblique', t('Oblique')],
      ['bold', t('Bold')],
      ['bolder', t('Bolder')],
      ['400', t('400')],
      ['500', t('500')],
      ['600', t('600')],
      ['700', t('700')],
      ['800', t('800')],
      ['900', t('900')],
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



export const tooltipTextLineHeight: ControlSetItem = {
  name: 'tooltipTextLineHeight',
  config: {
    type: 'SliderControl',
    label: t('Line Height'),
    description: t('Adjust line height of tooltip text (px).'),
    default: 20,
    min: 8,
    max: 64,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
