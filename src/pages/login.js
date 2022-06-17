import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useLoginMutation } from "../api/api";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import loginImage from "../assets/login.svg";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import { MatButton } from "../components";

const loginFields = [
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
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: {
      value: true,
      message: "This field is required",
    },
    minLength: {
      value: 7,
      message: "Password must at least be 7 characters",
    },
    maxLength: { value: 16, message: "Password must not exceed 16 characters" },
  },
];

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [login, { isLoading, error }] = useLoginMutation();

  const history = useHistory();

  const onLogin = (data) => {
    login(data).then((res) => {
      localStorage.setItem("token", res.data.token);
      history.replace("/analytics");
    });
  };

  const getReqError = (name) => {
    if (name === "email" && error) {
      return error.data?.message;
    }
  };

  return (
    <div className="w-full sm:w-[470px] mx-auto grid gap-6">
      <Avatar
        className="flex lg:hidden mx-auto"
        sx={{ m: 1, bgcolor: "secondary.main" }}
      >
        <IoMdLock size={17} />
      </Avatar>
      <p className="text-lg text-center lg:text-left sm:text-2xl font-medium">
        Sign in to Admin panel
      </p>
      <p className="text-blue-500 text-xs md:text-sm bg-blue-100 rounded-lg py-4 m-0 sm:mb-8 sm:mt-4 flex items-center justify-center gap-2">
        <RiErrorWarningLine />
        Use email :{" "}
        <span className="font-medium text-blue-700">demo@minimals.cc</span> /
        password : <span className="font-medium text-blue-700">demo1234</span>
      </p>
      <form className="grid gap-8" onSubmit={handleSubmit(onLogin)}>
        {loginFields.map((field) => (
          <TextField
            className="rounded-lg"
            key={field.name}
            fullWidth
            type={field.type}
            label={field.placeholder}
            variant="outlined"
            error={errors[field.name] || getReqError(field.name)}
            helperText={errors[field.name]?.message || getReqError(field.name)}
            {...register(field.name, {
              required: {
                ...field.required,
              },
              minLength: {
                ...field.minLength,
              },
              maxLength: {
                ...field.maxLength,
              },
              pattern: {
                ...field.regex,
              },
            })}
          />
        ))}
        <MatButton type="submit" isLoading={isLoading}>
          Login
        </MatButton>
      </form>
    </div>
  );
}

function LoginPage() {
  return (
    <div>
      <LoginNavbar />
      <div className="flex items-center justify-center py-4 px-2 sm:p-[0] sm:h-[100vh]">
        <div className="min-w-[50%] hidden lg:grid justify-center">
          <div className="p-10 rounded-xl shadow-md">
            <p className="text-3xl font-medium">Hi, Welcome back</p>
            <img className="w-[400px]" src={loginImage} alt="" />
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
}
export default LoginPage;

function LoginNavbar() {
  return (
    <nav className="h-16 sm:h-20 w-full flex items-center justify-left text-tertiary bg-primary px-3 md:px-32">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#ffffff20]">
        <MdAdminPanelSettings size={30} />
      </div>
      <p className="text-white text-base md:text-xl ml-2 sm:ml-3">
        Get Access to Admin Panel
      </p>
    </nav>
  );
}
