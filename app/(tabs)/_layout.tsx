import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StatusBar } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: '#1C1C1E',
            borderTopWidth: 0,
            position: Platform.select({
              ios: 'absolute',
              default: 'relative',
            }),
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: 'Portfolio',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder.fill" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}