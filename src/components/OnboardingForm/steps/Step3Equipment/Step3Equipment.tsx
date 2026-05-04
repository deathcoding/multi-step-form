import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { FormField } from '@/components/OnboardingForm/fields/FormField';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
  selectFieldClassName,
  textControlClassName,
  withFieldError,
} from '@/components/OnboardingForm/fields/formFieldClasses';
import { nextStep, prevStep } from '@/components/OnboardingForm/state/formSlice';
import { keyboardLayouts, osTypes, type Step3Data, step3Schema } from './schema';

function Step3Equipment() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      needsMonitor: formData.needsMonitor ?? false,
      monitorCount: formData.monitorCount,
      os: formData.os ?? osTypes[0],
      needCorporatePhone: formData.needCorporatePhone ?? false,
      keyboardLayout: formData.keyboardLayout ?? keyboardLayouts[0],
    },
  });

  const needsMonitor = useWatch({ control, name: 'needsMonitor' });

  const onSubmit = (data: Step3Data) => {
    dispatch(nextStep(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 3: Оборудование</h2>

      <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <label htmlFor="needsMonitor" className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
          <input
            id="needsMonitor"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-300"
            {...register('needsMonitor')}
          />
          Нужен монитор
        </label>
        <label htmlFor="needCorporatePhone" className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
          <input
            id="needCorporatePhone"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-300"
            {...register('needCorporatePhone')}
          />
          Нужен корпоративный телефон
        </label>
      </div>

      {needsMonitor && (
        <FormField id="monitorCount" label="Количество мониторов" error={errors.monitorCount?.message}>
          <input
            id="monitorCount"
            type="number"
            min={1}
            max={3}
            className={withFieldError(textControlClassName, !!errors.monitorCount)}
            {...register('monitorCount', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
        </FormField>
      )}

      <FormField id="os" label="Операционная система" error={errors.os?.message}>
        <select id="os" className={withFieldError(selectFieldClassName, !!errors.os)} {...register('os')}>
          {osTypes.map((os) => (
            <option key={os} value={os}>
              {os}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="keyboardLayout" label="Раскладка клавиатуры" error={errors.keyboardLayout?.message}>
        <select
          id="keyboardLayout"
          className={withFieldError(selectFieldClassName, !!errors.keyboardLayout)}
          {...register('keyboardLayout')}
        >
          {keyboardLayouts.map((layout) => (
            <option key={layout} value={layout}>
              {layout}
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={() => dispatch(prevStep())} className={secondaryButtonClassName}>
          Назад
        </button>
        <button type="submit" className={primaryButtonClassName}>
          Далее
        </button>
      </div>
    </form>
  );
}

export default Step3Equipment;
