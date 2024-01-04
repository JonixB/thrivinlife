import React, { useState, useEffect } from 'react';
import { fetchBudgetData } from '../lib/helper/budgetHelper';
import { useTaskContext } from '../hooks/useTaskContext';

const BudgetSummary: React.FC<{
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  triggerUpdate: number;
}> = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, triggerUpdate }) => {

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i.toString());
    }
    return years;
  };

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { userId } = useTaskContext();

  useEffect(() => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth) - 1;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    fetchBudgetData(userId, startDate.toISOString(), endDate.toISOString())
      .then(({ totalIncome, totalExpenses }) => {
        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpenses);
      });
  }, [selectedMonth, selectedYear, userId, triggerUpdate]);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="p-4 mt-4 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Month and Year
          </label>
          <div className="flex space-x-2">
            <select
              id="month-select"
              className="block w-full md:w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {getMonthOptions().map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              id="year-select"
              className="block w-full md:w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {getYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-700">Total Income:</h3>
          <p className="text-xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-700">Total Expenses:</h3>
          <p className="text-xl font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-700">Balance:</h3>
          <p className="text-xl font-bold text-blue-600">${balance.toFixed(2)}</p>
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
      value: String(i + 1).padStart(2, '0')
    });
  }
  return months;
};

export default BudgetSummary;
