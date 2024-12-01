import { View, useColorScheme, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery } from '@tanstack/react-query';
import { getHotels } from '../../services/hotels.actions';
import { HotelCard } from '../components/HotelCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import Header from '../components/Header';
import theme from "../theme.json"

interface IProps extends StackScreenProps<RootStackParams, "HotelsListScreen">{}

export const HotelsListScreen = ({ navigation }: IProps) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

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

    return (
        <SafeAreaView style={{backgroundColor: theme.colors.background}}>
            <View style={[styles.statusBarContainer, { backgroundColor: theme.colors.primary}]}>
                <StatusBar barStyle="light-content" translucent={false} />
            </View>
            <Header 
                onSearch={() => {}}
                onFilter={() => {}}
                onSort={() => {}}
            />
            <FlatList 
                data={hotels ?? []}
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