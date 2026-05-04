/** Wizard step titles only — keep step components list in stepsConfig in the same order. */
export const wizardStepMeta = [
  { title: 'Личные данные', shortLabel: 'Личные' },
  { title: 'Роль', shortLabel: 'Роль' },
  { title: 'Оборудование', shortLabel: 'Оборудование' },
  { title: 'Комментарии', shortLabel: 'Детали' },
  { title: 'Сводка', shortLabel: 'Сводка' },
] as const;

export const WIZARD_LAST_STEP_INDEX = wizardStepMeta.length - 1;
