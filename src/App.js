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
import Billgenerate from "./components/billGenerate.component";
import Manageuser from "./components/manageuser.component";
import Billmanage from "./components/billManage.component";
import ManagementRoom from "./components/management-room.component";
import Editprofile from "./components/editpro.component";
import Managemeter from "./components/managemeter.component";
import Printbill from "./components/printbill.component";
import Printagreement  from "./components/printagreement.component";
import ManageRenter from "./components/renter.component";
import ManagementRenter from "./components/managerenter.component";


import HomeUser from "./components/user/Home";
import HomeAdmin from "./components/admin/Home";

import { currentUser } from "./components/function.components/auth";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Route,
  Routes,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Row } from "react-bootstrap";
import RoomDetail from "./components/roomdetail.component";

function App() {
  const dispatch = useDispatch();
  
  const [ userData, setUserData ] = useState()
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
    .then(res => {
      console.log(res.data);
      setUserData(res.data.username)
      dispatch({
        type:'LOGIN',
        payload: {
          token: idtoken,
          username: res.data.username,
          role: res.data.role,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          telnum: res.data.telnumber,
          email: res.data.Email,
          cellnum: res.data.cellnumber,
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div class="wrapper">
        <ToastContainer closeButton={false}/>
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
          <Route element={<WithNav username={userData}/>}>
            <Route path="/" exact element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
            } />
             <Route path="/billgenerate/:id" element={
            <AdminRoute>
              <Billgenerate />
            </AdminRoute>
            } />
            <Route path="/billmanage" exact element={
            <UserRoute>
              <Billmanage />
            </UserRoute>
            } />
            <Route path="/manage-user" element={
              <AdminRoute>
                <Manageuser />
              </AdminRoute>
            } />
            <Route path="/renter" element={
            <AdminRoute>
              <ManageRenter />
            </AdminRoute>
            } /> 
            <Route path="/management-room" element={
            <AdminRoute>
              <ManagementRoom />
            </AdminRoute>
            } /> 
            <Route path="/roomdetail/:id" element={
            <AdminRoute>
              <RoomDetail />
            </AdminRoute>
            } /> 
            <Route path="/editprofile" element={
              <UserRoute>
                <Editprofile />
              </UserRoute>
            } />
            <Route path="/managemeter" element={
              <UserRoute>
                <Managemeter />
              </UserRoute>
            } />
            <Route path="/printbill/:id" element={
            <UserRoute>
              <Printbill />
            </UserRoute>
          } />
          <Route path="/printagreement/:id" element={
            <UserRoute>
              <Printagreement />
            </UserRoute>
          } />
          <Route path="/manage-renter" element={
              <UserRoute>
                <ManagementRenter />
              </UserRoute>
            } />
          </Route>
        </Routes>
    </div>
  );
}

const WithNav = (props) => {
  return (
    <>
      <Header />
      <Menu username={props.username} />

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
