/**
 * Validates and clamps an increment value within acceptable bounds
 * @param value - The increment value to validate
 * @param currentAmount - The current quantity amount
 * @returns The validated increment value, clamped between [-currentAmount, 100]
 */
import { QUANTITY_CONFIG } from '../constants/quantityConfig';

export const validateIncrement = (value: number, currentAmount: number): number => {
  const maxIncrement = QUANTITY_CONFIG.MAX_INCREMENT;
  const minIncrement = -currentAmount;
  return Math.max(minIncrement, Math.min(maxIncrement, value));
};

/**
 * Formats an increment value for display with appropriate sign
 * @param increment - The increment value to format
 * @returns Formatted increment text (e.g., "+5", "-3", "0")
 */
export const formatIncrementText = (increment: number): string => {
  return increment > 0 ? `+${increment}` : increment.toString();
};

/**
 * Cleans input text to contain only numeric characters (and optionally negative sign)
 * @param text - The input text to clean
 * @param allowNegative - Whether to allow negative sign
 * @returns Cleaned text containing only allowed numeric characters
 */
export const cleanNumericInput = (text: string, allowNegative: boolean = false): string => {
  const pattern = allowNegative ? /[^0-9+-]/g : /[^0-9]/g;
  return text.replace(pattern, '');
};
