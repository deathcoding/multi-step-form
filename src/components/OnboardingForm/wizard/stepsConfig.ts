import type { ComponentType } from 'react';
import { Step1Personal } from '../steps/Step1Personal';
import { Step2Role } from '../steps/Step2Role';
import { Step3Equipment } from '../steps/Step3Equipment';
import { Step4Comments } from '../steps/Step4Comments';
import { Step5Summary } from '../steps/Step5Summary';
import { wizardStepMeta } from './wizardStepMeta';

const stepComponents: ComponentType[] = [
  Step1Personal,
  Step2Role,
  Step3Equipment,
  Step4Comments,
  Step5Summary,
];

if (stepComponents.length !== wizardStepMeta.length) {
  throw new Error('wizardStepMeta and stepComponents length mismatch');
}

export interface WizardStepDefinition {
  title: string;
  shortLabel: string;
  component: ComponentType;
}

export const wizardSteps: WizardStepDefinition[] = wizardStepMeta.map((meta, index) => ({
  title: meta.title,
  shortLabel: meta.shortLabel,
  component: stepComponents[index],
}));
