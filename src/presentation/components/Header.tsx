import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from "../theme.json"
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  onSearch: (text: string) => void;
  onFilter: () => void;
  onSort: () => void;
}

const Header = ({ onSearch, onFilter, onSort }:IProps) => {
  const isAndroid = Platform.OS === "android";
  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.deepPrimary]}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Fabulous Hotels</Text>
        </View>

        <View style={styles.toolbar}>
          <TextInput
            style={[styles.searchInput, !isAndroid && { height: 40 }]}
            placeholder="Search..."
            onChangeText={(value) => onSearch(value)}
            placeholderTextColor={theme.colors.white}
          />

          <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
            <Icon 
              name="filter" 
              size={20} 
              color={theme.colors.white} 
              iconStyle='solid'
              testID='filter-icon'
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onSort}>
              <Icon 
                name="sort" 
                size={20} 
                color={theme.colors.white} 
                iconStyle='solid'
                testID='sort-icon'
              />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.primary,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    fontSize: 16,
    fontFamily: theme.fonts.primary,
    color: theme.colors.white,
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
  },
});
  
