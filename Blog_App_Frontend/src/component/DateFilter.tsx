import { useState } from "react";

interface DateFilterProps {
  onFilter: (from: string, to: string) => void;
}

export const DateFilter = ({ onFilter }: DateFilterProps) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(fromDate, toDate);
  };

  return (
    <form className="date-filter" onSubmit={handleSubmit}>
      <label>
        From Date:
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          required
        />
      </label>
      <label>
        To Date:
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Apply Filter</button>
    </form>
  );
};
