import React, { useState } from 'react';
import IncomesList from './IncomesList';
import ExpensesList from './ExpensesList';
import BudgetSummary from './BudgetSummary';

const BudgetingComps = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  return (
    <div>
      <BudgetSummary selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <IncomesList selectedMonth={selectedMonth} />
      <ExpensesList selectedMonth={selectedMonth} />
    </div>
  );
};

const getCurrentMonth = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export default BudgetingComps;
