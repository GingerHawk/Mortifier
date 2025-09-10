import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

const controlsVisible = (controls: ControlStateMapping) =>
  !!controls?.gridControls?.value;

export const gridEnabled: ControlSetItem = {
  name: 'gridEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const gridControls: ControlSetItem = {
  name: 'gridControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),

    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const gridContainLabel: ControlSetItem = {
  name: 'gridContainLabel',
  config: {
    type: 'CheckboxControl',
    label: t('Contain Labels'),
    description: t('Keep axis labels contained within the grid area.'),
    default: true,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridX: ControlSetItem = {
  name: 'gridX',
  config: {
    type: 'SliderControl',
    label: t('X (px)'),
    description: t('Distance of the grid from the left edge (px).'),
    default: 80,
    min: 0,
    max: 500,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridY: ControlSetItem = {
  name: 'gridY',
  config: {
    type: 'SliderControl',
    label: t('Y (px)'),
    description: t('Distance of the grid from the top edge (px).'),
    default: 60,
    min: 0,
    max: 500,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridWidthPct: ControlSetItem = {
  name: 'gridWidthPct',
  config: {
    type: 'SliderControl',
    label: t('Width (%)'),
    description: t('Set grid width as a percentage of the canvas.'),
    default: 90,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const gridHeightPct: ControlSetItem = {
  name: 'gridHeightPct',
  config: {
    type: 'SliderControl',
    label: t('Height (%)'),
    description: t('Set grid height as a percentage of the canvas.'),
    default: 90,
    min: 0,
    max: 100,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
