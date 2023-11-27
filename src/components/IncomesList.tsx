import React, { useState } from 'react';
import IncomeForm from './IncomeForm';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { useTaskContext } from '../hooks/useTaskContext';
const { userId } = useTaskContext();

const IncomesList: React.FC = () => {
  const [isIncomeFormOpen, setIncomeFormOpen] = useState(false);
  

  const handleOpenIncomeForm = () => {
    setIncomeFormOpen(true);
  };

  const handleIncomeFormSubmit = async (date: string, amount: number, category: string, notes: string) => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
    
    const newIncomeData = {
      user_id: userId,
      date,
      amount,
      category,
      notes
    };

    const { error } = await supabase.from('incomes').insert([newIncomeData]);

    if (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income.');
      return;
    }

    toast.success('Income added successfully.');
    setIncomeFormOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Income</h2>
      {/* Your income list rendering */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleOpenIncomeForm}
      >
        Add Income
      </button>
      <IncomeForm
        show={isIncomeFormOpen}
        onClose={() => setIncomeFormOpen(false)}
        onSubmit={handleIncomeFormSubmit}
      />
    </div>
  );
};

export default IncomesList;