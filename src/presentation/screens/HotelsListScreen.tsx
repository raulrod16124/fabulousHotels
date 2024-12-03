import { View, useColorScheme, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList, Platform, Modal, Text, Pressable } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery } from '@tanstack/react-query';
import { getHotels } from '../../services/hotels.actions';
import { HotelCard } from '../components/HotelCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import Header from '../components/Header';
import theme from "../theme.json"
import { useState } from 'react';
import { FilterModal } from '../components/FilterModal';
import { HotelListManager } from '../components/HotelListManager';
import { Labels } from '../components/Labels';
import { Filters, SortOptions } from '../../interfaces/hotels.interfaces';
import { removeByValue } from '../helpers';
import { SortModal } from '../components/SortModal';

interface IProps extends StackScreenProps<RootStackParams, "HotelsListScreen">{}

export const HotelsListScreen = ({ navigation }: IProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    const isAndroid = Platform.OS === "android";
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isSortModalVisible, setSortModalVisible] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<Filters>();
    const [appliedOrder, setAppliedOrder] = useState<SortOptions>();

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
        <SafeAreaView style={{
            backgroundColor: theme.colors.background, 
            marginBottom: isAndroid ? 170 : 100,
        }}>
            <View style={[styles.statusBarContainer, { backgroundColor: theme.colors.primary}]}>
                <StatusBar barStyle="light-content" translucent={false} />
            </View>
            <HotelListManager hotels={hotels}>
                {(processedHotels, onSearch, onFilter, onSort) => (
                    <>
                        <Header 
                            onSearch={onSearch} 
                            onFilter={()=> setIsFilterModalVisible(true)}  
                            onSort={()=> setSortModalVisible(true)} 
                        />

                        <Labels
                            appliedFilters={appliedFilters}
                            appliedOrder={appliedOrder}
                            onRemoveFilter={(valueToRemove) => {
                                const updatedFilters = removeByValue(valueToRemove, appliedFilters);
                                setAppliedFilters(updatedFilters)
                                onFilter(updatedFilters)
                            }} 
                            onRemoveOrder={() => {
                                console.log("ORDER")
                                setAppliedOrder("initial")
                            }}
                        />

                        <FlatList
                            data={processedHotels}
                            keyExtractor={(hotel, index) => `${hotel.id}-${index}`}
                            renderItem={({ item, index }) => (
                                <HotelCard
                                    hotel={item}
                                    onPress={() => navigation.navigate("HotelDetailsScreen", { hotel: item })}
                                    extraStyles={index === processedHotels.length - 1 && styles.lastItem}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            style={styles.list}
                        />
                        {processedHotels.length < 1 && (
                            <Text style={styles.noHotelsText}>No hotels found</Text>
                        )}
                        <FilterModal
                            isVisible={isFilterModalVisible} 
                            hotels={hotels}
                            closeModal={() => setIsFilterModalVisible(false)}
                            applyFilters={(filters) => {
                                onFilter(filters)
                                setAppliedFilters(filters)
                            }}
                            filters={appliedFilters}
                        /> 
                        <SortModal
                            isVisible={isSortModalVisible}
                            closeModal={() => setSortModalVisible(false)}
                            applySort={(order) => {
                                onSort(order)
                                setAppliedOrder(order)
                            }}
                            order={appliedOrder}
                        />
                    </>
                )}
            </HotelListManager>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    list:{
        paddingTop: 20,
    },
    lastItem: {
        marginBottom: 40,
        paddingBottom: 40,
    },
    noHotelsText: {
        fontSize: 18,
        fontFamily: theme.fonts.primary,
        color: theme.colors.text,
        textAlign: 'center',
        marginVertical: 20,
    },
})