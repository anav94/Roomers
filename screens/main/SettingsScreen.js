import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Filter Text at the Top Left */}
      <Text style={styles.filterText}>Filters</Text>

      {/* Line Below Filters Text */}
      <View style={styles.separator} />

      {/* Age Text Below the Line */}
      <Text style={styles.ageText}>Age</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  filterText: {
    position: 'absolute',
    top: 20,  // Distance from the top
    left: 20, // Distance from the left (top-left corner)
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    position: 'absolute',
    top: 60, // Slightly below the "Filters" text
    left: 0,
    right: 0,
    height: 1, // Thin line
    backgroundColor: '#F7CFD8', // Line color
    opacity: 0.3, // Makes the line subtle
  },
  ageText: {
    position: 'absolute',
    top: 75, // Placed just below the line
    left: 20, // Aligned with "Filters"
    fontSize: 16,
    color: 'grey', // Subtle grey color
    fontWeight: 'normal',
    opacity: 0.7, // Makes it slightly faded
  },
});

export default SettingsScreen;