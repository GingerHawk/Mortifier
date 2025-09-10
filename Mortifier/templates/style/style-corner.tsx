
import { t } from '@superset-ui/core';
import {
  ControlPanelsContainerProps,
  ControlSetItem,
  ControlStateMapping,
} from '@superset-ui/chart-controls';

const show = (c: ControlStateMapping) => Boolean(c?.styleCornerShow?.value);
const advShow1 = (c: ControlStateMapping) => Boolean(c?.styleCornerAdvanced1?.value);
const advShow2 = (c: ControlStateMapping) => Boolean(c?.styleCornerAdvanced2?.value);
const advShow3 = (c: ControlStateMapping) => Boolean(c?.styleCornerAdvanced3?.value);
const advShowAll = (c: ControlStateMapping) => Boolean(c?.styleCornerAdvancedAll?.value);

export const styleCornerShow: ControlSetItem = {
  name: 'styleCornerShow',
  config: {
    type: 'CheckboxControl',
    label: t('Controls'),
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornersEnabled: ControlSetItem = {
  name: 'styleCornersEnabled',
  config: {
    type: 'CheckboxControl',
    label: t('Apply'),
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleCornerCurrentSeries: ControlSetItem = {
  name: 'styleCornerCurrentSeries',
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
    visibility: ({ controls }: ControlPanelsContainerProps) => show(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleCornerTop1: ControlSetItem = {
  name: 'styleCornerTop1',
  config: {
    type: 'SliderControl',
    label: t('Top Corners'),
    description: t('Set a single radius for top corners (when vertical).'),
    default: 10,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBottom1: ControlSetItem = {
  name: 'styleCornerBottom1',
  config: {
    type: 'SliderControl',
    label: t('Bottom Corners'),
    description: t('Set a single radius for bottom corners (when vertical).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerAdvanced1: ControlSetItem = {
  name: 'styleCornerAdvanced1',
   config: {
    type: 'CheckboxControl',
    label: t('Indv Corner Control'),
    description: t('Open up controls for each corners radius'),
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1,
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTl1: ControlSetItem = {
  name: 'styleCornerTl1',
  config: {
    type: 'SliderControl',
    label: t('Top-Left'),
    description: t('Radius of the top-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1 && advShow1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTr1: ControlSetItem = {
  name: 'styleCornerTr1',
  config: {
    type: 'SliderControl',
    label: t('Top-Right'),
    description: t('Radius of the top-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1 && advShow1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBr1: ControlSetItem = {
  name: 'styleCornerBr1',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Right'),
    description: t('Radius of the bottom-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1 && advShow1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBl1: ControlSetItem = {
  name: 'styleCornerBl1',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Left'),
    description: t('Radius of the bottom-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 1 && advShow1(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleCornerTop2: ControlSetItem = {
  name: 'styleCornerTop2',
  config: {
    type: 'SliderControl',
    label: t('Top Corners'),
    description: t('Set a single radius for top corners (when vertical).'),
    default: 10,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBottom2: ControlSetItem = {
  name: 'styleCornerBottom2',
  config: {
    type: 'SliderControl',
    label: t('Bottom Corners'),
    description: t('Set a single radius for bottom corners (when vertical).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerAdvanced2: ControlSetItem = {
  name: 'styleCornerAdvanced2',
   config: {
    type: 'CheckboxControl',
    label: t('Indv Corner Control'),
    description: t('Open up controls for each corners radius'),
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2,
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTl2: ControlSetItem = {
  name: 'styleCornerTl2',
  config: {
    type: 'SliderControl',
    label: t('Top-Left'),
    description: t('Radius of the top-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2 && advShow2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTr2: ControlSetItem = {
  name: 'styleCornerTr2',
  config: {
    type: 'SliderControl',
    label: t('Top-Right'),
    description: t('Radius of the top-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2 && advShow2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBr2: ControlSetItem = {
  name: 'styleCornerBr2',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Right'),
    description: t('Radius of the bottom-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2 && advShow2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBl2: ControlSetItem = {
  name: 'styleCornerBl2',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Left'),
    description: t('Radius of the bottom-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 2 && advShow2(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleCornerTop3: ControlSetItem = {
  name: 'styleCornerTop3',
  config: {
    type: 'SliderControl',
    label: t('Top Corners'),
    description: t('Set a single radius for top corners (when vertical).'),
    default: 10,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBottom3: ControlSetItem = {
  name: 'styleCornerBottom3',
  config: {
    type: 'SliderControl',
    label: t('Bottom Corners'),
    description: t('Set a single radius for bottom corners (when vertical).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerAdvanced3: ControlSetItem = {
  name: 'styleCornerAdvanced3',
   config: {
    type: 'CheckboxControl',
    label: t('Indv Corner Control'),
    description: t('Open up controls for each corners radius'),
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3,
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTl3: ControlSetItem = {
  name: 'styleCornerTl3',
  config: {
    type: 'SliderControl',
    label: t('Top-Left'),
    description: t('Radius of the top-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3 && advShow3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTr3: ControlSetItem = {
  name: 'styleCornerTr3',
  config: {
    type: 'SliderControl',
    label: t('Top-Right'),
    description: t('Radius of the top-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3 && advShow3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBr3: ControlSetItem = {
  name: 'styleCornerBr3',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Right'),
    description: t('Radius of the bottom-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3 && advShow3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBl3: ControlSetItem = {
  name: 'styleCornerBl3',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Left'),
    description: t('Radius of the bottom-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 3 && advShow3(controls),
    disableStash: true,
    resetOnHide: false,
  },
};
export const styleCornerTopAll: ControlSetItem = {
  name: 'styleCornerTopAll',
  config: {
    type: 'SliderControl',
    label: t('Top Corners'),
    description: t('Set a single radius for top corners (when vertical).'),
    default: 10,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBottomAll: ControlSetItem = {
  name: 'styleCornerBottomAll',
  config: {
    type: 'SliderControl',
    label: t('Bottom Corners'),
    description: t('Set a single radius for bottom corners (when vertical).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all',
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerAdvancedAll: ControlSetItem = {
  name: 'styleCornerAdvancedAll',
   config: {
    type: 'CheckboxControl',
    label: t('Indv Corner Control'),
    description: t('Open up controls for each corners radius'),
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all',
    renderTrigger: true,
    default: false,
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTlAll: ControlSetItem = {
  name: 'styleCornerTlAll',
  config: {
    type: 'SliderControl',
    label: t('Top-Left'),
    description: t('Radius of the top-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all' && advShowAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerTrAll: ControlSetItem = {
  name: 'styleCornerTrAll',
  config: {
    type: 'SliderControl',
    label: t('Top-Right'),
    description: t('Radius of the top-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all' && advShowAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBrAll: ControlSetItem = {
  name: 'styleCornerBrAll',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Right'),
    description: t('Radius of the bottom-right corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all' && advShowAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};

export const styleCornerBlAll: ControlSetItem = {
  name: 'styleCornerBlAll',
  config: {
    type: 'SliderControl',
    label: t('Bottom-Left'),
    description: t('Radius of the bottom-left corner (px).'),
    default: 0,
    min: 0,
    max: 48,
    step: 1,
    renderTrigger: true,
    visibility: ({ controls }: ControlPanelsContainerProps) =>
    show(controls) && controls?.styleCornerCurrentSeries?.value === 'all' && advShowAll(controls),
    disableStash: true,
    resetOnHide: false,
  },
};