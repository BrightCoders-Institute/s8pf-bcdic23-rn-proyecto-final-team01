import { Dispatch, SetStateAction } from 'react';
import * as ImagePicker from 'react-native-image-picker';

export type ImageStorageProp = {
    uri: string
    route: string;
};

export type ImageResponse = {
    assets: { uri: string }[];
};

export type ActionImagePicker = {
    title: string;
    type: 'library';
    options: ImagePicker.ImageLibraryOptions;
};

export type ResquestUpdateUser = {
    userId: string;
    data: userDataProp;
};

export type userDataProp = {
    email?: string;
    name?: string;
    profileImgURL?: string;
};

export type ImageInputProps = {
    setIsLoading: Dispatch<SetStateAction<boolean>>
}