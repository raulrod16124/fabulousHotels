import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from "../theme.json"

interface IProps {
  onSearch: (text: string) => void;
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
          onChangeText={(value) => onSearch(value)}
          placeholderTextColor={theme.colors.white}
        />

        <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
          <Icon name="filter" size={20} color={theme.colors.white} iconStyle='solid'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={onSort}>
            <Icon name="sort" size={20} color={theme.colors.white} iconStyle='solid'/>
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
    paddingHorizontal: 20,
    marginRight: 10,
    fontSize: 16,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
  },
});
  
