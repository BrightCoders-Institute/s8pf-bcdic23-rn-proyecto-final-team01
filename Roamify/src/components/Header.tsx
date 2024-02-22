// React native
import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

// Global Styles
import {globalStyles} from '../theme/globalStyles';

// Components
import TextComponent from './TextComponent';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={globalStyles.rowContainer}>
        <Image
          source={require('../images/LogoRoamify.jpg')}
          style={styles.logo}
        />
        <TextComponent text="Roamify" size={32} font="bold" />
      </View>
      <Text style={{color: 'black'}}>current user</Text>
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
