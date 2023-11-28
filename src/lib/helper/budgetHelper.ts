import { supabase } from './supabase';

export const fetchBudgetData = async (userId: string, startDate: string, endDate: string) => {
  // Fetch income
  const { data: incomeData, error: incomeError } = await supabase
    .from('incomes')
    .select('amount')
    .gte('date', startDate)
    .lte('date', endDate)
    .eq('user_id', userId);

  // Fetch expenses
  const { data: expenseData, error: expenseError } = await supabase
    .from('expenses')
    .select('amount')
    .gte('date', startDate)
    .lte('date', endDate)
    .eq('user_id', userId);

  if (incomeError || expenseError) {
    // Handle errors
    console.error(incomeError || expenseError);
    return { totalIncome: 0, totalExpenses: 0 };
  }

  // Calculate totals
  const totalIncome = incomeData.reduce((sum, record) => sum + record.amount, 0);
  const totalExpenses = expenseData.reduce((sum, record) => sum + record.amount, 0);

  return { totalIncome, totalExpenses };
};
