import React, { useState } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../theme/globalStyles';
import ModalComponent from '../common/ModalComponent';
import InputLabelComponent from '../common/InputLabelComponent';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import LoadingComponent from '../LoadingComponent';
import { ModalForgetPassProps } from '../types';

const ModalForgetPass = ({ visible, onClose, setModalForgetPassVisible }: ModalForgetPassProps) => {
    const [loading, setLoading] = useState(false);

    const schemaModalForgetPass = yup.object().shape({
        correo: yup.string().email().required('El email es requerido'),
    });

    const { handleSubmit, control, getValues, clearErrors, setValue } = useForm({
        resolver: yupResolver(schemaModalForgetPass)
    });

    const sendPasswordResetEmail = (email: string) => {
        auth().sendPasswordResetEmail(email)
            .then(() => {
                console.log('Correo electrónico de restablecimiento de contraseña enviado exitosamente');
            })
            .catch((error) => {
                console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error);
            })
            .finally(() => {
                setLoading(false);
                handleClose()
            });
    };

    const handleForgetPassword = () => {
        setModalForgetPassVisible(false)
        setLoading(true);
        const values = getValues();
        sendPasswordResetEmail(values.correo)
    }

    const handleClose = () => {
        onClose()
        clearErrors()
        setValue('correo', '')
    }

    return (
        <>
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
            {
                loading && (
                    <LoadingComponent />
                )
            }
        </>
    );
};

export default ModalForgetPass;
