import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useGetEmployeesQuery } from "../api/api";

export function useDefaultFilters() {
  return {
    sortBy: { value: "sales_low_to_high", label: "Sales low to high" },
    searchQuery: "",
    salesRange: {},
  };
}

export function useEmployees(filters = {}) {
  const { sortBy, searchQuery, salesRange } = filters;

  const { isFetching, data, refetch } = useGetEmployeesQuery();

  let filteredEmployees = [];

  if (data) {
    const { data: employees = [] } = data;
    console.log({ data, employees });

    filteredEmployees = [...employees];

    if (sortBy === "sales_high_to_low") {
      filteredEmployees = filteredEmployees.sort(
        (a, b) => b.totalSales - a.totalSales
      );
    } else {
      filteredEmployees = filteredEmployees.sort(
        (a, b) => a.totalSales - b.totalSales
      );
    }

    if (searchQuery) {
      filteredEmployees = filteredEmployees.filter((el) =>
        el.name.toUpperCase().includes(searchQuery.toUpperCase())
      );
    }

    if (salesRange) {
      filteredEmployees = filteredEmployees.filter((el) => {
        const { totalSales } = el;

        console.log({ salesRange });

        if (salesRange.includes("<"))
          return totalSales < +salesRange.split("<")[1];

        if (salesRange.includes(">")) {
          console.log(salesRange.split(">")[0]);
          return totalSales > +salesRange.split(">")[1];
        }

        const [start, end] = salesRange.split("-");
        return totalSales >= start && totalSales <= end;
      });
    }
  }

  return {
    isFetching,
    employees: filteredEmployees,
    topEmployees: filteredEmployees.splice(0, 4),
    refetch,
  };
}

export function useToggle(initialValue = false) {
  const [show, setShow] = useState(initialValue);

  const handleOpen = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleToggle = () => setShow((prev) => !prev);

  return {
    show,
    handleOpen,
    handleClose,
    handleToggle,
  };
}

export function useHeaderTitle() {
  const isAnalyticsRoute = useRouteMatch("/analytics");
  const isEmployeesRoute = useRouteMatch("/employees");
  const isAddEmployeeRoute = useRouteMatch("/add-employee");

  const title = isAnalyticsRoute
    ? "Analytics"
    : isEmployeesRoute
    ? "Employees"
    : isAddEmployeeRoute
    ? "Add Employee"
    : "";

  return {
    title,
  };
}
