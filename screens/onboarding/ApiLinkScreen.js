import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const App = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      <Text style={styles.text}>API to be connected in React Native</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ReadySwipeScreen')} // Navigate to 'NextPage'
      >
        <Text style={styles.buttonText}>Next</Text>
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
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20, // Add some margin below the text
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5, // Add rounded corners
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center text within the button
  },
});

export default App;