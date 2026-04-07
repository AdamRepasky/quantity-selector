import React from 'react';
import type { TextStyle } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';
import { formatIncrementText } from '../utils/quantityUtils';

interface ButtonProps {
  value: number;
  textStyle?: TextStyle;
  isFirst?: boolean;
  isLast?: boolean;
  onPress: (value: number) => void;
}

/**
 * Creates a styled increment/decrement button component
 */
export const QuantityButton = ({ value, textStyle, isFirst, isLast, onPress }: ButtonProps) => (
  <TouchableOpacity 
    style={[
      styles.button,
      isFirst && styles.firstButton,
      isLast && styles.lastButton
    ]}
    onPress={() => onPress(value)}
  >
    <Text style={[styles.buttonText, textStyle]}>
      {formatIncrementText(value)}
    </Text>
  </TouchableOpacity>
);
