import {View, Text, StyleProp, ViewProps, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
  styles?: StyleProp<ViewProps>;
}

const SectionComponent = (props: Props) => {
  const {children, styles} = props;

  return <View style={[styles, sectionStyle.container]}>{children}</View>;
};

const sectionStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default SectionComponent;
