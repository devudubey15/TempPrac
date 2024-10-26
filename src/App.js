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

    // TODO: Calculate the Tick Gap
    // Tick gap is the gap between the two ticks, for example, the gap between,
    // candle of time 9:15 and candle of time 9:20,
    // Or, candle of time 10:25 and candle of time 10:30,
    // Or, candle of time 11:20 and candle of time 11:25

    // TODO: Calculate candle width using the gap between the two candles, and the tick gap
    // Tick Gap = Candle Width + Candle Gap

    // Pricescale
    const MinPrice = d3.min(objectArray, ([, values]) => values.Low);
    const MaxPrice = d3.max(objectArray, ([, values]) => values.High);

    const priceScale = d3
      .scaleLinear()
      .domain([MinPrice, MaxPrice])
      .range([svgHeight - 50, 50]);

    // Cndle Gap
    const CandleGap = Math.abs(
      timescale(new Date("2023-12-12 09:15:00")) -
        timescale(new Date("2023-12-12 09:20:00"))
    );

    // Candle Width
    const CandleWidth = CandleGap * 0.7; // Gap percantages

    // Tick Gap
    const TickGap = CandleGap + CandleWidth;

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
        .attr("width", CandleWidth)
        .attr("height", Math.abs(priceScale(Open) - priceScale(Close)))
        .attr("fill", Open > Close ? "red" : "green");

      newSvg
        .append("line")
        .attr("x1", x + CandleWidth / 2)
        .attr("y1", priceScale(High))
        .attr("x2", x + CandleWidth / 2)
        .attr("y2", priceScale(Low))
        .attr("stroke", Open > Close ? "red" : "green");
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
