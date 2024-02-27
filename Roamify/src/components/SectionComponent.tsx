import {View, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const SectionComponent = (props: Props) => {
  const {children} = props;

  return <View style={sectionStyle.container}>{children}</View>;
};

const sectionStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 35,
    justifyContent: 'center',
  },
});

export default SectionComponent;
