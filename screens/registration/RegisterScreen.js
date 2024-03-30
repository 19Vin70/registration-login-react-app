import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterPress = () => {
    axios.post('http://192.168.70.247:3000/register', { username, email, password })
      .then(response => {
        console.log(response.data);
        navigation.replace('Login');
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  };

  const handleLoginPress = () => {
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 30 }}>
      <Image source={require('../../assets/alhamdulillah.png')} style={{ width: 200, height: 180, marginBottom: -20 }} />
      <Text style={{ fontSize: 35, fontWeight: 'bold', letterSpacing: 1 }}>Sign up</Text>

      <View style={{ position: 'relative', backgroundColor: '#fff', width: '100%', borderRadius: 10, padding: 8, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='person-outline' size={24} color='#777' />
        <TextInput placeholder='Enter username' style={{ padding: 5, fontSize: 18 }} placeholderTextColor='#777' value={username} onChangeText={setUsername} />
      </View>

      <View style={{ position: 'relative', backgroundColor: '#fff', width: '100%', borderRadius: 10, padding: 8, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='mail-outline' size={24} color='#777' />
        <TextInput placeholder='Enter email' style={{ padding: 5, fontSize: 18 }} placeholderTextColor='#777' value={email} onChangeText={setEmail} />
      </View>

      <View style={{ position: 'relative', backgroundColor: '#fff', width: '100%', borderRadius: 10, padding: 8, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='lock-closed-outline' size={24} color='#777' />
        <TextInput placeholder='Enter password' style={{ padding: 5, fontSize: 18 }} placeholderTextColor='#777' secureTextEntry={true} value={password} onChangeText={setPassword} />
      </View>

      <TouchableOpacity style={{ backgroundColor: 'darkslateblue', padding: 13, borderRadius: 10, width: '100%', alignItems: 'center' }} onPress={handleRegisterPress}>
        <Text style={{ color: '#fff', fontSize: 18, letterSpacing: 1, fontWeight: 'bold' }}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <Text onPress={handleLoginPress} style={{ color: 'slateblue', fontSize: 18, fontWeight: 'bold' }}>Go here</Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
