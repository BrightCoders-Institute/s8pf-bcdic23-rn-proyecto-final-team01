import {View, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from '../components/TextComponent';
import CardComponent from '../components/CardComponent';
import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../contexts/AuthContext';
import {getDate} from '../hooks/getDate';

const MyEventsScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Array<any>>();
  const [activeEvent, setActiveEvent] = useState(false);

  const currentUser = useAuth().userId;
  const today = getDate();

  const handleAlert = () => {
    Alert.alert('Ya tienes un evento activo, no puedes crear más eventos');
  };

  useEffect(
    () => {
      const subscriber = firestore()
        .collection('locations')
        .where('userId', '==', currentUser)
        .onSnapshot(querySnapshot => {
          const eventsArray = [];
          querySnapshot.forEach(documentSnapshot => {
            eventsArray.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setEvents(eventsArray);

          const hasActiveEvent = eventsArray.some(item => item.date >= today);
          setActiveEvent(hasActiveEvent);
        });
      return () => subscriber();
    },
    [
      /* currentUser, today */
    ],
  );

  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={styles.eventContainer}>
        <TextComponent text="Crear un evento" font="bold" size={26} />
        <TouchableOpacity
          style={styles.button}
          onPress={
            activeEvent
              ? () => handleAlert()
              : () => navigation.navigate('AddEventScreen')
          }>
          <Icon name="add-outline" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={{paddingHorizontal: 25}}>
            <TextComponent text="Evento activo" font="bold" size={22} />
            {events?.map(
              item =>
                item.userId === currentUser &&
                item.date >= today && (
                  <CardComponent
                    id={item.id}
                    onPress={() =>
                      /* @ts-ignore */
                      navigation.navigate('EventDetailsScreen', {data: item})
                    }
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                  />
                ),
            )}
            <TextComponent
              text="Historial de eventos"
              font="bold"
              size={22}
              styles={{marginBottom: 10}}
            />

            {events?.map(
              item =>
                item.userId === currentUser &&
                item.date < today && (
                  <CardComponent
                    id={item.id}
                    onPress={() =>
                      /* @ts-ignore */
                      navigation.navigate('EventDetailsScreen', {data: item})
                    }
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                  />
                ),
            )}
          </View>
        </ScrollView>
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
