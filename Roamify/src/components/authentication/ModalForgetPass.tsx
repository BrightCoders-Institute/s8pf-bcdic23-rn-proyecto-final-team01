import React from 'react';
import { View, StyleSheet } from 'react-native';
import { globalStyles } from '../../theme/globalStyles';
import ModalComponent from '../common/ModalComponent';
import InputLabelComponent from '../common/InputLabelComponent';
import { ModalForgetPassProps } from './types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const ModalForgetPass = ({ visible, onClose }: ModalForgetPassProps) => {
    const schemaModalForgetPass = yup.object().shape({
        correo: yup.string().email().required('El email es requerido'),
    });

    const { handleSubmit, control, getValues, clearErrors, setValue } = useForm({
        resolver: yupResolver(schemaModalForgetPass)
    });

    const handleForgetPassword = () => {
        const values = getValues();
        return
    }

    const handleClose = () => {
        onClose()
        clearErrors()
        setValue('correo', '')
    }

    return (
        <ModalComponent
            visible={visible}
            onClose={handleClose}
            aceptar={handleSubmit(handleForgetPassword)}
            
        >
            <View>
                <InputLabelComponent
                    name="correo"
                    placeholder="Escribe tu email"
                    style={globalStyles.inputPrimary}
                    control={control}
                    rules={{ required: 'El email es requerido' }}
                    textLabel={'Email'}
                />
            </View>
        </ModalComponent>
    );
};

export default ModalForgetPass;
