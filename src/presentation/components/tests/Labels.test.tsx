import { render, fireEvent, screen } from '@testing-library/react-native';
import { Labels } from '../Labels';
import { Filters, SortOptions } from '../../../interfaces/hotels.interfaces';

const mockOnRemoveFilter = jest.fn();
const mockOnRemoveOrder = jest.fn();

const renderComponent = (propsOverride = {}) => {
    return render(
        <Labels
            onRemoveFilter={mockOnRemoveFilter}
            onRemoveOrder={mockOnRemoveOrder}
            appliedFilters={{}}
            appliedOrder="initial"
            {...propsOverride}
        />
    );
};

describe('Testing Labels Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render nothing if no filters or order are applied', () => {
    renderComponent();
    expect(screen.queryByTestId('labels-container')).toBeNull();
  });

  test('should render filters when appliedFilters are provided', () => {
    const appliedFilters: Filters = { stars: 5, maxPrice: 200 };
    renderComponent({ appliedFilters });

    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('200')).toBeTruthy();
  });

  test('should render order when appliedOrder is provided', () => {
    const appliedOrder: SortOptions = 'priceAsc';
    renderComponent({ appliedOrder });

    expect(screen.getByText('priceAsc')).toBeTruthy();
  });

  test('should render both filters and order labels', () => {
    const appliedFilters: Filters = { stars: 3, maxPrice: 150 };
    const appliedOrder: SortOptions = 'starsDesc';
    renderComponent({ appliedFilters, appliedOrder });

    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('150')).toBeTruthy();
    expect(screen.getByText('starsDesc')).toBeTruthy();
  });

  test('should call onRemoveFilter when filter label is removed', () => {
    const appliedFilters: Filters = { stars: 4 };
    renderComponent({ appliedFilters });

    const removeButton = screen.getByTestId('remove-icon');
    fireEvent.press(removeButton);
    
    expect(mockOnRemoveFilter).toHaveBeenCalledTimes(1);
  });

  test('should call onRemoveOrder when order label is removed', () => {
    const appliedOrder: SortOptions = 'priceDesc';
    renderComponent({ appliedOrder });

    const removeButton = screen.getByTestId('remove-icon');
    fireEvent.press(removeButton);

    expect(mockOnRemoveOrder).toHaveBeenCalledTimes(1);
  });
});
