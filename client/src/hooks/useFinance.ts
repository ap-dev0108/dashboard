import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getFinanceData, getFinanceDataById, addFinanceData, editFinanceData, removeFinanceData, financialCalculation 
} from "../api/finance";

export function useAllFinance() {
    return useQuery({
        queryKey: ["finance"],
        queryFn: getFinanceData,
    });
}

export function useFinanceById(financeID: string) {
    return useQuery({
        queryKey: ["finance", financeID],
        queryFn: () => getFinanceDataById(financeID),
    });
}

export function addFinance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFinanceData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addFinance"] });
        },
    });
}

export function editFinance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editFinanceData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["editFinance"] });
        },
    });
}

export function removeFinance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFinanceData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["removeFinance"] });
        },
    });
}

export function useFinancialCalculation() {
    return useQuery ({
        queryKey: ["financialCalculation"],
        queryFn: financialCalculation,
    });
}