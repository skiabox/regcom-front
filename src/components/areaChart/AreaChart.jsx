import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

import "./areaChart.css";

function AreaChart() {
  const option = {
    color: ["#69F8A2", "#8669F8"],
    textStyle: {
      color: "#FFFFFF"
    },
    backgroundColor: "#522F91",
    title: {
      text: "Compliance score progress",
      left: 20,
      top: 10,
      textStyle: {
        color: "#FFFFFF",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "24px"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {
      textStyle: {
        color: "#FFFFFF",
        fontStyle: "italic",
        fontFamily: "ABeeZee"
      },
      borderColor: "#ccc",
      left: 20,
      top: 50
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: 100,
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        axisLabel: {
          fontFamily: "ABeeZee"
        },
        axisLine: {
          lineStyle: { color: "#FFFFFF" },
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: { color: "#E4E4E4", opacity: 0.2 }
        },
        axisTick: {
          show: false
        },
        offset: 4
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: { color: "#FFFFFF" }
        },
        splitLine: {
          show: false
        },
        min: 0,
        max: 100,
        axisLabel: {
          fontFamily: "ABeeZee",
          formatter: "{value} %"
        }
      }
    ],
    series: [
      {
        name: "2021",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#D9FDCD"
            },
            {
              offset: 1,
              color: "#36B98A"
            }
          ])
        },
        emphasis: {
          focus: "series"
        },
        data: [
          { value: 18, symbol: "circle", symbolSize: 10 },
          { value: 25, symbol: "circle", symbolSize: 10 },
          { value: 19, symbol: "circle", symbolSize: 10 },
          { value: 30, symbol: "circle", symbolSize: 10 },
          { value: 50, symbol: "circle", symbolSize: 10 },
          { value: 30, symbol: "circle", symbolSize: 10 },
          { value: 65, symbol: "circle", symbolSize: 10 }
        ]
      },
      {
        name: "2022",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#E2CDFD"
            },
            {
              offset: 1,
              color: "#8669F8"
            }
          ])
        },
        emphasis: {
          focus: "series"
        },
        data: [
          { value: 20, symbol: "circle", symbolSize: 10 },
          { value: 55, symbol: "circle", symbolSize: 10 },
          { value: 35, symbol: "circle", symbolSize: 10 },
          { value: 65, symbol: "circle", symbolSize: 10 },
          { value: 30, symbol: "circle", symbolSize: 10 },
          { value: 25, symbol: "circle", symbolSize: 10 },
          { value: 35, symbol: "circle", symbolSize: 10 }
        ]
      }
    ]
  };

  return <ReactEcharts option={option} />;
}

export default AreaChart;
