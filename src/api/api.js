import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { REACT_APP_API_URL: baseUrl } = process.env;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
      providesTags: ["Employees"],
    }),
    getEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: ["Employees"],
    }),
    getTotalSales: builder.query({
      query: () => "/analytics/total-sales",
      providesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({ url: `/employees/${id}`, method: "DELETE" }),
      invalidatesTags: ["Employees"],
    }),
    createEmployee: builder.mutation({
      query: (creds) => ({ url: "/employees", method: "POST", body: creds }),
      invalidatesTags: ["Employees"],
    }),
    login: builder.mutation({
      query: (creds) => ({ url: `/users/login`, method: "POST", body: creds }),
    }),
    signup: builder.mutation({
      query: (creds) => ({ url: `/users/signup`, method: "POST", body: creds }),
    }),
    getMe: builder.query({
      query: () => "/users/me",
    }),
  }),
});

export default api;

export const {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useGetEmployeesQuery,
  useLoginMutation,
  useGetTotalSalesQuery,
  useCreateEmployeeMutation,
  useSignupMutation,
  useGetMeQuery,
} = api;
