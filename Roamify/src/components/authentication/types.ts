import { Dispatch, SetStateAction } from "react";

export type ModalForgetPassProps = {
    visible: boolean;
    onClose: () => void;
    setModalForgetPassVisible: Dispatch<SetStateAction<boolean>>
}