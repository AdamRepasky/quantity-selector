import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';

interface ResultingQuantityInputProps {
  resultingText: string;
  onChangeText: (text: string) => void;
}

/**
 * Input field for the resulting quantity
 */
export const ResultingQuantityInput = ({ resultingText, onChangeText }: ResultingQuantityInputProps) => (
  <View style={styles.resultingQuantityContainer}>
    <Text style={styles.resultingQuantityText}>
      Resulting Quantity:
    </Text>
    <TextInput
      style={styles.resultingInput}
      value={resultingText}
      onChangeText={onChangeText}
      placeholder="0"
      placeholderTextColor={styles.resultingInputPlaceholder.color}
      keyboardType="numeric"
    />
  </View>
);
