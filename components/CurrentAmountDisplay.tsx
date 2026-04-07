import React from 'react';
import { Text, View } from 'react-native';
import { quantitySelectorStyles as styles } from './styles/QuantitySelector.styles';

interface CurrentAmountDisplayProps {
  currentAmount: number;
}

/**
 * Displays the current quantity amount
 */
export const CurrentAmountDisplay = ({ currentAmount }: CurrentAmountDisplayProps) => (
  <View style={styles.currentAmountContainer}>
    <Text style={styles.currentAmountText}>
      Current Quantity:
    </Text>
    <Text style={styles.currentAmountValue}>
      {currentAmount}
    </Text>
  </View>
);
