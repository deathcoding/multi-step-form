import type { Step1Data } from '@/components/OnboardingForm/steps/Step1Personal/schema';
import type { Step2Data } from '@/components/OnboardingForm/steps/Step2Role/schema';
import type { Step3Data } from '@/components/OnboardingForm/steps/Step3Equipment/schema';
import type { Step4Data } from '@/components/OnboardingForm/steps/Step4Comments/schema';

export type { Step1Data, Step2Data, Step3Data, Step4Data };

export type OnboardingFormData = Step1Data & Step2Data & Step3Data & Step4Data;
