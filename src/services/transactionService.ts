import { Transaction } from '../types/budget';

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    // In a real app, this would be an API call
    return [
      { id: 1, date: '2023-05-01', amount: 1000, category: 'Salary', description: 'Monthly salary' },
      { id: 2, date: '2023-05-02', amount: -50, category: 'Groceries', description: 'Weekly groceries' },
      { id: 3, date: '2023-05-03', amount: -30, category: 'Transportation', description: 'Bus fare' },
    ];
  },

  addTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    // In a real app, this would be an API call
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };
    return newTransaction;
  },

  deleteTransaction: async (id: number): Promise<void> => {
    // In a real app, this would be an API call
    console.log('Delete transaction:', id);
  },
}; 