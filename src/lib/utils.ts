import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currencyFormatted(ccy: string, value: number) {
  return new Intl.NumberFormat(ccy, { style: "currency", currency: ccy }).format(value);
}