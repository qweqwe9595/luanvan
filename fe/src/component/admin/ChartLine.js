import { useEffect } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

export default function ChartLine(newUser) {
  const thang11 = newUser.newUser[`thang 11`];
  const thang12 = newUser.newUser[`thang 12`];
  const thang1 = newUser.newUser[`thang 1`];
  const thang2 = newUser.newUser[`thang 2`];
  const thang3 = newUser.newUser[`thang 3`];
  const thang4 = newUser.newUser[`thang 4`];
  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "Tháng 11",
          "Tháng 12",
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#03a9f4",
            borderColor: "#03a9f4",
            data: [thang11, thang12, thang1, thang2, thang3, thang4],
            fill: false,
          },          
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(17, 17, 17, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <Card>
      <CardHeader color="orange" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-white text-2xl">Người dùng mới</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="line-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}
