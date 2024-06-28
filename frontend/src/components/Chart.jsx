import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart configuration options
export const options = {
  responsive: true, // Makes the chart responsive
  maintainAspectRatio: false, // Maintains aspect ratio
  tension: 0.4, // Adds tension to line
  plugins: {
    legend: {
      position: "top", // Positions the legend at the top
    },
  },
};

// Labels for the x-axis
const labels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

// Data for the chart
export const data = {
  labels, // Assigning x-axis labels
  datasets: [
    {
      label: "Sales", // Label for the dataset
      data: [
        15000, 10000, 14000, 11000, 16000, 12000,
        8000, 14000, 11000, 12000, 23000, 12000
      ], // Sales data
      borderColor: "#404040", // Line color
      backgroundColor: "gray", // Fill color
    },
  ],
};

export default function Chart() {
  return (
    <div className="w-full h-96"> {/* Container for the chart */}
      <Line options={options} data={data} /> {/* Rendering the Line chart */}
    </div>
  );
}
