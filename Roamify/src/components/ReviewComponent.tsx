import {View, StyleSheet, Image, ImageProps} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import RatingComponent from './RatingComponent';

interface Props {
  image: ImageProps;
  userName: string;
  userReview: string;
}

const ReviewComponent = (props: Props) => {
  const {image, userName, userReview} = props;

  return (
    <View>
      <View style={styles.userContainer}>
        <Image source={image} style={styles.imageContainer} />
        <View>
          <TextComponent text={userName} font="bold" size={20} />
          <RatingComponent />
        </View>
      </View>
      <View style={styles.textContainer}>
        <TextComponent text={userReview} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    width: 50,
    height: 50,
  },
  textContainer: {
    padding: 15,
  },
});

export default ReviewComponent;
