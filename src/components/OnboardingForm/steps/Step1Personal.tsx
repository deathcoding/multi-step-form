import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'
import { nextStep } from '../formSlice'
import { type Step1Data, step1Schema } from '../schemas'

function Step1Personal() {
  const dispatch = useDispatch()
  const formData = useSelector((state: RootState) => state.onboardingForm.formData)

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
  })

  const onSubmit = (data: Step1Data) => {
    dispatch(nextStep(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Шаг 1: Личные данные</h2>

      <div>
        <label htmlFor="firstName">Имя</label>
        <input id="firstName" {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <label htmlFor="lastName">Фамилия</label>
        <input id="lastName" {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Далее</button>
    </form>
  )
}

export default Step1Personal
