import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Hotel } from '../../interfaces/hotels.interfaces'

interface IProps {
    hotel: Hotel;
    onPress: () => void;
}

export const HotelCard = ({hotel, onPress}: IProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: hotel.gallery[0] }} style={styles.image} />

            <View style={styles.textOverlay}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{hotel.name}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>⭐ {hotel.stars} Stars</Text>
                    <Text style={styles.infoText}>Price: {hotel.price}</Text>
                </View>

                <Text style={[styles.infoText, { marginTop: 5, fontSize: 12 }]}>
                    {hotel.location.address}, {hotel.location.city}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      height: 300,
      borderRadius: 10,
      overflow: 'hidden',
      marginVertical: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginHorizontal: 20
    },
    image: {
      flex: 1,
      width: '100%',
      resizeMode: 'cover',
    },
    textOverlay: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
    },
    titleContainer: {
      marginBottom: 5,
    },
    title: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoText: {
      color: '#fff',
      fontSize: 14,
    },
  });