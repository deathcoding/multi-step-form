import { z } from 'zod';

export const genders = ['Male', 'Female', 'Other'] as const;

/** Parses DD.MM.YYYY as local calendar date (no timezone shift). */
export function parseDdMmYyyyLocalDate(value: string): Date | null {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (!match) return null;
  const d = Number(match[1]);
  const m = Number(match[2]);
  const y = Number(match[3]);
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

/**
 * Normalizes persisted value for the text field: YYYY-MM-DD → DD.MM.YYYY;
 * leaves already-dotted or partial input unchanged.
 */
export function toBirthDateInputDisplay(stored: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(stored.trim());
  if (iso) {
    return `${iso[3]}.${iso[2]}.${iso[1]}`;
  }
  return stored;
}

function startOfToday(): Date {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

export const step1Schema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: z.email('Введите корректный email'),
  phone: z
    .string()
    .min(10, 'Телефон должен содержать минимум 10 символов')
    .regex(/^[\d\s+()-]+$/, 'Допустимы только цифры и символы + ( ) -'),
  birthDate: z
    .string()
    .min(1, 'Укажите дату рождения')
    .regex(
      /^\d{2}\.\d{2}\.\d{4}$/,
      'Используйте формат ДД.ММ.ГГГГ (например, 20.05.2002)',
    )
    .refine((val) => parseDdMmYyyyLocalDate(val) !== null, 'Некорректная дата')
    .refine((val) => {
      const parsed = parseDdMmYyyyLocalDate(val);
      if (!parsed) return false;
      parsed.setHours(0, 0, 0, 0);
      return parsed <= startOfToday();
    }, 'Дата не может быть в будущем'),
  linkedinUrl: z.union([z.literal(''), z.url('Введите корректный URL')]),
  gender: z.enum(genders, { message: 'Выберите пол' }),
});

export type Step1Data = z.infer<typeof step1Schema>
