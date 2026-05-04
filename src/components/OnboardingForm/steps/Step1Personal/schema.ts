import { z } from 'zod';

export const step1Schema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: z.email('Введите корректный email'),
});

export type Step1Data = z.infer<typeof step1Schema>
