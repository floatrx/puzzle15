import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind CSS classnames utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
