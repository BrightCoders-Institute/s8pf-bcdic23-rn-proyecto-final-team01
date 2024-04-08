import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../theme/globalStyles';
import SectionComponent from '../components/SectionComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';
import {FormData} from '../../types';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/firestore';
import * as yup from 'yup';
import LoadingComponent from '../components/LoadingComponent';
import { useAuth } from '../contexts/AuthContext';
import InputLabelComponent from '../components/common/InputLabelComponent';
import { userAuthProp } from '../components/types';
import ModalForgetPass from '../components/authentication/ModalForgetPass';


const AuthScreen = () => {
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const imgBackground = require('../assets/background.jpg');
  const logo = require('../assets/logo.jpg');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalForgetPassVisible, setModalForgetPassVisible] = useState(false);
  const { setPasswordOnLogin } = useAuth();

  const schema = useMemo(() => yup.object().shape({
    email: yup.string().email().required('El email es requerido'),
    name: variant === 'REGISTER' ? yup
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(70, 'El nombre debe tener máximo 70 caracteres')
      .required('El nombre es requerido') : yup.string(),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(12, 'La contraseña debe tener máximo 12 caracteres')
      .required('La contraseña es requerida'),
  }), [variant]);

  const {handleSubmit, setError, control, getValues} = useForm<FormData>({
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

  const handleLogin = ({ email, password }: userAuthProp) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .then(userCredential => {
        setPasswordOnLogin(password);
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setError('email', {
            type: 'manual',
            message: 'No hay ningún usuario con este correo electrónico.',
          });
        } else if (error.code === 'auth/wrong-password') {
          setError('password', {
            type: 'manual',
            message: 'La contraseña es incorrecta.',
          });
        } else {
          setError('email', {
            type: 'manual',
            message: 'Ocurrió un error al intentar iniciar sesión.',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegister = ({ name, email, password }: userAuthProp) => {

    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        const defaultImage =
          'https://firebasestorage.googleapis.com/v0/b/roamify-bb95e.appspot.com/o/profileImage%2Fdef-user.png?alt=media&token=81013ded-4e5d-4b0b-8c6b-1d349fa42ee9';
        return firebase().collection('users').doc(uid).set({
          name: name,
          email: email,
          profileImgURL: defaultImage,
        });
      })
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', {
            type: 'manual',
            message: 'El correo electrónico ya está en uso por otra cuenta.',
          });
        } else if (error.code === 'auth/weak-password') {
          setError('password', {
            type: 'manual',
            message: 'La contraseña es demasiado débil.',
          });
        } else {
          setError('email', {
            type: 'manual',
            message: 'Ocurrió un error al intentar registrar la cuenta.',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVariant = () => {
    setVariant(prevVariant => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const onSubmit = () => {
    const values = getValues();
    const {name, email, password} = values;
    if (variant === 'LOGIN') {
      handleLogin({ email, password });
    } else {
      handleRegister({ name, email, password });
    }
  };

  const handleForgetPassword = () => {
    setModalForgetPassVisible(true);
  };

  const handleCloseModalForgetPass = () => {
    setModalForgetPassVisible(false);
  };

  return (
    <>
      {loading && <LoadingComponent />}
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
                text={
                  variant === 'LOGIN' ? 'Bienvenido!' : 'Ingresa tus datos!'
                }
                font="bold"
                size={20}
                styles={{marginBottom: 20}}
              />
              <SectionComponent>
                {variant === 'REGISTER' && (

                  <InputLabelComponent
                    name="name"
                    placeholder="Escribe tu nombre"
                    style={globalStyles.inputPrimary}
                    control={control}
                    rules={{ required: 'El nombre es requerido' }}
                    textLabel={'Nombre'}
                  />
                )}
                <InputLabelComponent
                  name="email"
                  placeholder="Escribe tu email"
                  style={globalStyles.inputPrimary}
                  control={control}
                  rules={{ required: 'El email es requerido' }}
                  textLabel={'Email'}
                />
                <InputLabelComponent
                  name="password"
                  placeholder="Escribe tu contraseña"
                  style={globalStyles.inputPrimary}
                  secureTextEntry
                  control={control}
                  rules={{ required: 'la contraseña es requerido' }}
                  textLabel={'Contraseña'}
                />
                <ButtonComponent
                  text={variant === 'LOGIN' ? 'LOGIN' : 'REGISTRARSE'}
                  styles={[globalStyles.buttonPrimary, {marginVertical: 10}]}
                  onPress={handleSubmit(onSubmit)}
                />
              </SectionComponent>
              <View style={[styles.text, { marginVertical: 10 }]}>
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
                  <Text style={styles.textLink}>

                    {variant === 'LOGIN' ? 'Regístrate' : 'Iniciar sesión'}
                  </Text>
                </TouchableOpacity>
              </View>
              {variant === 'LOGIN' &&
                <View style={styles.text}>
                  <TouchableOpacity onPress={handleForgetPassword}>
                    <Text style={styles.textLink}>¿Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
          <ModalForgetPass
            visible={modalForgetPassVisible}
            onClose={handleCloseModalForgetPass}
            setModalForgetPassVisible={setModalForgetPassVisible}
          />
        </ImageBackground>
      </View>
    </>
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
  textLink: {
    color: '#47C6E6',
    textDecorationLine: 'underline'
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default AuthScreen;
