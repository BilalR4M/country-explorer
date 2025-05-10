import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for combining class names with support for Tailwind merging
 * Converted from TypeScript to JavaScript
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}
