import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

interface PropsGoogle {
  style?: object;
}

export default function GoogleMapComponent(props: PropsGoogle) {
  const { style } = props
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
     />
   </View>
  )
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
 });