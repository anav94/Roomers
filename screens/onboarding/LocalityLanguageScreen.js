import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { saveRegistrationProgress, getRegistrationProgress } from '../../registrationUtils';

const LocalityLanguageScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [religion, setReligion] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');

  // Load saved data when the screen loads
  useEffect(() => {
    const loadSavedData = async () => {
      const savedLocation = await getRegistrationProgress('location');
      const savedReligion = await getRegistrationProgress('religion');
      const savedPreferredLanguage = await getRegistrationProgress('preferredLanguage');

      if (savedLocation) setLocation(savedLocation);
      if (savedReligion) setReligion(savedReligion);
      if (savedPreferredLanguage) setPreferredLanguage(savedPreferredLanguage);
    };
    loadSavedData();
  }, []);

  const handleSubmit = async () => {
    // Save the entered data
    await saveRegistrationProgress('location', location);
    await saveRegistrationProgress('religion', religion);
    await saveRegistrationProgress('preferredLanguage', preferredLanguage);

    // Navigate to the next screen (CourseYearScreen)
    navigation.navigate('CourseYearScreen');
  };

  return (
    <View style={styles.container}>
      {/* Location */}
      <TextInput
        style={styles.input}
        placeholder="Where are you from?"
        placeholderTextColor="#bbb"
        value={location}
        onChangeText={setLocation}
      />

      {/* Religion */}
      <TextInput
        style={styles.input}
        placeholder="Religion"
        placeholderTextColor="#bbb"
        value={religion}
        onChangeText={setReligion}
      />

      {/* Preferred Language */}
      <TextInput
        style={styles.input}
        placeholder="Preferred Language"
        placeholderTextColor="#bbb"
        value={preferredLanguage}
        onChangeText={setPreferredLanguage}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocalityLanguageScreen;
