import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './AuthContext'; // Adjust the path

import LoginScreen from './screens/auth/LoginScreen';
import SplashScreen from './screens/auth/SplashScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';

import BasicInfoScreen from './screens/onboarding/BasicInfoScreen';
import CourseYearScreen from './screens/onboarding/CourseYearScreen';
import LocalityLanguageScreen from './screens/onboarding/LocalityLanguageScreen'
import UploadPhotosScreen from './screens/onboarding/UploadPhotos';
import InterestsScreen from './screens/onboarding/InterestsScreen';
import HabitsScreen from './screens/onboarding/HabitsScreen';
import IcebreakersScreen from './screens/onboarding/IcebreakersScreen';
import DealbreakersScreen from './screens/onboarding/DealbreakersScreen';
import ApiLinkScreen from './screens/onboarding/ApiLinkScreen';
import ReadySwipeScreen from './screens/onboarding/ReadySwipeScreen';

import HomeScreen from './screens/main/HomeScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import ChatsScreen from './screens/main/ChatsScreen';
import LikesScreen from './screens/main/LikesScreen';
import ChatsDetailScreen from './screens/main/ChatsDetailScreen';
import SettingsScreen from './screens/main/SettingsScreen.js';

import { MatchesProvider } from './MatchesContext';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Roomers" 
    //screenOptions={{ headerShown: false }}
     >
      <Stack.Screen name="Roomers" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />
      <Stack.Screen name="CourseYearScreen" component={CourseYearScreen} />
      <Stack.Screen name="LocalityLanguageScreen" component={LocalityLanguageScreen} />
      <Stack.Screen name="UploadPhotosScreen" component={UploadPhotosScreen} />
      <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
      <Stack.Screen name="HabitsScreen" component={HabitsScreen} />
      <Stack.Screen name="IcebreakersScreen" component={IcebreakersScreen} />
      <Stack.Screen name="DealbreakersScreen" component={DealbreakersScreen} />    
      <Stack.Screen name ="ApiLinkScreen" component={ApiLinkScreen} />
      <Stack.Screen name="ReadySwipeScreen" component={ReadySwipeScreen} />
      <Stack.Screen name ="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      <Stack.Screen name="LikesScreen" component={LikesScreen} />
      <Stack.Screen name ="ChatsDetailScreen" component ={ChatsDetailScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;