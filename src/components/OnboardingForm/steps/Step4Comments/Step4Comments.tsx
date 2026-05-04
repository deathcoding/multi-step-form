import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { nextStep, prevStep } from '@/components/OnboardingForm/formSlice';
import { type Step4Data, step4Schema } from './schema';

function Step4Comments() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboardingForm.formData);

  const { register, handleSubmit } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      comment: formData.comment ?? '',
    },
  });

  const onSubmit = (data: Step4Data) => {
    dispatch(nextStep(data));
  };

  const textareaClassName =
    'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Шаг 4: Комментарии</h2>

      <div>
        <label htmlFor="comment" className="text-sm font-medium text-slate-700">
          Комментарий
        </label>
        <textarea id="comment" rows={5} className={textareaClassName} {...register('comment')} />
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

export default Step4Comments;
