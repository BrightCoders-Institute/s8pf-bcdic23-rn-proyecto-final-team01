import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View>
      <Text>HomeScreen</Text>
      {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen;
