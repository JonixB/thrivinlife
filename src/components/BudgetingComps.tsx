import IncomesList from './IncomesList';
import ExpensesList from './ExpensesList';
import BudgetSummary from './BudgetSummary';

const BudgetingComps = () => {
  return (
    <div>
      <IncomesList />
      <ExpensesList />
      <BudgetSummary />
    </div>
  );
};

export default BudgetingComps;