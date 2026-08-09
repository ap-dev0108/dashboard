import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useAllFinance } from "../hooks/useFinance";
import type { Finance, FinanceData } from "../types/FinanceTypes";
import { FinanceTypes } from "../types/FinanceTypes";
import type { any } from "zod";

type NewEntryFormData = Omit<Finance, "financeId" | "createdAt">;

export const FinancesPage: React.FC = () => {
  const { data, isLoading, error } = useAllFinance();
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [entryType, setEntryType] = useState<FinanceTypes | null>(null);
  const [formData, setFormData] = useState<NewEntryFormData>({
    financeNotes: "",
    amount: 0,
    financeType: FinanceTypes.Income,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const financeData: FinanceData =
    data && data.data.length > 0
      ? (data.data[0] as unknown as FinanceData)
      : {
          transactions: [],
          income: 0,
          expenses: 0,
          netAmount: 0,
        };

  const handleNewEntryClick = (type: FinanceTypes) => {
    setEntryType(type);
    setFormData({
      financeNotes: "",
      amount: 0,
      financeType: type,
    });
  };

  const handleFormChange = (field: keyof NewEntryFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitForm = () => {
    // Here you would typically call a mutation to submit the form
    console.log("Submitting:", formData);
    setShowNewEntryModal(false);
    setEntryType(null);
    setFormData({
      financeNotes: "",
      amount: 0,
      financeType: FinanceTypes.Income,
    });
  };

  const filteredTransactions = financeData?.transactions?.filter(
    (transaction) =>
      transaction.financeNotes
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading finances...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-600 font-semibold">Error loading finances</p>
            <p className="text-gray-600 mt-2">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50 px-8 py-8 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-4">
          October Ledger
        </h2>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Total Balance
            </h1>
            <p className="text-gray-600">
              Comprehensive overview of your assets.
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-blue-600">
              ${financeData?.netAmount?.toFixed(2)}
            </div>
            <p className="text-blue-600 text-sm mt-2">
              {financeData?.netAmount >= 0 ? "+" : "-"}
              {Math.abs(
                (financeData?.netAmount / financeData?.income) * 100 || 0,
              ).toFixed(1)}
              % from last month
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-2">Income</p>
            <p className="text-3xl font-bold text-green-600">
              ${financeData?.income?.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-2">Expenses</p>
            <p className="text-3xl font-bold text-red-600">
              ${financeData?.expenses?.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 text-sm mb-2">Net Amount</p>
            <p
              className={`text-3xl font-bold ${financeData?.netAmount >= 0 ? "text-blue-600" : "text-red-600"}`}
            >
              ${financeData?.netAmount?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Search and New Entry */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 mr-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search transactions, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
        <button
          onClick={() => setShowNewEntryModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New Entry
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Notes
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.length > 0 ? (
                filteredTransactions?.map((transaction, index) => (
                  <tr
                    key={transaction.financeId || index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.financeNotes}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          transaction.financeType === FinanceTypes.Income
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.financeType === FinanceTypes.Income
                          ? "Income"
                          : "Expense"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <span
                        className={
                          transaction.financeType === FinanceTypes.Income
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.financeType === FinanceTypes.Income
                          ? "+"
                          : "-"}
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Entry Modal */}
      {showNewEntryModal && !entryType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">New Entry</h2>
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Select the type of entry:</p>

            <div className="space-y-3">
              <button
                onClick={() => handleNewEntryClick(FinanceTypes.Income)}
                className="w-full bg-green-50 border-2 border-green-200 text-green-700 font-semibold py-3 px-4 rounded-lg hover:bg-green-100 transition-colors"
              >
                + Income
              </button>
              <button
                onClick={() => handleNewEntryClick(FinanceTypes.Expenses)}
                className="w-full bg-red-50 border-2 border-red-200 text-red-700 font-semibold py-3 px-4 rounded-lg hover:bg-red-100 transition-colors"
              >
                - Expenses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entry Form Modal */}
      {showNewEntryModal && entryType !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {entryType === FinanceTypes.Income
                  ? "Add Income"
                  : "Add Expense"}
              </h2>
              <button
                onClick={() => {
                  setShowNewEntryModal(false);
                  setEntryType(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Notes Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Notes
                </label>
                <input
                  type="text"
                  value={formData.financeNotes}
                  onChange={(e) =>
                    handleFormChange("financeNotes", e.target.value)
                  }
                  placeholder="Enter transaction notes"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Amount Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      handleFormChange(
                        "amount",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type Field (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Type
                </label>
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                  {entryType === FinanceTypes.Income ? "Income" : "Expense"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowNewEntryModal(false);
                  setEntryType(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitForm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FinancesPage;
