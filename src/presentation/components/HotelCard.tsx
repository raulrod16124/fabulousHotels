import { View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { Hotel } from '../../interfaces/hotels.interfaces'
import theme from "../theme.json"
import Icon from '@react-native-vector-icons/fontawesome6';

interface IProps {
    hotel: Hotel;
    onPress: () => void;
    extraStyles?: StyleProp<ViewStyle>
}

export const HotelCard = ({hotel, onPress, extraStyles}: IProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, extraStyles]} testID='hotel-card'>
            <Image source={{ uri: hotel.gallery[0] }} style={styles.image} testID='hotel-image' />

            <View style={styles.textOverlay}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{hotel.name}</Text>
                </View>

                <View style={styles.infoWrapper}>
                    <View style={styles.infoContainer}>
                        <Icon 
                            name="star" 
                            size={20} 
                            color={theme.colors.secondary} 
                            iconStyle='solid'
                            style={{marginRight: 5}}
                        />
                        <Text style={styles.infoText}>
                            {hotel.stars}
                        </Text>
                    </View>

                    <Text style={styles.infoText}>{hotel.price} $</Text>

                    <Text style={[styles.infoText, { marginTop: 5 }]}>
                        {hotel.location.city}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        borderRadius: 20,
        backgroundColor: theme.colors.lightGrey,
        overflow: 'hidden',
        marginVertical: 10,
        elevation: 3,
        shadowColor: theme.colors.black,
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
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    titleContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    title: {
        color: theme.colors.white,
        fontSize: 22,
        fontFamily: theme.fonts.primary,
    },
    infoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        padding: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoText: {
        color: theme.colors.text,
        fontSize: 24,
        fontFamily: theme.fonts.primary,
    },
  });