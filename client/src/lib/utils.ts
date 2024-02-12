import type { Updater } from '@tanstack/vue-table'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { type Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}

export function formatTitleWithUnderscores(str: string | string[] | undefined | null) {
  if (str === undefined || str === null) {
    return '' // or any default value you prefer
  }
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}
export const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 10:
      return 'bg-slate-600'
    case 9:
      return 'bg-slate-500'
    case 8:
      return 'bg-slate-500'
    case 7:
      return 'bg-slate-500'
    case 6:
      return 'bg-slate-500'
    case 5:
      return 'bg-gray-500'
    case 4:
      return 'bg-gray-500'
    case 3:
      return 'b-gray-400'
    case 2:
      return 'bg-gray-400'
    case 1:
      return 'bg-gray-300'
    case 0:
      return 'bg-gray-300' // Default color for unknown priorities
  }
}
