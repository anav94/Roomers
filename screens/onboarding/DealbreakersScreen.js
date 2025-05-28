import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const DealbreakersScreen = () => {
  const navigation = useNavigation(); // Get navigation object
  const [customDealbreaker, setCustomDealbreaker] = useState("");
  const [selectedDealbreaker, setSelectedDealbreaker] = useState(null);
  const [dealbreakers, setDealbreakers] = useState([
    "Loud chewing is a major ick",
    "Leaving toothpaste in the sink is kinda sus",
    "Short texts give me the ick",
    "Clothes on the floor is not the vibe",
    "Not keeping your space clean is a red flag",
    "Loud videos at night are a vibe killer",
    "Borrowing stuff without asking is not it",
  ]);

  const handleDealbreakerPress = (item) => {
    setCustomDealbreaker(item);
    setSelectedDealbreaker(item);
  };

  const handleAddDealbreaker = () => {
    if (customDealbreaker.trim()) {
      setDealbreakers([...dealbreakers, customDealbreaker]);
      setCustomDealbreaker("");
      setSelectedDealbreaker(null);
    }
  };

  const handleSubmit = () => {
    // Navigate to APILinkScreen when submit is clicked
    navigation.navigate("ApiLinkScreen");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dealbreakers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDealbreakerPress(item)}>
            <View style={[styles.dealbreakerContainer, selectedDealbreaker === item && styles.selectedDealbreaker]}>
              <Text style={styles.dealbreaker}>{item}</Text>
              <View style={styles.separator} />
            </View>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your own dealbreaker..."
        placeholderTextColor="#888"
        value={customDealbreaker}
        onChangeText={setCustomDealbreaker}
      />


      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Next</Text>
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
  dealbreakerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  selectedDealbreaker: {
    backgroundColor: "#333",
  },
  dealbreaker: {
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
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: "#28a745",
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

export default DealbreakersScreen;