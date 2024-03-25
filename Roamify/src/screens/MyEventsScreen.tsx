import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from '../components/TextComponent';
import CardComponent from '../components/CardComponent';
import {useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getData} from '../hooks/getData';
import DataComponent from '../components/DataComponent';

const MyEventsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={styles.eventContainer}>
        <TextComponent text="Crear un evento" font="bold" size={26} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddEventScreen')}>
          <Icon name="add-outline" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{flex: 1}}>
        <View style={{paddingHorizontal: 25}}>
          <TextComponent text="Evento activo" font="bold" size={22} />
          <TextComponent
            text="Historial de eventos"
            font="bold"
            size={22}
            styles={{marginBottom: 10}}
          />
        </View>
        <DataComponent />
      </SafeAreaView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 25,
    alignItems: 'flex-start',
  },
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  button: {
    borderRadius: 100,
    padding: 15,
    backgroundColor: '#47C6E6',
  },
});

export default MyEventsScreen;
