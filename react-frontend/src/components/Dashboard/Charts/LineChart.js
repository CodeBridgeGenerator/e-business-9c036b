// src/components/Charts/LineChart.js
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { classNames } from "primereact/utils";
import PopupCard from "../PopUpComp/popUp";
import Drag from "../../../assets/media/Drag.png"; // Import the drag image
import ThisWeek from "../PopUpComp/TimePopUp";

export default function LineChart(props) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { name, isEdit } = props;
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary",
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    // Updated data for more visual appeal
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Guidebooks",
          data: [20, 30, 25, 35, 40, 30, 50],
          fill: true,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          pointBackgroundColor: "red",
          pointBorderColor: "red",
        },
        {
          label: "Acme TNT",
          data: [25, 35, 20, 25, 30, 35, 45],
          fill: true,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--teal-500"),
          backgroundColor: "rgba(0, 206, 209, 0.2)",
          pointBackgroundColor: "purple",
          pointBorderColor: "purple",
          borderDash: [5, 5],
        },
        {
          label: "Chargers",
          data: [30, 25, 35, 30, 20, 25, 60],
          fill: true,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--orange-500"),
          backgroundColor: "rgba(255, 167, 38, 0.2)",
          pointBackgroundColor: "blue",
          pointBorderColor: "blue",
        },
      ],
    };

    // Updated options for the chart
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            color: textColor,
            usePointStyle: true,
            boxWidth: 5,
            boxHeight: 5,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  const handlePopUp = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="col-6">
      <div
        className="surface-card shadow-2 border-round p-3"
        style={{
          width: "205%",
          height: "290px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <ThisWeek isEdit={isEdit} onClick={handlePopUp} />

        {showCard && <PopupCard />}

        <div style={{ width: "100%", marginBottom: "10px" }}>
          <div className="flex align-items-center">
            <img
              src={Drag}
              alt="Drag Icon"
              className={classNames("mr-2", { hidden: !isEdit })}
              style={{ width: "1rem", height: "1rem" }}
            />
            <div
              style={{
                textAlign: "left",
                fontSize: "14px",
                fontWeight: "bold",
                color: "var(--text-color)",
                marginLeft: "0.5rem",
              }}
            >
              <span className="block text-900 font-medium mb-1">{name}</span>
            </div>
          </div>
          <div
            style={{
              textAlign: "left",
              fontSize: "35px",
              fontWeight: "bold",
              color: "var(--text-color)",
              marginLeft: "0.5rem",
              padding: "0.1rem",
            }}
          >
            500000
          </div>
          <div
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.5)",
              marginLeft: "0.5rem",
              padding: "0.1rem",
            }}
          >
            500 Users
          </div>
        </div>
        <Chart
          type="line"
          data={chartData}
          options={chartOptions}
          style={{ width: "100%", height: "65%", padding: "1rem" }}
        />
      </div>
    </div>
  );
}
