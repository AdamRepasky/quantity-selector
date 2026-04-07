import React, { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { FoodProductProps } from '../types';
import QuantitySelector, { QuantitySelectorRef } from './QuantitySelector';
import { foodProductDemoStyles as styles } from './styles/FoodProductDemo.styles';

// API constants
const API_CONFIG = {
  API_SUCCESS_RATE: 0.99,
  NETWORK_DELAY_MS: 1500,
} as const;

// TypeScript interfaces
interface ApiResponse {
  success: boolean;
  quantity: number;
  productName: string;
  timestamp: Date;
}

// TODO: Implement the food product demonstration page
// This will showcase the quantity selector component in a realistic context

export default function FoodProductDemo({
  name,
  price,
  initialQuantity = 0,
  onSave,
  onCancel,
  style,
}: FoodProductProps) {
  const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);
  const [isSaving, setIsSaving] = useState(false);
  const quantitySelectorRef = useRef<QuantitySelectorRef>(null);

  // Simulate async API call to save quantity
  const simulateApiCall = async (quantity: number): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.NETWORK_DELAY_MS));
    
    // Simulate API success using configured success rate
    const isSuccess = Math.random() < API_CONFIG.API_SUCCESS_RATE;
    
    if (isSuccess) {
      const response: ApiResponse = {
        success: true,
        quantity,
        productName: name,
        timestamp: new Date()
      };
      console.log(`API: Saved quantity ${quantity} for product "${name}"`);
      return true;
    } else {
      console.error('API: Failed to save quantity');
      return false;
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      // Get the current quantity from the QuantitySelector
      const quantityToSave = quantitySelectorRef.current?.getCurrentValue() ?? currentQuantity;
      const success = await simulateApiCall(quantityToSave);
      
      if (success) {
        // Update the local state only after successful save
        setCurrentQuantity(quantityToSave);
        
        // Reset the increment in QuantitySelector to zero and update resulting quantity
        quantitySelectorRef.current?.resetIncrement(quantityToSave);
        
        Alert.alert(
          'Success',
          `Saved ${quantityToSave} items for "${name}"`,
          [{ text: 'OK', onPress: () => onSave?.(quantityToSave) }]
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to save quantity. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset the QuantitySelector to the current amount
    quantitySelectorRef.current?.resetIncrement(currentQuantity);
    // Call the onCancel callback if provided
    onCancel?.();
  };

  return (
    <View style={[styles.container, style]}>
      {/* Product information section */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
        <Text style={styles.totalPrice}>
          Total: ${(price * currentQuantity).toFixed(2)}
        </Text>
      </View>

      {/* Quantity selector component */}
      <QuantitySelector
        ref={quantitySelectorRef}
        currentAmount={currentQuantity}
      />

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={isSaving}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

