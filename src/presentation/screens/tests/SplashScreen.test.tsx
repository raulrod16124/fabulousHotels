import { act, render, screen } from '@testing-library/react-native';
import { SplashScreen } from '../SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { mockNavigation } from './testUtils';

jest.useFakeTimers();

const renderComponent = () => {
    return render(
        <NavigationContainer>
          <SplashScreen navigation={mockNavigation} route={{ key: "mockKey", name: "SplashScreen"}} />
        </NavigationContainer>
    );
};

describe('Testing SplashScreen', () => {
  test('should render the SplashScreen component correctly', () => {
    renderComponent()

    expect(screen.getByText('Enjoy your time in')).toBeTruthy();
    expect(screen.getByText('Fabulous Hotels')).toBeTruthy();
  });

  test('animates and navigates to HotelsListScreen after timeout', () => {
    renderComponent()

    act(() => {
        jest.advanceTimersByTime(3000);
    });
    
    expect(mockNavigation.replace).toHaveBeenCalledWith('HotelsListScreen');
  });
});
