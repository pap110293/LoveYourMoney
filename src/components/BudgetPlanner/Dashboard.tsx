import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Budget, Transaction } from '../../types/budget';
import { SummaryCard } from './SummaryCard';
import { chartOptions } from '../../lib/chartConfig';
import { dashboardService } from '../../services/dashboardService';

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export const Dashboard = ({ transactions, budgets }: DashboardProps) => {
  const totalIncome = dashboardService.calculateTotalIncome(transactions);
  const totalExpenses = dashboardService.calculateTotalExpenses(transactions);
  const balance = dashboardService.calculateBalance(transactions);

  const { doughnutChartData, barChartData } = dashboardService.getChartData(budgets, transactions);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <SummaryCard
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Spending by Category
        </h2>
        <Doughnut data={doughnutChartData} />
      </div>
      <div className="md:col-span-2">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Income vs Expenses
          </h2>
          <Bar options={chartOptions} data={barChartData} />
        </div>
      </div>
    </div>
  );
}; 