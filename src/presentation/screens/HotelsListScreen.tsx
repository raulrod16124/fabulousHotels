import { View, useColorScheme, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList, Platform } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery } from '@tanstack/react-query';
import { getHotels } from '../../services/hotels.actions';
import { HotelCard } from '../components/HotelCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import Header from '../components/Header';
import theme from "../theme.json"
import { useState } from 'react';
import { Hotel } from '../../interfaces/hotels.interfaces';

interface IProps extends StackScreenProps<RootStackParams, "HotelsListScreen">{}

export const HotelsListScreen = ({ navigation }: IProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    const isAndroid = Platform.OS === "android";
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [searchedHotels, setSearchedHotels] = useState<Hotel[]>([])

    const {isLoading, data: hotels = []} = useQuery({
      queryKey: ["hotels"],
      queryFn: () => getHotels(),
      staleTime: 1000 * 60 * 60, // 1 hour
    })

    if(isLoading){
        return (
            <View style={styles.isLoadingContainer}>
                <SafeAreaView style={backgroundStyle}>
                    <View style={[styles.statusBarContainer, { backgroundColor: theme.colors.primary}]}>
                        <StatusBar barStyle="light-content" translucent={false} />
                    </View>
                    <ActivityIndicator />
                </SafeAreaView>
            </View>
        )
    }

    const onSearch = (text: string) => {
        const result = hotels.filter( hotel => {
            if(
                hotel.name.includes(text) || 
                hotel.location.address.includes(text) ||
                hotel.location.city.includes(text)
            ){
                return hotel
            } 
        })
        setSearchedHotels(result);
    }

    return (
        <SafeAreaView style={{backgroundColor: theme.colors.background, marginBottom: isAndroid ? 170 : 100}}>
            <View style={[styles.statusBarContainer, { backgroundColor: theme.colors.primary}]}>
                <StatusBar barStyle="light-content" translucent={false} />
            </View>
            <Header 
                onSearch={onSearch}
                onFilter={() => {}}
                onSort={() => {}}
            />
            <FlatList 
                data={searchedHotels.length ? searchedHotels : hotels}
                keyExtractor={(hotel, index) => `${hotel.id}-${index}`}
                numColumns={1}
                style={{paddingTop: 20}}
                renderItem={({item}) => (
                    <HotelCard hotel={item} onPress={() => navigation.navigate('HotelDetailsScreen', { hotel: item })} />
                )}
                onEndReachedThreshold={ 0.6 }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    statusBarContainer: {
        height: StatusBar.currentHeight,
        width: '100%',
      },
    isLoadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})