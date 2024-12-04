import { render, fireEvent, screen } from '@testing-library/react-native';
import { HotelCard } from '../HotelCard';
import { mockHotel1 } from '../../screens/tests/testUtils';

const mockOnPress = jest.fn();

const renderComponent = () => {
    return render(
        <HotelCard hotel={mockHotel1} onPress={mockOnPress} />
    );
};

describe('Testing HotelCard Component', () => {
    beforeEach(()=>{
        renderComponent();
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render hotel information correctly', () => {
        expect(screen.getByText(mockHotel1.name)).toBeTruthy();
        expect(screen.getByText(`${mockHotel1.stars}`)).toBeTruthy();
        expect(screen.getByText(`${mockHotel1.price} €`)).toBeTruthy();
        expect(screen.getByText(mockHotel1.location.city)).toBeTruthy();

        const image = screen.getByTestId('hotel-image');
        expect(image.props.source.uri).toBe(mockHotel1.gallery[0]);
    });

    test('should call onPress when the card is pressed', () => {
        const card = screen.getByTestId('hotel-card');
        fireEvent.press(card);

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
