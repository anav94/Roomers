import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    if (route.params?.user) {
      setMatchedUsers((prevUsers) => [...prevUsers, route.params.user]);
    }
  }, [route.params?.user]);

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => navigation.navigate('ChatsDetailScreen', { user: item })}
    >
      <Image source={{ uri: item.image }} style={styles.profilePicture} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.lastMessage}>Start chatting now!</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={matchedUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEDFA' },
  userContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFFFFF', marginHorizontal: 10, marginVertical: 5, borderRadius: 10, elevation: 2 },
  profilePicture: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { color: '#E195AB', fontSize: 18, fontWeight: 'bold' },
  lastMessage: { color: '#888', fontSize: 14 },
  separator: { height: 1, backgroundColor: '#E195AB', marginHorizontal: 15 },
});

export default ChatScreen;
