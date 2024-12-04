import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { RootStackParams } from '../navigation/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from "../theme.json"

interface IProps extends StackScreenProps<RootStackParams, "HotelDetailsScreen"> {}

export const HotelDetailsScreen = ({ navigation, route }: IProps) => {
  const hotel = route.params.hotel;
  const {
    name,
    location,
    stars,
    checkIn,
    checkOut,
    contact,
    gallery,
    userRating,
    price,
    currency,
  } = hotel;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.iconButtonContainer} onPress={()=>navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={theme.colors.black} iconStyle='solid'/>
      </TouchableOpacity>
      <Image source={{ uri: gallery[0] }} style={styles.mainImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.hotelName}>{name}</Text>

        <Text style={styles.location}>{location.address}, {location.city}</Text>


        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>
            {currency} {price} / night
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              <Icon 
                name="star" 
                size={20} 
                color={theme.colors.secondary} 
                iconStyle='solid'
              />  
              {userRating}
            </Text>
            <Text style={styles.stars}>({stars} stars)</Text>
          </View>
        </View>

        <View style={styles.checkContainer}>
          <Text style={styles.checkText}>
            Check-in: {checkIn.from} - {checkIn.to}
          </Text>
          <Text style={styles.checkText}>
            Check-out: {checkOut.from} - {checkOut.to}
          </Text>
        </View>

        <Text style={styles.contactHeader}>Contact</Text>
        <Text style={styles.contactText}>Phone: {contact.phoneNumber}</Text>
        <Text style={styles.contactText}>Email: {contact.email}</Text>
      </View>

      {gallery.length > 1 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.galleryHeader}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {gallery.slice(1).map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.galleryImage} />
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  iconButtonContainer: {
    position: 'absolute',
    top: Platform.OS === "android" ? 20 : 60,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.white
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  hotelName: {
    fontSize: 30,
    fontFamily: theme.fonts.primary,
    color: theme.colors.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 22,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text,
    marginRight: 5,
  },
  stars: {
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text,
  },
  location: {
    fontSize: 18,
    fontFamily: theme.fonts.primary,
    color: theme.colors.darkGrey,
    marginBottom: 20,
    paddingLeft: 5
  },
  priceRatingContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  price: {
    fontSize: 22,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text,
    marginBottom: 15,
    marginRight: 20
  },
  checkContainer: {
    marginBottom: 15,
  },
  checkText: {
    fontSize: 18,
    fontFamily: theme.fonts.primary,
    color: theme.colors.darkGrey,
    marginBottom: 5,
  },
  contactHeader: {
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.primary,
    marginBottom: 5,
  },
  contactText: {
    fontSize: 18,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text,
    marginBottom: 5,
  },
  galleryContainer: {
    padding: 15,
    backgroundColor: theme.colors.white,
    marginTop: 20,
  },
  galleryHeader: {
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.primary,
    marginBottom: 10,
  },
  galleryImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
