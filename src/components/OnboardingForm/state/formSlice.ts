import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { WIZARD_LAST_STEP_INDEX } from '../wizard/wizardStepMeta';
import type { OnboardingFormData } from './types';

interface OnboardingFormState {
  currentStep: number
  formData: Partial<OnboardingFormData>
  isSubmissionSuccess: boolean
}

const initialState: OnboardingFormState = {
  currentStep: 0,
  formData: {},
  isSubmissionSuccess: false,
};

const MIN_STEP = 0;

const formSlice = createSlice({
  name: 'onboardingForm',
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<Partial<OnboardingFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
      state.currentStep = Math.min(state.currentStep + 1, WIZARD_LAST_STEP_INDEX);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, MIN_STEP);
    },
    completeSubmission: (state) => {
      state.isSubmissionSuccess = true;
    },
    resetForm: () => initialState,
  },
});

export const { nextStep, prevStep, completeSubmission, resetForm } = formSlice.actions;
export default formSlice.reducer;
