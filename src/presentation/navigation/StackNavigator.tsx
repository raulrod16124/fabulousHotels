import { createStackNavigator } from '@react-navigation/stack';
import { HotelsListScreen } from '../screens/HotelsListScreen';
import { HotelDetailsScreen } from '../screens/HotelDetailsScreen';
import { Hotel } from '../../interfaces/hotels.interfaces';
import { SplashScreen } from '../screens/SplashScreen';

export type RootStackParams = {
  SplashScreen: undefined;
  HotelsListScreen: undefined;
  HotelDetailsScreen: { hotel: Hotel};
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HotelsListScreen" component={HotelsListScreen} />
      <Stack.Screen name="HotelDetailsScreen" component={HotelDetailsScreen} />
    </Stack.Navigator>
  );
}