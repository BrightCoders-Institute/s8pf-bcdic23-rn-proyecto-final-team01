import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AddEventScreen from '../screens/AddEventScreen';
import GoogleMapComponent from '../components/googlemaps/GoogleMapComponent';
import ProfileScreen from '../screens/ProfileScreen';
import {AuthProvider} from '../contexts/AuthContext';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

export interface PropsNavigator extends StackScreenProps<any, any> {}

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
          <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} />
          <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
          <Stack.Screen
            name="GoogleMapComponent"
            component={GoogleMapComponent}
          />
          <Stack.Screen
            name="EventDetailsScreen"
            component={EventDetailsScreen}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default StackNavigation;
