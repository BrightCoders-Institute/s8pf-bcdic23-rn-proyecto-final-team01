import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {getDate} from '../../hooks/getDate';

interface MarkerData {
  latitude: number;
  longitude: number;
  title: string;
  type: string;
  date: string | null;
}

const MapScreenComponent = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 19.12303,
    longitude: -104.325359,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('locations')
      .onSnapshot(querySnapshot => {
        const _markers = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const mapData = data.map;

          return {
            latitude: mapData.latitude as number,
            longitude: mapData.longitude as number,
            title: data.name as string,
            type: data.type as string,
            date: data.date as string | null,
          };
        });
        setMarkers(_markers);
      });

    return () => unsubscribe();
  }, []);

  const today = getDate();

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={selectedRegion}>
        {markers.map((marker, index) => {
          if (marker.date === null || marker.date >= today) {
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
          }
          return null;
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
