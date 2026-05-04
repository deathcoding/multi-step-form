import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { nextStep } from '@/components/OnboardingForm/formSlice';
import { type Step1Data, step1Schema } from './schema';

function Step1Personal() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: formData.firstName ?? '',
      lastName: formData.lastName ?? '',
      email: formData.email ?? '',
    },
  });

  const onSubmit = (data: Step1Data) => {
    dispatch(nextStep(data));
  };

  const inputClassName =
    'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
  const errorInputClassName = 'border-red-500 focus:border-red-500 focus:ring-red-200';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 1: Личные данные</h2>

      <div>
        <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
          Имя
        </label>
        <input
          id="firstName"
          className={`${inputClassName} ${errors.firstName ? errorInputClassName : ''}`}
          {...register('firstName')}
        />
        {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
      </div>

      <div>
        <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
          Фамилия
        </label>
        <input
          id="lastName"
          className={`${inputClassName} ${errors.lastName ? errorInputClassName : ''}`}
          {...register('lastName')}
        />
        {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`${inputClassName} ${errors.email ? errorInputClassName : ''}`}
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div className="flex justify-end pt-2">
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

export default Step1Personal;
