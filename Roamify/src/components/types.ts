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