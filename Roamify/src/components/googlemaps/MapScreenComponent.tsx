import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import MapView, {Circle, Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {CoordsProps} from '../types';
import {useNavigation} from '@react-navigation/native';
import {getDate} from '../../hooks/getDate';
import Icon from 'react-native-vector-icons/Ionicons';
import TextComponent from '../TextComponent';
interface Marker {
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  date: string | null;
  image: string;
  id: string;
  average: number
}
interface Props {
  searchText: string;
  location: CoordsProps;
  isSearchActive: boolean;
  filteredMarkers: Marker[];
}
const MapScreenComponent = (props: Props) => {
  const {searchText, location, isSearchActive} = props;
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const navigation = useNavigation();
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.020,
    longitudeDelta: 0.020,
    
  });
  useEffect(() => {
    const shouldHideInfo = isSearchActive && (!searchText || props.filteredMarkers.length === 0);
    setShowInfo(!shouldHideInfo);
  }, [isSearchActive, searchText, props.filteredMarkers]);
  useEffect(() => {
    const subscribe = firestore()
      .collection('locations')
      .onSnapshot(querySnapshot => {
        const _markers = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const mapData = data.map;

          return {
            latitude: mapData.latitude as number,
            longitude: mapData.longitude as number,
            name: data.name as string,
            type: data.type ? (data.type as string) : 'not_event',
            date: data.date as string | null,
            image: data.image as string,
            id: doc.id,
            price: data.price,
            description: data.description,
            time: data.time,
            limitedCapacity: data.limitedCapacity,
            userId: data.userId,
            category: data.category,
            average: data.average
          };
        });
        setMarkers(_markers);
      });
    return () => subscribe();
  }, []);

  const closeInfoCard = () => setShowInfo(false);
  const onMarkerPress = (markerData: Marker) => {
    setSelectedMarker(markerData);
    setShowInfo(true);
  };
  const onInfoButtonPress = () => {
    setShowInfo(false);
    const eventData = {
      ...selectedMarker,
      map: {
        latitude: selectedMarker.latitude,
        longitude: selectedMarker.longitude
      },
      
    };
    /* @ts-ignore */
    navigation.navigate('EventDetailsScreen', {
      data: eventData,
    });
  };

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const today = getDate();

  const filteredMarkers = markers.filter(marker => {
    const titleNormalized = normalizeText(marker.name);
    const searchTextNormalized = normalizeText(searchText);
    return titleNormalized.includes(searchTextNormalized);
  });
  const markersToShow =
    searchText && filteredMarkers.length > 0 ? filteredMarkers : markers;

console.log(selectedMarker)

  return (
    <TouchableWithoutFeedback onPress={closeInfoCard}>
      <View style={styles.container}>
        <MapView
          key={markersToShow.length}
          style={styles.map}
          initialRegion={selectedRegion}>
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={40}
            strokeColor="white"
            fillColor="blue"
          />
          {markersToShow.map((marker, index) => {
            if (marker.date === null || marker.date >= today) {
              return (
                <Marker
                  key={index}
                  pinColor={marker.type === 'event' ? 'blue' : 'red'}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  onPress={() => onMarkerPress(marker)}
                />
              );
            }
            return null;
          })}
        </MapView>
        {showInfo && selectedMarker && (
          <TouchableWithoutFeedback>
            <View style={styles.infoCard}>
              <View style={styles.titleContainer}>
              <TextComponent text={selectedMarker.name} size={16} font='bold'/>
              {selectedMarker.average > 0 && (
               <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#A8BD29" />
                <TextComponent text={selectedMarker.average.toString()} font='bold' />
              </View> 
              )}
              </View>
            <Image
                source={{uri: selectedMarker.image}}
                style={styles.infoImage}
                resizeMode="cover"
                />
              <TouchableOpacity style={styles.infoButton} onPress={onInfoButtonPress}>
                <Text style={styles.infoButtonText}>Más información</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoCard: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    backgroundColor: 'white',
    padding: 18,//20
    borderRadius: 15,
    elevation: 3, // solo para Android
    shadowOpacity: 0.3, // solo para iOS
    shadowRadius: 3, // solo para iOS
    shadowOffset: { width: 0, height: 2 }, // solo para iOS
  },
  infoButton: {
    marginTop: 8,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  infoButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  titleContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingBottom: 15
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  }
});

export default MapScreenComponent;