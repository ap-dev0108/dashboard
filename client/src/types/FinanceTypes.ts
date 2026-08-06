export enum FinanceTypes {
    Income = 0,
    Expenses = 1,
}

export interface Finance {
    financeId: string;
    financeNotes: string;
    amount: number;
    createdAt: string;
    financeType: FinanceType;
}

export interface FinanceData {
    transactions: Finance[];
    income: number;
    expenses: number;
    netAmount: number;
}