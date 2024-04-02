import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { globalStyles } from '../theme/globalStyles';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { fetchImageUrl } from '.';


const Header = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState<null | string>(null);
  const [userImageUrl, setUserImageUrl] = useState('https://firebasestorage.googleapis.com/v0/b/roamify-bb95e.appspot.com/o/profileImage%2Fdef-user.png?alt=media&token=81013ded-4e5d-4b0b-8c6b-1d349fa42ee9');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        fetchImageUrl(user.uid).then(url => {
          setUserImageUrl(url);
        }).catch(error => console.log(error));
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={globalStyles.rowContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <TextComponent text='Roamify' size={32} font='bold'/>
      </View>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.profileContainer}>
        {/* Aquí se actualiza el source para utilizar userImageUrl */}
        <Image source={userImageUrl ? {uri: userImageUrl} : require('../assets/user.png')} style={styles.avatar} />
        
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Configuración</Text>
          </TouchableOpacity>
           <TouchableOpacity onPress={() => 
             {
              auth()
               .signOut()
               .then(() => navigation.navigate('AuthScreen'));
             }} style={styles.dropdownItem}>
             <Text style={styles.dropdownText} >Cerrar sesión</Text>
           </TouchableOpacity>
        </View>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    zIndex: 10,
  },
  logo: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    right: 10,
    top: 58,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5, 
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',

  },
  dropdownText: {
  fontSize: 17,
  color: '#000',
  },
  });
  
  export default Header;
