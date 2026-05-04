import { z } from 'zod';

export const departments = ['Разработка', 'Маркетинг', 'Дизайн'] as const;

export const step2Schema = z.object({
  department: z.enum(departments),
  programmingLanguage: z.string().optional(),
});

export type Step2Data = z.infer<typeof step2Schema>
