import { z } from 'zod';

export const osTypes = ['Mac', 'Windows', 'Linux'] as const;

export const keyboardLayouts = ['US', 'UK', 'RU/EN'] as const;

export const step3Schema = z
  .object({
    needsMonitor: z.boolean(),
    monitorCount: z
      .number()
      .min(1, 'Количество мониторов должно быть не меньше 1')
      .max(3, 'Не больше 3 мониторов')
      .optional(),
    os: z.enum(osTypes),
    needCorporatePhone: z.boolean(),
    keyboardLayout: z.enum(keyboardLayouts),
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
