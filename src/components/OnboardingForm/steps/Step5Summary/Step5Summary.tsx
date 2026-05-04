import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import {
  secondaryButtonClassName,
  successSubmitButtonClassName,
} from '@/components/OnboardingForm/fields/formFieldClasses';
import {
  dietaryLabels,
  genderLabels,
  officeLocationLabels,
} from '@/components/OnboardingForm/lib/labels';
import { dashIfEmpty, formatBool } from '@/components/OnboardingForm/lib/utils/formatDisplay';
import { completeSubmission, prevStep } from '@/components/OnboardingForm/state/formSlice';

function Step5Summary() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const handleSubmitApplication = () => {
    console.log('Итоговые данные:', formData);
    dispatch(completeSubmission());
  };

  const dietaryKey = formData.dietaryRestrictions;
  const dietaryDisplay =
    dietaryKey && dietaryKey in dietaryLabels ? dietaryLabels[dietaryKey] : '—';

  const summaryRows: { label: string; value: string | number | undefined }[] = [
    { label: 'Имя', value: formData.firstName },
    { label: 'Фамилия', value: formData.lastName },
    { label: 'Email', value: formData.email },
    { label: 'Телефон', value: formData.phone },
    { label: 'Дата рождения', value: formData.birthDate },
    { label: 'LinkedIn', value: dashIfEmpty(formData.linkedinUrl) },
    {
      label: 'Пол',
      value: formData.gender ? genderLabels[formData.gender] : undefined,
    },
    { label: 'Департамент', value: formData.department },
    { label: 'Язык программирования', value: dashIfEmpty(formData.programmingLanguage) },
    { label: 'Уровень', value: formData.level },
    {
      label: 'Локация офиса',
      value: formData.officeLocation ? officeLocationLabels[formData.officeLocation] : undefined,
    },
    { label: 'Часовой пояс', value: dashIfEmpty(formData.timezone) },
    {
      label: 'Нужен монитор',
      value: formatBool(formData.needsMonitor),
    },
    { label: 'Количество мониторов', value: formData.monitorCount ?? '—' },
    { label: 'ОС', value: formData.os },
    {
      label: 'Корпоративный телефон',
      value: formatBool(formData.needCorporatePhone),
    },
    { label: 'Раскладка клавиатуры', value: formData.keyboardLayout },
    { label: 'Комментарий', value: dashIfEmpty(formData.comment) },
    { label: 'Размер футболки', value: formData.tShirtSize },
    { label: 'Диетические ограничения', value: dietaryDisplay },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 5: Сводка</h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summaryRows.map((row) => (
          <div key={row.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{row.label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{row.value ?? '—'}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={() => dispatch(prevStep())} className={secondaryButtonClassName}>
          Назад
        </button>
        <button type="button" onClick={handleSubmitApplication} className={successSubmitButtonClassName}>
          Отправить заявку
        </button>
      </div>
    </div>
  );
}

export default Step5Summary;
