import { z } from 'zod';

export const departments = ['Разработка', 'Маркетинг', 'Дизайн'] as const;

export const levels = ['Junior', 'Middle', 'Senior', 'Lead'] as const;

export const officeLocations = ['Remote', 'Moscow', 'London', 'New York'] as const;

export const step2Schema = z
  .object({
    department: z.enum(departments),
    programmingLanguage: z.string().optional(),
    level: z.enum(levels),
    officeLocation: z.enum(officeLocations),
    timezone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.officeLocation === 'Remote' && !data.timezone?.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: 'Укажите часовой пояс',
        path: ['timezone'],
      });
    }
  });

export type Step2Data = z.infer<typeof step2Schema>
