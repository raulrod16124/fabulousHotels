import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import theme from '../theme.json';
import Icon from '@react-native-vector-icons/fontawesome6';
import { Filters } from '../../interfaces/hotels.interfaces';

interface IProps {
    onRemoveFilter: (value: number) => void;
    appliedFilters?: Filters;
}

export const FilterLabels = ({ onRemoveFilter, appliedFilters = {} }: IProps) => {
    const filters = Object.values(appliedFilters).filter(value => value !== undefined);
    if (filters.length === 0) return null;

    return (
        <View style={styles.container}>
            <FlatList
                data={filters}
                horizontal
                keyExtractor={(item) => item.toString()}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.label}>
                        <Text style={styles.labelText}>{item}</Text>
                        <Pressable onPress={() => onRemoveFilter(item)} style={styles.removeIcon}>
                            <Icon name="xmark" size={16} color={theme.colors.white} iconStyle="solid" />
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
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
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
        marginRight: 10,
    },
    removeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
