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

  const handleOpenIncomeForm = () => {
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
    <div className="p-4">
      <h2 className="text-lg font-semibold">Income</h2>
      
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