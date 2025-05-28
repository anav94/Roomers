import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation
import { saveRegistrationProgress, getRegistrationProgress } from "../../registrationUtils"; // Import utility functions

const CourseYearScreen = () => {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const navigation = useNavigation(); // Get navigation instance

  // Load saved data when the screen loads
  useEffect(() => {
    const loadSavedData = async () => {
      const savedCourse = await getRegistrationProgress("course");
      const savedYear = await getRegistrationProgress("year");

      if (savedCourse) {
        setCourse(savedCourse);
        console.log("Retrieved Course:", savedCourse);
      }
      if (savedYear) {
        setYear(savedYear);
        console.log("Retrieved Year:", savedYear);
      }
    };
    loadSavedData();
  }, []);

  const handleSubmit = async () => {
    if (course && year) {
      // Save the course and year data
      await saveRegistrationProgress("course", course);
      await saveRegistrationProgress("year", year);

      console.log("Saved Course:", course);
      console.log("Saved Year:", year);

      // Navigate to the next screen
      navigation.navigate("UploadPhotosScreen");
    } else {
      console.log("Please enter both course and year.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Course"
        placeholderTextColor="gray"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Current Year"
        placeholderTextColor="gray"
        value={year}
        onChangeText={setYear}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", justifyContent: "center", padding: 20 },
  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  submitButtonText: { color: "white", fontSize: 16 }
});

export default CourseYearScreen;
