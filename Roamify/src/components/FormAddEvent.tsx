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
import firestore from '@react-native-firebase/firestore';
import InputMapComponent from './InputMapComponent';
import ImagePickerComponent from './ImagePickerComponent';
import {getDate} from '../hooks/getDate';
import {useNavigation} from '@react-navigation/native';
import InputCategory from './InputCategory';

const schemaAddEvent = yup.object().shape({
  nameEvent: yup.string().required('Nombre del evento es requerido'),
  image: yup.string(),
  descriptionEvent: yup.string().required('La descripción es requerida'),
  date: yup.string(),
  category: yup.string(),
  map: yup.object().required('Selecciona una ubicación válida'),
  limitedCapacity: yup.boolean(),
});

/* @ts-ignore */
const FormAddEvent = ({location, setLocation, setIsLoading}) => {
  const navigation = useNavigation();

  /* Category set */
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  /* Date set */
  const formattedDate = getDate();

  const [selectedDate, setSelectedDate] = useState<string>(formattedDate);

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
  };

  /* Limited Capacity check */
  const [isChecked, setIsChecked] = useState(false);

  /* set image link */
  const defaultEvent =
    'https://firebasestorage.googleapis.com/v0/b/roamify-bb95e.appspot.com/o/images%2FdefaultEventImage.jpg?alt=media&token=fa29ddfb-e597-4b1c-9757-7e0b7f55ea5e';

  const [link, setLink] = useState<string>(defaultEvent);
  const handleSetLink = (downloadLink: string) => {
    setLink(downloadLink);
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

  const values = getValues();
  values.category = selectedCategory;
  console.log('Valores: ' + values.category);

  const onSubmit = async () => {
    setIsLoading(true);
    const values = getValues();
    const {nameEvent, descriptionEvent, image, date, map, limitedCapacity} =
      values;
    const category = selectedCategory;
    try {
      firestore()
        .collection('events')
        .add({
          nameEvent,
          descriptionEvent,
          image: link,
          date: selectedDate,
          category,
          map,
          limitedCapacity: isChecked,
        })
        .then(() => {
          console.log('Event added!');
        })
        .catch(error => console.log('Error adding event: ', error));
    } catch (error: any) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
      /* @ts-ignore */
      navigation.navigate('MyEventsScreen');
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
      <TextComponent text="Selecciona una foto de portada" />
      <ImagePickerComponent setDownloadLink={handleSetLink} />
      <TextComponent text="Selecciona una fecha" />
      <CalendarComponent onDateSelect={handleDateSelect} />
      <TextComponent text="Selecciona una categoría" />
      <InputCategory errors={errors} setCategory={handleCategorySelect} />
      <TextComponent text="Hora" />
      <TextComponent text="Dirección del evento" />
      <InputMapComponent
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
      <TextComponent text="Costo del evento (Opcional)" />
      <TextComponent text="Capacidad limitada" />
      <CheckBoxComponent onPress={() => setIsChecked(!isChecked)} />
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
