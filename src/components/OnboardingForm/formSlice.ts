import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OnboardingFormData } from './schemas'

interface OnboardingFormState {
  currentStep: number
  formData: Partial<OnboardingFormData>
}

const initialState: OnboardingFormState = {
  currentStep: 0,
  formData: {},
}

const MAX_STEP = 4
const MIN_STEP = 0

const formSlice = createSlice({
  name: 'onboardingForm',
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<Partial<OnboardingFormData>>) => {
      state.formData = { ...state.formData, ...action.payload }
      state.currentStep = Math.min(state.currentStep + 1, MAX_STEP)
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, MIN_STEP)
    },
    resetForm: () => initialState,
  },
})

export const { nextStep, prevStep, resetForm } = formSlice.actions
export default formSlice.reducer
