import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CardContainer = (props: Props) => {
  const {children} = props;

  return (
    <ScrollView>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 35,
  },
});

export default CardContainer;
