import React from 'react';
import { PlusCircle, Trash2, Edit2 } from 'lucide-react';
import type { Budget } from '../../types/budget';

interface BudgetListProps {
  budgets: Budget[];
  onEdit?: (budget: Budget) => void;
  onDelete?: (id: number) => void;
  onAdd?: () => void;
}

export const BudgetList = ({ budgets, onEdit, onDelete, onAdd }: BudgetListProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Budget Goals</h2>
      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">{budget.category}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onEdit?.(budget)}
                  className="rounded bg-blue-500 p-1 text-white hover:bg-blue-600"
                  aria-label={`Edit ${budget.category} budget`}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDelete?.(budget.id)}
                  className="rounded bg-red-500 p-1 text-white hover:bg-red-600"
                  aria-label={`Delete ${budget.category} budget`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Spent: ${budget.spent} / ${budget.limit}
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(budget.spent / budget.limit) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={onAdd}
        className="mt-4 flex items-center rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        aria-label="Add new budget"
      >
        <PlusCircle size={20} className="mr-2" />
        Add New Budget
      </button>
    </div>
  );
}; 