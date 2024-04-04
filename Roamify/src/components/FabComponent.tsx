import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  // Position
  styles?: StyleProp<ViewStyle>;
}

const FabComponent = (props: Props) => {
  const {styles} = props;

  const navigation = useNavigation();

  return (
    <View style={[stylesFab.container, styles]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={stylesFab.fabButton}>
        <Icon name="chevron-back" color="#A8BD29" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export const stylesFab = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
  },
  fabButton: {
    width: 40,
    zIndex: 100,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});

export default FabComponent;
