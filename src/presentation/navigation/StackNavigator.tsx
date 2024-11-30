import { createStackNavigator } from '@react-navigation/stack';
import { HotelsListScreen } from '../screens/HotelsListScreen';
import { HotelDetailsScreen } from '../screens/HotelDetailsScreen';
import { Hotel } from '../../interfaces/hotels.interfaces';

export type RootStackParams = {
    HotelsListScreen: undefined;
    HotelDetailsScreen: { hotel: Hotel};
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HotelsListScreen" component={HotelsListScreen} />
      <Stack.Screen name="HotelDetailsScreen" component={HotelDetailsScreen} />
    </Stack.Navigator>
  );
}