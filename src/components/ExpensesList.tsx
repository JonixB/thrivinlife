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
    <div className="p-4 h-[37.5vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Expenses</h2>

      <button
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => setExpenseFormOpen(true)}
      >
        Add Expense
      </button>

      <ExpenseForm
        show={isExpenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleExpenseFormSubmit}
      />

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.date}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.category}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.paymentMethod}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.vendor}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesList;