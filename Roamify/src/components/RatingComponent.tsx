import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextComponent from './TextComponent';

/* @ts-ignore */
const RatingComponent = ({setRating, disabled, obtainedValue, error}) => {
  const [ratingValue, setRatingValue] = useState(obtainedValue);

  const handleRating = (value: number) => {
    setRatingValue(value);
    setRating(value);
  };

  const rating = [
    {
      icon: ratingValue >= 1 ? 'star' : 'star-outline',
      value: 1,
    },
    {
      icon: ratingValue >= 2 ? 'star' : 'star-outline',
      value: 2,
    },
    {
      icon: ratingValue >= 3 ? 'star' : 'star-outline',
      value: 3,
    },
    {
      icon: ratingValue >= 4 ? 'star' : 'star-outline',
      value: 4,
    },
    {
      icon: ratingValue === 5 ? 'star' : 'star-outline',
      value: 5,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        {rating.map(item => (
          <TouchableOpacity
            key={item.value}
            onPress={() => handleRating(item.value)}
            disabled={disabled}>
            <Icon name={item.icon} size={22} color="#A8BD29" />
          </TouchableOpacity>
        ))}
      </View>
      {error && (
        <TextComponent
          text="La calificación no puede estar vacía"
          color="red"
          size={12}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
});

export default RatingComponent;
