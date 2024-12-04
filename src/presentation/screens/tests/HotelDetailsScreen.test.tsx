import { render, fireEvent, screen } from '@testing-library/react-native';
import { HotelDetailsScreen } from '../HotelDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { mockHotel1, mockNavigation } from './testUtils';
import { Hotel } from '../../../interfaces/hotels.interfaces';

const renderComponent = (hotelOverride?: Hotel) => {
    return render(
      <NavigationContainer>
        <HotelDetailsScreen 
            navigation={mockNavigation} 
            route={{ 
                key: "mockKey", 
                name: "HotelDetailsScreen", 
                params: {hotel: hotelOverride || mockHotel1}
            }} 
        />
      </NavigationContainer>
    );
  };

describe('Testing HotelDetailsScreen', () => {
  test('should render hotel details', () => {
    renderComponent();

    expect(screen.getByText('Hotel 1')).toBeTruthy();
    expect(screen.getByText('6 Hercules Road, London')).toBeTruthy();
    expect(screen.getByText('120 € / night')).toBeTruthy();
    expect(screen.getByText('9.8')).toBeTruthy();
    expect(screen.getByText('(4 stars)')).toBeTruthy();
    expect(screen.getByText('Check-in: 14:00 - 20:00')).toBeTruthy();
    expect(screen.getByText('Check-out: 07:00 - 10:00')).toBeTruthy();
    expect(screen.getByText('Phone: +39 24322342')).toBeTruthy();
    expect(screen.getByText('Email: park_plaza@gmail.com')).toBeTruthy();
  });

  test('should render gallery images when available', () => {
    renderComponent();

    const galleryImages = screen.getAllByTestId('hotel-image');
    expect(galleryImages).toHaveLength(1);
  });

  test('should navigate back when back button is pressed', () => {
    const navigation = mockNavigation;
    renderComponent();

    const backButton = screen.getByTestId('back-icon');
    fireEvent.press(backButton);

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  test('should not render gallery if only one image is present', () => {
    const hotelWithOneImage = { ...mockHotel1, gallery: [mockHotel1.gallery[0]] };
    renderComponent(hotelWithOneImage);

    const galleryContainer = screen.queryByTestId('gallery-container');
    expect(galleryContainer).toBeNull();
  });
});
