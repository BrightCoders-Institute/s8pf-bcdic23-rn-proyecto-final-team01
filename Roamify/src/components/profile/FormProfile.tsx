import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {globalStyles} from '../../theme/globalStyles';
import ButtonComponent from '../ButtonComponent';
import InputWithIconComponent from '../common/InputIconComponent';
import {useAuth} from '../../contexts/AuthContext';
import {FormProfileProps} from '../types';
import auth from '@react-native-firebase/auth';

const FormProfile = ({setIsLoading}: FormProfileProps) => {
  const [showName, setShowName] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {userData, getDataUser} = useAuth();

  const schemaFormProfile = useMemo(
    () =>
      yup.object().shape({
        name:
          showName === true
            ? yup
                .string()
                .min(3, 'El nombre debe tener al menos 3 caracteres')
                .max(70, 'El nombre debe tener máximo 70 caracteres')
                .required('El nombre es requerido')
            : yup.string(),
        password:
          showPassword === true
            ? yup
                .string()
                .min(6, 'La contraseña debe tener al menos 6 caracteres')
                .max(12, 'La contraseña debe tener máximo 12 caracteres')
                .required('La contraseña es requerida')
            : yup.string(),
      }),
    [showName, showPassword],
  );

  const {handleSubmit, control, getValues, setValue} = useForm({
    resolver: yupResolver(schemaFormProfile),
  });

  const closeInputName= () => {
    setShowName(false);
  };

  const updateUserName = async () => {
    const values = getValues();
    if (values.name) {
      const {name} = values;
      const user = auth().currentUser;
      if (user === null) return;
      user
        .updateProfile({
          displayName: name,
        })
        .then(async () => {
          console.log('Nombre de usuario actualizado exitosamente');
          const updatedUserData = await getDataUser();
          console.log('updatedUserData', updatedUserData);
          setValue('name', updatedUserData?.displayName || '');
          closeInputName();
        })
        .catch((error: any) => {
          console.error('Error al actualizar el nombre de usuario:', error);
        });
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const values = getValues();
    console.log(values);
    try {
      if (values.name && !values.password) {
        await updateUserName();
      } else if (!values.name && values.password) {
        const {password} = values;
        console.log('pass', values);
      } else if (values.name && values.password) {
        await updateUserName();
        const {password} = values;
        console.log('pass', values);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{marginTop: 30}}>
      <InputWithIconComponent
        control={control}
        disabled={showName}
        setDisabled={setShowName}
        name="name"
        placeholder="Ingresa tu nombre"
        rules={{required: 'El nombre es requerido'}}
        styles={{marginRight: 35}}
        textLabel="Nombre"
        texInputDisabled={
          userData === null ? 'No se encontró tu nombre' : userData.displayName
        }
      />
      <InputWithIconComponent
        control={control}
        disabled={showPassword}
        setDisabled={setShowPassword}
        name="password"
        placeholder="Ingresa una contraseña"
        rules={{required: 'La constraseña es requerida'}}
        styles={{marginRight: 35}}
        textLabel="Contraseña"
        texInputDisabled="********"
      />
      <ButtonComponent
        text="Submit"
        styles={[globalStyles.buttonPrimary, {marginVertical: 10}]}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default FormProfile;
