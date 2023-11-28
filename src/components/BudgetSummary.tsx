import React, { useState, useEffect } from 'react';
import { fetchBudgetData } from '../lib/helper/budgetHelper';
import { useTaskContext } from '../hooks/useTaskContext';

const BudgetSummary: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const { userId } = useTaskContext();

  useEffect(() => {
    const startDate = new Date(selectedMonth);
    const endDate = new Date(selectedMonth);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    fetchBudgetData(userId, startDate.toISOString(), endDate.toISOString())
      .then(({ totalIncome, totalExpenses }) => {
        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpenses);
      });
  }, [selectedMonth, userId]);

  const balance = totalIncome - totalExpenses;
  return (
    <div className="p-4 mt-4 border-t">
      <div className="flex justify-between">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {getMonthOptions().map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <div>
          <h3 className="font-semibold">Total Income:</h3>
          <p>{totalIncome}</p>
        </div>
        <div>
          <h3 className="font-semibold">Total Expenses:</h3>
          <p>{totalExpenses}</p>
        </div>
        <div>
          <h3 className="font-semibold">Balance:</h3>
          <p>{balance}</p>
        </div>
      </div>
    </div>
  );
};

const getMonthOptions = () => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(i);
    months.push({
      label: date.toLocaleString('default', { month: 'long' }),
      value: `${date.getFullYear()}-${String(i + 1).padStart(2, '0')}`
    });
  }
  return months;
};

const getCurrentMonth = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};


export default BudgetSummary;