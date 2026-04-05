import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Hide splash screen when layout is ready
  SplashScreen.hideAsync();
  return <Stack />;
}
