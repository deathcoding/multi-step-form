export function dashIfEmpty(value: string | undefined): string {
  return value === undefined || value === '' ? '—' : value;
}

export function formatBool(value: boolean | undefined): string {
  if (value === undefined) return '—';
  return value ? 'Да' : 'Нет';
}
