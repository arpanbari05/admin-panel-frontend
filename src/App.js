import Navbar from "./components/navbar";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import "styled-components/macro";
import Analytics from "./components/analytics";
import { Route } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./components/employees";
import AddEmployee from "./components/addEmployee";
import Header from "./components/header";
import { useToggle } from "./customHooks";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  
  if (localStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }

  const navbar = useToggle(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          {/* Page routes */}
          <Route exact path={"/"}>
            <Redirect to={"/analytics"} />
          </Route>
          <Route path={"/login"}>
            <Login />
          </Route>

          <div
            className="block lg:grid"
            css={`
              grid-template-columns: 1fr 4fr;
            `}
          >
            <Navbar open={navbar.show} handleClose={navbar.handleClose} />
            {/* components route */}
            <div>
              <Header handleOpenNav={navbar.handleOpen} />
              <Route path={"/analytics"} component={Analytics} />
              <Route path={"/employees"} component={Employees} />
              <Route path={"/add-employee"} component={AddEmployee} />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
