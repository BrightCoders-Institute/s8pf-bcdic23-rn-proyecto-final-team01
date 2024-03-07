import { TouchableOpacity,View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; 
import { Button } from 'react-native';

interface PropsGoogle {
  style?: object;
}

export default function GoogleMapComponent(props: PropsGoogle) {
  const { style } = props;
  const [marker, setMarker] = useState(null);
  const navigation = useNavigation();

  const handlePress = (e) => {
    setMarker(e.nativeEvent.coordinate);
  };
  const goToNextScreen = () => {
    navigation.navigate('AddEventScreen', { location: marker });
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
        onPress={goToNextScreen}
        disabled={!marker} // El botón está deshabilitado si no hay marcador
      >
        <Text style={styles.buttonText}>Confirmar Ubicación</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

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