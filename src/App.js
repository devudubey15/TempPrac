import Data from "./PropsPrac/StockData";
import "./App.css";
import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import Attribute from "./PropsPrac/D3Prac";

// 'npm install d3' ye kar lena

function App() {
  var objectArray = Object.entries(Data);

  useEffect(() => {
    const svg = d3.select("#chart").select("svg");

    if (!svg.empty()) {
      // ye isliye lagya hai kyuki, do svg component ban rhe the .
      svg.remove();
    }
    const svgWidth = window.innerWidth;
    const svgHeight = window.innerHeight;

    const newSvg = d3
      .select("#chart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("border", "1px solid black")
      .attr("class", "container");

    // TimeScale

    const timescale = d3
      .scaleTime()
      .domain([
        new Date("2023-12-12 09:15:00"),
        new Date("2023-12-12 15:25:00"),
      ])
      .range([50, svgWidth - 50]);

    // Pricescale

    const MinPrice = d3.min(objectArray, ([, values]) => values.Low);
    const MaxPrice = d3.max(objectArray, ([, values]) => values.High);

    const priceScale = d3
      .scaleLinear()
      .domain([MinPrice, MaxPrice])
      .range([svgHeight - 50, 50]);

    for (let i = 0; i < objectArray.length; i++) {
      const [time, values] = objectArray[i];
      const { Open, High, Low, Close } = values;
      console.log("Open : " + Open + "Close : " + Close);

      const x = timescale(new Date(time));
      const y = priceScale(Open > Close ? Open : Close);

      console.log("X : " + x + "Y : " + y);

      newSvg
        .append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", 5)
        .attr("height", 10)
        .attr("fill", Open > Close ? "red" : "green");
    }

    return () => {
      newSvg.selectAll("*").remove();
    };
  }, []);

  return (
    <div className="App">
      <div id="chart"></div>
    </div>
  );
}

export default App;

// There are two issues occurring that are not desired:

// 1. When I load the app in the browser, sometimes two SVG elements are created.
// 2. The width and height of the root element are 1269x1242,
//while the width and height of the SVG are 1302x617.
//These dimensions are affected when I open the inspection window.
