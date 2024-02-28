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
  rules: object;
  control: any;
};

export type ValidFieldNames = 'email' | 'name' | 'password';
