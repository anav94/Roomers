import * as React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  PanResponder, 
  Animated 
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your other screens
import ChatsScreen from './ChatsScreen';
import LikesScreen from './LikesScreen';
import ProfileScreen from './ProfileScreen';

const SwipeScreen = () => {
  const profiles = [
    { id: 1, name: 'John Doe', age: 25, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', age: 28, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Alex Johnson', age: 22, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Mia Davis', age: 29, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'David Lee', age: 26, image: 'https://via.placeholder.com/150' },
  ];

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9;
  const cardHeight = Dimensions.get('window').height * 0.75;

  const position = React.useRef(new Animated.ValueXY()).current;
  const currentIndex = React.useRef(0);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(position, {
            toValue: { x: screenWidth, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            currentIndex.current = Math.min(currentIndex.current + 1, profiles.length - 1);
            position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: { x: -screenWidth, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            currentIndex.current = Math.max(currentIndex.current - 1, 0);
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={{ height: cardHeight, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
      {profiles.map((profile) => (
        <Animated.View
          key={profile.id}
          style={[
            styles.profileCard,
            {
              width: cardWidth,
              height: cardHeight,
              transform: position.getTranslateTransform(),
              zIndex: profiles.length - profile.id,
              position: 'absolute',
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Added extra container inside the profileCard */}
          <View style={styles.extraContainer}>
            <Text style={styles.extraText}>Extra Container</Text>
          </View>

          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Swipe')}>
        <Text style={[styles.tabIcon, state.index === 0 && styles.activeTab]}>R</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Likes')}>
        <Text style={[styles.tabIcon, state.index === 1 && styles.activeTab]}>🤍</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('ChatsScreen')}>
        <Text style={[styles.tabIcon, state.index === 2 && styles.activeTab]}>💬</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={[styles.tabIcon, state.index === 3 && styles.activeTab]}>M</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Chat" component={ChatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <MainTabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#E195AB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabIcon: {
    fontSize: 24,
    color: 'red',
  },
  activeTab: {
    color: 'red',
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#433',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  extraContainer: {
    width: '90%',  
    aspectRatio: 9 / 16,
    justifyContent: 'center',
    alignItems: 'center',
    top: 180,
    marginBottom: 10,  
    backgroundColor: '#E195AB',  
    borderRadius: 13,  
    overflow: 'hidden', 
  },
  extraText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  profileImage: {
    width: '80%',
    height: '60%',
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  profileName: {
    position: 'absolute',
    top: 15,  
    left: 15,  
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});