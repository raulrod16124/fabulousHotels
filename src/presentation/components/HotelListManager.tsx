import { useState, useEffect } from "react";
import { Filters, Hotel, SortOptions } from "../../interfaces/hotels.interfaces";

interface IProps {
    hotels: Hotel[];
    children: (
        processedHotels: Hotel[],
        onSearch: (text: string) => void,
        onFilter: (filter: Filters) => void,
        onSort: (order: SortOptions) => void
    ) => React.ReactNode;
}

export const HotelListManager = ({ hotels, children }: IProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filter, setFilter] = useState<Filters>();
    const [sortOptions, setSortOptions] = useState<SortOptions>();
    const [processedHotels, setProcessedHotels] = useState<Hotel[]>(hotels);

    useEffect(() => {
        let updatedHotels = [...hotels];

        if (searchTerm) {
            updatedHotels = updatedHotels.filter((hotel) =>
                hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.location.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filter) {
            if (filter.stars) {
                updatedHotels = updatedHotels.filter((hotel) => hotel.stars === filter.stars);
            }
            if (filter.maxPrice) {
                updatedHotels = updatedHotels.filter(
                (hotel) => hotel.price <= filter.maxPrice!
                );
            }
        }

        if (sortOptions === "priceAsc") {
            updatedHotels.sort((a, b) => a.price - b.price);
        } else if (sortOptions === "priceDesc") {
            updatedHotels.sort((a, b) => b.price - a.price);
        } else if (sortOptions === "starsAsc") {
            updatedHotels.sort((a, b) => a.stars - b.stars);
        } else if (sortOptions === "starsDesc") {
            updatedHotels.sort((a, b) => b.stars - a.stars);
        }

        setProcessedHotels(updatedHotels);
    }, [searchTerm, filter, sortOptions, hotels]);

    const onSearch = (text: string) => setSearchTerm(text);
    const onFilter = (filterParams: any) => setFilter(filterParams);
    const onSort = (order: SortOptions) => setSortOptions(order);

    return children(processedHotels, onSearch, onFilter, onSort);
};
