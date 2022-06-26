import React from "react";
import Chart from "./chart";
import { Redirect } from "react-router-dom";
import Summary from "./Summary";
import { useEmployees } from "../customHooks";
import { CircularProgress } from "@mui/material";

function Analytics() {
  const token = localStorage.getItem("token");

  const { isFetching } = useEmployees();
  if (!token) {
    return <Redirect to="/login" />;
  }

  if (isFetching)
    return (
      <div className="flex justify-center mt-5">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-6">
      <Chart />
      <Summary />
    </div>
  );
}

export default Analytics;
