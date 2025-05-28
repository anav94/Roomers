import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const LikesScreen = ({ navigation }) => {
  const locations = [
    "New York", "Los Angeles", "Chicago", "Houston",
    "Phoenix", "Philadelphia", "San Antonio", "San Diego"
  ];

  const getRandomLocation = () => locations[Math.floor(Math.random() * locations.length)];

  // State for users who liked you
  const [likes, setLikes] = useState([
    { id: '1', name: 'Michael', age: 32, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Sophia', age: 28, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', name: 'Liam', age: 25, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', name: 'Olivia', age: 30, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '5', name: 'Noah', age: 27, image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: '6', name: 'Emma', age: 24, image: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: '7', name: 'Lucas', age: 29, image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: '8', name: 'Ava', age: 26, image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  ]);

  // State for matched users (to be used in ChatScreen)
  const [matches, setMatches] = useState([]);

  // Handle match - move user from likes to chat
  const handleProfilePress = (user) => {
    alert(`It's a match with ${user.name}!`);

    // Remove from Likes
    setLikes(likes.filter((u) => u.id !== user.id));

    // Add to matches
    setMatches([...matches, user]);

    // Navigate to ChatScreen
    navigation.navigate('Chat', { user });
  };

  const renderProfile = (user) => (
    <TouchableOpacity
      key={user.id}
      style={styles.halfContainer}
      onPress={() => handleProfilePress(user)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: user.image }} style={styles.personImage} resizeMode="cover" />
      <Text style={styles.containerText}>{user.name}, {user.age}</Text>
      <Text style={styles.locationText}>{getRandomLocation()}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}></Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.boldNumber}>{likes.length}</Text>
        
        {/* Render Profiles in rows of 2 */}
        {likes.reduce((rows, item, index, array) => {
          if (index % 2 === 0) rows.push(array.slice(index, index + 2));
          return rows;
        }, []).map((pair, idx) => (
          <View style={styles.rowContainer} key={idx}>
            {pair.map(renderProfile)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingBottom: 20 },
  container: { alignItems: 'center', backgroundColor: 'black', paddingTop: 30 },
  headerText: { color: 'white', fontSize: 18, marginBottom: 5 },
  horizontalLine: { width: '80%', height: 1, backgroundColor: 'gray', marginBottom: 20 },
  boldNumber: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '93%', marginBottom: 10 },
  halfContainer: { flex: 1, backgroundColor: '#E195AB', marginHorizontal: 5, borderRadius: 10, padding: 10, alignItems: 'center', height: 220 },
  containerText: { color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' },
  personImage: { width: '100%', height: 140, borderRadius: 10 },
  locationText: { color: 'white', fontSize: 14, marginTop: 3, fontStyle: 'italic' },
});

export default LikesScreen;
