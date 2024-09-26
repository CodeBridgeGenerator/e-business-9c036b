import React, { useState, useEffect } from "react";
import { Skeleton } from "primereact/skeleton";
import { Chart } from "primereact/chart";
import { classNames } from "primereact/utils";
import Drag from "../../../assets/media/Drag.png";
import Ellipsis from "../../../assets/media/Ellipsis Vertical.png";
import Down from "../../../assets/media/Down Small.png";
import PopupCard from "../PopUpComp/popUp";
import ThisWeek from "../PopUpComp/TimePopUp";

export default function BarChart(props) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const { total, isEdit } = props;
  const [showCard, setShowCard] = useState(false);

  const handlePopUp = () => {
    setShowCard(!showCard);
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    setLoading(true);

    setTimeout(() => {
      const dummyData = [
        { deptdesc: "HR" },
        { deptdesc: "HR" },
        { deptdesc: "IT" },
        { deptdesc: "Finance" },
        { deptdesc: "IT" },
        { deptdesc: "Finance" },
        { deptdesc: "Marketing" },
        { deptdesc: "HR" },
      ];

      const departmentCounts = dummyData.reduce((acc, curr) => {
        const dept = curr.deptdesc;
        if (!acc[dept]) {
          acc[dept] = 0;
        }
        acc[dept] += 1;
        return acc;
      }, {});

      const labels = Object.keys(departmentCounts);
      const values = Object.values(departmentCounts);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Number of Users in Each Department",
            backgroundColor: documentStyle.getPropertyValue("--blue-500"),
            hoverBackgroundColor: documentStyle.getPropertyValue("--blue-400"),
            data: values,
            barThickness: 40,
            maxBarThickness: 60,
            categoryPercentage: 0.8,
            barPercentage: 0.9,
          },
        ],
      };

      const options = {
        plugins: {
          title: {
            display: true,
            color: documentStyle.getPropertyValue("--text-color"),
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              color: documentStyle.getPropertyValue("--text-color"),
              usePointStyle: true,
              boxWidth: 5,
              boxHeight: 5,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
          interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
          },
        },
        scales: {
          y: {
            ticks: {
              color: documentStyle.getPropertyValue("--text-color-secondary"),
              font: {
                size: 12,
              },
            },
            grid: {
              color: documentStyle.getPropertyValue("--surface-border"),
            },
          },
          x: {
            ticks: {
              color: documentStyle.getPropertyValue("--text-color-secondary"),
              font: {
                size: 12,
              },
            },
            grid: {
              color: documentStyle.getPropertyValue("--surface-border"),
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      setChartData(chartData);
      setChartOptions(options);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="col-12 flex justify-content-between align-items-center p-2">
      <div
        className="surface-card shadow-2 border-round p-3"
        style={{ width: "100%", height: "290px", position: "relative" }} // Adjusted height to fit chart
      >
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Removed the static "This week" text */}
          {/* <img
            src={Down}
            alt="DropDown"
            className={classNames("mr-2")}
            style={{
              height: "1rem",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          /> */}
          {/* <img
            src={Ellipsis}
            alt="Ellipsis"
            className={classNames("mr-2", { hidden: !isEdit })}
            style={{
              height: "1rem",
              cursor: "pointer",
            }}
            onClick={handlePopUp}
          /> */}
        </div>
        <ThisWeek isEdit={isEdit} onClick={handlePopUp} />

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
            <span className="block text-900 font-medium mb-1">{total}</span>
          </div>
        </div>
        <div
          style={{
            textAlign: "left",
            fontSize: "25px",
            fontWeight: "bold",
            color: "var(--text-color)",
            marginLeft: "0.5rem",
          }}
        >
          500000
        </div>
        {loading ? (
          <Skeleton width="100%" height="65px" padding="10px" />
        ) : (
          <div
            style={{
              width: "100%",
              height: "200px",
              overflow: "hidden", // Ensure chart doesn't overflow
            }}
          >
            <Chart
              type="bar"
              data={chartData}
              options={chartOptions}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
