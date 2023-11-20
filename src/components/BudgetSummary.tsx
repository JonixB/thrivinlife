import React from 'react';

const BudgetSummary: React.FC = () => {
  return (
    <div className="p-4 mt-4 border-t">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">Total Income:</h3>
          <p>$0.00</p>
        </div>
        <div>
          <h3 className="font-semibold">Total Expenses:</h3>
          <p>$0.00</p>
        </div>
        <div>
          <h3 className="font-semibold">Balance:</h3>
          <p>$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;