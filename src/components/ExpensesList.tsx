import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { useTaskContext } from '../hooks/useTaskContext';

const ExpensesList: React.FC = () => {
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
  const { userId } = useTaskContext();

  const handleOpenExpenseForm = () => {
    setExpenseFormOpen(true);
  };

  const handleExpenseFormSubmit = async (date: string, category: string, amount: number, paymentMethod: string, vendor: string, notes: string) => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
    
    const newExpenseData = {
      user_id: userId,
      date,
      category,
      amount,
      payment_method: paymentMethod,
      vendor,
      notes
    };

    const { error } = await supabase.from('expenses').insert([newExpenseData]);

    if (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense.');
      return;
    }

    toast.success('Expense added successfully.');
    // Update your expenses list here
    setExpenseFormOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Expenses</h2>
      {/* Your expenses list rendering */}
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleOpenExpenseForm}
      >
        Add Expense
      </button>
      <ExpenseForm
        show={isExpenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleExpenseFormSubmit}
      />
    </div>
  );
};

export default ExpensesList;