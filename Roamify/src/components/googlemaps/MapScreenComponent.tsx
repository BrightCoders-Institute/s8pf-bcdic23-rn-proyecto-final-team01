import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {CoordsProps} from '../types';
interface Marker {
  latitude: number;
  longitude: number;
  title: string;
  type: string;
}
interface Props {
  searchText: string;
  location: CoordsProps;
}
const MapScreenComponent = (props: Props) => {
  const {searchText, location} = props;
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
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
            title: data.name as string,
            type: data.type ? (data.type as string) : 'not_event',
          };
        });
        setMarkers(_markers);
      });
    return () => subscribe();
  }, []);

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const filteredMarkers = markers.filter(marker => {
    // filtrar marcadores basados en el texto de búsqueda
    const titleNormalized = normalizeText(marker.title);
    const searchTextNormalized = normalizeText(searchText);
    return titleNormalized.includes(searchTextNormalized);
  });
  const markersToShow =
    searchText && filteredMarkers.length > 0 ? filteredMarkers : markers;
  return (
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
          return (
            <Marker
              key={index}
              pinColor={marker.type === 'event' ? 'blue' : 'red'}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            />
          );
        })}
      </MapView>
    </View>
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
});

export default MapScreenComponent;
