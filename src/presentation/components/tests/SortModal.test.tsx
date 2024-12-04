import { render, fireEvent, screen } from '@testing-library/react-native';
import { SortModal } from '../SortModal';

const mockCloseModal = jest.fn();
const mockApplySort = jest.fn();

const renderComponent = () => {
  return render(
    <SortModal
        isVisible={true}
        closeModal={mockCloseModal}
        applySort={mockApplySort}
        order="priceAsc"
    />
  );
};

describe('Testing SortModal Component', () => {
    beforeEach(() => {
        renderComponent()
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render correctly when visible', () => {
        expect(screen.getByTestId('sort-modal')).toBeTruthy();
        expect(screen.getByText('Sort Hotels')).toBeTruthy();

        expect(screen.getByText('Price (Low to High)')).toBeTruthy();
        expect(screen.getByText('Price (High to Low)')).toBeTruthy();
        expect(screen.getByText('Stars (Low to High)')).toBeTruthy();
        expect(screen.getByText('Stars (High to Low)')).toBeTruthy();
    });

    test('should call closeModal when close button is pressed', () => {
        const closeButton = screen.getByText('Close');
        fireEvent.press(closeButton);

        expect(mockCloseModal).toHaveBeenCalledTimes(1);
    });

    test('shoud call applySort with selected sort option when "Apply Sort" is pressed', () => {
        const starsAscOption = screen.getByText('Stars (Low to High)');
        fireEvent.press(starsAscOption);

        const applyButton = screen.getByText('Apply Sort');
        fireEvent.press(applyButton);

        expect(mockApplySort).toHaveBeenCalledTimes(1);
        expect(mockApplySort).toHaveBeenCalledWith('starsAsc');

        expect(mockCloseModal).toHaveBeenCalledTimes(1);
    });

    test('should update selected sort option when an option is pressed', () => {
        const priceDescOption = screen.getByText('Price (High to Low)');
        fireEvent.press(priceDescOption);

        const applyButton = screen.getByText('Apply Sort');
        fireEvent.press(applyButton);

        expect(mockApplySort).toHaveBeenCalledTimes(1);
        expect(mockApplySort).toHaveBeenCalledWith('priceDesc');
    });
});
