import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from './TextComponent';

const InputCategory = ({setCategory, errors}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = [
    {
      id: 1,
      categoryName: 'Sociales',
    },
    {
      id: 2,
      categoryName: 'Por Temporada',
    },
    {
      id: 3,
      categoryName: 'Festivos',
    },
  ];

  const clickCategory = (category: string) => {
    setSelectedCategory(category);
    setIsHidden(true);
    setCategory(category);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          globalStyles.inputPrimary,
          {paddingVertical: 10, maxWidth: 250},
        ]}
        onPress={() => setIsHidden(!isHidden)}>
        <TextComponent
          text={selectedCategory === null ? 'Ver categorías' : selectedCategory}
          size={14}
          color="gray"
        />
      </TouchableOpacity>
      {isHidden != true && (
        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => clickCategory(category.categoryName)}>
              <TextComponent text={category.categoryName} />
            </TouchableOpacity>
          ))}
        </View>
      )}
      {errors.category && selectedCategory === null && (
        <Text style={{color: 'red', fontSize: 12}}>
          {errors.category.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  categoriesContainer: {
    position: 'absolute',
    backgroundColor: '#F2F3F5',
    borderRadius: 10,
    zIndex: 10,
    padding: 20,
    top: 45,
    minWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default InputCategory;
