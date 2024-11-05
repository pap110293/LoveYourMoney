import { Transaction, Budget } from '../types/budget';

export const dashboardService = {
  calculateTotalIncome: (transactions: Transaction[]): number => {
    return transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  },

  calculateTotalExpenses: (transactions: Transaction[]): number => {
    return transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  },

  calculateBalance: (transactions: Transaction[]): number => {
    const totalIncome = dashboardService.calculateTotalIncome(transactions);
    const totalExpenses = dashboardService.calculateTotalExpenses(transactions);
    return totalIncome - totalExpenses;
  },

  getChartData: (budgets: Budget[], transactions: Transaction[]) => {
    const doughnutChartData = {
      labels: budgets.map((b) => b.category),
      datasets: [
        {
          data: budgets.map((b) => b.spent),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };

    const barChartData = {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          label: 'Amount',
          data: [
            dashboardService.calculateTotalIncome(transactions),
            dashboardService.calculateTotalExpenses(transactions),
          ],
          backgroundColor: ['#4CAF50', '#F44336'],
        },
      ],
    };

    return { doughnutChartData, barChartData };
  },
}; 