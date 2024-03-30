import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/registration/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        if (loginStatus !== null) {
          setIsLoggedIn(JSON.parse(loginStatus));
        }
      } catch (error) {
        console.error('Error loading login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        ) : (
          <Stack.Screen
            name="Login"
            component={() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />} 
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
