import React, { useState } from 'react';
import IncomesList from './IncomesList';
import ExpensesList from './ExpensesList';
import BudgetSummary from './BudgetSummary';

const getCurrentMonth = () => {
  const date = new Date();
  return String(date.getMonth() + 1).padStart(2, '0');
};

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
      <IncomesList
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
      <ExpensesList
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  )
};


export default BudgetingComps;
