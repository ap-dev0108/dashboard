import { useQuery } from "@tanstack/react-query";
import { getFinanceData } from "../api/finance";

export function useAllFinance() {
    return useQuery({
        queryKey: ["finance"],
        queryFn: getFinanceData,
    });
}