import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { QuantitySelectorProps } from '../types';

// Responsive sizing based on screen width
const screenWidth = Dimensions.get('window').width;
const buttonWidth = Math.min(60, screenWidth / 8);
const inputWidth = Math.min(70, screenWidth / 6);

// TODO: Implement the quantity selector component
// Structure:
// - Top: Current amount display
// - Middle: 6 horizontal buttons (-10, -5, -1, [change amount], +1, +5, +10)
// - Bottom: Resulting quantity display

export default function QuantitySelector({
  currentAmount,
  resultingQuantity,
  incrementValue,
  onAmountChange,
  style,
}: QuantitySelectorProps) {
  // State for tracking the increment value
  const [increment, setIncrement] = useState(0);
  
  // State for text input
  const [incrementText, setIncrementText] = useState('0');
  
  // State for resulting quantity text input
  const [resultingText, setResultingText] = useState(currentAmount.toString());
  
  // Calculate resulting quantity (current + increment)
  const calculatedResultingQuantity = currentAmount + increment;

  // Handle button press to update increment value
  const handleButtonPress = (value: number) => {
    const newIncrement = increment + value;
    setIncrement(newIncrement);
    setIncrementText(newIncrement > 0 ? `+${newIncrement}` : newIncrement.toString());
    const newResulting = currentAmount + newIncrement;
    setResultingText(newResulting.toString());
    onAmountChange?.(newResulting);
  };

  // Handle text input change
  const handleTextChange = (text: string) => {
    // Allow only numbers, +, and -
    const cleanedText = text.replace(/[^0-9+-]/g, '');
    setIncrementText(cleanedText);
    
    // Convert text to number
    const numericValue = parseInt(cleanedText) || 0;
    setIncrement(numericValue);
    const newResulting = currentAmount + numericValue;
    setResultingText(newResulting.toString());
    onAmountChange?.(newResulting);
  };

  // Handle resulting quantity change
  const handleResultingChange = (text: string) => {
    // Allow only numbers
    const cleanedText = text.replace(/[^0-9]/g, '');
    setResultingText(cleanedText);
    
    // Convert text to number and ensure non-negative
    const numericValue = Math.max(0, parseInt(cleanedText) || 0);
    const newIncrement = numericValue - currentAmount;
    setIncrement(newIncrement);
    setIncrementText(newIncrement > 0 ? `+${newIncrement}` : newIncrement.toString());
    onAmountChange?.(numericValue);
  };

  // Helper function to create increment/decrement buttons
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
      {/* TODO: Current amount display */}
      <View style={styles.currentAmountContainer}>
        <Text style={styles.currentAmountText}>
          Current Quantity:
        </Text>
        <Text style={styles.currentAmountValue}>
          {currentAmount}
        </Text>
      </View>

      {/* TODO: 6 horizontal increment/decrement buttons */}
      <View style={styles.controlsContainer}>
        {createButton(-10, styles.negativeButtonText, true, false)}
        {createButton(-5, styles.negativeButtonText, false, false)}
        {createButton(-1, styles.negativeButtonText, false, false)}
        
        <TextInput
          style={styles.incrementInput}
          value={incrementText}
          onChangeText={handleTextChange}
          placeholder="0"
          keyboardType="numeric"
        />
        
        {createButton(1, styles.positiveButtonText, false, false)}
        {createButton(5, styles.positiveButtonText, false, false)}
        {createButton(10, styles.positiveButtonText, false, true)}
      </View>

      {/* TODO: Resulting quantity display */}
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
    </View>
  );
}

// TODO: Implement proper styling
const styles = StyleSheet.create({
  container: {
    // TODO: Add container styles
  },
  currentAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // TODO: Add current amount styles
  },
  currentAmountText: {
    position: 'absolute',
    right: '60%',
    fontSize: 12,
    // TODO: Add current amount text styles
  },
  currentAmountValue: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#ebeff2',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#d9dcdf',
    width: buttonWidth,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  lastButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  incrementDisplay: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#d9dcdf',
    paddingHorizontal: 24,
    paddingVertical: 14,
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positiveButtonText: {
    color: '#2e7d32',
  },
  negativeButtonText: {
    color: '#ef5350',
  },
  incrementInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9dcdf',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: inputWidth,
    height: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  resultingQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // TODO: Add resulting quantity styles
  },
  resultingQuantityText: {
    position: 'absolute',
    right: '60%',
    fontSize: 12,
  },
  resultingInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9dcdf',
    paddingHorizontal: 8,
    paddingVertical: 6,
    width: 60,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
