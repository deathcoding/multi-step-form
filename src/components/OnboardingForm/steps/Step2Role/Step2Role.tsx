import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { nextStep, prevStep } from '@/components/OnboardingForm/formSlice';
import { departments, type Step2Data, step2Schema } from './schema';

function Step2Role() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      department: formData.department ?? departments[0],
      programmingLanguage: formData.programmingLanguage ?? '',
    },
  });

  const selectedDepartment = useWatch({ control, name: 'department' });

  const onSubmit = (data: Step2Data) => {
    dispatch(nextStep(data));
  };

  const inputClassName =
    'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
  const errorInputClassName = 'border-red-500 focus:border-red-500 focus:ring-red-200';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 2: Роль</h2>

      <div>
        <label htmlFor="department" className="text-sm font-medium text-slate-700">
          Департамент
        </label>
        <select
          id="department"
          className={`${inputClassName} ${errors.department ? errorInputClassName : ''}`}
          {...register('department')}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department.message}</p>}
      </div>

      {selectedDepartment === 'Разработка' && (
        <div>
          <label htmlFor="programmingLanguage" className="text-sm font-medium text-slate-700">
            Язык программирования
          </label>
          <input
            id="programmingLanguage"
            className={`${inputClassName} ${errors.programmingLanguage ? errorInputClassName : ''}`}
            {...register('programmingLanguage')}
          />
          {errors.programmingLanguage && (
            <p className="mt-1 text-xs text-red-600">{errors.programmingLanguage.message}</p>
          )}
        </div>
      )}

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

export default Step2Role;
