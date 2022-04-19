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
<<<<<<< HEAD
import Billmanage from "./components/billManage.component";
=======
import ManagementRoom from "./components/management-room.component";
import Editprofile from "./components/editpro.component";
import Managemeter from "./components/managemeter.component";
>>>>>>> d3afc8497d220d3fd10ffc8a80032e1fb00b4d3d

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
            <Route path="/management-room" exact element={
            <UserRoute>
              <ManagementRoom />
            </UserRoute>
            } /> 
            <Route path="/roomdetail" exact element={
            <UserRoute>
              <RoomDetail />
            </UserRoute>
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
