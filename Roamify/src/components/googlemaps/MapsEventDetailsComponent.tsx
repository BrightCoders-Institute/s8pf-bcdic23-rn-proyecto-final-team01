import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapsEventDetailsComponentProps {
  latitude: number;
  longitude: number;
  title: string; 
}
const MapsEventDetailsComponent: React.FC<MapsEventDetailsComponentProps> = ({ latitude, longitude, title }) => {

  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0110,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{ latitude, longitude }}
          title={title}
        />
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

export default MapsEventDetailsComponent;
