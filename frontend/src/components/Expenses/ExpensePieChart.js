import React from "react";
import { Pie } from "react-chartjs-2";

function ExpensePieChart({ expenses }) {
  const data = {
    labels: [...new Set(expenses.map((e) => e.category))],
    datasets: [
      {
        data: Object.values(
          expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
          }, {})
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return <Pie data={data} />;
}

export default ExpensePieChart;
