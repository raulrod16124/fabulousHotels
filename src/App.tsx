import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';

const queryClient = new QueryClient()

function App(): React.JSX.Element {
  return (
    <View testID="ProvidersWrapper">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}

export default App;
