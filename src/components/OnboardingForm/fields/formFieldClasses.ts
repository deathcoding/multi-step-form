/** Chevron down (#64748b slate-500) for native selects */
const selectChevronSvg =
  "%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E";

/** Matches input styling; rounded-xl + scheme-light help native select match form controls on Windows. */
export const selectFieldClassName = [
  'mt-1 w-full appearance-none rounded-xl border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-800 shadow-sm outline-none scheme-light transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
  `bg-[url('data:image/svg+xml;charset=utf-8,${selectChevronSvg}')] bg-[length:1rem_1rem] bg-[position:right_0.65rem_center] bg-no-repeat`,
].join(' ');

/** Shared base for `<input>` and `<textarea>` (non-select controls). */
export const textControlClassName =
  'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200';

export const fieldErrorClassName = 'border-red-500 focus:border-red-500 focus:ring-red-200';

export function withFieldError(baseClassName: string, hasError: boolean): string {
  return hasError ? `${baseClassName} ${fieldErrorClassName}` : baseClassName;
}

export const primaryButtonClassName =
  'rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300';

export const secondaryButtonClassName =
  'rounded-lg border border-slate-300 bg-transparent px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200';

export const successSubmitButtonClassName =
  'rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300';
