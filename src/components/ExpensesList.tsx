import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { useTaskContext } from '../hooks/useTaskContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmation from './DeleteConfirmation';

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  payment_method: string;
  vendor: string;
  notes: string;
}

const ExpensesList: React.FC<{ selectedMonth: string; selectedYear: string }> = ({ selectedMonth, selectedYear }) => {
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { userId } = useTaskContext();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const handleOpenExpenseForm = () => {
    setEditingExpense(null);
    setExpenseFormOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setExpenseFormOpen(true);
  };

  const handleDeleteExpense = (expense: Expense) => {
    setExpenseToDelete(expense);
  };

  const confirmDelete = async () => {
    if (!expenseToDelete) return;

    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .match({ id: expenseToDelete.id });

      if (error) throw error;

      setExpenses(expenses.filter(item => item.id !== expenseToDelete.id));
      toast.success('Expense deleted successfully.');
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense.');
    }

    setExpenseToDelete(null);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth) - 1;
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

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
  }, [selectedMonth, selectedYear, userId]);

  const handleExpenseFormSubmit = async (expense: Expense) => {
    // Check if editing an existing income
    if (editingExpense) {
      try {
        const { error } = await supabase
          .from('expenses')
          .update({
            amount: expense.amount,
            date: expense.date,
            category: expense.category,
            payment_method: expense.payment_method,
            vendor: expense.vendor,
            notes: expense.notes
          })
          .eq('id', editingExpense.id); // Match the record by ID for update

        if (error) throw error;

        setExpenses(expenses.map(item => item.id === editingExpense.id ? expense : item));
        toast.success('Expense updated successfully.');
      } catch (error) {
        console.error('Error updating expense:', error);
        toast.error('Failed to update expense.');
      }
    } else {
      try {
        const { data, error } = await supabase.from('expenses').insert([{ 
          ...expense,
          user_id: userId // Include the user_id
        }]);
        console.log(expense)

        setExpenses([...expenses, expense]);
        toast.success('Expense added successfully.');
      } catch (error) {
        console.error('Error adding expense:', error);
        toast.error('Failed to add expense.');
      }
    }

    // Reset editing state and close the form
    setEditingExpense(null);
    setExpenseFormOpen(false);
  };

  return (
    <div className="p-4 h-[37.5vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Expenses</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleOpenExpenseForm}
      >
        Add Expense
      </button>

      <ExpenseForm
        show={isExpenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleExpenseFormSubmit}
        expense={editingExpense}
      />

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <DeleteConfirmation
          show={expenseToDelete != null}
          onCancel={() => setExpenseToDelete(null)}
          onConfirm={confirmDelete}
        />
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
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.date}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.category}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.payment_method}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.vendor}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{expense.notes}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">
                  <button onClick={() => handleEditExpense(expense)}>
                    <FaEdit />
                  </button>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">
                  <button onClick={() => handleDeleteExpense(expense)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesList;