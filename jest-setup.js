import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-vector-icons/FontAwesome6', () => 'Icon');

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
        }),
    };
});

jest.mock('@react-navigation/stack', () => {
    return {
      createStackNavigator: jest.fn(() => ({
        Navigator: jest.fn(({ children }) => children),
        Screen: jest.fn(({ children }) => children),
      })),
    };
});

jest.mock('react-native-safe-area-context', () => {
    const { SafeAreaProvider, SafeAreaView } = jest.requireActual('react-native-safe-area-context');
    return {
        SafeAreaProvider,
        SafeAreaView,
        useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    };
});
