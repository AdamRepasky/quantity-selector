// Type definitions for the quantity selector component

export interface QuantitySelectorProps {
  // Current amount displayed at the top
  currentAmount: number;
  
  // Callback when amount changes
  onAmountChange?: (newAmount: number) => void;
  
  // Optional styling props
  style?: any;
}

export interface FoodProductProps {
  // Product information
  name: string;
  price: number;
  initialQuantity?: number;
  
  // Callbacks for save/cancel actions
  onSave?: (quantity: number) => void;
  onCancel?: () => void;
  
  // Optional styling props
  style?: any;
}
