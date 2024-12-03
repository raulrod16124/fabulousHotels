import { View, Text, Image, StyleSheet } from 'react-native';
import { RootStackParams } from '../navigation/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import theme from "../theme.json"

interface IProps extends StackScreenProps<RootStackParams, "HotelDetailsScreen"> {}

export const HotelDetailsScreen = ({ route }: IProps) => {
  const { hotel } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: hotel.gallery[0] }} style={styles.image} />

      <Text style={styles.title}>{hotel.name}</Text>
      <Text style={styles.details}>⭐ {hotel.stars} Stars</Text>
      <Text style={styles.details}>{hotel.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});
