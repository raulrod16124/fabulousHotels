import { createStackNavigator } from '@react-navigation/stack';
import { HotelsListScreen } from '../screens/HotelsListScreen';

export type RootStackParams = {
    HotelsListScreen: undefined;
    // HotelDetailsScreen: { hotelId: number};
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HotelsListScreen" component={HotelsListScreen} />
    </Stack.Navigator>
  );
}