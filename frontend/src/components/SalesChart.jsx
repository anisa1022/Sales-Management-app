import React from 'react';
import { useGetSalesQuery } from '../services/saleSlice';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesChart = () => {
  const { data, isLoading, isError } = useGetSalesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading sales data.</div>;
  }

  const chartData = {
    labels: data.map((item) => new Date(item.date).toLocaleDateString()), // Displaying date
    datasets: [
      {
        label: 'Sales',
        data: data.map((item) => item.totalPrice),
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-96 mt-8 p-4 bg-white rounded shadow">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
