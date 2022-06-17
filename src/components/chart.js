import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// import Title from "./Title";
import { Paper } from "@mui/material";
import "styled-components/macro";
import { amount } from "../helper";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("2014", 0),
  createData("2015", 3000),
  createData("2016", 10000),
  createData("2017", 20000),
  createData("2018", 15000),
  createData("2019", 50000),
  createData("2020", 24400),
  createData("2021", 65400),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 240,
      }}
    >
      <React.Fragment>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
            css={`
              max-width: 100%;
              height: 100%;
              & > svg {
                width: 100% !important;
              }
            `}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Total Sales (₹)
              </Label>
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    </Paper>
  );
}

function CustomTooltip({ payload, label }) {
  return (
    <div className="shadow-lg bg-white rounded px-3 py-2">
      <p className="text-gray-400">Year: {label}</p>
      <h4>Sale: {amount(payload[0]?.value)}</h4>
    </div>
  );
}
