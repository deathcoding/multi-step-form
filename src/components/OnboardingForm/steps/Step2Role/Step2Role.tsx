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
import {
  departments,
  levels,
  officeLocations,
  type Step2Data,
  step2Schema,
} from './schema';

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
      level: formData.level ?? levels[0],
      officeLocation: formData.officeLocation ?? officeLocations[0],
      timezone: formData.timezone ?? '',
    },
  });

  const selectedDepartment = useWatch({ control, name: 'department' });
  const officeLocation = useWatch({ control, name: 'officeLocation' });

  const onSubmit = (data: Step2Data) => {
    dispatch(nextStep(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 2: Роль</h2>

      <FormField id="department" label="Департамент" error={errors.department?.message}>
        <select
          id="department"
          className={withFieldError(selectFieldClassName, !!errors.department)}
          {...register('department')}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </FormField>

      {selectedDepartment === 'Разработка' && (
        <FormField
          id="programmingLanguage"
          label="Язык программирования"
          error={errors.programmingLanguage?.message}
        >
          <input
            id="programmingLanguage"
            className={withFieldError(textControlClassName, !!errors.programmingLanguage)}
            {...register('programmingLanguage')}
          />
        </FormField>
      )}

      <FormField id="level" label="Уровень" error={errors.level?.message}>
        <select
          id="level"
          className={withFieldError(selectFieldClassName, !!errors.level)}
          {...register('level')}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="officeLocation" label="Локация офиса" error={errors.officeLocation?.message}>
        <select
          id="officeLocation"
          className={withFieldError(selectFieldClassName, !!errors.officeLocation)}
          {...register('officeLocation')}
        >
          {officeLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </FormField>

      {officeLocation === 'Remote' && (
        <FormField id="timezone" label="Часовой пояс" error={errors.timezone?.message}>
          <input
            id="timezone"
            placeholder="Например, Europe/Moscow"
            className={withFieldError(textControlClassName, !!errors.timezone)}
            {...register('timezone')}
          />
        </FormField>
      )}

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

export default Step2Role;
