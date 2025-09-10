import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.pieControls?.value;

export const pieEnabled: ControlSetItem = {
  name: 'pieEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieControls: ControlSetItem = {
  name: 'pieControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieRadius: ControlSetItem = {
  name: 'pieRadius',
  config: {
    type: 'SliderControl',
    label: t('Radius (%)'),
    description: t('Size of the pie chart as a percentage of the container.'),
    default: 50,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieInnerRadius: ControlSetItem = {
  name: 'pieInnerRadius',
  config: {
    type: 'SliderControl',
    label: t('Inner Radius (%)'),
    description: t('Inner radius for a doughnut chart.'),
    default: 0,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieStartAngle: ControlSetItem = {
  name: 'pieStartAngle',
  config: {
    type: 'SliderControl',
    label: t('Start Angle (°C)'),
    description: t('Starting angle for the first pie slice.'),
    default: 90,
    min: 0,
    max: 360,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const pieRoseType: ControlSetItem = {
  name: 'pieRoseType',
  config: {
    type: 'SelectControl',
    label: t('Rose Type'),
    description: t('The type of rose chart. Empty to disable.'),
    options: [
      { value: null, label: t('None') },
      { value: 'radius', label: t('Radius') },
      { value: 'area', label: t('Area') },
    ],
    default: null,
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const piePadAngle: ControlSetItem = {
  name: 'piePadAngle',
  config: {
    type: 'SliderControl',
    label: t('Pad Angle (°C)'),
    description: t('Padding angle between each pie slice.'),
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

export default {};
