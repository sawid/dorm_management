import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import MainPage from "./components/main-page.component";
import Menu from "./components/sidebar.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import Dashboard from "./components/dashboard.component";
import Loginpage from "./components/login.component";
import Registerpage from "./components/register.component";
import Manageuser from "./components/manageuser.component";

import HomeUser from "./components/user/Home";
import HomeAdmin from "./components/admin/Home";

import { currentUser } from "./components/function.components/auth";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Route,
  Routes,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  

  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
    .then(res => {
      console.log(res.data);
      dispatch({
        type:'LOGIN',
        payload: {
          token: idtoken,
          username: res.data.username,
          role: res.data.role,
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div class="wrapper">
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/admin/index" element={
              <AdminRoute>
                <HomeAdmin />
              </AdminRoute>
            } />
            
            <Route path="/user/index" element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
            } />

          </Route>
          <Route element={<WithNav />}>
            <Route path="/" exact element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
            } />
            <Route path="/manage-user" element={
              <AdminRoute>
                <Manageuser />
              </AdminRoute>
            } />
          </Route>
        </Routes>
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
