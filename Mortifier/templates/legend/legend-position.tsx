import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

const controlsVisible = (controls: ControlStateMapping) => !!controls?.legendPositionControls?.value;

export const legendPositionEnabled: ControlSetItem = {
  name: 'legendPositionEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const legendPositionControls: ControlSetItem = {
  name: 'legendPositionControls',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    default: false,
    renderTrigger: true,
    disableStash: true,
    resetOnHide: false},
};

export const legendPositionLayout: ControlSetItem = {
  name: 'legendPositionLayout',
  config: {
    type: 'RadioButtonControl',
    label: t('Layout'),
    description: t('Arrange legend items horizontally or vertically.'),
    options: [
      ['horizontal', t('Horizontal')],
      ['vertical', t('Vertical')],
    ],
    default: 'horizontal',
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendPositionAlign: ControlSetItem = {
  name: 'legendPositionAlign',
  config: {
    type: 'SelectControl',
    label: t('Align'),
    description: t('Set horizontal alignment of the legend.'),
    options: [
      { value: 'left', label: t('Left') },
      { value: 'center', label: t('Center') },
      { value: 'right', label: t('Right') },
    ],
    default: 'right',
    clearable: false,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendPositionTopOffset: ControlSetItem = {
  name: 'legendPositionTopOffset',
  config: {
    type: 'SliderControl',
    label: t('Y Offset (px)'),
    description: t('Distance from the chart’s top margin.'),
    default: 0,
    min: 0,
    max: 600,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendPositionSideOffset: ControlSetItem = {
  name: 'legendPositionSideOffset',
  config: {
    type: 'SliderControl',
    label: t('X Offset (px)'),
    description: t('Distance from side margin (px) when not centered.'),
    default: 0,
    min: 0,
    max: 600,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendPositionItemGap: ControlSetItem = {
  name: 'legendPositionItemGap',
  config: {
    type: 'SliderControl',
    label: t('Item Gap (px)'),
    description: t('Set spacing between legend items.'),
    default: 10,
    min: 0,
    max: 50,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const legendPositionPadding: ControlSetItem = {
  name: 'legendPositionPadding',
  config: {
    type: 'SliderControl',
    label: t('Padding (px)'),
    description: t('Set inner padding inside the legend box (px).'),
    default: 5,
    min: 0,
    max: 40,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) => controlsVisible(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export default {};
