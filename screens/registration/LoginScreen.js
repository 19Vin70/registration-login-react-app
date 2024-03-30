import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.70.247:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          Alert.alert('Success', data.message);
          setIsLoggedIn(true); // Update isLoggedIn state to true
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true)); // Store login status in AsyncStorage
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        console.error('Login Error:', error);
        Alert.alert('Error', 'An error occurred during login');
      }
    };

  const handleRegisterPress = () => {
    navigation.replace('Register');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 30 }}>
      <Image source={require('../../assets/alhamdulillah.png')} style={{ width: 200, height: 180, marginBottom: -20 }} />
      <Text style={{ fontSize: 35, fontWeight: 'bold', letterSpacing: 1 }}>Login</Text>

      <View style={{ position: 'relative', backgroundColor: '#fff', width: '100%', borderRadius: 10, padding: 8, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='mail-outline' size={24} color='#777' />
        <TextInput placeholder='Enter email' style={{ padding: 5, fontSize: 18 }} placeholderTextColor='#777' value={email} onChangeText={setEmail} />
      </View>

      <View style={{ position: 'relative', backgroundColor: '#fff', width: '100%', borderRadius: 10, padding: 8, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='lock-closed-outline' size={24} color='#777' />
        <TextInput placeholder='Enter password' style={{ padding: 5, fontSize: 18 }} placeholderTextColor='#777' value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'darkslateblue', padding: 13, borderRadius: 10, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18, letterSpacing: 1, fontWeight: 'bold' }}>Sign in</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
        <Text onPress={handleRegisterPress} style={{ color: 'slateblue', fontSize: 18, fontWeight: 'bold' }}>Create now</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
