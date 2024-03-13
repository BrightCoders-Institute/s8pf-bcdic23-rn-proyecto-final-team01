import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={globalStyles.rowContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <TextComponent text="Roamify" size={32} font="bold" />
      </View>
      <Text onPress={() => navigation.navigate('ProfileScreen')} style={{color: 'black'}}>current user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  logo: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
});

export default Header;
