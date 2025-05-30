import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ImageBackground, 
  FlatList 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logged out successfully');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout failed');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('SignIn');
      }
    };
    checkAuth();
  }, [navigation]);

  const options = [
    [
      { title: 'Query Nest', color: '#4CAF50', screen: 'GeneralHelp' },
      { title: 'View Requests', color: '#4CAF50', screen: 'SubmittedRequestPage' }
    ],
    [
      { title: 'Lost and Found', color: '#FF9800', screen: 'LostAndFoundScreen' },
      { title: 'View Lost & Found', color: '#FF9800', screen: 'ViewLostAndFoundScreen' }
    ],
    [
      { title: 'Marketing Help', color: '#673AB7', screen: 'MarketingScreen' },
      { title: 'View Marketing Requests', color: '#673AB7', screen: 'MarketingRequestsScreen' }
    ]
  ];

  return (
    <ImageBackground 
      source={require('../assets/resourcce.jpg')}  
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Home Page</Text>

        {options.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.title}
                style={[styles.optionButton, { backgroundColor: item.color }]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  optionButton: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  logoutButton: {
    backgroundColor: '#E63946',
    padding: 15,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default HomePage;
