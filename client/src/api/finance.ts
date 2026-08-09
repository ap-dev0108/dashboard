import type { Finance, FinanceData } from "../types/FinanceTypes";
import type { Response } from "../types/response";
import { api } from "./axios";

export const getFinanceData = async () : Promise<Response<Finance[]>> => {
    const response = await api.get("/Finance/allFinances");
    return response.data;
}

export const getFinanceDataById = async (financeID: string) : Promise<Response<Finance[]>> => {
    const response = await api.get(`/Finance/financeId/${financeID}`);
    return response.data;
}

export const getFinanceDataByType = async (financeType: string) : Promise<Response<Finance[]>> => {
    const response = await api.get(`/Finance/financeType/${financeType}`)
    return response.data;
}

export const addFinanceData = async (finance: Finance) : Promise<Response<Finance>> => {
    const response = await api.post("/Finance/addFinances", finance);
    return response.data;
}

export const removeFinanceData = async (financeID: string) : Promise<Response<Finance>> => {
    const response = await api.delete(`/Finance/removeFinance/${financeID}`);
    return response.data;
}

export const financialCalculation = async () : Promise<Response<FinanceData[]>> => {
    const response = await api.get("/Finance/getFinanceData");
    return response.data;
}

export const editFinanceData = async (finance: Finance) : Promise<Response<Finance>> => {
    const response = await api.put("/Finance/editFinances", finance);
    return response.data;
}