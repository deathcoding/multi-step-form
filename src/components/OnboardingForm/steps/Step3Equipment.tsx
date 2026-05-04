import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'
import { nextStep, prevStep } from '../formSlice'
import { osTypes, type Step3Data, step3Schema } from '../schemas'

function Step3Equipment() {
  const dispatch = useDispatch()
  const formData = useSelector((state: RootState) => state.onboardingForm.formData)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      needsMonitor: formData.needsMonitor ?? false,
      monitorCount: formData.monitorCount,
      os: formData.os ?? osTypes[0],
    },
  })

  const needsMonitor = watch('needsMonitor')

  const onSubmit = (data: Step3Data) => {
    dispatch(nextStep(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Шаг 3: Оборудование</h2>

      <div>
        <label htmlFor="needsMonitor">
          <input id="needsMonitor" type="checkbox" {...register('needsMonitor')} />
          Нужен монитор
        </label>
      </div>

      {needsMonitor && (
        <div>
          <label htmlFor="monitorCount">Количество мониторов</label>
          <input
            id="monitorCount"
            type="number"
            min={1}
            {...register('monitorCount', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
          {errors.monitorCount && <p>{errors.monitorCount.message}</p>}
        </div>
      )}

      <div>
        <label htmlFor="os">Операционная система</label>
        <select id="os" {...register('os')}>
          {osTypes.map((os) => (
            <option key={os} value={os}>
              {os}
            </option>
          ))}
        </select>
        {errors.os && <p>{errors.os.message}</p>}
      </div>

      <button type="button" onClick={() => dispatch(prevStep())}>
        Назад
      </button>
      <button type="submit">Далее</button>
    </form>
  )
}

export default Step3Equipment
