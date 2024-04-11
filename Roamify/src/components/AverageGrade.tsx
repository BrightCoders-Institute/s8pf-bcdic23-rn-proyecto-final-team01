import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {getReviews} from '../hooks/getReviews';

interface Props {
  id: string;
}

const AverageGrade = (props: Props) => {
  const {id} = props;

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
  }, []);

  if (!reviews) {
    return null;
  }

  const ratingsArray = reviews.map(rev => rev.rating);

  const sumAllRatings = ratingsArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const average = Math.round((sumAllRatings / reviews?.length) * 10) / 10;

  return (
    sumAllRatings != '' && (
      <View style={styles.container}>
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
