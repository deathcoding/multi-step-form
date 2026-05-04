import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'
import { nextStep, prevStep } from '../formSlice'
import { type Step4Data, step4Schema } from '../schemas'

function Step4Comments() {
  const dispatch = useDispatch()
  const formData = useSelector((state: RootState) => state.onboardingForm.formData)

  const { register, handleSubmit } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      comment: formData.comment ?? '',
    },
  })

  const onSubmit = (data: Step4Data) => {
    dispatch(nextStep(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Шаг 4: Комментарии</h2>

      <div>
        <label htmlFor="comment">Комментарий</label>
        <textarea id="comment" {...register('comment')} />
      </div>

      <button type="button" onClick={() => dispatch(prevStep())}>
        Назад
      </button>
      <button type="submit">Далее</button>
    </form>
  )
}

export default Step4Comments
