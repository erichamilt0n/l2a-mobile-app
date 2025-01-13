import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param {...ClassValue[]} inputs - Array of class names, objects, or arrays
 * @returns {string} Merged class names string with proper Tailwind precedence
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
