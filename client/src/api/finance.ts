import type { Finance } from "../types/FinanceTypes";
import { api } from "./axios";

export const getFinanceData = async () : Promise<Finance> => {
    const response = await api.get("/Finance/allFinances");
    
    console.log(response.data);
    return response.data;
}