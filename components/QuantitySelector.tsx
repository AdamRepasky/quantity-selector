import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QuantitySelectorProps } from '../types';

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
  // TODO: Implement increment/decrement handlers
  const handleButtonPress = (value: number) => {
    // TODO: Implement button press logic
  };

  return (
    <View style={[styles.container, style]}>
      {/* TODO: Current amount display */}
      <View style={styles.currentAmountContainer}>
        <Text style={styles.currentAmountText}>
          Current Quantity: {currentAmount}
        </Text>
      </View>

      {/* TODO: 6 horizontal increment/decrement buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress(-10)}
          // TODO: Implement -10 functionality
        >
          <Text style={styles.buttonText}>-10</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress(-5)}
          // TODO: Implement -5 functionality
        >
          <Text style={styles.buttonText}>-5</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress(-1)}
          // TODO: Implement -1 functionality
        >
          <Text style={styles.buttonText}>-1</Text>
        </TouchableOpacity>
        
        <View style={styles.incrementDisplay}>
          <Text style={styles.incrementText}>
            {resultingQuantity - currentAmount > 0 ? `+${resultingQuantity - currentAmount}` : resultingQuantity - currentAmount}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress(1)}
          // TODO: Implement +1 functionality
        >
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress(5)}
          // TODO: Implement +5 functionality
        >
          <Text style={styles.buttonText}>+5</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress(10)}
          // TODO: Implement +10 functionality
        >
          <Text style={styles.buttonText}>+10</Text>
        </TouchableOpacity>
      </View>

      {/* TODO: Resulting quantity display */}
      <View style={styles.resultingQuantityContainer}>
        <Text style={styles.resultingQuantityText}>
          Resulting quantity: {resultingQuantity}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#0056CC',
    minWidth: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  incrementDisplay: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#0056CC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incrementText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  incrementValueText: {
    // TODO: Add increment value text styles (removed since we now use buttons)
  },
  resultingQuantityContainer: {
    // TODO: Add resulting quantity styles
  },
  resultingQuantityText: {
    // TODO: Add resulting quantity text styles
  },
});
