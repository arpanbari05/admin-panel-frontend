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

function App() {
  const navbar = useToggle(false);

  console.log({ navbar });

  return (
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
  );
}

export default App;
