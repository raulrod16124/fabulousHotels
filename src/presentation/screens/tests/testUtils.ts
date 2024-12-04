export const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    popTo: jest.fn(),
    popToTop: jest.fn(),
    preload: jest.fn(), 
    isFocused: jest.fn(), 
    canGoBack: jest.fn(),
    getId: jest.fn(), 
    getState: jest.fn(), 
    navigateDeprecated: jest.fn(),
    setStateForNextRouteNamesChange: jest.fn(),
    getParent: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
};

export const mockHotel1 = {
    id: 12321,
    name: "Hotel 1",
    location: {
        address: "6 Hercules Road",
        city: "London",
        latitude: 51.49845,
        longitude: -0.11343
    },
    stars: 4,
    checkIn: {
        from: "14:00",
        to: "20:00"
    },
    checkOut: {
        from: "07:00",
        to: "10:00"
    },
    contact: {
        phoneNumber: "+39 24322342",
        email: "park_plaza@gmail.com"
    },
    gallery: [
        "image1.jpg",
        "image2.jpg",
    ],
    userRating: 9.8,
    price: 120,
    currency: "EUR"
}

export const mockHotel2 = {
    id: 54321,
    name: "Hotel 2",
    location: {
        address: "45 Rue de Rivoli",
        city: "Paris",
        latitude: 48.8566,
        longitude: 2.3522
    },
    stars: 5,
    checkIn: {
        from: "15:00",
        to: "22:00"
    },
    checkOut: {
        from: "08:00",
        to: "12:00"
    },
    contact: {
        phoneNumber: "+33 1 23456789",
        email: "parisian_grand@gmail.com"
    },
    gallery: [
        "image1.jpg"
    ],
    userRating: 8.9,
    price: 200,
    currency: "EUR"
}
  
  