import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { useTaskContext } from '../hooks/useTaskContext';

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  vendor: string;
  notes: string;
}

const ExpensesList: React.FC<{ selectedMonth: string }> = ({ selectedMonth }) => {
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { userId } = useTaskContext();

  const handleOpenExpenseForm = () => {
    setExpenseFormOpen(true);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      // Define the start and end dates for the month
      const startDate = new Date(selectedMonth);
      const endDate = new Date(selectedMonth);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        setExpenses(data);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [selectedMonth, userId]);

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