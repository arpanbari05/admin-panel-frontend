import React, { memo, useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import "styled-components/macro";
import { useDeleteEmployeeMutation } from "../api/api";
import { CircularProgress } from "@mui/material";
import { MdDelete } from "react-icons/md";
import Filters from "./filters";
import { useDefaultFilters, useEmployees } from "../customHooks";
import { MatButton } from ".";
import { amount } from "../helper";

function Employees() {
  const token = localStorage.getItem("token");

  const defaultFilters = useDefaultFilters();

  const [filters, setFilters] = useState({ ...defaultFilters });

  const { salesRange, sortBy } = filters;

  const { isFetching, employees } = useEmployees({
    ...filters,
    salesRange: salesRange.value,
    sortBy: sortBy.value,
  });

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="p-6">
      <Filters setFilters={setFilters} filters={filters} />
      <EmployeeList isFetching={isFetching} employees={employees} />
    </div>
  );
}

export default memo(Employees);

function EmployeeList({ employees, isFetching }) {
  return (
    <>
      <div className="hidden lg:block">
        <EmployeeItem
          name={"Name"}
          email={"Email"}
          joining={"Joning Date"}
          totalSales={"Total Sales"}
          deleteHead={"Delete"}
          index={"Sr. no"}
          className="hidden"
          head
        />
      </div>
      {isFetching ? (
        <div className="flex justify-center my-10">
          <CircularProgress />
        </div>
      ) : employees.length < 1 ? (
        <p className="mt-5 font-medium text-md text-center">
          No Employees found!
        </p>
      ) : (
        <>
          {employees.map(({ name, email, joining, totalSales, _id }, index) => (
            <EmployeeItem
              key={_id}
              index={index + 1}
              name={name}
              email={email}
              joining={joining}
              totalSales={totalSales}
              id={_id}
            />
          ))}
        </>
      )}
    </>
  );
}

export function EmployeeItem({
  name,
  email,
  joining,
  index,
  totalSales,
  deleteOpt = true,
  id,
  deleteHead,
  head = false,
}) {
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();

  const handleDeleteEmployee = () => {
    deleteEmployee(id);
  };

  let joiningDate = new Date(joining).toDateString()?.split(" ") || [];

  joiningDate = `${joiningDate[2]} ${joiningDate[1]}, ${joiningDate[3]}`;

  if (head) {
    joiningDate = joining;
  }

  return (
    <>
      <div
        className={`hidden lg:grid text-sm sm:text-base items-center gap-4 p-3 ${
          head && "font-medium"
        }`}
        css={`
          grid-template-columns: 1fr 3fr 5fr 3fr 2fr 1fr;
          &:not(:last-child) {
            border-bottom: ${head ? "2px" : "1px"} solid #ddd;
          }
        `}
      >
        <div>{index}</div>
        <div>{name}</div>
        {head ? (
          <div>{email}</div>
        ) : (
          <a className="hover:underline text-blue-400" href={`mailto:${email}`}>
            {email}
          </a>
        )}
        <div>{joiningDate}</div>
        <div>{head ? totalSales : amount(totalSales)}</div>
        {head ? (
          <div>{deleteHead}</div>
        ) : (
          deleteOpt && (
            <div className="flex justify-content">
              <button
                onClick={handleDeleteEmployee}
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-red-100 text-red-500 cursor-pointer"
              >
                <MdDelete size={20} />
              </button>
            </div>
          )
        )}
      </div>
      <EmployeeItemMobile
        name={name}
        email={email}
        joining={joiningDate}
        index={index}
        totalSales={totalSales}
        deleteEmployee={handleDeleteEmployee}
        isLoading={isLoading}
        deleteOpt={deleteOpt}
      />
    </>
  );
}

function EmployeeItemMobile({
  name,
  email,
  joining,
  index,
  totalSales,
  deleteEmployee,
  isLoading,
  deleteOpt,
}) {
  return (
    <div
      className="grid lg:hidden shadow-lg rounded-md p-3 gap-3 mb-5 border border-solid border-gray-300"
      css={`
        grid-template-columns: repeat(2, 1fr);
      `}
    >
      <div>
        <p className="text-xs text-gray-500">Sr. no</p>
        <p className="font-medium">{index}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Name</p>
        <p className="font-medium">{name}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Total Sales</p>
        <p className="font-medium">{amount(totalSales)}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Joining</p>
        <p className="font-medium">{joining}</p>
      </div>
      <div className="col-span-full">
        <p className="text-xs text-gray-500">Email</p>
        <p className="font-medium">{email}</p>
      </div>
      {deleteOpt && (
        <MatButton
          className={"col-span-full bg-red-500"}
          onClick={deleteEmployee}
          isLoading={isLoading}
        >
          <p
            css={`
              line-height: 0;
            `}
          >
            Delete
          </p>
          <MdDelete size={16} />
        </MatButton>
      )}
    </div>
  );
}
