import React from 'react';
import { PlusCircle, Trash2, Edit2, ChevronDown } from 'lucide-react';
import type { Category } from '../../types/budget';
import { categoryService } from '../../services/categoryService';

interface CategoryListProps {
  categories: Category[];
  onEditSubCategory: (categoryId: number, subCategoryId: number, name: string) => void;
  onDeleteSubCategory: (categoryId: number, subCategoryId: number) => void;
  onAddCategory?: () => void;
}

export const CategoryList = ({ 
  categories, 
  onEditSubCategory, 
  onDeleteSubCategory, 
  onAddCategory 
}: CategoryListProps) => {
  const handleAddSubCategory = async (categoryId: number) => {
    try {
      const newSubCategory = await categoryService.addSubCategory(categoryId, { name: 'New Subcategory' });
      // You'll need to update the categories state in the parent component
      console.log('New subcategory added:', newSubCategory);
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Categories</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAddSubCategory(category.id)}
                  className="rounded bg-green-500 p-1 text-white hover:bg-green-600"
                  aria-label={`Add subcategory to ${category.name}`}
                >
                  <PlusCircle size={16} />
                </button>
                <button 
                  className="rounded bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
                  aria-label={`Toggle ${category.name} category`}
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {category.children?.map((subCategory) => (
                <div key={subCategory.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                  <span className="text-sm text-gray-600">{subCategory.name}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEditSubCategory(category.id, subCategory.id, subCategory.name)}
                      className="rounded bg-blue-500 p-1 text-white hover:bg-blue-600"
                      aria-label={`Edit ${subCategory.name} subcategory`}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => onDeleteSubCategory(category.id, subCategory.id)}
                      className="rounded bg-red-500 p-1 text-white hover:bg-red-600"
                      aria-label={`Delete ${subCategory.name} subcategory`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={onAddCategory}
        className="mt-4 flex items-center rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        aria-label="Add new category"
      >
        <PlusCircle size={20} className="mr-2" />
        Add New Category
      </button>
    </div>
  );
}; 