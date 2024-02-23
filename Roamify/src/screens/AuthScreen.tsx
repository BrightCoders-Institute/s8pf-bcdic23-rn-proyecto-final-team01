import React, {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import { globalStyles } from '../theme/globalStyles';
import LabelComponent from '../components/LabelComponent';
import SectionComponent from '../components/SectionComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';

type variant = 'LOGIN' | 'REGISTER'

const AuthScreen = () => {
  const [variant, setVariant] = useState<variant>('LOGIN')
const imgBackground = require('../assets/background.jpg'); 
const logo = require('../assets/logo.jpg'); 
const navigation = useNavigation();
const [name, setName] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');

const handleVariant = () => {
  setVariant(prevVariant => (prevVariant === 'LOGIN' ? 'REGISTER': 'LOGIN'))
}

  return (
    <View style={styles.container}>
      <ImageBackground source={imgBackground} resizeMode="cover" style={styles.imageBackgroud}>
        <View style={styles.blackBackground}></View>
        <View>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={logo}
            />
            <Text style={[styles.titleText, {color: '#ffffff'}]}>
              {variant === 'LOGIN' ? 'Login' : 'Registro'}
            </Text>
          </View>
          <View style={styles.card}>
            <TextComponent
              text={variant === 'LOGIN' ? 'Bienvenido!':'Ingresa tus datos!'}
              font='bold'
              size={20}
              styles={{marginBottom: 20}}
            />
            <SectionComponent>
              {variant === 'REGISTER' && (
                <View>
                <LabelComponent text='Nombre' required/>
                <InputComponent
                placeholder='Escribe tu nombre'
                style={globalStyles.inputPrimary}
                />
                </View>
                )
            }
              <LabelComponent text='Email' required/>
              <InputComponent
                placeholder='Escribe tu email'
                style={globalStyles.inputPrimary}
              />
              <LabelComponent text='Contraseña' required/>
              <InputComponent
                placeholder='Escribe tu contraseña'
                style={globalStyles.inputPrimary}
                secureTextEntry
              />
              <ButtonComponent
                text={variant === 'LOGIN' ? 'LOGIN' : 'REGISTRARSE'}
                styles={[globalStyles.buttonPrimary, {marginVertical: 10}]}
                onPress={() => navigation.navigate('HomeScreen')}
              />
            </SectionComponent>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
              <TextComponent
                text={variant === 'LOGIN' ? 'No tienes cuenta? ' : 'Ya tienes cuenta? '}
                font='400'
                size={14}
              />
              <TouchableOpacity onPress={handleVariant}>
                <Text style={{color: '#47C6E6', textDecorationLine: 'underline'}}>
                  {variant === 'LOGIN' ? 'Regístrate' : 'Iniciar sesión'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackgroud: {
      flex: 1,
      justifyContent: 'center',
      
    },
    header: {
      alignItems: 'center',
      paddingBottom: 15,
    },
    logo: {
      width: 90,
      height: 90,
      borderRadius: 120,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    card: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        elevation: 10,
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        marginLeft: 35,
    },
    titleText: {
      fontSize: 31,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'sans-serif'

    },
    blackBackground: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      backgroundColor: 'black',
      opacity: 0.5,
    }
  });

export default AuthScreen;
