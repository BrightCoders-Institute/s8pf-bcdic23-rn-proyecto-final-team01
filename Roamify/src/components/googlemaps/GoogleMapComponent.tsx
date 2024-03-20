import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type GoogleMapScreenRouteProp = RouteProp<
    { 
      params: { 
        location?: { latitude: number; longitude: number } | null,
        setLocation: (location: { latitude: number; longitude: number } | null) => void
      }
    },
    'params'
>;
interface PropsGoogle {
  style?: object;
}


const GoogleMapComponent: React.FC<PropsGoogle> = (props) => {
  const { style } = props;
  const route = useRoute<GoogleMapScreenRouteProp>();
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const navigation = useNavigation();


  useEffect(() => {
    if (route.params?.location) {
      setMarker(route.params.location);
    }
  }, [route.params?.location]);

  const handlePress = (e) => {
    setMarker(e.nativeEvent.coordinate);
  };

  const confirmLocation = () => {
    route.params.setLocation(marker);
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <MapView
        style={[style, styles.map]}
        initialRegion={{
          latitude: 19.123030,
          longitude: -104.325359,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !marker ? styles.buttonDisabled : {}]}
          onPress={confirmLocation}
          disabled={!marker} // El botón está deshabilitado si no hay marcador
        >
          <Text style={styles.buttonText}>Confirmar Ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 20,
  },

  button: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2E7A00',
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  buttonDisabled: {
    backgroundColor: 'grey',

  },
 });

 export default GoogleMapComponent;