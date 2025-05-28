import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { saveRegistrationProgress, getRegistrationProgress } from "../../registrationUtils"; // Import utility functions

const habits = [
  'Early Bird', 'Night Owl', 'Clean Freak', 'Introverted', 'Extroverted', 
  'Drink', 'Smoke', 'Light Sleeper', 'Chill Evenings', 'Party Animal', 'Communal'
];

const HabitsScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);

  // Load saved selected habits on screen load
  useEffect(() => {
    const loadSelectedHabits = async () => {
      const savedHabits = await getRegistrationProgress('selectedHabits');
      if (savedHabits) {
        setSelected(savedHabits);
      }
    };
    loadSelectedHabits();
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

    // Save the updated selected habits to local storage
    saveRegistrationProgress('selectedHabits', newSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose 5 habits that describe you</Text>
      <Text style={styles.subtitle}>Select habits to personalize your profile</Text>
      <TextInput 
        placeholder="What are your habits?"
        placeholderTextColor="#999"
        style={styles.searchBar} 
      />
      <FlatList
        data={habits}
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
        disabled={selected.length < 5}
        onPress={() => navigation.navigate('IcebreakersScreen')}
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
    backgroundColor: '#007AFF', 
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

export default HabitsScreen;
