import React from "react";
import { Link } from "react-router-dom";
import { useEmployees, useGetTotalSales } from "../customHooks";
import { EmployeeItem } from "./employees";
import { IoIosArrowRoundForward } from "react-icons/io";
import { amount } from "../helper";

function Summary() {
  // const { data, isFetching } = useGetTotalSalesQuery();
  const { totalSales, isFetching } = useGetTotalSales();

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-6">
      <div className="shadow-md rounded-md p-3 sm:px-8 sm:py-4">
        <p className="text-gray-500 text-sm w-max mb-3">
          Total Sales till today
        </p>
        {isFetching ? (
          <div className="h-8 w-full rounded-md bg-slate-100 animate-pulse" />
        ) : (
          <h4 className="font-medium text-2xl">{amount(totalSales)}</h4>
        )}
      </div>
      <TopSeller />
    </div>
  );
}

export default Summary;

function TopSeller() {
  const { topEmployees } = useEmployees({
    sortBy: "sales_high_to_low",
  });

  return (
    <div className="p-3 sm:px-8 sm:py-4 rounded-lg shadow-md w-full border-1 border-solid border-gray-200">
      <p className="text-xl font-medium text-primary mb-3">Top 4 Sellers</p>
      <div>
        {topEmployees.map(
          ({ name, email, joining, totalSales, _id }, index) => (
            <EmployeeItem
              key={_id}
              index={index + 1}
              name={name}
              email={email}
              joining={joining}
              totalSales={totalSales}
              deleteOpt={false}
              id={_id}
            />
          )
        )}
        <Link
          to={"/employees"}
          className="text-blue-500 hover:underline mt-3 flex items-center gap-1"
        >
          <p>View all employees</p>
          <IoIosArrowRoundForward size={30} />
        </Link>
      </div>
    </div>
  );
}
