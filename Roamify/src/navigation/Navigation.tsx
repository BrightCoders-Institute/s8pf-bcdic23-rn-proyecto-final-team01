import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AddEventScreen from '../screens/AddEventScreen';

const Stack = createStackNavigator();

export interface PropsNavigator extends StackScreenProps<any, any> {}

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
