export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface Budget {
  id: number;
  category: string;
  limit: number;
  spent: number;
}

export interface Category {
  id: number;
  name: string;
  type?: 'income' | 'expense';
  children: { id: number; name: string; }[];
}

export interface ChartOptions {
  responsive: boolean;
  plugins: {
    legend: {
      position: 'top' | 'bottom' | 'left' | 'right';
    };
    title: {
      display: boolean;
      text: string;
    };
  };
  scales?: {
    x: {
      type: 'category';
      beginAtZero: boolean;
    };
    y: {
      type: 'linear';
      beginAtZero: boolean;
    };
  };
} 