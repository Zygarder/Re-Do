import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // 1. Make the bar itself black
        tabBarStyle: { 
          backgroundColor: '#000', 
          borderTopColor: '#222' // Subtle line separating the screen and tabs
        },
        // 2. Active tab color (your nice blue)
        tabBarActiveTintColor: '#A1CEDC', 
        // 3. Inactive tab color
        tabBarInactiveTintColor: '#666',
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'To-do:',
          tabBarIcon: ({ color }) => <Fontisto name="checkbox-passive" size={24} color={color } />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Completed:',
          tabBarIcon: ({ color }) => <Fontisto name="checkbox-active" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}