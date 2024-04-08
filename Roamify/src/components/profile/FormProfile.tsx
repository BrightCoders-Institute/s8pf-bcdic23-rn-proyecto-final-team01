import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {globalStyles} from '../../theme/globalStyles';
import ButtonComponent from '../ButtonComponent';
import InputWithIconComponent from '../common/InputIconComponent';
// import auth from '@react-native-firebase/auth';
// import { useAuth } from '../../contexts/AuthContext';

const FormProfile = () => {
  const [showName, setShowName] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const { userId } = useAuth()

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

  const {handleSubmit, control, getValues} = useForm({
    resolver: yupResolver(schemaFormProfile),
  });

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    // const user = auth().currentUser;
    // console.log(user);
    return;
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
        texInputDisabled="Tu nombre"
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
