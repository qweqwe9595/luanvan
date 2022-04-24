import { useEffect, useState } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import axios from "axios";

export default function ChartBar() {
  const [newPost, setNewPost] = useState({});

  useEffect(() => {
    const countNewPost = () => {
      axios
        .get("http://localhost:5000/api/statistic/newposts?query=month")
        .then((res) => {
          setNewPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewPost();
  }, []);

  useEffect(() => {
    if (Object.keys(newPost).length === 0) return;
    let config = {
      type: "bar",
      data: {
        labels: Object.keys(newPost).reverse(),
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#03a9f4",
            borderColor: "#03a9f4",
            data: Object.values(newPost).reverse(),
            fill: false,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(17,17,17,.7)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBarNewPost = new Chart(ctx, config);
  }, [newPost]);
  return (
    <Card>
      <CardHeader color="pink" contentPosition="left">
        {/* <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6> */}
        <h2 className="text-white text-2xl">Bài đăng mới</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="bar-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}
