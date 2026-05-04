import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { dietaryLabels } from '@/components/OnboardingForm/lib/labels';
import { nextStep, prevStep } from '@/components/OnboardingForm/state/formSlice';
import {
  dietaryRestrictionsOptions,
  tShirtSizes,
  type Step4Data,
  step4Schema,
} from './schema';

function Step4Comments() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      comment: formData.comment ?? '',
      tShirtSize: formData.tShirtSize ?? tShirtSizes[2],
      dietaryRestrictions: formData.dietaryRestrictions ?? dietaryRestrictionsOptions[0],
    },
  });

  const onSubmit = (data: Step4Data) => {
    dispatch(nextStep(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 4: Комментарии</h2>

      <FormField id="comment" label="Комментарий" error={errors.comment?.message}>
        <textarea
          id="comment"
          rows={5}
          className={withFieldError(textControlClassName, !!errors.comment)}
          {...register('comment')}
        />
      </FormField>

      <FormField id="tShirtSize" label="Размер футболки (мерч)" error={errors.tShirtSize?.message}>
        <select
          id="tShirtSize"
          className={withFieldError(selectFieldClassName, !!errors.tShirtSize)}
          {...register('tShirtSize')}
        >
          {tShirtSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="dietaryRestrictions"
        label="Диетические ограничения"
        error={errors.dietaryRestrictions?.message}
      >
        <select
          id="dietaryRestrictions"
          className={withFieldError(selectFieldClassName, !!errors.dietaryRestrictions)}
          {...register('dietaryRestrictions')}
        >
          {dietaryRestrictionsOptions.map((option) => (
            <option key={option} value={option}>
              {dietaryLabels[option]}
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

export default Step4Comments;
