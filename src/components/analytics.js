import React from "react";
import Chart from "./chart";
import { Redirect } from "react-router-dom";
import Header from "./header";
import Summary from "./Summary";
import { useEmployees } from "../customHooks";
import { CircularProgress } from "@mui/material";
import { useGetEmployeesQuery } from "../api/api";

function Analytics() {
  const token = localStorage.getItem("token");

  const { isFetching } = useGetEmployeesQuery();

  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log({ isFetching });

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
