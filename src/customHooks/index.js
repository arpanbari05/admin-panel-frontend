import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useQueryClient } from "react-query";

const { REACT_APP_API_URL: baseUrl } = process.env;

export function useDefaultFilters() {
  return {
    sortBy: { value: "sales_low_to_high", label: "Sales low to high" },
    searchQuery: "",
    salesRange: {},
  };
}

export function useEmployees(filters = {}) {
  const getEmployees = async () => {
    const employees = await axios.get(`${baseUrl}/employees`);
    return employees;
  };

  const { sortBy, searchQuery, salesRange } = filters;

  const { data, isFetching, refetch } = useQuery("employees", getEmployees);

  let filteredEmployees = [];

  if (data) {
    const {
      data: { data: employees },
    } = data;

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

        if (salesRange.includes("<"))
          return totalSales < +salesRange.split("<")[1];

        if (salesRange.includes(">")) {
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
    topEmployees: filteredEmployees.slice(0, 4),
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

export function useAddEmployee(onSuccess = () => {}) {
  const queryClient = useQueryClient();

  const {
    mutate: createEmployee,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation(
    (body) => {
      return axios.post(`${baseUrl}/employees`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
        onSuccess();
      },
    }
  );

  return {
    createEmployee,
    isLoading,
    isError,
    isSuccess,
    error,
  };
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteEmployee,
    isLoading,
    isError,
    error,
  } = useMutation(
    (id) => {
      return axios.delete(`/employees/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
      },
    }
  );

  return {
    deleteEmployee,
    isLoading,
    isError,
    error,
  };
}

export function useGetTotalSales() {
  const { isFetching, data } = useQuery("total-sales", () => {
    return axios.get("/analytics/total-sales");
  });

  return {
    isFetching,
    totalSales: data?.data?.data?.sumOfSales,
  };
}

export function useMe() {
  const { data, isFetching } = useQuery("me", () => {
    return axios.get("/users/me");
  });

  return {
    data: data?.data,
    isFetching,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();

  const history = useHistory();

  const { mutate: login, isLoading, error } = useMutation(
    (body) => {
      return axios.post("/users/login", body);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("me");
        localStorage.setItem("token", data.data.token);
        history.replace("/");
      },
    }
  );

  return {
    login,
    isLoading,
    error
  };
}

export function useSignup() {
  const queryClient = useQueryClient();
  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation(
    (body) => {
      return axios.post("/users/sign-up", body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("me");
      },
    }
  );

  return {
    signup,
    isLoading,
    error,
  };
}
