import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'
import { prevStep, resetForm } from '../formSlice'

function Step5Summary() {
  const dispatch = useDispatch()
  const formData = useSelector((state: RootState) => state.onboardingForm.formData)

  const handleSubmitApplication = () => {
    console.log('Итоговые данные:', formData)
    dispatch(resetForm())
  }

  return (
    <div>
      <h2>Шаг 5: Сводка</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      <button type="button" onClick={() => dispatch(prevStep())}>
        Назад
      </button>
      <button type="button" onClick={handleSubmitApplication}>
        Отправить заявку
      </button>
    </div>
  )
}

export default Step5Summary
