import {View, StyleSheet, Image, ImageProps} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';
interface Props {
  name: string;
  description: string;
  image: ImageProps;
  favorite?: boolean;
}

const CardComponent = (props: Props) => {
  const {name, description, image, favorite} = props;

  return (
    <View style={styles.cardContainer}>
      {favorite && (
        <Icon name="heart" color="red" size={25} style={styles.heartIcon} />
      )}
      <Image
        source={image}
        style={{width: '100%', height: 150, objectFit: 'cover'}}
      />
      <View style={styles.textContainer}>
        <View style={styles.tittleContainer}>
          <TextComponent text={name} font="bold" size={26} />
        </View>
        <TextComponent text={description} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    overflow: 'hidden',
    elevation: 24,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  tittleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartIcon: {
    position: 'absolute',
    margin: 15,
    right: 0,
    zIndex: 10,
  },
});

export default CardComponent;
