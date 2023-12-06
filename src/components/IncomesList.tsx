import React, { useState, useEffect } from 'react';
import IncomeForm from './IncomeForm';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { useTaskContext } from '../hooks/useTaskContext';

interface Income {
  id: number;
  amount: number;
  date: string;
  category: string;
  notes: string;
}

const IncomesList: React.FC<{ selectedMonth: string }> = ({ selectedMonth }) => {
  const [isIncomeFormOpen, setIncomeFormOpen] = useState(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const { userId } = useTaskContext();
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);

  const handleOpenIncomeForm = () => {
    setIncomeFormOpen(true);
  };

  const handleEditIncome = (income: Income) => {
    setEditingIncome(income);
    setIncomeFormOpen(true);
  };


  useEffect(() => {
    const fetchIncomes = async () => {
      // Define the start and end dates for the month
      const startDate = new Date(selectedMonth);
      const endDate = new Date(selectedMonth);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);

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
  }, [selectedMonth, userId]);

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
            </tr>
          </thead>
          <tbody className="bg-white">
            {incomes.map(income => (
              <tr key={income.id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{income.date}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{income.category}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">${income.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{income.notes}</td>
                <td>
                  <button onClick={() => handleEditIncome(income)}>Edit</button>
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