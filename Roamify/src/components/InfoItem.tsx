import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../components/TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  icon: string,
  eventData: string | undefined,
}

const InfoItem = ({ icon, eventData }: Props) => (
    <View style={styles.locationContainer}>
      <Icon name={icon} color="#A8BD29" size={22}/>
      <TextComponent
        text={eventData}
        font="normal"
        size={16}
      />
    </View>
  );

const styles = StyleSheet.create({
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
  });

export default InfoItem;
