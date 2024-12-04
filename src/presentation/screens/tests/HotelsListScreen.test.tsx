import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { HotelsListScreen } from '../HotelsListScreen';
import { useQuery } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { mockHotel1, mockHotel2, mockNavigation } from './testUtils';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <NavigationContainer>
      <HotelsListScreen navigation={mockNavigation} route={{ key: "mockKey", name: "HotelsListScreen"}} />
    </NavigationContainer>
  );
};

describe('Testing HotelsListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render a loading indicator when data is loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    renderComponent();

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  test('should shows "No hotels found" when the list is empty', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });

    renderComponent();
    
    await waitFor(() => screen.getByText('No hotels found'));

    expect(screen.getByText('No hotels found')).toBeTruthy();
  });

  test('should render the hotel list after data is loaded', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [ mockHotel1, mockHotel2 ],
    });

    renderComponent();

    const hotel1Text = await screen.findByText('Hotel 1');
    const hotel2Text = await screen.findByText('Hotel 2');

    await waitFor(() => {
      expect(hotel1Text).toBeTruthy();
      expect(hotel2Text).toBeTruthy();
    })
  });

  test('opens and closes the filter modal when clicked', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [mockHotel1, mockHotel2],
    });
  
    renderComponent();

    const filterButton = screen.getByTestId('filter-icon');
    fireEvent.press(filterButton);
  
    const openedModal = await waitFor(() => screen.getByTestId('filter-modal'));
    expect(openedModal.props.visible).toBe(true);
  
    const closeModalButton = screen.getByText('Close');
    fireEvent.press(closeModalButton);
  
    await waitFor(() => {
      expect(screen.queryByTestId('filter-modal')).toBeNull();
    });
  });
  

  test('opens and closes the sort modal when clicked', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [mockHotel1, mockHotel2],
    });
  
    renderComponent();

    const filterButton = screen.getByTestId('sort-icon');
    fireEvent.press(filterButton);
  
    const openedModal = await waitFor(() => screen.getByTestId('sort-modal'));
    expect(openedModal.props.visible).toBe(true);
  
    const closeModalButton = screen.getByText('Close');
    fireEvent.press(closeModalButton);
  
    await waitFor(() => {
      expect(screen.queryByTestId('sort-modal')).toBeNull();
    });
  });

  test('filters hotels based on selected filters', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [mockHotel1, mockHotel2],
    });
  
    renderComponent();

    const filterButton = screen.getByTestId('filter-icon');
    fireEvent.press(filterButton);
  
    const filterOption = screen.getByTestId('5 stars');
    fireEvent.press(filterOption);
  
    const applyFilterButton = screen.getByText('Apply Filters');
    fireEvent.press(applyFilterButton);

    await waitFor(() => {
      expect(screen.queryByText('Hotel 1')).toBeNull();
      expect(screen.getByText('Hotel 2')).toBeTruthy();
    });
  });  
});
