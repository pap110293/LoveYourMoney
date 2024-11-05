import React from 'react';

interface SummaryCardProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const SummaryCard = ({ totalIncome, totalExpenses, balance }: SummaryCardProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Financial Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Income</span>
          <span className="font-medium text-green-600">${totalIncome.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Expenses</span>
          <span className="font-medium text-red-600">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-4">
          <span className="font-semibold text-gray-600">Balance</span>
          <span className={`font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}; 