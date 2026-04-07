import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { TextStyle } from 'react-native';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { QuantitySelectorProps } from '../types';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';

// Configuration constants
const QUANTITY_CONFIG = {
  MAX_INCREMENT: 100,
  NEGATIVE_BUTTON_VALUES: [-10, -5, -1],
  POSITIVE_BUTTON_VALUES: [1, 5, 10],
  DEFAULT_INCREMENT: 0,
  MIN_RESULTING_VALUE: 0,
} as const;

// TypeScript interfaces
/**
 * Interface for QuantitySelector ref methods
 */
export interface QuantitySelectorRef {
  /**
   * Returns the current resulting quantity value
   * @returns The current resulting quantity (parsed from resultingText, defaults to 0 if invalid)
   */
  getCurrentValue: () => number;
  
  /**
   * Resets the increment to default value and optionally updates the current amount
   * @param newAmount - Optional new amount to set as the current amount
   */
  resetIncrement: (newAmount?: number) => void;
}

/**
 * Props for the createButton function
 */
interface ButtonProps {
  /** The increment value for the button */
  value: number;
  /** Optional custom text style */
  textStyle?: TextStyle;
  /** Whether this is the first button in the group */
  isFirst?: boolean;
  /** Whether this is the last button in the group */
  isLast?: boolean;
}

// Validation utilities
/**
 * Validates and clamps an increment value within acceptable bounds
 * @param value - The increment value to validate
 * @param currentAmount - The current quantity amount
 * @returns The validated increment value, clamped between [-currentAmount, 100]
 */
const validateIncrement = (value: number, currentAmount: number): number => {
  const maxIncrement = QUANTITY_CONFIG.MAX_INCREMENT;
  const minIncrement = -currentAmount;
  return Math.max(minIncrement, Math.min(maxIncrement, value));
};

/**
 * Formats an increment value for display with appropriate sign
 * @param increment - The increment value to format
 * @returns Formatted increment text (e.g., "+5", "-3", "0")
 */
const formatIncrementText = (increment: number): string => {
  return increment > 0 ? `+${increment}` : increment.toString();
};

/**
 * Cleans input text to contain only numeric characters (and optionally negative sign)
 * @param text - The input text to clean
 * @param allowNegative - Whether to allow negative sign
 * @returns Cleaned text containing only allowed numeric characters
 */
const cleanNumericInput = (text: string, allowNegative: boolean = false): string => {
  const pattern = allowNegative ? /[^0-9+-]/g : /[^0-9]/g;
  return text.replace(pattern, '');
};

// Quantity selector component

export default forwardRef(function QuantitySelector({
  currentAmount,
  onAmountChange,
  style,
}: QuantitySelectorProps, ref: React.Ref<QuantitySelectorRef>) {
  const [increment, setIncrement] = useState<number>(QUANTITY_CONFIG.DEFAULT_INCREMENT);
  const [incrementText, setIncrementText] = useState(formatIncrementText(QUANTITY_CONFIG.DEFAULT_INCREMENT));
  const [resultingText, setResultingText] = useState(currentAmount.toString());
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getCurrentValue: () => {
      const parsedValue = parseInt(resultingText);
      let val = isNaN(parsedValue) ? 0 : parsedValue;
      return val;
    },
    resetIncrement: (newAmount?: number) => {
      setIncrement(QUANTITY_CONFIG.DEFAULT_INCREMENT);
      setIncrementText(formatIncrementText(QUANTITY_CONFIG.DEFAULT_INCREMENT));
      // Reset resulting text to the new saved amount or current amount
      setResultingText(newAmount?.toString() || currentAmount.toString());
    }
  }), [resultingText, currentAmount]);

  /**
   * Handles increment/decrement button press events
   * @param value - The increment value to apply (positive or negative)
   */
  const handleButtonPress = (value: number) => {
    const newIncrement = increment + value;
    const clampedIncrement = validateIncrement(newIncrement, currentAmount);
    
    setIncrement(clampedIncrement);
    setIncrementText(formatIncrementText(clampedIncrement));
    const newResulting = currentAmount + clampedIncrement;
    setResultingText(newResulting.toString());
    onAmountChange?.(newResulting);
  };

  /**
   * Handles changes to the increment input field
   * @param text - The new text value from the input field
   */
  const handleTextChange = (text: string) => {
    const cleanedText = cleanNumericInput(text, true);
    
    // Allow user to type "-" without immediate formatting
    if (cleanedText === '-' || cleanedText === '') {
      setIncrementText(cleanedText);
      setIncrement(0);
      const newResulting = currentAmount + 0;
      setResultingText(newResulting.toString());
      onAmountChange?.(newResulting);
      return;
    }
    
    const numericValue = parseInt(cleanedText) || 0;
    const clampedIncrement = validateIncrement(numericValue, currentAmount);
    
    setIncrement(clampedIncrement);
    const newResulting = currentAmount + clampedIncrement;
    setResultingText(newResulting.toString());
    
    // Format display text with sign (cosmetic only)
    setIncrementText(formatIncrementText(clampedIncrement));
    
    onAmountChange?.(newResulting);
  };

  /**
   * Handles changes to the resulting quantity input field
   * @param text - The new text value from the resulting quantity field
   */
  const handleResultingChange = (text: string) => {
    const cleanedText = cleanNumericInput(text, false);
    setResultingText(cleanedText);
    
    const numericValue = Math.max(QUANTITY_CONFIG.MIN_RESULTING_VALUE, parseInt(cleanedText) || 0);
    const newIncrement = numericValue - currentAmount;
    const clampedIncrement = validateIncrement(newIncrement, currentAmount);
    
    // Calculate the actual resulting amount based on clamped increment
    const actualResulting = currentAmount + clampedIncrement;
    
    setIncrement(clampedIncrement);
    setIncrementText(formatIncrementText(clampedIncrement));
    
    // Update resulting text to show the clamped value if user exceeded limit
    if (numericValue > currentAmount + QUANTITY_CONFIG.MAX_INCREMENT) {
      setResultingText(actualResulting.toString());
    }
    
    onAmountChange?.(actualResulting);
  };

  /**
   * Creates a styled increment/decrement button component
   * @param props - Button configuration properties
   * @param props.value - The increment value for the button
   * @param props.textStyle - Optional custom text style
   * @param props.isFirst - Whether this is the first button in the group
   * @param props.isLast - Whether this is the last button in the group
   * @returns A TouchableOpacity button with appropriate styling
   */
  const createButton = ({ value, textStyle, isFirst, isLast }: ButtonProps) => (
    <TouchableOpacity 
      style={[
        styles.button,
        isFirst && styles.firstButton,
        isLast && styles.lastButton
      ]}
      onPress={() => handleButtonPress(value)}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {formatIncrementText(value)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      {!isLoaded ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.currentAmountContainer}>
            <Text style={styles.currentAmountText}>
              Current Quantity:
            </Text>
            <Text style={styles.currentAmountValue}>
              {currentAmount}
            </Text>
          </View>

          <View style={styles.controlsContainer}>
            {QUANTITY_CONFIG.NEGATIVE_BUTTON_VALUES.map((value, index) => (
              <React.Fragment key={value}>
                {createButton({ value, textStyle: styles.negativeButtonText, isFirst: index === 0, isLast: false })}
              </React.Fragment>
            ))}
            
            <TextInput
              style={styles.incrementInput}
              value={incrementText}
              onChangeText={handleTextChange}
              placeholder="0"
              placeholderTextColor={styles.incrementInputPlaceholder.color}
              keyboardType="numeric"
            />
            
            {QUANTITY_CONFIG.POSITIVE_BUTTON_VALUES.map((value, index) => (
              <React.Fragment key={value}>
                {createButton({ value, textStyle: styles.positiveButtonText, isFirst: false, isLast: index === QUANTITY_CONFIG.POSITIVE_BUTTON_VALUES.length - 1 })}
              </React.Fragment>
            ))}
          </View>

          <View style={styles.resultingQuantityContainer}>
            <Text style={styles.resultingQuantityText}>
              Resulting Quantity:
            </Text>
            <TextInput
              style={styles.resultingInput}
              value={resultingText}
              onChangeText={handleResultingChange}
              placeholder="0"
              placeholderTextColor={styles.resultingInputPlaceholder.color}
              keyboardType="numeric"
            />
          </View>
        </>
      )}
    </View>
  );
});

