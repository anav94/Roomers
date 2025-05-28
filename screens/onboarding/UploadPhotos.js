import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { saveRegistrationProgress, getRegistrationProgress } from '../../registrationUtils';

const { width: screenWidth } = Dimensions.get('window');

const UploadPhotosScreen = ({ navigation }) => {
  const [images, setImages] = useState(Array(5).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Load saved images when the screen loads
  useEffect(() => {
    const loadSavedImages = async () => {
      const savedImages = await getRegistrationProgress('images');
      if (savedImages) {
        setImages(savedImages);
      }
    };
    loadSavedImages();
  }, []);

  const handleImageUpload = async (index) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.didCancel && !result.error) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);

      // Save the updated images to local storage
      await saveRegistrationProgress('images', newImages);
    }
  };

  const renderItem = (index) => (
    <View style={styles.slide}>
      {images[index] ? (
        <Image source={{ uri: images[index] }} style={styles.image} />
      ) : (
        <View style={styles.uploadContent}>
          {/* Only the camera emoji is clickable */}
          <TouchableOpacity onPress={() => handleImageUpload(index)}>
            <Text style={styles.emoji}>📷</Text>
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload Photo</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {images.map((_, index) => (
          <View key={index} style={{ width: screenWidth }}>
            {renderItem(index)}
          </View>
        ))}
      </ScrollView>

      {/* Page Indicator */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#4B39EF' : '#E0E3E7' },
            ]}
          />
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate('InterestsScreen')}
      >
        <Text style={styles.submitButtonText}>Submit & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F24',
  },
  slide: {
    width: screenWidth,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#2A2F35', // Added background color for debugging
  },
  uploadContent: {
    alignItems: 'center',
    gap: 8, // Reduced gap between emoji and text
  },
  emoji: {
    fontSize: 50, // Emoji size
    color: '#FFFFFF', // Ensure the emoji is white
  },
  uploadText: {
    color: '#95A1AC',
    fontSize: 16, // Smaller text size
    fontFamily: 'Inter',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#4B39EF',
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Figtree',
    fontWeight: '500',
  },
});

export default UploadPhotosScreen;