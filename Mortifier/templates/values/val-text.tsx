import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

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

const controlsVisible = (c: ControlStateMapping) => Boolean(c?.valTextStyleControls?.value);

export const valTextStyleEnabled: ControlSetItem = {
  name: 'valTextStyleEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextStyleControls: ControlSetItem = {
  name: 'valTextStyleControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const valTextCurrentSeries: ControlSetItem = {
  name: 'valTextCurrentSeries',
  config: {
    type: 'SelectControl',
    label: t('Configure Series'),
    description: t('Select which series to configure'),
    renderTrigger: true,
    default: 'all',
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
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const valTextColor1: ControlSetItem = {
  name: 'valTextColor1',
  config: {
    type: 'ColorPickerControl',
    label: t('Text Color (Series 1)'),
    description: t('Set the text color of value labels.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valTextFontFamily1: ControlSetItem = {
  name: 'valTextFontFamily1',
  config: {
    type: 'SelectControl',
    label: t('Font Family (Series 1)'),
    description: t('Choose the font family for value text.'),
    options: fonts,
    default: 'inherit',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontSize1: ControlSetItem = {
  name: 'valTextFontSize1',
  config: {
    type: 'SliderControl',
    label: t('Font Size (Series 1)'),
    description: t('Adjust font size (px).'),
    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valTextFontStyle1: ControlSetItem = {
  name: 'valTextFontStyle1',
  config: {
    type: 'SelectControl',
    label: t('Font Style (Series 1)'),
    description: t('Choose text style or weight'),
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
        visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 1,
        disableStash: true,
    resetOnHide: false,
  },
};
export const valTextColor3: ControlSetItem = {
  name: 'valTextColor3',
  config: {
    type: 'ColorPickerControl',
    label: t('Text Color (Series 3)'),
    description: t('Set the text color of value labels.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valNumberFormat3: ControlSetItem = {
  name: 'valNumberFormat3',
  config: {
    type: 'SelectControl',
    label: t('Number Format (Series 3)'),
    description: t('Choose an optional number format.'),
    options: [
      { value: '',       label: t('Auto (raw)') },
      { value: '0',      label: t('0 → e.g., 0') },
      { value: '0.0',    label: t('0.0 → e.g., 0.0') },
      { value: '0.00',   label: t('0.00 → e.g., 0.00') },
      { value: '0.000',  label: t('0.000 → e.g., 0.000') },
      { value: '0%',     label: t('0% → e.g., 0%') },
      { value: '0.0%',   label: t('0.0% → e.g., 0.0%') },
      { value: '0.00%',  label: t('0.00% → e.g., 0.00%') },
    ],
    default: '',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontFamily3: ControlSetItem = {
  name: 'valTextFontFamily3',
  config: {
    type: 'SelectControl',
    label: t('Font Family (Series 3)'),
    description: t('Choose the font family for value text.'),
    options: fonts,
    default: 'inherit',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontSize3: ControlSetItem = {
  name: 'valTextFontSize3',
  config: {
    type: 'SliderControl',
    label: t('Font Size (Series 3)'),
    description: t('Adjust font size (px).'),
    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valTextFontStyle3: ControlSetItem = {
  name: 'valTextFontStyle3',
  config: {
    type: 'SelectControl',
    label: t('Font Style (Series 3)'),
    description: t('Choose text style or weight'),
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
        visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 3,
        disableStash: true,
    resetOnHide: false,
  },
};
    export const valTextColor2: ControlSetItem = {
  name: 'valTextColor2',
  config: {
    type: 'ColorPickerControl',
    label: t('Text Color (Series 2)'),
    description: t('Set the text color of value labels.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valNumberFormat2: ControlSetItem = {
  name: 'valNumberFormat2',
  config: {
    type: 'SelectControl',
    label: t('Number Format (Series 2)'),
    description: t('Choose an optional number format.'),
    options: [
      { value: '',       label: t('Auto (raw)') },
      { value: '0',      label: t('0 → e.g., 0') },
      { value: '0.0',    label: t('0.0 → e.g., 0.0') },
      { value: '0.00',   label: t('0.00 → e.g., 0.00') },
      { value: '0.000',  label: t('0.000 → e.g., 0.000') },
      { value: '0%',     label: t('0% → e.g., 0%') },
      { value: '0.0%',   label: t('0.0% → e.g., 0.0%') },
      { value: '0.00%',  label: t('0.00% → e.g., 0.00%') },
    ],
    default: '',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontFamily2: ControlSetItem = {
  name: 'valTextFontFamily2',
  config: {
    type: 'SelectControl',
    label: t('Font Family (Series 2)'),
    description: t('Choose the font family for value text.'),
    options: fonts,
    default: 'inherit',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontSize2: ControlSetItem = {
  name: 'valTextFontSize2',
  config: {
    type: 'SliderControl',
    label: t('Font Size (Series 2)'),
    description: t('Adjust font size (px).'),
    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const valTextFontStyle2: ControlSetItem = {
  name: 'valTextFontStyle2',
  config: {
    type: 'SelectControl',
    label: t('Font Style (Series 2)'),
    description: t('Choose text style or weight'),
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
        visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 2,
        disableStash: true,
    resetOnHide: false,
  },
};
    export const valTextColorAll: ControlSetItem = {
  name: 'valTextColorAll',
  config: {
    type: 'ColorPickerControl',
    label: t('Text Color - Series All'),
    description: t('Set the text color of value labels.'),
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const valPrefixAll: ControlSetItem = {
  name: 'valPrefixAll',
  config: {
    type: 'TextControl',
    label: t('Prefix - All Series'),
    description: t('Text to add before the number (e.g., "$", "€")'),
    default: '',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const valSuffixAll: ControlSetItem = {
  name: 'valSuffixAll',
  config: {
    type: 'TextControl',
    label: t('Suffix - All Series'),
    description: t('Text to add after the number (e.g., "%", "USD")'),
    default: '',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontFamilyAll: ControlSetItem = {
  name: 'valTextFontFamilyAll',
  config: {
    type: 'SelectControl',
    label: t('Font Family - Series All'),
    description: t('Choose the font family for value text.'),
    options: fonts,
    default: 'inherit',
    clearable: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};
export const valTextFontSizeAll: ControlSetItem = {
  name: 'valTextFontSizeAll',
  config: {
    type: 'SliderControl',
    label: t('Font Size - Series All'),
    description: t('Adjust font size (px).'),

    min: 8,
    max: 32,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const valTextFontStyleAll: ControlSetItem = {
  name: 'valTextFontStyleAll',
  config: {
    type: 'SelectControl',
    label: t('Font Style - Series All'),
    description: t('Choose text style or weight'),
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
        visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls) && controls?.valTextCurrentSeries?.value === 'all',
        disableStash: true,
    resetOnHide: false,
  },
};

export default {};

