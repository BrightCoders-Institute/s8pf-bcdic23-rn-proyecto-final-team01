import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  icon: string;
  text: string;
  active?: boolean;
  onPress?: () => void;
}

const NavItemComponent = (props: Props) => {
  const {icon, text, active, onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.navItem, active && {borderColor: '#3D5C00'}]}
      onPress={onPress}>
      <Icon name={icon} color={'#3D5C00'} size={25} />
      <TextComponent text={text} color="#3D5C00" size={14} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'white',
    paddingBottom: 5,
  },
});

export default NavItemComponent;
