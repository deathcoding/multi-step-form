import type { ComponentType } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Step1Personal from "./steps/Step1Personal";
import Step2Role from "./steps/Step2Role";
import Step3Equipment from "./steps/Step3Equipment";
import Step4Comments from "./steps/Step4Comments";
import Step5Summary from "./steps/Step5Summary";

interface StepDefinition {
  title: string;
  component: ComponentType;
}

const steps: StepDefinition[] = [
  { title: "Личные данные", component: Step1Personal },
  { title: "Роль", component: Step2Role },
  { title: "Оборудование", component: Step3Equipment },
  { title: "Комментарии", component: Step4Comments },
  { title: "Сводка", component: Step5Summary },
];

interface ProgressBarProps {
  currentStep: number;
}

function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          const circleClassName = isCompleted
            ? "border-emerald-500 bg-emerald-500 text-white"
            : isCurrent
              ? "border-blue-600 bg-blue-600 text-white ring-4 ring-blue-100"
              : "border-slate-300 bg-white text-slate-400";

          const titleClassName = isCurrent
            ? "text-blue-700"
            : isCompleted
              ? "text-emerald-700"
              : "text-slate-500";

          const lineClassName = isCompleted ? "bg-emerald-400" : "bg-slate-200";

          return (
            <div key={step.title} className="flex flex-1 items-center">
              <div className="flex w-full flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${circleClassName}`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-center text-xs font-medium md:text-sm ${titleClassName}`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-3 mt-[-22px] h-1 flex-1 rounded ${lineClassName}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-center text-sm text-slate-500">
        Шаг {currentStep + 1} из {steps.length}
      </div>
    </div>
  );
}

function MultiStepWizard() {
  const currentStep = useSelector(
    (state: RootState) => state.onboardingForm.currentStep,
  );
  const safeStepIndex =
    currentStep >= 0 && currentStep < steps.length ? currentStep : 0;
  const ActiveStep = steps[safeStepIndex].component;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Onboarding Wizard
        </h1>
        <p className="mb-8 text-sm text-slate-500 sm:text-base">
          Заполните форму по шагам, чтобы отправить заявку на onboarding.
        </p>
        <ProgressBar currentStep={safeStepIndex} />
        <div className="mt-6">
          <ActiveStep />
        </div>
      </div>
    </div>
  );
}

export default MultiStepWizard;
