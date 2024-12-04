import { render, fireEvent, screen } from '@testing-library/react-native';
import { FilterModal } from '../FilterModal';
import { mockHotel1, mockHotel2 } from '../../screens/tests/testUtils';

const mockCloseModal = jest.fn();
const mockApplyFilters = jest.fn();
const mockHotels = [mockHotel1, mockHotel2];

const renderComponent = (propsOverride = {}) => {
    return render(
        <FilterModal
            isVisible={true}
            closeModal={mockCloseModal}
            hotels={mockHotels}
            applyFilters={mockApplyFilters}
            filters={{ stars: 5, maxPrice: 150 }}
            {...propsOverride}
        />
    );
};

describe('Testing FilterModal Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly when visible', () => {
    renderComponent()
    expect(screen.getByText('Filter Hotels')).toBeTruthy();

    expect(screen.getByText('Stars')).toBeTruthy();
    expect(screen.getByText('Maximum Price')).toBeTruthy();

    expect(screen.getByTestId('filter-modal')).toBeTruthy();
  });

  test('should call closeModal when close button is pressed', () => {
    renderComponent();
    const closeButton = screen.getByText('Close');
    fireEvent.press(closeButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('should call applyFilters with selected filters when "Apply Filters" is pressed', () => {
    renderComponent();

    const starFilterButton = screen.getByTestId('4 stars');
    fireEvent.press(starFilterButton);

    const priceInput = screen.getByDisplayValue('150');
    fireEvent.changeText(priceInput, '120');

    const applyFiltersButton = screen.getByText('Apply Filters');
    fireEvent.press(applyFiltersButton);

    expect(mockApplyFilters).toHaveBeenCalledTimes(1);
    expect(mockApplyFilters).toHaveBeenCalledWith({
      stars: 4,
      maxPrice: 120,
    });

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  })

  test('shows pre-applied filters when filters prop is passed', () => {
    renderComponent({
      filters: { stars: 5, maxPrice: 180 },
    });

    expect(screen.getByDisplayValue('180').props.value).toBe('180');
  });
});
