import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import BarItemComponent from './BarItemComponent';

const BarComponent = ({setSelectedCategory}) => {
  const [active, setActive] = useState('Destacado');
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: scrollX, animated: true});
    }
  }, [scrollX]);

  const handleCategory = (text: string, index: number) => {
    setActive(text);
    setScrollX(index * (itemWidth + itemSpacing));
    setSelectedCategory(text);
  };

  const categories = [
    {text: 'Destacado'},
    {text: 'Turísticos'},
    {text: 'Históricos'},
    {text: 'Sociales'},
    {text: 'Por Temporada'},
    {text: 'Playas'},
    {text: 'Festivos'},
  ];

  const itemWidth = 95;
  const itemSpacing = 5;

  return (
    <View style={{paddingHorizontal: 25}}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          style={styles.barContainer}
          contentContainerStyle={active != 'Destacado' && {paddingLeft: 32}}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <BarItemComponent
              key={index}
              text={category.text}
              active={active === category.text}
              onPress={() => handleCategory(category.text, index)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9BEBFF',
    borderRadius: 100,
    overflow: 'hidden',
    padding: 5,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

export default BarComponent;
