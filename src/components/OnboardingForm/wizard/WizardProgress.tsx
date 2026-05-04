import { wizardSteps } from './stepsConfig';

interface WizardProgressProps {
  currentStep: number;
}

function StepCheckIcon() {
  return (
    <svg
      className="h-4 w-4 text-white"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 6l2.5 2.5L10 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const n = wizardSteps.length;
  const progressRatio = n <= 1 ? 1 : currentStep / (n - 1);

  return (
    <div className="mb-12">
      <div className="relative">
        <div
          className="pointer-events-none absolute top-[1.125rem] left-[10%] right-[10%] z-0 h-1 rounded-full bg-gray-200"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-[1.125rem] left-[10%] z-0 h-1 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `calc(80% * ${progressRatio})` }}
          aria-hidden
        />
        <div className="relative z-10 flex">
          {wizardSteps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            const circleClassName = isCompleted
              ? 'border-blue-600 bg-blue-600 text-white transition-all duration-300 ease-in-out'
              : isCurrent
                ? 'border-2 border-blue-600 bg-white text-blue-600 transition-all duration-300 ease-in-out'
                : 'border-2 border-gray-300 bg-gray-100 text-gray-500 transition-all duration-300 ease-in-out';

            const labelClassName = isCurrent
              ? 'text-sm font-bold text-blue-700 md:text-base'
              : isCompleted
                ? 'text-xs font-medium text-slate-600 md:text-sm'
                : 'text-xs font-medium text-slate-500 md:text-sm';

            return (
              <div key={step.title} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${circleClassName}`}
                >
                  {isCompleted ? <StepCheckIcon /> : index + 1}
                </div>
                <span className={`text-center ${labelClassName}`}>{step.shortLabel}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-slate-500">
        Шаг {currentStep + 1} из {wizardSteps.length}
      </div>
    </div>
  );
}
