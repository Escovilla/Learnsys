import React from "react";

import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
  datasets: [
    {
      label: "Scores",
      data: [6, 7, 8, 4, 9],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.10)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
  ],
};
const options = {
  title: {
    display: true,
    text: "Scores",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 10,
        },
      },
    ],
  },
};
const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "gray",
    fontSize: 14,
  },
};

export default function App() {
  return (
    <div className="App">
      <Bar data={data} legend={legend} options={options} />
    </div>
  );
}
