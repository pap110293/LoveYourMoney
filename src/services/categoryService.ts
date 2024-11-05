import { Category } from '../types/budget';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    // In a real app, this would be an API call
    return [
      { 
        id: 1, 
        name: 'Income', 
        type: 'income', 
        children: [
          { id: 2, name: 'Salary' }, 
          { id: 3, name: 'Freelance' }
        ] 
      },
      { 
        id: 4, 
        name: 'Expenses', 
        type: 'expense', 
        children: [
          { id: 5, name: 'Groceries' }, 
          { id: 6, name: 'Transportation' }
        ] 
      },
    ];
  },

  addCategory: async (category: Omit<Category, 'id'>): Promise<Category> => {
    // In a real app, this would be an API call
    const newCategory = {
      ...category,
      id: Date.now(),
    };
    return newCategory;
  },

  addSubCategory: async (
    categoryId: number, 
    subCategory: { name: string }
  ): Promise<{ id: number; name: string }> => {
    // In a real app, this would be an API call
    return {
      id: Date.now(),
      name: subCategory.name,
    };
  },

  updateSubCategory: async (
    categoryId: number,
    subCategoryId: number,
    name: string
  ): Promise<void> => {
    // In a real app, this would be an API call
    console.log('Update subcategory:', { categoryId, subCategoryId, name });
  },

  deleteSubCategory: async (
    categoryId: number,
    subCategoryId: number
  ): Promise<void> => {
    // In a real app, this would be an API call
    console.log('Delete subcategory:', { categoryId, subCategoryId });
  },
}; 