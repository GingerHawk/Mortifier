import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';
import { defColor1 } from '../../common/colors';



export const pieHoverEnabled: ControlSetItem = {
  name: 'pieHoverEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};



export const pieHoverColor: ControlSetItem = {
  name: 'pieHoverColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Hover Color'),
    description: t('Color of the slice on hover.'),
    default: defColor1,
    renderTrigger: true,

    disableStash: true,
    resetOnHide: false,
  },
};

export const pieHoverBorderColor: ControlSetItem = {
  name: 'pieHoverBorderColor',
  config: {
    type: 'ColorPickerControl',
    label: t('Hover Border Color'),
    description: t('Border color of the slice on hover.'),
    default: defColor1,
    renderTrigger: true,

    disableStash: true,
    resetOnHide: false,
  },
};

export const pieHoverBorderWidth: ControlSetItem = {
  name: 'pieHoverBorderWidth',
  config: {
    type: 'SliderControl',
    label: t('Hover Border Width'),
    default: 1,
    min: 0,
    max: 12,
    step: 1,
    renderTrigger: true,

    disableStash: true,
    resetOnHide: false,
  },
};

export const pieHoverOffset: ControlSetItem = {
  name: 'pieHoverOffset',
  config: {
    type: 'SliderControl',
    label: t('Explode Offset'),
    description: t('Offset in pixels for the slice on hover.'),
    default: 5,
    min: 0,
    max: 30,
    step: 1,
    renderTrigger: true,

    disableStash: true,
    resetOnHide: false,
  },
};
