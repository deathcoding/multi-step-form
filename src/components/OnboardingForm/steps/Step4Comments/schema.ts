import { z } from 'zod';

export const tShirtSizes = ['XS', 'S', 'M', 'L', 'XL'] as const;

export const dietaryRestrictionsOptions = ['None', 'Vegetarian', 'Vegan', 'Halal'] as const;

export const step4Schema = z.object({
  comment: z.string().optional(),
  tShirtSize: z.enum(tShirtSizes),
  dietaryRestrictions: z.enum(dietaryRestrictionsOptions),
});

export type Step4Data = z.infer<typeof step4Schema>
