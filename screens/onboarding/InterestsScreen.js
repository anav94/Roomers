import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { saveRegistrationProgress, getRegistrationProgress } from "../../registrationUtils"; // Import utility functions

const interests = [
  'Gym', 'Football', 'Cricket', 'F1', 'Art', 'Fashion', 'Makeup', 'Skincare', 'Kpop', 'Anime', 'Veg', 'Movie Buff', 'City Breaks', 'Coffee Runs', 
];

const InterestsScreen = ({ navigation }) => {
  const [selected, setSelected] = useState([]);

  // Load saved selected interests on screen load
  useEffect(() => {
    const loadSelectedInterests = async () => {
      const savedInterests = await getRegistrationProgress('selectedInterests');
      if (savedInterests) {
        setSelected(savedInterests);
      }
    };
    loadSelectedInterests();
  }, []);

  const toggleSelect = (item) => {
    let newSelected;
    if (selected.includes(item)) {
      newSelected = selected.filter(i => i !== item);
    } else if (selected.length < 5) {
      newSelected = [...selected, item];
    } else {
      return; // Prevent selecting more than 5
    }
    setSelected(newSelected);

    // Save the updated selected interests to local storage
    saveRegistrationProgress('selectedInterests', newSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose 5 things you're really into</Text>
      <Text style={styles.subtitle}>Select interests to personalize your profile</Text>
      <TextInput 
        placeholder="What are you into?"
        placeholderTextColor="#999"
        style={styles.searchBar} 
      />
      <FlatList
        data={interests}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, selected.includes(item) && styles.selectedButton]}
            onPress={() => toggleSelect(item)}
          >
            <Text style={[styles.buttonText, selected.includes(item) && styles.selectedText]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.progress}>{selected.length}/5 selected</Text>
      <TouchableOpacity 
        style={[styles.submitButton, selected.length < 5 && styles.disabledButton]} 
        onPress={() => {
          if (selected.length >= 5) {
            navigation.navigate('HabitsScreen');
          }
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  subtitle: { fontSize: 14, color: '#fff', marginBottom: 20 },
  searchBar: { 
    borderWidth: 1, 
    borderColor: '#333', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    color: '#fff'
  },
  button: { 
    flex: 1, 
    padding: 10, 
    margin: 5, 
    borderWidth: 1, 
    borderColor: '#333', 
    borderRadius: 20, 
    alignItems: 'center' 
  },
  selectedButton: { 
    backgroundColor: '#fff', 
    borderColor: '#fff' 
  },
  buttonText: { 
    fontSize: 16, 
    color: '#fff' 
  },
  selectedText: { 
    color: '#000', 
    fontWeight: 'bold'
  },
  progress: { 
    textAlign: 'center', 
    marginVertical: 10, 
    color: '#fff' 
  },
  submitButton: { 
    backgroundColor: '#E195AB', 
    padding: 15, 
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 10 
  },
  disabledButton: {
    backgroundColor: '#4a4a4a',
  },
  submitButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});

export default InterestsScreen;
