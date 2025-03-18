import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom dark theme with #1e1e1e background
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1e1e1e',
    card: '#1e1e1e',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Determine which theme to use
  const theme = colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme;
  
  // Get the correct background color based on the theme
  const backgroundColor = colorScheme === 'dark' ? '#1e1e1e' : '#fff';

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <SafeAreaView 
          style={{ 
            flex: 1, 
            backgroundColor: backgroundColor
          }}
          edges={['top', 'right', 'left']}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              presentation: 'card',
              animationDuration: 200,
              // Remove the headerStyle property that's causing the error
              contentStyle: {
                backgroundColor: backgroundColor,
              },
            }}>
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
                animation: 'fade',
              }} 
            />
            <Stack.Screen 
              name="+not-found" 
              options={{
                animation: 'slide_from_right',
              }}
            />
          </Stack>
        </SafeAreaView>
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}