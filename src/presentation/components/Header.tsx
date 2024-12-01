import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from "../theme.json"

interface IProps {
    onSearch: () => void;
    onFilter: () => void;
    onSort: () => void;
}

const Header = ({ onSearch, onFilter, onSort }:IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fabulous Hotels</Text>
      </View>

      <View style={styles.toolbar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={onSearch}
        />

        <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
          <Icon name="filter" size={20} color={theme.colors.text} iconStyle='solid'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={onSort}>
            <Icon name="sort" size={20} color={theme.colors.text} iconStyle='solid'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.lightGrey,
    },
    titleContainer: {
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.secondary,
      textAlign: 'center',
    },
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.lightGrey,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginRight: 10,
      fontSize: 16,
      backgroundColor: theme.colors.background,
    },
    iconButton: {
      marginLeft: 10,
      padding: 8,
    },
  });
  
