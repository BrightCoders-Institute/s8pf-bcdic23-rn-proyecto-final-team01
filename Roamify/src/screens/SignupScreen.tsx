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

const SignUpScreen = () => {
const imgBackground = require('../assets/background.jpg'); 
const logo = require('../assets/logo.jpg'); 
const navigation = useNavigation();
const [name, setName] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <ImageBackground source={imgBackground} resizeMode="cover" style={styles.imageBackgroud}>
        {/* <View></View> */}
        <View>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={logo}
            />
            <Text style={[styles.titleText, {color: '#ffffff'}]}>Registro</Text>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={[styles.titleText, {color: '#000000'}]}>Ingresa tus datos!</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder='Tu nombre completo'
              />
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder='Escribe tu email'
              />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder='Escribe tu contraseña'
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Text>Regístrate</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{color: 'blue'}}>Iniciar sesión</Text>
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
      alignItems: 'center'
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
        padding: 30,
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

    }
  });

export default SignUpScreen;
