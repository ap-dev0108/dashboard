import { useAllFinance } from "../hooks/useFinance";
import type { Finance } from "../types/FinanceTypes";

export default function AllFinances() {
  const { data, isLoading, error } = useAllFinance();

  if (isLoading) return <h1>Loading...</h1>;
  console.log("Finance data:", data);

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      <span>
        {data?.data.map((finance: Finance) => (
          <div key={finance.financeId}>
            <p>{finance.financeNotes}</p>
            <p>{finance.amount}</p>
            <p>{finance.createdAt}</p>
          </div>
        ))}
      </span>
    </>
  );
}
