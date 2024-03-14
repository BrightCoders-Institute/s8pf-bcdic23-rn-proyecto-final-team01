import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import FormAddEvent from '../components/FormAddEvent';
import TextComponent from '../components/TextComponent';
import CardContainer from '../components/CardContainer';
import LoadingComponent from '../components/LoadingComponent';

const AddEventScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  return (
    <>
      {isLoading && <LoadingComponent />}
      <View style={globalStyles.screen}>
        <Header />
        <View style={{paddingHorizontal: 25}}>
          <TextComponent text="Crear un evento" font="bold" size={26} />
        </View>
        <CardContainer>
          <FormAddEvent
            location={location}
            setLocation={setLocation}
            setIsLoading={setIsLoading}
          />
        </CardContainer>
      </View>
    </>
  );
};

export default AddEventScreen;
