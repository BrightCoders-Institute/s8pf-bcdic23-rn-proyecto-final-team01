/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native';
import StackNavigation from './src/navigation/Navigation';
import auth from '@react-native-firebase/auth';

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StackNavigation initialRoute='AuthScreen'/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StackNavigation initialRoute='HomeScreen'/>
    </SafeAreaView>
  );

}


export default App;
