import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from './TextComponent';
import InputComponent from './InputComponent';
import CalendarComponent from './CalendarComponent';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckBoxComponent from './CheckBoxComponent';
import InputFileComponent from './InputFileComponent';
import firestore from '@react-native-firebase/firestore';
import InputMapComponent from './InputMapComponent';

const schemaAddEvent = yup.object().shape({
  nameEvent: yup.string().required('Nombre del evento es requerido'),
  file: yup.array().required('Archivo no válido'),
  descriptionEvent: yup.string().required('La descripción es requerida'),
  date: yup.string(),
  map: yup.object().required('Selecciona una ubicación válida'),
  /* capacity: yup.boolean(), */
});

const FormAddEvent = ({location, setLocation}) => {
  const currentDate = new Date();

  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  const [selectedDate, setSelectedDate] = useState<string>(formattedDate);

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaAddEvent),
  });

  /* @ts-ignore */
  const onSubmit = () => {
    const values = getValues();
    const {nameEvent, descriptionEvent, file, date, map} = values;
    try {
      firestore()
        .collection('events')
        .add({
          nameEvent,
          descriptionEvent,
          file,
          date: selectedDate,
          map,
        })
        .then(() => {
          console.log('Event added!');
        });
    } catch (error: any) {
      console.error('Error: ', error);
    }
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
      <CalendarComponent onDateSelect={handleDateSelect} />
      <TextComponent text="Dirección del evento" />
      <InputMapComponent
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
      {/* <TextComponent text="Capacidad limitada" />
      <CheckBoxComponent /> */}
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

[
  {
    fileCopyUri: 'null',
    size: '',
  },
];
