import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CardComponent from './CardComponent';
import DATA from '../API/EventsData';
import { useNavigation } from '@react-navigation/native';

type ItemData = {
  id: string;
  title: string;
  description: string;
  sample: any;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <CardComponent
      name={item.title}
      description={item.description}
      image={item.sample}
    />
  </TouchableOpacity>
);

const FlatListComponent = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? 'white' : 'white';
    const color = item.id === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('EventDetailsScreen', {selectedId: item.id})}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    
  },
  item: {
    padding: 5,
  },
  title: {
    fontSize: 32,
  },
});

export default FlatListComponent;
