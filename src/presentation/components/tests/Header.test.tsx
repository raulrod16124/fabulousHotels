import { render, fireEvent, screen } from '@testing-library/react-native';
import Header from '../Header';

const mockOnSearch = jest.fn();
const mockOnFilter = jest.fn();
const mockOnSort = jest.fn();

const renderComponent = () => {
    return render(
        <Header
            onSearch={mockOnSearch}
            onFilter={mockOnFilter}
            onSort={mockOnSort}
        />
    );
};

describe('Testing Header Component', () => {
    beforeEach(()=>{
        renderComponent();
    })

    test('should render correctly with title and input', () => {
        expect(screen.getByText('Fabulous Hotels')).toBeTruthy();
        expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
    });

    test('should call onSearch when typing in the search input', () => {
        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.changeText(searchInput, 'test search');

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith('test search');
    });

    test('should call onFilter when the filter button is pressed', () => {
        const filterButton = screen.getByTestId('filter-icon');
        fireEvent.press(filterButton);

        expect(mockOnFilter).toHaveBeenCalledTimes(1);
    });

    test('should call onSort when the sort button is pressed', () => {
        const sortButton = screen.getByTestId('sort-icon');
        fireEvent.press(sortButton);

        expect(mockOnSort).toHaveBeenCalledTimes(1);
    });
});
