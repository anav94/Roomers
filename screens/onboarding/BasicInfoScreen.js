import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { saveRegistrationProgress, getRegistrationProgress } from '../../registrationUtils';

const BasicInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [dobModalVisible, setDobModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  // Load saved basic info when the screen loads
  useEffect(() => {
    const loadSavedData = async () => {
      const savedFirstName = await getRegistrationProgress('firstName');
      const savedLastName = await getRegistrationProgress('lastName');
      const savedPhoneNo = await getRegistrationProgress('phoneNo');
      const savedDob = await getRegistrationProgress('dob');
      const savedGender = await getRegistrationProgress('gender');

      if (savedFirstName) setFirstName(savedFirstName);
      if (savedLastName) setLastName(savedLastName);
      if (savedPhoneNo) setPhoneNo(savedPhoneNo);
      if (savedDob) setDob(new Date(savedDob));
      if (savedGender) setGender(savedGender);
    };
    loadSavedData();
  }, []);

  const handleSubmit = async () => {
    // Save the basic info
    await saveRegistrationProgress('firstName', firstName);
    await saveRegistrationProgress('lastName', lastName);
    await saveRegistrationProgress('phoneNo', phoneNo);
    await saveRegistrationProgress('dob', dob.toISOString());
    await saveRegistrationProgress('gender', gender);

    // Navigate to the next screen
    navigation.navigate('LocalityLanguageScreen');
  };

  return (
    <View style={styles.container}>
      {/* First Name and Last Name */}
      <View style={styles.nameContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="First Name"
          placeholderTextColor="#bbb"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Last Name"
          placeholderTextColor="#bbb"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      {/* Phone Number with +91 prefix */}
      <View style={styles.phoneContainer}>
        <Text style={styles.phonePrefix}>+91</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Phone Number"
          placeholderTextColor="#bbb"
          value={phoneNo}
          onChangeText={setPhoneNo}
          keyboardType="phone-pad"
        />
      </View>

      {/* Date of Birth Picker */}
      <Text style={styles.label}>Date of Birth:</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setDobModalVisible(true)}
      >
        <Text style={styles.pickerButtonText}>
          {dob.toDateString()}
        </Text>
      </TouchableOpacity>
      
      {/* Date Picker Modal */}
      <Modal visible={dobModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker date={dob} mode="date" onDateChange={setDob} />
            <Button title="Done" onPress={() => setDobModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Gender Selection */}
      <Text style={styles.label}>Gender:</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setGenderModalVisible(true)}
      >
        <Text style={styles.pickerButtonText}>
          {gender || 'Gender'}
        </Text>
      </TouchableOpacity>

      {/* Gender Picker Modal */}
      <Modal visible={genderModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
              dropdownIconColor="black"
              mode="dropdown"
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <Button title="Done" onPress={() => setGenderModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  phonePrefix: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#222', // Changed to gray
    color: 'white', // Changed to white
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  pickerButton: {
    width: '100%',
    backgroundColor: '#222', // Changed to gray
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  picker: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: 'blue', // Already blue
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

export default BasicInfoScreen;
