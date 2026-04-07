import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { QuantitySelectorProps } from '../types';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';

// Configuration constants
const QUANTITY_CONFIG = {
  MAX_INCREMENT: 100,
  NEGATIVE_BUTTON_VALUES: [-10, -5, -1],
  POSITIVE_BUTTON_VALUES: [1, 5, 10],
  DEFAULT_INCREMENT: 0,
} as const;

// Quantity selector component

export default forwardRef(function QuantitySelector({
  currentAmount,
  onAmountChange,
  style,
}: QuantitySelectorProps, ref: React.Ref<any>) {
  const [increment, setIncrement] = useState<number>(QUANTITY_CONFIG.DEFAULT_INCREMENT);
  const [incrementText, setIncrementText] = useState(QUANTITY_CONFIG.DEFAULT_INCREMENT.toString());
  const [resultingText, setResultingText] = useState(currentAmount.toString());
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getCurrentValue: () => {
      console.log('Getting current value:', resultingText);
      const parsedValue = parseInt(resultingText);
      let val = isNaN(parsedValue) ? 0 : parsedValue;
      console.log('Returning value:', val);
      return val;
    },
    resetIncrement: (newAmount?: number) => {
      console.log('Resetting increment to zero');
      setIncrement(QUANTITY_CONFIG.DEFAULT_INCREMENT);
      setIncrementText(QUANTITY_CONFIG.DEFAULT_INCREMENT.toString());
      // Reset resulting text to the new saved amount or current amount
      setResultingText(newAmount?.toString() || currentAmount.toString());
    }
  }), [resultingText, currentAmount]);

  const handleButtonPress = (value: number) => {
    const newIncrement = increment + value;
    const maxIncrement = QUANTITY_CONFIG.MAX_INCREMENT;
    const minIncrement = -currentAmount;
    const clampedIncrement = Math.max(minIncrement, Math.min(maxIncrement, newIncrement));
    
    setIncrement(clampedIncrement);
    setIncrementText(clampedIncrement > 0 ? `+${clampedIncrement}` : clampedIncrement.toString());
    const newResulting = currentAmount + clampedIncrement;
    setResultingText(newResulting.toString());
    onAmountChange?.(newResulting);
  };

  const handleTextChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9+-]/g, '');
    setIncrementText(cleanedText);
    
    const numericValue = parseInt(cleanedText) || 0;
    const maxIncrement = QUANTITY_CONFIG.MAX_INCREMENT;
    const minIncrement = -currentAmount;
    const clampedIncrement = Math.max(minIncrement, Math.min(maxIncrement, numericValue));
    
    setIncrement(clampedIncrement);
    const newResulting = currentAmount + clampedIncrement;
    setResultingText(newResulting.toString());
    
    // Auto-correct the increment input text if user exceeded limit
    if (numericValue > maxIncrement || numericValue < minIncrement) {
      setIncrementText(clampedIncrement > 0 ? `+${clampedIncrement}` : clampedIncrement.toString());
    }
    
    onAmountChange?.(newResulting);
  };

  const handleResultingChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setResultingText(cleanedText);
    
    const numericValue = Math.max(0, parseInt(cleanedText) || 0);
    const newIncrement = numericValue - currentAmount;
    
    // Apply MAX_INCREMENT validation
    const maxIncrement = QUANTITY_CONFIG.MAX_INCREMENT;
    const minIncrement = -currentAmount;
    const clampedIncrement = Math.max(minIncrement, Math.min(maxIncrement, newIncrement));
    
    // Calculate the actual resulting amount based on clamped increment
    const actualResulting = currentAmount + clampedIncrement;
    
    setIncrement(clampedIncrement);
    setIncrementText(clampedIncrement > 0 ? `+${clampedIncrement}` : clampedIncrement.toString());
    
    // Update resulting text to show the clamped value if user exceeded limit
    if (numericValue > currentAmount + maxIncrement) {
      setResultingText(actualResulting.toString());
    }
    
    onAmountChange?.(actualResulting);
  };

  const createButton = (value: number, textStyle?: any, isFirst?: boolean, isLast?: boolean) => (
    <TouchableOpacity 
      style={[
        styles.button,
        isFirst && styles.firstButton,
        isLast && styles.lastButton
      ]}
      onPress={() => handleButtonPress(value)}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {value > 0 ? `+${value}` : value.toString()}
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
                {createButton(value, styles.negativeButtonText, index === 0, false)}
              </React.Fragment>
            ))}
            
            <TextInput
              style={styles.incrementInput}
              value={incrementText}
              onChangeText={handleTextChange}
              placeholder="0"
              keyboardType="numeric"
            />
            
            {QUANTITY_CONFIG.POSITIVE_BUTTON_VALUES.map((value, index) => (
              <React.Fragment key={value}>
                {createButton(value, styles.positiveButtonText, false, index === QUANTITY_CONFIG.POSITIVE_BUTTON_VALUES.length - 1)}
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
              keyboardType="numeric"
            />
          </View>
        </>
      )}
    </View>
  );
});

