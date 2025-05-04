import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initial opacity 0

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // 1.5s fade-in effect
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace('SignIn'); // Redirect to SignIn after 5 sec
    }, 5000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../assets/source.png')} 
        style={[styles.logo, { opacity: fadeAnim }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for better visibility
  },
  logo: {
    width: 300,  // Slightly bigger size
    height: 300, // Slightly bigger size
    resizeMode: 'contain',
  },
});

export default SplashScreen;
