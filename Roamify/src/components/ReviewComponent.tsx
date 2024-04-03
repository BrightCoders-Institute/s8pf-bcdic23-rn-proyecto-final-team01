import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import TextComponent from './TextComponent';
import RatingComponent from './RatingComponent';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import {globalStyles} from '../theme/globalStyles';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../contexts/AuthContext';

const schemaReview = yup.object().shape({
  review: yup.string(),
});

const ReviewComponent = ({locationId}) => {
  const user = useAuth();
  /* handle Rating */
  const [ratingNumber, setRatingNumber] = useState<number>();
  const [ratingError, setRatingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleRating = (ratingVal: number) => {
    setRatingNumber(ratingVal);
  };
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaReview),
  });

  const onSubmit = () => {
    setIsLoading(true);
    const values = getValues();
    const {review} = values;
    const rating = ratingNumber;
    try {
      if (rating != undefined && rating > 0) {
        firestore()
          .collection('locations')
          .doc(locationId)
          .collection('reviews')
          .add({
            userId: user.userId,
            review,
            rating,
          })
          .then(() => {
            console.log('Review Added!');
            setHidden(true);
          });
      } else {
        setRatingError(true);
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.userContainer, hidden && {display: 'none'}]}>
      <TextComponent text="Deja una reseña" size={24} font="bold" />
      <RatingComponent
        setRating={handleRating}
        obtainedValue={ratingNumber}
        disabled={false}
        error={ratingError}
      />
      <View>
        <InputComponent
          placeholder="Deja un comentario"
          style={globalStyles.inputDescription}
          control={control}
          setValue={setValue}
          errors={errors}
          name="review"
        />
      </View>
      <View style={{width: '100%'}}>
        <ButtonComponent
          text={isLoading ? 'Subiendo...' : 'Publicar Reseña'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
});

export default ReviewComponent;
