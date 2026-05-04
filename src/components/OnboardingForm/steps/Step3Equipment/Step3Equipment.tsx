import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { nextStep, prevStep } from '@/components/OnboardingForm/formSlice';
import { osTypes, type Step3Data, step3Schema } from './schema';

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
    },
  });

  const needsMonitor = useWatch({ control, name: 'needsMonitor' });

  const onSubmit = (data: Step3Data) => {
    dispatch(nextStep(data));
  };

  const inputClassName =
    'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
  const errorInputClassName = 'border-red-500 focus:border-red-500 focus:ring-red-200';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 3: Оборудование</h2>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <label htmlFor="needsMonitor" className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
          <input
            id="needsMonitor"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-300"
            {...register('needsMonitor')}
          />
          Нужен монитор
        </label>
      </div>

      {needsMonitor && (
        <div>
          <label htmlFor="monitorCount" className="text-sm font-medium text-slate-700">
            Количество мониторов
          </label>
          <input
            id="monitorCount"
            type="number"
            min={1}
            className={`${inputClassName} ${errors.monitorCount ? errorInputClassName : ''}`}
            {...register('monitorCount', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
          {errors.monitorCount && <p className="mt-1 text-xs text-red-600">{errors.monitorCount.message}</p>}
        </div>
      )}

      <div>
        <label htmlFor="os" className="text-sm font-medium text-slate-700">
          Операционная система
        </label>
        <select id="os" className={`${inputClassName} ${errors.os ? errorInputClassName : ''}`} {...register('os')}>
          {osTypes.map((os) => (
            <option key={os} value={os}>
              {os}
            </option>
          ))}
        </select>
        {errors.os && <p className="mt-1 text-xs text-red-600">{errors.os.message}</p>}
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
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Далее
        </button>
      </div>
    </form>
  );
}

export default Step3Equipment;
