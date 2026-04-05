import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QuantitySelectorProps } from '../types';

// TODO: Implement the quantity selector component
// Structure:
// - Top: Current amount display
// - Middle: Horizontal increment/decrement buttons with value in between
// - Bottom: Resulting quantity display

export default function QuantitySelector({
  currentAmount,
  resultingQuantity,
  incrementValue,
  onAmountChange,
  style,
}: QuantitySelectorProps) {
  // TODO: Implement increment/decrement handlers
  const handleIncrement = () => {
    // TODO: Implement increment logic
  };

  const handleDecrement = () => {
    // TODO: Implement decrement logic
  };

  return (
    <View style={[styles.container, style]}>
      {/* TODO: Current amount display */}
      <View style={styles.currentAmountContainer}>
        <Text style={styles.currentAmountText}>
          {/* TODO: Display current amount */}
        </Text>
      </View>

      {/* TODO: Increment/decrement controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleDecrement}
          // TODO: Implement decrement functionality
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.incrementValueText}>
          {/* TODO: Display increment value */}
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleIncrement}
          // TODO: Implement increment functionality
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* TODO: Resulting quantity display */}
      <View style={styles.resultingQuantityContainer}>
        <Text style={styles.resultingQuantityText}>
          {/* TODO: Display resulting quantity */}
        </Text>
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
    // TODO: Add current amount styles
  },
  currentAmountText: {
    // TODO: Add current amount text styles
  },
  controlsContainer: {
    // TODO: Add controls container styles (horizontal layout)
  },
  button: {
    // TODO: Add button styles
  },
  buttonText: {
    // TODO: Add button text styles
  },
  incrementValueText: {
    // TODO: Add increment value text styles
  },
  resultingQuantityContainer: {
    // TODO: Add resulting quantity styles
  },
  resultingQuantityText: {
    // TODO: Add resulting quantity text styles
  },
});
