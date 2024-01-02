import React, { useState } from 'react';
import IncomesList from './IncomesList';
import ExpensesList from './ExpensesList';
import BudgetSummary from './BudgetSummary';

const BudgetingComps = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  return (
    <div>
      <BudgetSummary
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <IncomesList selectedMonth={selectedMonth} />
      <ExpensesList selectedMonth={selectedMonth} />
    </div>
  );
};

const getCurrentMonth = () => {
  const date = new Date();
  return String(date.getMonth() + 1).padStart(2, '0');
};

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i.toString());
  }
  return years;
};

export default BudgetingComps;
