import React from 'react';
//import { ExpenseEntry } from './ExpenseEntry'; //To be created

const ExpensesList: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Expenses</h2>
      {/* List of expense entries */}
      <div className="mt-2">
        {/* This will be replaced with actual data mapping */}
        {/*<ExpenseEntry />*/}
        {/*<ExpenseEntry />*/}
        {/* ... */}
      </div>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Add Expense
      </button>
    </div>
  );
};

export default ExpensesList;