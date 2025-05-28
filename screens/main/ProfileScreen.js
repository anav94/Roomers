import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');  

const interests = [
  "Traveling", "Music", "Tech", "Gaming", "Football", 
  "Cooking", "Reading", "Hiking", "Photography", "Movies"
];

const lifestyle = ["Early bird", "Extroverted", "Light sleeper", "Party animal"];

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container}>
        {/* Settings Button */}
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('SettingsScreen')}  
        >
          <Text style={styles.settingsText}>⚙️</Text>  
        </TouchableOpacity>

        {/* Profile Name */}
        <Text style={styles.profileName}>Anjor Aggarwal</Text>

        {/* Picture Block 1 */}
        <View style={styles.pictureContainer}>
          <Image 
            source={require('../../assets/photos/anjor_1.jpeg')}  
            style={styles.picture} 
          />
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          {["20", "Male", "Delhi", "Asian", "Aries", "Computer Science", "3rd", "English"].map((item, index) => (
            <View key={index} style={styles.bubble}>
              <Text style={styles.bubbleText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Picture Block 2 */}
        <View style={styles.pictureContainer}>
          <Image 
            source={require('../../assets/photos/anjor_2.jpeg')}  
            style={styles.picture} 
          />
        </View>

        {/* Interests Section */}
        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Interests</Text>
          <View style={styles.interestBubbles}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.bubble}>
                <Text style={styles.bubbleText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lifestyle and Habits Section */}
        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Lifestyle and Habits</Text>
          <View style={styles.interestBubbles}>
            {lifestyle.map((habit, index) => (
              <View key={index} style={styles.bubble}>
                <Text style={styles.bubbleText}>{habit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Icebreakers */}
        <View style={styles.questionsContainer}>
          <Text style={styles.questionsTitle}>Icebreakers</Text>
          <Text style={styles.dealbreakersText}>Do you like playing football?</Text>
        </View>

        {/* Dealbreakers */}
        <View style={styles.dealbreakersContainer}>
          <Text style={styles.dealbreakersTitle}>Dealbreakers</Text>
          <Text style={styles.dealbreakersText}>Loud noises late at night</Text>
        </View>

       

        {/* Top 5 Artists */}
        <View style={styles.topArtistsContainer}>
          <Text style={styles.spotifyText}>Spotify</Text>
          <Text style={styles.topArtistsText}>
            Kendrick Lamar {"\n"}
            Drake {"\n"}
            Dhinchak Pooja {"\n"}
            The Weeknd
          </Text>
        </View>

        {/* Additional Empty Space for Scroll */}
        <View style={styles.largeEmptySpace}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  
  },
  container: {
    flexGrow: 1,
    minHeight: height + 1700,  
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 50,  
  },
  settingsButton: {
    position: 'absolute',  
    top: 6,
    right: 0,
    backgroundColor: '#3D3D3D',
    padding: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    color: 'white',
    fontSize: 24,  
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',  
    top: 20,  
    left: 20,  
  },
  pictureContainer: {
    width: '93%',  
    height: 200,  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,  
    backgroundColor: '#E195AB',  
    borderRadius: 13,  
    overflow: 'hidden',  
  },
  picture: {
    width: '100%',  
    height: '100%',  
    borderRadius: 20,  
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  
    justifyContent: 'center',  
    marginTop: 10,  
    width: '90%',  
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#FFEDFA',  
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 10,  
    marginBottom: 10,  
  },
  bubbleText: {
    color: 'black',
    fontSize: 16,
  },
  interestsContainer: {
    width: '93%',
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  interestsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  interestBubbles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  questionsContainer: {
    width: '93%',
    backgroundColor: '#E195AB',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  questionsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dealbreakersContainer: {
    width: '93%',
    backgroundColor: '#E195AB',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  dealbreakersTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dealbreakersText: {
    color: 'white',
    fontSize: 16,
  },
  largeEmptySpace: {
    height: 600,
  },
  spotifyContainer: {
    width: '93%',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  spotifyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  topArtistsContainer: {
    width: '93%',
    height: '6%',
    alignSelf: 'center',
    backgroundColor: '#E195AB',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  topArtistsText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
