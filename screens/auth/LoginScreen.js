import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { saveRegistrationProgress, getRegistrationProgress } from '../../registrationUtils';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load saved email and password when the screen loads
  useEffect(() => {
    const loadSavedData = async () => {
      const savedEmail = await getRegistrationProgress('email');
      const savedPassword = await getRegistrationProgress('password');

      if (savedEmail) {
        setEmail(savedEmail);
        console.log('Retrieved Email:', savedEmail);
      }
      if (savedPassword) {
        setPassword(savedPassword);
        console.log('Retrieved Password:', savedPassword);
      }
    };
    loadSavedData();
  }, []);

  const handleLogin = async () => {
    if (email && password) {
      await saveRegistrationProgress('email', email);
      await saveRegistrationProgress('password', password);
      console.log('Saved Email:', email);
      console.log('Saved Password:', password);
      navigation.navigate('HomeScreen');
    } else {
      console.log('Please enter email and password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}></Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bbb"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bbb"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('BasicInfoScreen')}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
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
  titleContainer: {
    position: 'absolute',
    top: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  createAccountButton: {
    backgroundColor: '#E195AB',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  createAccountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#bbb',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
