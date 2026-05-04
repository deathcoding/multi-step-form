import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import SubmissionSuccess from './SubmissionSuccess';
import { WizardProgress } from './WizardProgress';
import { wizardSteps } from './stepsConfig';

function MultiStepWizard() {
  const currentStep = useSelector(
    (state: RootState) => state.onboardingForm.currentStep,
  );
  const isSubmissionSuccess = useSelector(
    (state: RootState) => state.onboardingForm.isSubmissionSuccess ?? false,
  );

  const safeStepIndex =
    currentStep >= 0 && currentStep < wizardSteps.length ? currentStep : 0;
  const ActiveStep = wizardSteps[safeStepIndex].component;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Onboarding Wizard
        </h1>
        {isSubmissionSuccess ? (
          <>
            <p className="mb-8 text-sm text-slate-500 sm:text-base">
              Спасибо за заполнение анкеты.
            </p>
            <SubmissionSuccess />
          </>
        ) : (
          <>
            <p className="mb-8 text-sm text-slate-500 sm:text-base">
              Заполните форму по шагам, чтобы отправить заявку на onboarding.
            </p>
            <WizardProgress currentStep={safeStepIndex} />
            <div className="mt-10">
              <ActiveStep />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MultiStepWizard;
