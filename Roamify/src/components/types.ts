import {Dispatch, SetStateAction} from 'react';
import * as ImagePicker from 'react-native-image-picker';

export type ImageStorageProp = {
  uri: string;
  route: string;
};

export type ImageResponse = {
  assets: {uri: string}[];
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

export type userAuthProp = {
  email: string;
  name?: string;
  password: string;
};

export type ImageInputProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type FormProfileProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type ModalForgetPassProps = {
  visible: boolean;
  onClose: () => void;
  setModalForgetPassVisible: Dispatch<SetStateAction<boolean>>;
};

export type ModalChangePasswordProps = {
  visible: boolean;
  onClose: () => void;
  setModalChangePassVisible: Dispatch<SetStateAction<boolean>>;
  newPassword: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  closeInputPassword: () => void;
};

export type InputLabelComponentProps = {
  control: any;
  name: string;
  placeholder: string;
  rules: object;
  style: object;
  textLabel: string;
  secureTextEntry?: boolean;
};

export type InputWithIconComponentProps = {
  control: any;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  name: string;
  placeholder: string;
  rules: object;
  styles: object;
  textLabel: string;
  iconName?: string;
  texInputDisabled: string;
  defaultValue?: string;
};

export type ModalComponentProps = {
  visible: boolean;
  onClose: () => void;
  aceptar: () => void;
  children: React.JSX.Element;
};

export type CoordsProps = {
  latitude: number;
  longitude: number;
};

export type ResquestlocationProps = {
  category?: string;
  date?: string;
  description?: string;
  image?: string;
  limitedCapacity?: boolean;
  map?: mapProp;
  price?: string;
  time?: string;
  type?: string;
  name?: string;
  userId?: string;
  id: string;
}

export type LocationProps = {
  category: string;
  date: string;
  description: string;
  image: string;
  limitedCapacity?: boolean;
  map?: mapProp;
  price?: string;
  time?: string;
  type?: string;
  name: string;
  userId?: string;
  id: string;
}

export type ResquestReviewsProps = {
  id: string;
  userId?: string;
  review?: string;
  rating?: number;
}

export type mapProp = {
  latitude: number;
  longitude: number;
}