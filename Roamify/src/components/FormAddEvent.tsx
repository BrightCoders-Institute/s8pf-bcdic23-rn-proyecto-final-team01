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
import DatePicker from 'react-native-date-picker';
import ButtonComponent from './ButtonComponent';
import {useAuth} from '../contexts/AuthContext';

const schemaAddEvent = yup.object().shape({
  name: yup.string().required('Nombre del evento es requerido'),
  image: yup.string(),
  description: yup.string().required('La descripción es requerida'),
  date: yup.string(),
  category: yup.string(),
  map: yup.object().required('Selecciona una ubicación válida'),
  limitedCapacity: yup.boolean(),
  price: yup.string(),
});

/* @ts-ignore */
const FormAddEvent = ({location, setLocation, setIsLoading}) => {
  const navigation = useNavigation();
  const currentUser = useAuth().userId;

  /* Category set */
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const formattedTime = time.toString().substring(16, 21);

  console.log(formattedTime);

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

  const onSubmit = () => {
    setIsLoading(true);
    const values = getValues();
    const {name, description, image, date, map, limitedCapacity, price} =
      values;
    const category = selectedCategory;
    const type = 'event';
    try {
      firestore()
        .collection('locations')
        .add({
          average: 0,
          name,
          description,
          image: link,
          date: selectedDate,
          category,
          map,
          limitedCapacity: isChecked,
          type,
          price,
          time: formattedTime,
          userId: currentUser,
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
    <>
      <DatePicker
        modal
        mode="time"
        open={isOpen}
        date={time}
        onConfirm={time => {
          setIsOpen(false);
          setTime(time);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
      <View style={styles.container}>
        <TextComponent text="Nombre del evento" />
        <InputComponent
          placeholder="Nombra tu evento"
          style={globalStyles.inputPrimary}
          control={control}
          setValue={setValue}
          errors={errors}
          name="name"
        />
        <TextComponent text="Selecciona una foto de portada" />
        <ImagePickerComponent setDownloadLink={handleSetLink} />
        <TextComponent text="Selecciona una fecha" />
        <CalendarComponent onDateSelect={handleDateSelect} />
        <TextComponent text="Selecciona una categoría" />
        <InputCategory errors={errors} setCategory={handleCategorySelect} />
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
          name="description"
        />
        <TextComponent text="Hora (Opcional)" />
        <ButtonComponent
          text="Selecciona la hora del evento"
          onPress={() => setIsOpen(true)}
        />
        <TextComponent text="Costo del evento (Opcional)" />
        <InputComponent
          placeholder="Escribe el costo"
          style={globalStyles.inputPrimary}
          control={control}
          setValue={setValue}
          errors={errors}
          name="price"
        />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 35,
  },
});

export default FormAddEvent;

[
  {
    fileCopyUri: 'null',
    size: '',
  },
];
