import {View, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
  cultural?: boolean;
}

const BadgeComponent = (props: Props) => {
  const {cultural} = props;

  return (
    <View style={[cultural && styles.culturalBadge, styles.badgeContainer]}>
      {cultural && (
        <TextComponent text="Cultural" color={'black'} font="bold" size={12} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    padding: 5,
    borderRadius: 100,
    borderWidth: 2,
    minWidth: 70,
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  culturalBadge: {
    borderColor: '#456547',
    backgroundColor: '#567778',
  },
});

export default BadgeComponent;
