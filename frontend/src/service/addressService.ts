import apiService from "./apiService";
import type { Address } from "../../interfaces/Types";
export const getAddress = async () => {
    return await apiService.get("/address", true, false, false);
};

export const createAddress = async (data: Address) => {
    return await apiService.post("/address", data, true, false, false);
};