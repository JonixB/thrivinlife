import React, { useState } from 'react';

interface IncomeFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (income: Income) => void;
  income?: Income | null;
}

interface Income {
  id: number;
  amount: number;
  date: string;
  category: string;
  notes: string;
}

interface NewIncome {
  amount: number;
  date: string;
  category: string;
  notes: string;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ show, onClose, onSubmit, income }) => {
  const [date, setDate] = useState(income ? income.date : '');
  const [amount, setAmount] = useState(income ? income.amount.toString() : '');
  const [category, setCategory] = useState(income ? income.category : '');
  const [notes, setNotes] = useState(income ? income.notes : '');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEditing = income && income.id !== undefined;
    if (isEditing) {
      const updatedIncome: Income = {
        id: income.id,
        date,
        amount: parseFloat(amount),
        category,
        notes
      };
      onSubmit(updatedIncome);
    } else {
      // New income: No id
      const newIncome: NewIncome = {
        date,
        amount: parseFloat(amount),
        category,
        notes
      };
      onSubmit(newIncome as Income);
    }

    // Reset form fields
    setDate('');
    setAmount('');
    setCategory('');
    setNotes('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Income
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 mb-4 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 mb-4 border rounded"
                    />
                    <textarea
                      placeholder="Notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2 mb-4 border rounded"
                    />
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;
