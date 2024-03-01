import {FieldError, UseFormRegister} from 'react-hook-form';

export type FormData = {
  email: string;
  name: string;
  password: string;
};

export type FormFieldProps = {
  name: string;
  placeholder: string;
  style: object;
  secureTextEntry?: boolean;
  rules?: object;
  control: any;
  errors?: any;
  setValue?: any;
};

export type InputFileProps = {
  name: string;
  placeholder: string;
  style: object;
  control: any;
  errors: any;
  setValue: any;
  icon: any;
};

export type ValidFieldNames = 'email' | 'name' | 'password';
