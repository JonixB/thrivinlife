import React from 'react';
//import { IncomeEntry } from './IncomeEntry'; To be created

const IncomeList: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Income</h2>
      {/* List of income entries */}
      <div className="mt-2">
        {/* This will be replaced with actual data mapping */}
        {/*<IncomeEntry />*/}
        {/*<IncomeEntry />*/}
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Income
      </button>
    </div>
  );
};

export default IncomeList;