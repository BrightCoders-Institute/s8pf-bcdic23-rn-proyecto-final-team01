import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
interface Marker {
    latitude: number;
    longitude: number;
    title: string;
 }
const MapScreenComponent = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 19.123030, 
    longitude: -104.325359, 
    latitudeDelta: 0.0922,
    longitudeDelta: 0.05,
  })
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('events') 
      .onSnapshot(querySnapshot => {
        const _markers = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const mapData = data.map; 

          return {
            latitude: mapData.latitude as number,
            longitude: mapData.longitude as number,
            title: data.nameEvent as string, 
          };
        });
        setMarkers(_markers);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={selectedRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
          />
        ))}
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