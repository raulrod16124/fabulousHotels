import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import theme from '../theme.json';
import Icon from '@react-native-vector-icons/fontawesome6';
import { Filters, SortOptions } from '../../interfaces/hotels.interfaces';

interface IProps {
    onRemoveFilter: (value: number) => void;
    onRemoveOrder: () => void;
    appliedFilters?: Filters;
    appliedOrder?: SortOptions;
}

export const Labels = ({ onRemoveFilter, onRemoveOrder, appliedFilters = {}, appliedOrder = 'initial'}: IProps) => {
    const labels: string[] = Object.values(appliedFilters).filter(value => value !== undefined);
    if(appliedOrder !== 'initial'){
        labels.push(appliedOrder);
    }

    if (labels.length === 0) return null;

    return (
        <View style={styles.container} testID='labels-container'>
            <FlatList
                data={labels}
                horizontal
                keyExtractor={(item) => item.toString()}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.label}>
                        <Text style={styles.labelText}>{item}</Text>
                        <Pressable onPress={() => {
                            if(item.toString().includes('price') || item.toString().includes('star')){
                                onRemoveOrder()
                            } else {
                                onRemoveFilter(Number(item))
                            }
                        }} 
                            style={styles.removeIcon}
                        >
                            <Icon 
                                name="xmark" 
                                size={16} 
                                color={theme.colors.white} 
                                iconStyle="solid"
                                testID='remove-icon'
                            />
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
    },
    labelText: {
        color: theme.colors.white,
        fontSize: 18,
        fontFamily: theme.fonts.primary,
        marginRight: 10,
    },
    removeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
