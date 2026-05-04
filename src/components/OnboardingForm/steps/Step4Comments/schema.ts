import { z } from 'zod';

export const step4Schema = z.object({
  comment: z.string().optional(),
});

export type Step4Data = z.infer<typeof step4Schema>
