import { useEffect, useState } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import axios from "axios";

export default function ChartLine() {
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    const countNewUser = () => {
      axios
        .get("http://localhost:5000/api/statistic/newposts?query=month")
        .then((res) => {
          setNewUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewUser();
  }, []);

  useEffect(() => {
    if (Object.keys(newUser).length === 0) return;

    var config = {
      type: "line",
      data: {
        labels: Object.keys(newUser).reverse(),
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#03a9f4",
            borderColor: "#03a9f4",
            data: Object.values(newUser).reverse(),
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
  }, [newUser]);

  return (
    <Card>
      <CardHeader color="orange" contentPosition="left">
        {/* <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6> */}
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
