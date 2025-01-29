// src/navigation/OnboardingStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import EmailScreen from '../screens/onboarding/EmailScreen';
import PhoneScreen from '../screens/onboarding/PhoneScreen';
import NameScreen from '../screens/onboarding/NameScreen';
import DOBScreen from '../screens/onboarding/DOBScreen';
import HometownScreen from '../screens/onboarding/HometownScreen';

const Stack = createStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="DOB" component={DOBScreen} />
      <Stack.Screen name="Hometown" component={HometownScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;