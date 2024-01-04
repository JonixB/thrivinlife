import React, { useState, useEffect } from 'react';
import IncomeForm from './IncomeForm';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { useTaskContext } from '../hooks/useTaskContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmation from './DeleteConfirmation';

interface Income {
  id: number;
  amount: number;
  date: string;
  category: string;
  notes: string;
}

interface IncomesListProps {
  selectedMonth: string;
  selectedYear: string;
  triggerUpdate: number;
  onDataAdded: () => void;
}


const IncomesList: React.FC<IncomesListProps> = ({ selectedMonth, selectedYear, triggerUpdate, onDataAdded }) => {
  const [isIncomeFormOpen, setIncomeFormOpen] = useState(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const { userId } = useTaskContext();
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [incomeToDelete, setIncomeToDelete] = useState<Income | null>(null);

  const handleOpenIncomeForm = () => {
    setEditingIncome(null);
    setIncomeFormOpen(true);
  };

  const handleEditIncome = (income: Income) => {
    setEditingIncome(income);
    setIncomeFormOpen(true);
  };

  const handleDeleteIncome = (income: Income) => {
    setIncomeToDelete(income);
  };

  const confirmDelete = async () => {
    if (!incomeToDelete) return;

    try {
      const { error } = await supabase
        .from('incomes')
        .delete()
        .match({ id: incomeToDelete.id });

      if (error) throw error;

      setIncomes(incomes.filter(item => item.id !== incomeToDelete.id));
      onDataAdded();
      toast.success('Income deleted successfully.');
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income.');
    }

    setIncomeToDelete(null);
  };

  useEffect(() => {
    const fetchIncomes = async () => {
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth) - 1;

      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const { data, error } = await supabase
        .from('incomes')
        .select('*')
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching incomes:', error);
      } else {
        setIncomes(data);
      }
    };

    if (userId) {
      fetchIncomes();
    }
  }, [selectedMonth, selectedYear, userId, triggerUpdate]);

  const handleIncomeFormSubmit = async (income: Income) => {
    // Check if editing an existing income
    if (editingIncome) {
      try {
        const { error } = await supabase
          .from('incomes')
          .update({
            amount: income.amount,
            date: income.date,
            category: income.category,
            notes: income.notes
          })
          .eq('id', editingIncome.id); // Match the record by ID for update

        if (error) throw error;

        setIncomes(incomes.map(item => item.id === editingIncome.id ? income : item));
        onDataAdded();
        toast.success('Income updated successfully.');
      } catch (error) {
        console.error('Error updating income:', error);
        toast.error('Failed to update income.');
      }
    } else {
      try {
        const { data, error } = await supabase.from('incomes').insert([{
          ...income,
          user_id: userId // Include the user_id
        }]);

        setIncomes([...incomes, income]);
        onDataAdded();
        toast.success('Income added successfully.');
      } catch (error) {
        console.error('Error adding income:', error);
        toast.error('Failed to add income.');
      }
    }

    // Reset editing state and close the form
    setEditingIncome(null);
    setIncomeFormOpen(false);
  };

  return (
    <div className="p-4 h-[37.5vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Income</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleOpenIncomeForm}
      >
        Add Income
      </button>

      <IncomeForm
        show={isIncomeFormOpen}
        onClose={() => setIncomeFormOpen(false)}
        onSubmit={handleIncomeFormSubmit}
        income={editingIncome}
      />

      {/* Income Table */}
      <div className="overflow-x-auto">
        <DeleteConfirmation
          show={incomeToDelete != null}
          onCancel={() => setIncomeToDelete(null)}
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
            {incomes.map(income => (
              <tr key={income.id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{income.date}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{income.category}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">${income.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{income.notes}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">
                  <button onClick={() => handleEditIncome(income)}>
                    <FaEdit />
                  </button>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">
                  <button onClick={() => handleDeleteIncome(income)}>
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

export default IncomesList;