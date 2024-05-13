import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {getReviews} from '../hooks/getReviews';
import {calculateAverageRating} from '.';
interface Props {
  id: string;
  style?: StyleProp<ViewStyle>;
}

const AverageGrade = (props: Props) => {
  const {id, style} = props;
  const [reviews, setReviews] = useState<Array<any>>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(id);
        setReviews(data?.reviewsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchReviews();
  }, [id]);

  if (!reviews) {
    return null;
  }

  const average = reviews ? calculateAverageRating(reviews) : null;

  return (
    average != null && (
      <View style={[styles.container, style]}>
        <TextComponent text={average.toString()} font="bold" />
        <Icon name="star" size={25} color="#A8BD29" />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});

export default AverageGrade;
