import { View, Text, useColorScheme, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery } from '@tanstack/react-query';
import { getHotels } from '../../services/hotels.actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HotelsListScreen = () => {
    const {top} = useSafeAreaInsets();
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
                    <StatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                        backgroundColor={backgroundStyle.backgroundColor}
                    />
                        <ActivityIndicator />
                </SafeAreaView>
            </View>
        )
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <FlatList 
                data={hotels ?? []}
                keyExtractor={(hotel, index) => `${hotel.id}-${index}`}
                numColumns={1}
                style={{paddingTop: top + 20}}
                renderItem={({item}) => <Text>{item.name}</Text>}
                onEndReachedThreshold={ 0.6 }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    isLoadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})