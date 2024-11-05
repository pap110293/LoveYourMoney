import { Budget } from '../types/budget';

export const budgetService = {
  getBudgets: async (): Promise<Budget[]> => {
    // In a real app, this would be an API call
    return [
      { id: 1, category: 'Groceries', limit: 300, spent: 200 },
      { id: 2, category: 'Entertainment', limit: 150, spent: 75 },
      { id: 3, category: 'Transportation', limit: 100, spent: 80 },
    ];
  },

  addBudget: async (budget: Omit<Budget, 'id'>): Promise<Budget> => {
    // In a real app, this would be an API call
    const newBudget = {
      ...budget,
      id: Date.now(),
    };
    return newBudget;
  },

  updateBudget: async (id: number, budget: Partial<Budget>): Promise<Budget> => {
    // In a real app, this would be an API call
    return { ...budget, id } as Budget;
  },

  deleteBudget: async (id: number): Promise<void> => {
    // In a real app, this would be an API call
    console.log('Delete budget:', id);
  },
}; 