import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { FormField } from '@/components/OnboardingForm/fields/FormField';
import {
  primaryButtonClassName,
  textControlClassName,
  withFieldError,
} from '@/components/OnboardingForm/fields/formFieldClasses';
import { genderLabels } from '@/components/OnboardingForm/lib/labels';
import { nextStep } from '@/components/OnboardingForm/state/formSlice';
import { genders, type Step1Data, step1Schema, toBirthDateInputDisplay } from './schema';

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
      phone: formData.phone ?? '',
      birthDate: toBirthDateInputDisplay(formData.birthDate ?? ''),
      linkedinUrl: formData.linkedinUrl ?? '',
      gender: formData.gender,
    },
  });

  const onSubmit = (data: Step1Data) => {
    dispatch(nextStep(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 1: Личные данные</h2>

      <FormField id="firstName" label="Имя" error={errors.firstName?.message}>
        <input
          id="firstName"
          className={withFieldError(textControlClassName, !!errors.firstName)}
          {...register('firstName')}
        />
      </FormField>

      <FormField id="lastName" label="Фамилия" error={errors.lastName?.message}>
        <input
          id="lastName"
          className={withFieldError(textControlClassName, !!errors.lastName)}
          {...register('lastName')}
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          className={withFieldError(textControlClassName, !!errors.email)}
          {...register('email')}
        />
      </FormField>

      <FormField id="phone" label="Телефон" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+7 ..."
          className={withFieldError(textControlClassName, !!errors.phone)}
          {...register('phone')}
        />
      </FormField>

      <FormField id="birthDate" label="Дата рождения" error={errors.birthDate?.message}>
        <input
          id="birthDate"
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="дд.мм.гггг"
          maxLength={10}
          className={withFieldError(textControlClassName, !!errors.birthDate)}
          {...register('birthDate')}
        />
      </FormField>

      <FormField id="linkedinUrl" label="LinkedIn (необязательно)" error={errors.linkedinUrl?.message}>
        <input
          id="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/..."
          className={withFieldError(textControlClassName, !!errors.linkedinUrl)}
          {...register('linkedinUrl')}
        />
      </FormField>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-700">Пол</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {genders.map((value) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                value={value}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-300"
                {...register('gender')}
              />
              {genderLabels[value]}
            </label>
          ))}
        </div>
        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
      </fieldset>

      <div className="flex justify-end pt-2">
        <button type="submit" className={primaryButtonClassName}>
          Далее
        </button>
      </div>
    </form>
  );
}

export default Step1Personal;
