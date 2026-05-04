import type { ComponentType } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import Step1Personal from './steps/Step1Personal'
import Step2Role from './steps/Step2Role'
import Step3Equipment from './steps/Step3Equipment'
import Step4Comments from './steps/Step4Comments'
import Step5Summary from './steps/Step5Summary'

interface StepDefinition {
  title: string
  component: ComponentType
}

const steps: StepDefinition[] = [
  { title: 'Личные данные', component: Step1Personal },
  { title: 'Роль', component: Step2Role },
  { title: 'Оборудование', component: Step3Equipment },
  { title: 'Комментарии', component: Step4Comments },
  { title: 'Сводка', component: Step5Summary },
]

interface ProgressBarProps {
  currentStep: number
}

function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div>
      {steps.map((step, index) => (
        <div key={step.title}>
          {index === currentStep ? '> ' : ''}
          {step.title}
          {index === currentStep ? ' [Активен]' : ''}
        </div>
      ))}
    </div>
  )
}

function MultiStepWizard() {
  const currentStep = useSelector((state: RootState) => state.onboardingForm.currentStep)
  const safeStepIndex = currentStep >= 0 && currentStep < steps.length ? currentStep : 0
  const ActiveStep = steps[safeStepIndex].component

  return (
    <div>
      <h1>Onboarding Wizard</h1>
      <ProgressBar currentStep={safeStepIndex} />
      <div>
        <ActiveStep />
      </div>
    </div>
  )
}

export default MultiStepWizard
