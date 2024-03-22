import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComponent from '../InputComponent';
import { globalStyles } from '../../theme/globalStyles';
import LabelComponent from '../LabelComponent';
import ButtonComponent from '../ButtonComponent';
import Icon from 'react-native-vector-icons/Entypo';
import { useAuth } from '../../contexts/AuthContext';

const FormProfile = () => {
    const [showName, setShowName] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { password} = useAuth();

    const schemaFormProfile = useMemo(() => yup.object().shape({
        name: showName === true ? yup
            .string()
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .max(70, 'El nombre debe tener máximo 70 caracteres')
            .required('El nombre es requerido') : yup.string(),
        password: showPassword === true ? yup
            .string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(12, 'La contraseña debe tener máximo 12 caracteres')
            .required('La contraseña es requerida') : yup.string(),
    }), [showName, showPassword]);

    const { handleSubmit, control, getValues } = useForm({
        resolver: yupResolver(schemaFormProfile)
    });

    const handleShowName = () => {
        setShowName(!showName)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = () => {
        const values = getValues();
        return
    };

    return (
        <View>
            <>
                <View>
                    <LabelComponent text="Nombre" required />
                    <View style={[globalStyles.rowContainer, globalStyles.inputContainer]}>
                        {showName ? (
                            <>
                                <InputComponent
                                    name='name'
                                    placeholder='Ingresa tu nombre'
                                    control={control}
                                    style={{ marginRight: 35 }}
                                    rules={{ required: 'El nombre es requerido' }}
                                    disabled={!showName}
                                />
                            </>
                        ) : (
                            <Text style={{ flex: 1 }}>Tu nombre</Text>
                        )}
                        <TouchableOpacity onPress={handleShowName}>
                            <Icon name="pencil" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <LabelComponent text="Contraseña" required />
                    <View style={[globalStyles.rowContainer, globalStyles.inputContainer]}>
                        {showPassword ? (
                            <>
                                <InputComponent
                                    name='password'
                                    placeholder='Ingresa una contraseña'
                                    control={control}
                                    style={{ marginRight: 35 }}
                                    rules={{ required: 'La constraseña es requerida' }}
                                    disabled={!showPassword}
                                />
                            </>
                        ) : (
                            <Text style={{ flex: 1 }}>******</Text>
                        )}
                        <TouchableOpacity onPress={handleShowPassword}>
                            <Icon name="pencil" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </>

            <ButtonComponent
                text='Submit'
                styles={[globalStyles.buttonPrimary, { marginVertical: 10 }]}
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    );
};

export default FormProfile;
