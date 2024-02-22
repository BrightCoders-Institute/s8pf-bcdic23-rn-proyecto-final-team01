import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  text: string;
  style?: StyleProp<ViewProps>;
}

const Button = (props: Props) => {
  const {text, style} = props;

  return (
    <TouchableOpacity activeOpacity={0.5} style={[style, styles.itemContainer]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(71, 198, 230, 0.3)',
    borderRadius: 10,
    width: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#040415',
    fontWeight: 'bold',
    padding: 7,
  },
});

export default Button;
