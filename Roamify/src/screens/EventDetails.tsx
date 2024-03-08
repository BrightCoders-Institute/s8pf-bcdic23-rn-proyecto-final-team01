import React from 'react';
import { View, Image, StyleSheet, ScrollView} from 'react-native';
import TextComponent from '../components/TextComponent';
import ReviewComponent from '../components/ReviewComponent';
import Icon from 'react-native-vector-icons/Ionicons'
import FabComponent from '../components/FabComponent';
import GoogleMapComponent from '../components/googlemaps/GoogleMapComponent';
import { PropsNavigator } from '../navigation/Navigation';


const EventDetails = ({navigation}: PropsNavigator) => {
  
  return (
    <ScrollView>
      <FabComponent
        iconName="chevron-back"
        iconSize={30}
        iconColor="#606eee"
        onPress={() => navigation.navigate('HomeScreen')}
        styles={{top: 10, left: 16}}
      />
      <View style={styles.container}>
        <Image
          source={require('../assets/sample-image.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <TextComponent
              text="La petatera"
              font="bold"
              size={30}
              styles={{paddingTop: 15}}
          />
          <View style={styles.locationContainer}>
              <Icon name="location" color="#A8BD29" size={22}/>
              <TextComponent
                  text="Evento Social"
                  font="normal"
                  size={16}
              />
          </View>
          <View style={styles.locationContainer}>
              <Icon name="calendar" color="#A8BD29" size={22} />
              <TextComponent
                  text="Fecha 08 de febrero al 17 de febrero"
                  font="normal"
                  size={16}
              />
          </View>
          <View style={styles.locationContainer}>
              <Icon name="time" color="#A8BD29" size={22} />
              <TextComponent
                  text="Horarios de 10am a 2am"
                  font="normal"
                  size={16}
              />
          </View>
          <View style={styles.locationContainer}>
              <TextComponent text=" $ " font="bold" color="#A8BD29" size={22} />
              <TextComponent
                  text="Costo de entrada: $50"
                  font="normal"
                  size={16}
              />
          </View>
          <TextComponent
              text="La artesanía más grande del mundo. Tiene un cupo para 6400 personas entre gradas, plateas y bajos"
              font="normal"
              size={16}
              styles={{paddingTop: 15}}
          />
        </View>
        <View style={styles.detailsContainer}>
          {/* <GoogleMapComponent /> */}
          <Image
          source={require('../assets/map.jpg')} 
          style={styles.image}
          resizeMode="cover"
          />
        </View>
        <View style={styles.review}>
          <ReviewComponent
              image={require('../assets/user.jpg')} 
              userName="Nombre del usuario"
              userReview="Reseña del usuario"
          />
          <ReviewComponent
              image={require('../assets/user.jpg')} 
              userName="Nombre del usuario"
              userReview="Reseña del usuario"
          />
          </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%', 
    height: 200,
  },
  iconGray: {
    color: '#949494',
    marginRight: 10,
  },
  icon: {
    color: "#FFD43B",
  },
  detailsContainer: {
    padding: 20,
    flexDirection: 'column',
    gap: 10,
  },
  review: {
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  styleGoogle: {
    display: 'flex',
    width: '100%',
    height: '40%',
  }
});

export default EventDetails;
