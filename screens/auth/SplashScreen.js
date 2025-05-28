import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to LoginScreen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo Placeholder</Text>
      </View>
      <Text style={styles.centeredText}>Swipe.Match.MoveIn</Text>
      <Text style={styles.bottomText}>ROOMER BY RUMOURS</Text>
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
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 75,
    marginBottom: 20,
  },
  logoText: {
    color: 'white',
    fontSize: 16,
  },
  centeredText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Dimensions.get('window').height * 0.2,
  },
  bottomText: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
    bottom: 20,
  },
});

export default SplashScreen;
