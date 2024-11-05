import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Dashboard } from './Dashboard';
import { TransactionsTable } from './TransactionsTable';
import { BudgetList } from './BudgetList';
import { CategoryList } from './CategoryList';
import { transactionService } from '../../services/transactionService';
import { budgetService } from '../../services/budgetService';
import { categoryService } from '../../services/categoryService';
import type { Budget, Transaction, Category } from '../../types/budget';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const BudgetPlanner = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const handleAddBudget = async () => {
    try {
      const newBudget = await budgetService.addBudget({
        category: '',
        limit: 0,
        spent: 0,
      });
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

  const handleAddCategory = async () => {
    try {
      const newCategory = await categoryService.addCategory({
        name: '',
        type: 'expense',
        children: [],
      });
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Budget Planner</h1>
        
        <nav className="mb-8">
          <ul className="flex space-x-4">
            {['dashboard', 'transactions', 'budgets', 'categories'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label={`Switch to ${tab} tab`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {activeTab === 'dashboard' && (
          <Dashboard transactions={transactions} budgets={budgets} />
        )}

        {activeTab === 'transactions' && (
          <TransactionsTable transactions={transactions} />
        )}

        {activeTab === 'budgets' && (
          <BudgetList
            budgets={budgets}
            onEdit={handleEditBudget}
            onDelete={handleDeleteBudget}
            onAdd={handleAddBudget}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryList
            categories={categories}
            onEditSubCategory={handleEditSubCategory}
            onDeleteSubCategory={handleDeleteSubCategory}
            onAddCategory={handleAddCategory}
          />
        )}
      </div>
    </div>
  );
}; 