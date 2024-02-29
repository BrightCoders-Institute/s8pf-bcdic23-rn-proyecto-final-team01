import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import BarItemComponent from './BarItemComponent';

const BarComponent = () => {
  const [active, setActive] = useState('Destacado');

  const handleCategory = (text: string) => {
    setActive(text);
  };

  return (
    <View
      style={{
        marginTop: 25,
        marginHorizontal: 15,
        marginBottom: 10,
      }}>
      <ScrollView horizontal>
        <BarItemComponent
          text="Destacado"
          active={active === 'Destacado'}
          onPress={() => handleCategory('Destacado')}
        />
        <BarItemComponent
          text="Turísticos"
          active={active === 'Turísticos'}
          onPress={() => handleCategory('Turísticos')}
        />
        <BarItemComponent
          text="Históricos"
          active={active === 'Históricos'}
          onPress={() => handleCategory('Históricos')}
        />
        <BarItemComponent
          text="Sociales"
          active={active === 'Sociales'}
          onPress={() => handleCategory('Sociales')}
        />
        <BarItemComponent
          text="Por Temporada"
          active={active === 'Por Temporada'}
          onPress={() => handleCategory('Por Temporada')}
        />
        <BarItemComponent
          text="Playas"
          active={active === 'Playas'}
          onPress={() => handleCategory('Playas')}
        />
        <BarItemComponent
          text="Festivos"
          active={active === 'Festivos'}
          onPress={() => handleCategory('Festivos')}
        />
      </ScrollView>
    </View>
  );
};

export default BarComponent;
