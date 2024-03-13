import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { uploadImageStorange } from '.';
import { ActionImagePicker, ImageResponse } from './types';

const actions: ActionImagePicker[] = [
    {
        title: 'Select Image',
        type: 'library',
        options: {
            quality: 0.5,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        },
    },
];

const ImageInput = () => {
    const [response, setResponse] = useState<ImageResponse | null>(null);

    const submitImage = useCallback(
        (type: string, options: ImagePicker.ImageLibraryOptions) => {
            if (type === 'library') {
                ImagePicker.launchImageLibrary(options, setResponse);
            }
        }, []);

    useEffect(() => {
        if (!response) {
            console.log("Elige una imagen");
            return;
        } else {
            const data = uploadImageStorange({
                uri: response?.assets[0].uri, route: "profileImage"
            })
            setResponse(null)
            console.log('data', data);
        }
    }, [response])

    return (
        <View>
            <View>
                <Button
                    title="Selecciona y guarda una imagen"
                    onPress={
                        () => submitImage(actions[0].type, actions[0].options)
                    }
                />
            </View>
        </View>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aliceblue',
    },
});
