import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import {globalStyles} from '../theme/globalStyles';
import LabelComponent from '../components/LabelComponent';
import SectionComponent from '../components/SectionComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';
import {FormData} from '../../types';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required('El email es requerido'),
  name: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(70, 'El nombre debe tener máximo 70 caracteres')
    .required('El nombre es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(12, 'La contraseña debe tener máximo 12 caracteres')
    .required('La contraseña es requerida'),
});

type variant = 'LOGIN' | 'REGISTER';

const AuthScreen = () => {
  const [variant, setVariant] = useState<variant>('LOGIN');
  const imgBackground = require('../assets/background.jpg');
  const logo = require('../assets/logo.jpg');
  const navigation = useNavigation();

  const handleVariant = () => {
    setVariant(prevVariant => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const {handleSubmit, setError, control} = useForm<FormData>({
    resolver: async data => {
      try {
        await schema.validate(data, {abortEarly: false});
        return {values: data, errors: {}};
      } catch (validationErrors) {
        /* @ts-ignore */
        const errors = validationErrors.inner.reduce(
          /* @ts-ignore */
          (allErrors, currentError) => {
            return {
              ...allErrors,
              [currentError.path]: {
                type: currentError.type,
                message: currentError.message,
              },
            };
          },
          {},
        );
        return {values: {}, errors};
      }
    },
  });

  const onSubmit = () => {
    /* @ts-ignore */
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgBackground}
        resizeMode="cover"
        style={styles.imageBackgroud}>
        <View style={styles.blackBackground}></View>
        <View>
          <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
            <Text style={[styles.titleText, {color: '#ffffff'}]}>
              {variant === 'LOGIN' ? 'Login' : 'Registro'}
            </Text>
          </View>
          <View style={styles.card}>
            <TextComponent
              text={variant === 'LOGIN' ? 'Bienvenido!' : 'Ingresa tus datos!'}
              font="bold"
              size={20}
              styles={{marginBottom: 20}}
            />
            <SectionComponent>
              {variant === 'REGISTER' && (
                <View>
                  <LabelComponent text="Nombre" required />
                  <InputComponent
                    name="name"
                    placeholder="Escribe tu nombre"
                    style={globalStyles.inputPrimary}
                    control={control}
                    rules={{required: 'El nombre es requerido'}}
                  />
                </View>
              )}
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <LabelComponent text="Email" required />
                <InputComponent
                  name="email"
                  placeholder="Escribe tu email"
                  style={globalStyles.inputPrimary}
                  control={control}
                  rules={{required: 'El email es requerido'}}
                />
              </View>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <LabelComponent text="Contraseña" required />
                <InputComponent
                  name="password"
                  placeholder="Escribe tu contraseña"
                  style={globalStyles.inputPrimary}
                  secureTextEntry
                  control={control}
                  rules={{required: 'la contraseña es requerido'}}
                />
              </View>
              <ButtonComponent
                text={variant === 'LOGIN' ? 'LOGIN' : 'REGISTRARSE'}
                styles={[globalStyles.buttonPrimary, {marginVertical: 10}]}
                onPress={handleSubmit(onSubmit)}
              />
            </SectionComponent>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <TextComponent
                text={
                  variant === 'LOGIN'
                    ? 'No tienes cuenta? '
                    : 'Ya tienes cuenta? '
                }
                font="400"
                size={14}
              />
              <TouchableOpacity onPress={handleVariant}>
                <Text
                  style={{color: '#47C6E6', textDecorationLine: 'underline'}}>
                  {variant === 'LOGIN' ? 'Regístrate' : 'Iniciar sesión'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    shadowOffset: {width: 0, height: 0},
    marginLeft: 35,
  },
  titleText: {
    fontSize: 31,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: 'black',
    opacity: 0.5,
  },
});

export default AuthScreen;
