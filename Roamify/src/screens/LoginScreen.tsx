import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
 
const navigation = useNavigation();

  return (
    <View>
      <Text>LoginScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen;
