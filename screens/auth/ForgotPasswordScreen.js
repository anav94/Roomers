import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        We will send you an email with a link to reset your password, please enter the email associated with your account below.
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#bbb"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Send Link Button */}
      <TouchableOpacity style={styles.sendButton} onPress={() => alert('Reset link sent!')}>
        <Text style={styles.sendButtonText}>Send Link</Text>
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
  message: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
