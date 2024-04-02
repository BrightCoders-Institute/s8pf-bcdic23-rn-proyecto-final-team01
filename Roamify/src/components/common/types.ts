import { Dispatch, SetStateAction } from "react";

export type InputLabelComponentProps = {
    control: any;
    name: string;
    placeholder: string;
    rules: object;
    style: object;
    textLabel: string;
    secureTextEntry?: boolean;
}

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
}

export type ModalComponentProps = {
    visible: boolean;
    onClose: () => void;
    aceptar: () => void;
    children:  React.JSX.Element;
}