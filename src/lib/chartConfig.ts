import type { ChartOptions } from '../types/budget';

export const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Income vs Expenses',
    },
  },
  scales: {
    x: {
      type: 'category',
      beginAtZero: true,
    },
    y: {
      type: 'linear',
      beginAtZero: true,
    },
  },
}; 