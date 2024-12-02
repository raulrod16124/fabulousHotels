import { Filters } from "../../interfaces/hotels.interfaces";

export const removeByValue = (valueToRemove: number, filters?: Filters, ) => {
    if(!filters) return {};
    return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== valueToRemove)
    );
};