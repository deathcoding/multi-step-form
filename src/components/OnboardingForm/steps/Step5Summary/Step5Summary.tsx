import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { prevStep, resetForm } from '@/components/OnboardingForm/formSlice';

function Step5Summary() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const handleSubmitApplication = () => {
    console.log('Итоговые данные:', formData);
    dispatch(resetForm());
  };

  const summaryRows = [
    { label: 'Имя', value: formData.firstName },
    { label: 'Фамилия', value: formData.lastName },
    { label: 'Email', value: formData.email },
    { label: 'Департамент', value: formData.department },
    { label: 'Язык программирования', value: formData.programmingLanguage },
    { label: 'Нужен монитор', value: formData.needsMonitor === undefined ? undefined : formData.needsMonitor ? 'Да' : 'Нет' },
    { label: 'Количество мониторов', value: formData.monitorCount },
    { label: 'ОС', value: formData.os },
    { label: 'Комментарий', value: formData.comment },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 5: Сводка</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {summaryRows.map((row) => (
          <div key={row.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{row.label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{row.value ?? '—'}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => dispatch(prevStep())}
          className="rounded-lg border border-slate-300 bg-transparent px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={handleSubmitApplication}
          className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Отправить заявку
        </button>
      </div>
    </div>
  );
}

export default Step5Summary;
