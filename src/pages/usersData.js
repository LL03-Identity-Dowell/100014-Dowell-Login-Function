import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UsersData = ({ resp }) => {
  const barChartData = {
    title: {
      text: "Product Wise Users",
    },
    data: [
      {
        type: "column",
        showInLegend: true,
        name: "Team Members",
        dataPoints: [
          {
            label: "Exhibitoe form",
            y: 9,
          },
          {
            label: "Living Lab Admin",
            y: 15,
          },
          { label: "Workflow AI", y: 29 },
        ],
        color: "#4F81BD",
      },
      {
        type: "column",
        showInLegend: true,
        name: "Users",
        dataPoints: [
          { label: "Exhibitoe form", y: 45 },
          {
            label: "Living Lab Admin",
            y: 67,
          },
          { label: "Workflow AI", y: 12 },
        ],
        color: "black",
      },
      {
        type: "column",
        showInLegend: true,
        name: "Public Members",
        dataPoints: [
          {
            label: "Exhibitoe form",
            y: 34,
          },
          {
            label: "Living Lab Admin",
            y: 98,
          },
          {
            label: "Workflow AI",
            y: 43,
          },
        ],
        color: "green",
      },
    ],
  };
  const pieChartData = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Live User",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b> {y}%",
        showInLegend: true,
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          {
            label: "Team Members",
            y: 18,
            color: "#4F81BD",
          },
          { label: "User", y: 49, color: "#C0504D" },
          {
            label: "Public Member",
            y: 9,
            color: "#9BBB59",
          },
          { label: "Owner", y: 19, color: "cyan" },
        ],
      },
    ],
  };
  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/2 lg:w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <CanvasJSChart options={pieChartData} />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <CanvasJSChart options={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersData;
