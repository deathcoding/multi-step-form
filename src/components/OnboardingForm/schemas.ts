import { z } from 'zod'

export const departments = ['Разработка', 'Маркетинг', 'Дизайн'] as const
export const osTypes = ['Mac', 'Windows', 'Linux'] as const

export const step1Schema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: z.email('Введите корректный email'),
})

export const step2Schema = z.object({
  department: z.enum(departments),
  programmingLanguage: z.string().optional(),
})

export const step3Schema = z
  .object({
    needsMonitor: z.boolean(),
    monitorCount: z.number().min(1, 'Количество мониторов должно быть не меньше 1').optional(),
    os: z.enum(osTypes),
  })
  .superRefine((data, ctx) => {
    if (data.needsMonitor && data.monitorCount === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите количество мониторов',
        path: ['monitorCount'],
      })
    }
  })

export const step4Schema = z.object({
  comment: z.string().optional(),
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>

export interface OnboardingFormData extends Step1Data, Step2Data, Step3Data, Step4Data {}
