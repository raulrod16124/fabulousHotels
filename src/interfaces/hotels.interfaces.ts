export interface Hotel {
    id:         number;
    name:       string;
    location:   Location;
    stars:      number;
    checkIn:    Check;
    checkOut:   Check;
    contact:    Contact;
    gallery:    string[];
    userRating: number;
    price:      number;
    currency:   string;
}

export interface Check {
    from: string;
    to:   string;
}

export interface Contact {
    phoneNumber: string;
    email:       string;
}

export interface Location {
    address:   string;
    city:      string;
    latitude:  number;
    longitude: number;
}
