import { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { SortOptions } from '../../interfaces/hotels.interfaces';
import theme from '../theme.json';

interface IProps {
    isVisible: boolean;
    closeModal: () => void;
    applySort: (order: SortOptions) => void;
    order?: SortOptions;
}

export const SortModal = ({ isVisible, closeModal, applySort, order }: IProps) => {
    const [selectedSort, setSelectedSort] = useState<SortOptions>("initial");

    useEffect(() => {
        if(order){
            setSelectedSort(order)
        }
    },[order])

    const handleApplySort = () => {
        if (selectedSort) {
            applySort(selectedSort);
        }
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
                    <Text style={styles.modalTitle}>Sort Hotels</Text>

                    <Text style={styles.sortCategory}>Sort By</Text>

                    <Pressable
                        style={[
                            styles.sortOption,
                            selectedSort === 'priceAsc' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedSort(selectedSort === 'priceAsc' ? 'initial' : 'priceAsc')}
                    >
                        <Text
                            style={[
                                styles.sortText,
                                selectedSort === 'priceAsc' && styles.selectedText,
                            ]}
                        >
                            Price (Low to High)
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.sortOption,
                            selectedSort === 'priceDesc' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedSort(selectedSort === 'priceDesc' ? 'initial' : 'priceDesc')}
                    >
                        <Text
                            style={[
                                styles.sortText,
                                selectedSort === 'priceDesc' && styles.selectedText,
                            ]}
                        >
                            Price (High to Low)
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.sortOption,
                            selectedSort === 'starsAsc' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedSort(selectedSort === 'starsAsc' ? 'initial' : 'starsAsc')}
                    >
                        <Text
                            style={[
                                styles.sortText,
                                selectedSort === 'starsAsc' && styles.selectedText,
                            ]}
                        >
                            Stars (Low to High)
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.sortOption,
                            selectedSort === 'starsDesc' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedSort(selectedSort === 'starsDesc' ? 'initial' : 'starsDesc')}
                    >
                        <Text
                            style={[
                                styles.sortText,
                                selectedSort === 'starsDesc' && styles.selectedText,
                            ]}
                        >
                            Stars (High to Low)
                        </Text>
                    </Pressable>

                    <Pressable style={styles.applyButton} onPress={handleApplySort}>
                        <Text style={styles.applyButtonText}>Apply Sort</Text>
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
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: theme.fonts.primary,
        marginBottom: 20,
        color: theme.colors.text,
        textAlign: 'center',
    },
    sortCategory: {
        fontSize: 20,
        fontFamily: theme.fonts.primary,
        marginTop: 10,
        marginBottom: 10,
        color: theme.colors.text,
    },
    sortOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: theme.colors.secondary,
    },
    selectedText: {
        color: theme.colors.text,
    },
    sortText: {
        color: theme.colors.white,
        fontSize: 20,
        fontFamily: theme.fonts.primary,
    },
    applyButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        color: theme.colors.text,
        fontSize: 20,
        fontFamily: theme.fonts.primary,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: theme.colors.text,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: theme.colors.white,
        fontSize: 20,
        fontFamily: theme.fonts.primary,
    },
});
