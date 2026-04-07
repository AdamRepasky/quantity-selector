import React from 'react';
import { TextInput, View } from 'react-native';
import { QUANTITY_CONFIG } from '../constants/quantityConfig';
import { QuantityButton } from './QuantityButton';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';

interface IncrementControlsProps {
  incrementText: string;
  onTextChange: (text: string) => void;
  onButtonPress: (value: number) => void;
}

/**
 * Controls for increment/decrement buttons and input field
 */
export const IncrementControls = ({ incrementText, onTextChange, onButtonPress }: IncrementControlsProps) => (
  <View style={styles.controlsContainer}>
    {QUANTITY_CONFIG.NEGATIVE_BUTTON_VALUES.map((value, index) => (
      <QuantityButton
        key={value}
        value={value}
        textStyle={styles.negativeButtonText}
        isFirst={index === 0}
        isLast={false}
        onPress={onButtonPress}
      />
    ))}
    
    <TextInput
      style={styles.incrementInput}
      value={incrementText}
      onChangeText={onTextChange}
      placeholder={QUANTITY_CONFIG.DEFAULT_INCREMENT.toString()}
      placeholderTextColor={styles.incrementInputPlaceholder.color}
      keyboardType="numeric"
    />
    
    {QUANTITY_CONFIG.POSITIVE_BUTTON_VALUES.map((value, index) => (
      <QuantityButton
        key={value}
        value={value}
        textStyle={styles.positiveButtonText}
        isFirst={false}
        isLast={index === QUANTITY_CONFIG.POSITIVE_BUTTON_VALUES.length - 1}
        onPress={onButtonPress}
      />
    ))}
  </View>
);
