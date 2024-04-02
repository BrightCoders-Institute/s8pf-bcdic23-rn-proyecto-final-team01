import React from 'react';
import { View } from 'react-native';
import InputComponent from '../InputComponent';
import LabelComponent from '../LabelComponent';
import { InputLabelComponentProps } from './types';

const InputLabelComponent = ({
    control,
    name,
    placeholder,
    rules,
    style,
    textLabel,
    secureTextEntry
}: InputLabelComponentProps) => {

    return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            <LabelComponent text={textLabel} required />
            <InputComponent
                name={name}
                placeholder={placeholder}
                style={style}
                secureTextEntry={secureTextEntry}
                control={control}
                rules={rules}
            />
        </View>
    );
};

export default InputLabelComponent;
