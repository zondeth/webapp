import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { sha256 } from "js-sha256"; // Ensure js-sha256 is installed

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Hashes a given string using SHA-256.
 * @param input The input string to hash.
 * @returns The SHA-256 hash of the input.
 */
export function hashSecret(input: string): string {
  return sha256(input);
}