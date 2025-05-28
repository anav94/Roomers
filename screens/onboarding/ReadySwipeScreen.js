import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../AuthContext';
import { getRegistrationProgress } from '../../registrationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ReadySwipeScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const { token, setToken } = useContext(AuthContext); // Ensure token is extracted

  useEffect(() => {
    if (token) {
      navigation.navigate("HomeScreen");
    }
  }, [token]); // Trigger navigation when token updates

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const screens = [
        'Login',
        'BasicInfoScreen',
        'CourseYearScreen',
        'LocalityLanguageScreen',
        'UploadPhotosScreen',
        'InterestsScreen',
        'HabitsScreen',
        'IcebreakersScreen',
        'DealbreakersScreen',
        'ApiLinkScreen',
      ];

      let collectedData = {};

      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          collectedData = { ...collectedData, ...screenData };
        }
      }

      setUserData(collectedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const clearAllScreenData = async () => {
    try{
      const screens = [
        'Login',
        'BasicInfoScreen',
        'CourseYearScreen',
        'LocalityLanguageScreen',
        'UploadPhotosScreen',
        'InterestsScreen',
        'HabitsScreen',
        'IcebreakersScreen',
        'DealbreakersScreen',
        'ApiLinkScreen',
      ];

      for(const screenName of screens){
        const key = 'registration_progress_${screenName}';
        await AsyncStorage.removeItem(key)

      };

      console.log("All screen data cleared")

    } catch(error){
      console.log("error", error)
    }
  };

  console.log(userData)

  const registerUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/register", userData);

      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem("token", token);
        setToken(token);
        console.log("User registered successfully");
        navigation.navigate('HomeScreen'); // Navigate after successful registration
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready?</Text>
      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>Swipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E195AB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ReadySwipeScreen;
