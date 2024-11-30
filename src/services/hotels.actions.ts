import axios from "axios";
import { Hotel } from "../interfaces/hotels.interfaces";

export const getHotels = async (): Promise<Hotel[]> => {
    try {
        const { data } = await axios.get("https://technology.lastminute.com/api/hotel.json")
        return data;
    } catch (error) {
        console.log("Error: " + error)
        throw new Error("Error getting hotels")
    }
}