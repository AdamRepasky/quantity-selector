import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Text, View } from 'react-native';
import { QUANTITY_CONFIG } from '../constants/quantityConfig';
import { QuantitySelectorProps } from '../types';
import { cleanNumericInput, formatIncrementText, validateIncrement } from '../utils/quantityUtils';
import { CurrentAmountDisplay } from './CurrentAmountDisplay';
import { IncrementControls } from './IncrementControls';
import { ResultingQuantityInput } from './ResultingQuantityInput';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';

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
      let val = isNaN(parsedValue) ? QUANTITY_CONFIG.DEFAULT_INCREMENT : parsedValue;
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
      setIncrement(QUANTITY_CONFIG.DEFAULT_INCREMENT);
      const newResulting = currentAmount + QUANTITY_CONFIG.DEFAULT_INCREMENT;
      setResultingText(newResulting.toString());
      onAmountChange?.(newResulting);
      return;
    }
    
    const numericValue = parseInt(cleanedText) || QUANTITY_CONFIG.DEFAULT_INCREMENT;
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


  return (
    <View style={[styles.container, style]}>
      {!isLoaded ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      ) : (
        <>
          <CurrentAmountDisplay currentAmount={currentAmount} />

          <IncrementControls
            incrementText={incrementText}
            onTextChange={handleTextChange}
            onButtonPress={handleButtonPress}
          />

          <ResultingQuantityInput
            resultingText={resultingText}
            onChangeText={handleResultingChange}
          />
        </>
      )}
    </View>
  );
});

