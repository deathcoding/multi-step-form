import { useDispatch } from 'react-redux';
import { primaryButtonClassName } from '@/components/OnboardingForm/fields/formFieldClasses';
import { resetForm } from '@/components/OnboardingForm/state/formSlice';

function SubmissionSuccess() {
  const dispatch = useDispatch();

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
        ✓
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Готово</h2>
        <p className="text-base text-slate-600">
          Ваши данные отправлены :) можете посмотреть их в консоли.
        </p>
      </div>
      <button type="button" onClick={() => dispatch(resetForm())} className={primaryButtonClassName}>
        Начать заново
      </button>
    </div>
  );
}

export default SubmissionSuccess;
