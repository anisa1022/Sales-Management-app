// src/components/PurchasesChart.js
import React from 'react';
import { useFetchPurchasesQuery } from '../services/purcheseSlice';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PurchasesChart = () => {
  const { data, isLoading, isError } = useFetchPurchasesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading purchases data.</div>;
  }

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Purchases',
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

export default PurchasesChart;
