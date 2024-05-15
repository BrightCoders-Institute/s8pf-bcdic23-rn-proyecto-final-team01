import {View, StyleSheet, Image, ImageProps} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AverageGrade from './AverageGrade';
interface Props {
  id: string;
  name: string;
  description: string;
  image: string;
  favorite?: boolean;
  onPress: () => void;
  average?: number;
}

const CardComponent = (props: Props) => {
  const {id, name, description, image, favorite, onPress, average} = props;

  const renderDescription = (text: string) => {
    if (text === undefined || text === null) {
      
      return ''; 
    }
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
          <TextComponent text={name} font="bold" size={24} />
        </View>
        <AverageGrade average={average} />
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
    padding: 25,
    justifyContent: 'flex-start',
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
