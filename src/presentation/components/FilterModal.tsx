import { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TextInput, Platform } from 'react-native';
import theme from "../theme.json";
import Icon from '@react-native-vector-icons/fontawesome6';
import { Filters } from '../../interfaces/hotels.interfaces';

interface IProps {
    isVisible: boolean;
    closeModal: () => void;
    hotels: any[];
    applyFilters: (filters: { stars?: number; maxPrice?: number }) => void;
    filters?: Filters;
}

export const FilterModal = ({ isVisible, closeModal, hotels, applyFilters, filters }: IProps) => {
    const isAndroid = Platform.OS === "android";
    const [selectedStars, setSelectedStars] = useState<number | null>(null);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);

    const uniqueStars = Array.from(new Set(hotels.map((hotel) => hotel.stars))).sort();

    useEffect(() => {
        if(filters?.stars){
            setSelectedStars(filters.stars)
        } else {
            setSelectedStars(null)
        }
        if(filters?.maxPrice){
            setSelectedMaxPrice(filters.maxPrice)
        } else {
            setSelectedMaxPrice(null)
        }
    },[filters])

    const handleApplyFilters = () => {
        applyFilters({
            stars: selectedStars ?? undefined,
            maxPrice: selectedMaxPrice ?? undefined,
        });
        setSelectedStars(null)
        closeModal();
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter Hotels</Text>

                    <Text style={styles.filterCategory}>Stars</Text>
                    <View style={styles.starsContainer}>
                        {uniqueStars.map((stars) => (
                            <Pressable
                                key={stars}
                                style={[
                                    styles.filterOption,
                                    selectedStars === stars && styles.selectedOption,
                                ]}
                                onPress={() => setSelectedStars(stars === selectedStars ? null : stars)}
                            >
                                <Icon 
                                    name="star" 
                                    size={20} 
                                    color={
                                        selectedStars === stars 
                                        ? theme.colors.text 
                                        : theme.colors.secondary
                                    } 
                                    iconStyle='solid'
                                />
                                <Text style={[
                                    styles.filterText,
                                    selectedStars === stars && styles.selectedText
                                ]}>{stars}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={styles.filterCategory}>Maximum Price</Text>
                    <TextInput
                        style={[
                            styles.priceInput,
                            !isAndroid && { paddingVertical: 10}
                        ]}
                        onChangeText={(value) => {
                            const numericValue = value.replace(/[^0-9]/g, "");
                            setSelectedMaxPrice(numericValue ? parseInt(numericValue, 10) : null);
                        }}
                        keyboardType="numeric"
                        maxLength={4}
                        value={selectedMaxPrice?.toString()}
                    />

                    <Pressable style={styles.applyButton} onPress={handleApplyFilters}>
                        <Text style={styles.applyButtonText}>Apply Filters</Text>
                    </Pressable>

                    <Pressable style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    modalContent: {
        width: '100%',
        height: "100%",
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.colors.text,
        textAlign: 'center',
    },
    filterCategory: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        color: theme.colors.text,
    },
    priceInput: {
        borderWidth: 0.5,
        borderRadius: 10,
        textAlign: "center",
        fontSize: 24
    },
    starsContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    filterOption: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center'
    },
    selectedOption: {
        backgroundColor: theme.colors.secondary,
    },
    selectedText: {
        color: theme.colors.text
    },
    filterText: {
        color: theme.colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    applyButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: theme.colors.text,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: theme.colors.white,
        fontSize: 16,
    },
});
