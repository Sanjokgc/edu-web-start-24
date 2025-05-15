
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color variables for the theme
export const colors = {
  blue: {
    primary: "#2563eb", // This corresponds to blue-600 in Tailwind
    light: "#3b82f6",   // blue-500
    dark: "#1d4ed8"     // blue-700
  }
}
