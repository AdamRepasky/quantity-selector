import { Dimensions, StyleSheet } from 'react-native';

// Responsive sizing based on screen width
const screenWidth = Dimensions.get('window').width;
const buttonWidth = Math.min(60, screenWidth / 8);
const inputWidth = Math.min(70, screenWidth / 6);

export const quantitySelectorStyles = StyleSheet.create({
  container: {
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  loaderText: {
    fontSize: 16,
    color: '#666',
  },
  currentAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentAmountText: {
    position: 'absolute',
    right: '60%',
    fontSize: 12,
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
    zIndex: 1,
  },
  incrementInputPlaceholder: {
    color: '#999',
  },
  resultingQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: inputWidth,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  resultingInputPlaceholder: {
    color: '#999',
  },
});
