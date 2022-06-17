import { TextField } from "@mui/material";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { useCreateEmployeeMutation } from "../api/api";
import "styled-components/macro";
import { Link } from "react-router-dom";
import { MatButton, Toast } from ".";
import { useToggle } from "../customHooks";
import { IoIosArrowRoundForward } from "react-icons/io";

const AddEmployeeFields = [
  {
    name: "name",
    type: "text",
    required: {
      value: true,
      message: "This field is required",
    },
    placeholder: "Enter employee name",
    className: "",
  },
  {
    name: "totalSales",
    type: "number",
    required: {
      value: true,
      message: "This field is required",
    },
    placeholder: "Enter employee total sales in (₹)",
    className: "",
  },
  {
    name: "email",
    type: "email",
    required: {
      value: true,
      message: "This field is required",
    },
    regex: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Invalid email address",
    },
    placeholder: "Email address",
    maxLength: { value: 64, message: "Email should not exceed 64 characters" },
    class: "col-span-full",
  },
];

function AddEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createEmployee, { isLoading, isSuccess, isError, error }] =
    useCreateEmployeeMutation();

  const toast = useToggle();

  const onSubmit = (data) => {
    createEmployee({ ...data }).then(() => {
      toast.handleOpen();
    });
  };

  const status = isSuccess ? "success" : isError ? "error" : "info";

  const statusMessage =
    status === "success"
      ? "Employee created successfully"
      : error?.data?.message;

  return (
    <div className="grid p-6 gap-8">
      <Link
        to="/employees"
        className="w-max flex items-center gap-1 text-blue-600 hover:underline"
      >
        <span>View all employees</span>
        <IoIosArrowRoundForward size={25} />
      </Link>
      <form
        className="grid justify-center items-start gap-8 w-full sm:w-[600px]"
        css={`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
        `}
        onSubmit={handleSubmit(onSubmit)}
      >
        {AddEmployeeFields.map((field) => {
          return (
            <TextField
              key={field.name}
              placeholder={field.placeholder}
              type={field.type}
              label={field.placeholder}
              className={`${field.class}`}
              error={errors[field.name]}
              helperText={errors[field.name]?.message}
              {...register(field.name, {
                required: {
                  ...field.required,
                },
                pattern: {
                  ...field.regex,
                },
              })}
            />
          );
        })}
        <MatButton className="h-full" type="submit" isLoading={isLoading}>
          Add Employee
        </MatButton>
      </form>
      <Toast
        message={statusMessage}
        open={toast.show}
        handleClose={toast.handleClose}
        status={status}
      />
    </div>
  );
}

export default memo(AddEmployee);
