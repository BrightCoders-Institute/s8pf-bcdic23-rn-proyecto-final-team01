import {View, Text} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LabelComponent from '../components/LabelComponent';
import InputComponent from '../components/InputComponent';
import InputFileComponent from '../components/InputFileComponent';
import {globalStyles} from '../theme/globalStyles';
import FormAddEvent from '../components/FormAddEvent';
import TextComponent from '../components/TextComponent';
import CardContainer from '../components/CardContainer';

const AddEventScreen = () => {
  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={{paddingHorizontal: 25}}>
        <TextComponent text="Crear un evento" font="bold" size={26} />
      </View>
      <CardContainer>
        <FormAddEvent />
      </CardContainer>
    </View>
  );
};

export default AddEventScreen;
