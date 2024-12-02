import { useState, useEffect } from "react";
import { Filters, Hotel } from "../../interfaces/hotels.interfaces";

interface IProps {
    hotels: Hotel[];
    children: (
        processedHotels: Hotel[],
        onSearch: (text: string) => void,
        onFilter: (filter: Filters) => void,
        // onSort: (criteria: string) => void
    ) => React.ReactNode;
}

export const HotelListManager = ({ hotels, children }: IProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filter, setFilter] = useState<Filters>();
    //   const [sortCriteria, setSortCriteria] = useState<string>("");
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

        // if (sortCriteria === "priceAsc") {
        //   updatedHotels.sort((a, b) => a.price - b.price);
        // } else if (sortCriteria === "priceDesc") {
        //   updatedHotels.sort((a, b) => b.price - a.price);
        // } else if (sortCriteria === "rating") {
        //   updatedHotels.sort((a, b) => b.userRating - a.userRating);
        // }

        setProcessedHotels(updatedHotels);
    }, [searchTerm, filter, hotels]);
    //   }, [searchTerm, filter, sortCriteria, hotels]);

    const onSearch = (text: string) => setSearchTerm(text);
    const onFilter = (filterParams: any) => setFilter(filterParams);
    //   const onSort = (criteria: string) => setSortCriteria(criteria);

    return children(processedHotels, onSearch, onFilter);
    //   return children(processedHotels, onSearch, onFilter, onSort);
};
