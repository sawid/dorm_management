import React from "react";
import MainPage from "./components/main-page.component";
import Menu from "./components/sidebar.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import Dashboard from "./components/dashboard.component";
import Loginpage from "./components/login.component";
import Registerpage from "./components/register.component";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <div class="wrapper">
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" exact element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const WithNav = () => {
  return (
    <>
      <Header />
      <Menu />

      <Outlet />
    </>
  );
};

const WithoutNav = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
