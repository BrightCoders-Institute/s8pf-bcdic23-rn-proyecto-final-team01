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
  disabled?: boolean;
  defaultValue?: string;
};

export type InputFileProps = {
  name: string;
  placeholder: string;
  style: object;
  control: any;
  errors: any;
  setValue: any;
  icon: any;
  location?: any;
  setLocation?: any;
};

export type ValidFieldNames = 'email' | 'name' | 'password';
