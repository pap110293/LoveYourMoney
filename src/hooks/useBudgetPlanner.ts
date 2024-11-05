import { useState, useEffect } from 'react';
import { Transaction, Budget, Category } from '../types/budget';
import { transactionService } from '../services/transactionService';
import { budgetService } from '../services/budgetService';
import { categoryService } from '../services/categoryService';

export const useBudgetPlanner = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData, budgetsData, categoriesData] = await Promise.all([
          transactionService.getTransactions(),
          budgetService.getBudgets(),
          categoryService.getCategories(),
        ]);

        setTransactions(transactionsData);
        setBudgets(budgetsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditBudget = async (budget: Budget) => {
    try {
      const updatedBudget = await budgetService.updateBudget(budget.id, budget);
      setBudgets(budgets.map(b => b.id === budget.id ? updatedBudget : b));
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  const handleDeleteBudget = async (id: number) => {
    try {
      await budgetService.deleteBudget(id);
      setBudgets(budgets.filter(budget => budget.id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const handleAddBudget = async (budget: Omit<Budget, 'id'>) => {
    try {
      const newBudget = await budgetService.addBudget(budget);
      setBudgets([...budgets, newBudget]);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const handleEditSubCategory = async (categoryId: number, subCategoryId: number, name: string) => {
    try {
      await categoryService.updateSubCategory(categoryId, subCategoryId, name);
      setCategories(categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            children: category.children.map(sub => 
              sub.id === subCategoryId ? { ...sub, name } : sub
            ),
          };
        }
        return category;
      }));
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  const handleDeleteSubCategory = async (categoryId: number, subCategoryId: number) => {
    try {
      await categoryService.deleteSubCategory(categoryId, subCategoryId);
      setCategories(categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            children: category.children.filter(sub => sub.id !== subCategoryId),
          };
        }
        return category;
      }));
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return {
    transactions,
    budgets,
    categories,
    loading,
    handleEditBudget,
    handleDeleteBudget,
    handleAddBudget,
    handleEditSubCategory,
    handleDeleteSubCategory,
  };
}; 