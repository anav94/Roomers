import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { saveRegistrationProgress, getRegistrationProgress } from "../../registrationUtils";

const Icebreakers = () => {
  const navigation = useNavigation();
  const [customQuestion, setCustomQuestion] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([
    "How often do you like having friends over?",
    "Do you like sharing your stuff, or do you prefer keeping things separate?",
    "What's your favourite show/movie?",
    "What's a song you can't get out of your head currently?",
    "Are you religious?",
    "How much personal space do you need?",
    "Is it okay if I borrow your things occasionally?",
    "Do you like spending time together, or do you prefer doing your own thing?",
  ]);

  const MAX_QUESTIONS = 10; // Set the maximum number of questions

  useEffect(() => {
    const loadSavedData = async () => {
      const savedQuestions = await getRegistrationProgress("icebreakerQuestions");
      const savedSelectedQuestion = await getRegistrationProgress("selectedIcebreaker");
      if (savedQuestions) setQuestions(savedQuestions);
      if (savedSelectedQuestion) setSelectedQuestion(savedSelectedQuestion);
    };
    loadSavedData();
  }, []);

  const handleAddQuestion = () => {
    const trimmedQuestion = customQuestion.trim();

    // Check if the maximum number of questions has been reached
    if (questions.length >= MAX_QUESTIONS) {
      Alert.alert("Limit Reached", `You can only add up to ${MAX_QUESTIONS} questions.`);
      return;
    }

    // Check if the question is unique
    if (trimmedQuestion && !questions.includes(trimmedQuestion)) {
      const updatedQuestions = [...questions, trimmedQuestion];
      setQuestions(updatedQuestions);
      saveRegistrationProgress("icebreakerQuestions", updatedQuestions);
    }

    setCustomQuestion("");
    Keyboard.dismiss();
  };

  const handleQuestionPress = (item) => {
    setSelectedQuestion(item);
    setCustomQuestion("");
  };

  const handleSubmit = async () => {
    await saveRegistrationProgress("selectedIcebreaker", selectedQuestion);
    navigation.navigate("DealbreakersScreen");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleQuestionPress(item)}>
            <View style={[styles.questionContainer, selectedQuestion === item && styles.selectedQuestion]}>
              <Text style={styles.question}>{item}</Text>
              <View style={styles.separator} />
            </View>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your own question..."
        placeholderTextColor="#888"
        value={customQuestion}
        onChangeText={setCustomQuestion}
        onSubmitEditing={handleAddQuestion}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  questionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  selectedQuestion: {
    backgroundColor: "#333",
  },
  question: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#444",
    marginTop: 5,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Icebreakers;