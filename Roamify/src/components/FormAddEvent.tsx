import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from './TextComponent';
import InputComponent from './InputComponent';
import CalendarComponent from './CalendarComponent';
import InputFileComponent from './InputFileComponent';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SectionComponent from './SectionComponent';
import CardContainer from './CardContainer';
import {ScrollView} from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBoxComponent from './CheckBoxComponent';

const schemaAddEvent = yup.object().shape({
  file: yup.mixed().required('File is required'),
  text: yup.string().required('Text is required'),
});

const FormAddEvent = ({ location, setLocation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaAddEvent),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TextComponent text="Nombre del evento" />
      <InputComponent
        placeholder="Nombra tu evento"
        style={globalStyles.inputPrimary}
        control={control}
        setValue={setValue}
        errors={errors}
        name="nameEvent"
      />
      <TextComponent text="Portada" />
      <InputFileComponent
        placeholder="Añade un foto"
        style={globalStyles.inputPrimary}
        control={control}
        setValue={setValue}
        errors={errors}
        name="photoEvent"
        icon="camera"
      />
      <TextComponent text="Selecciona una fecha" />
      <CalendarComponent />
      <TextComponent text="Dirección del evento" />
      <InputFileComponent
        placeholder="Seleccionar en el mapa"
        style={globalStyles.inputPrimary}
        control={control}
        setValue={setValue}
        errors={errors}
        name="map"
        icon="location"
        location={location}
        setLocation={setLocation}
      />
      <TextComponent text="Descripción del evento" />
      <InputComponent
        placeholder="Agrega una descripción"
        style={globalStyles.inputPrimary}
        control={control}
        setValue={setValue}
        errors={errors}
        name="descriptionEvent"
      />
      <TextComponent text="Capacidad limitada" />
      <CheckBoxComponent />
      <TouchableOpacity
        style={globalStyles.buttonPrimary}
        onPress={handleSubmit(onSubmit)}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
          Crear evento
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

export default FormAddEvent;
