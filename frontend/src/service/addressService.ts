import apiService from "./apiService";

export type NewAddressInput = {
  postalCode: string;
  nombre: string;
  apellido: string;
  telefono: string;
  dni: string;
  provincia: string;
  localidad: string;
  calle: string;
  piso?: string;
};
export const getAddress = async () => {
    return await apiService.get("/addresses", true, false, false);
};

export const createAddress = async (data: NewAddressInput) => {
    return await apiService.post("/addresses", data, true, false, false);
};

export const deleteAddress = async (id: string) => {
    return await apiService.del(`/addresses/${id}`, true, false, false);
};