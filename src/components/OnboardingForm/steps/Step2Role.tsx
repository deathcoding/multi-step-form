import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'
import { nextStep, prevStep } from '../formSlice'
import { departments, type Step2Data, step2Schema } from '../schemas'

function Step2Role() {
  const dispatch = useDispatch()
  const formData = useSelector((state: RootState) => state.onboardingForm.formData)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      department: formData.department ?? departments[0],
      programmingLanguage: formData.programmingLanguage ?? '',
    },
  })

  const selectedDepartment = watch('department')

  const onSubmit = (data: Step2Data) => {
    dispatch(nextStep(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Шаг 2: Роль</h2>

      <div>
        <label htmlFor="department">Департамент</label>
        <select id="department" {...register('department')}>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && <p>{errors.department.message}</p>}
      </div>

      {selectedDepartment === 'Разработка' && (
        <div>
          <label htmlFor="programmingLanguage">Язык программирования</label>
          <input id="programmingLanguage" {...register('programmingLanguage')} />
          {errors.programmingLanguage && <p>{errors.programmingLanguage.message}</p>}
        </div>
      )}

      <button type="button" onClick={() => dispatch(prevStep())}>
        Назад
      </button>
      <button type="submit">Далее</button>
    </form>
  )
}

export default Step2Role
