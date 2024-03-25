import {View, StyleSheet, Image, ImageProps} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface Props {
  name: string;
  description: string;
  image: string;
  favorite?: boolean;
  onPress: () => void;
}

const CardComponent = (props: Props) => {
  const {name, description, image, favorite, onPress} = props;

  const renderDescription = (text: string) => {
    const words = text.split(' ');
    const limitedWords = words.slice(0, 25);
    return limitedWords.join(' ');
  };

  const limitedDescription = renderDescription(description);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      {favorite && (
        <Icon name="heart" color="red" size={25} style={styles.heartIcon} />
      )}
      <Image
        source={{uri: image}}
        style={{width: '100%', height: 150, objectFit: 'cover'}}
      />
      <View style={styles.textContainer}>
        <View style={styles.tittleContainer}>
          <TextComponent text={name} font="bold" size={26} />
        </View>
        <TextComponent text={`${limitedDescription}...`} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: 'hidden',
    marginVertical: 15,
    marginHorizontal: 5,
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
