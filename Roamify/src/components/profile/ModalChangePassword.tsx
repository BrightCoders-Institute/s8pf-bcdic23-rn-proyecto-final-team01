import React from 'react';
import {View} from 'react-native';
import {globalStyles} from '../../theme/globalStyles';
import ModalComponent from '../common/ModalComponent';
import InputLabelComponent from '../common/InputLabelComponent';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {ModalChangePasswordProps} from '../types';
import { changePassword } from '..';

const ModalChangePassword = ({
  visible,
  onClose,
  setModalChangePassVisible,
  newPassword,
  setIsLoading,
  closeInputPassword
}: ModalChangePasswordProps) => {

  const schemaModalChangePassword = yup.object().shape({
    contraseña: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(12, 'La contraseña debe tener máximo 12 caracteres')
      .required('La contraseña es requerida'),
  });

  const {handleSubmit, control, getValues, clearErrors, setValue} = useForm({
    resolver: yupResolver(schemaModalChangePassword),
  });

  const handleClose = () => {
    onClose();
    clearErrors();
    setValue('contraseña', '');
  };

  const handleChangePassword = () => {
    const values = getValues();
    setModalChangePassVisible(false);
    setIsLoading(true);
    changePassword(values.contraseña, newPassword);
    closeInputPassword()
    setIsLoading(false);
  };

  return (
    <ModalComponent
      visible={visible}
      onClose={handleClose}
      aceptar={handleSubmit(handleChangePassword)}>
      <View>
        <InputLabelComponent
          name="contraseña"
          placeholder="Escribe tu contraseña actual"
          style={globalStyles.inputPrimary}
          control={control}
          rules={{required: 'La contraseña es requerido'}}
          textLabel={'Contraseña actual'}
        />
      </View>
    </ModalComponent>
  );
};

export default ModalChangePassword;
