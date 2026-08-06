import { useAllFinance } from "../hooks/useFinance";

export default function AllFinances() {
  const { data, isLoading, error } = useAllFinance();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <>
      <h1>{data?.amount}</h1>
      <p style={{ color: "black" }}> Data shown </p>
    </>
  );
}
