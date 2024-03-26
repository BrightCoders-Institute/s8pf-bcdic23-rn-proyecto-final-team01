import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import InputComponent from '../InputComponent';
import { globalStyles } from '../../theme/globalStyles';
import LabelComponent from '../LabelComponent';
import Icon from 'react-native-vector-icons/Entypo';
import { InputWithIconComponentProps } from '../types';

const InputWithIconComponent = ({
    control,
    disabled,
    setDisabled,
    name,
    placeholder,
    rules,
    styles,
    textLabel,
    iconName,
    texInputDisabled
}: InputWithIconComponentProps) => {
    const handleDisabled = () => {
        setDisabled(!disabled)
    }

    return (
        <View>
            <LabelComponent text={textLabel} required />
            <View style={[globalStyles.rowContainer, globalStyles.inputContainer]}>
                {disabled ? (
                    <>
                        <InputComponent
                            name={name}
                            placeholder={placeholder}
                            control={control}
                            style={styles}
                            rules={rules}
                            disabled={!disabled}
                        />
                    </>
                ) : (
                    <Text style={{ flex: 1 }}>{texInputDisabled}</Text>
                )}
                <TouchableOpacity onPress={handleDisabled}>
                    <Icon name={iconName ? iconName : 'pencil'} size={22} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InputWithIconComponent;
