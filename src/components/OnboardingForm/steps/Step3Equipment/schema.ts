import { z } from 'zod';

export const osTypes = ['Mac', 'Windows', 'Linux'] as const;

export const step3Schema = z
  .object({
    needsMonitor: z.boolean(),
    monitorCount: z.number().min(1, 'Количество мониторов должно быть не меньше 1').optional(),
    os: z.enum(osTypes),
  })
  .superRefine((data, ctx) => {
    if (data.needsMonitor && data.monitorCount === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: 'Укажите количество мониторов',
        path: ['monitorCount'],
      });
    }
  });

export type Step3Data = z.infer<typeof step3Schema>
