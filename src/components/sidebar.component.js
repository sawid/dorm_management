import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import mainLogo from "./dorm.png";
 

const Menu = (props) => {
  const { user } = useSelector((state) => ({...state}))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ data, setData ] = useState([]);
  

  const logout = () => {
    dispatch({
      type:'LOGOUT',
      payload: null,
    });
    toast.success('ออกจากสู่ระบบสำเร็จ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    navigate('/login');

  }


  console.log(user)
  // console.log(user.id)
  // console.log(user.role)
  console.log("user.username")
  
  

  

  return (
    <div>
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}
        <p className="brand-link">
          <img
            src={mainLogo}
            alt =  ""
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          ></img>
          <span className="brand-text font-weight-light font-sarabun text-dark">
            ระบบจัดการหอพัก
          </span>
        </p>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel pb-3 mb-3 d-flex">
            <div className="image">
              
            </div>
            <div className="info font-sarabun text-dark"><b>ชื่อผู้ใช้ </b>{ props.username }</div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2 font-sarabun">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}

              <li className="nav-header">ระบบจัดการทั่วไป</li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="nav-icon fa fa-solid fa-chart-line" />
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/">
                      รายงานผล
                    </Link>
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                <i class="nav-icon fa fa-solid fa-users"/>
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/manage-user">
                      จัดการผู้ใช้
                    </Link>
                    </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                <i class="nav-icon fa fa-solid fa-users"/>
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/manage-renter">
                      จัดการผู้เช่า
                    </Link>
                    </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="nav-icon fa fa-solid fa-bed" />
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/management-room">
                      จัดการห้องพัก
                    </Link>
                    </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="nav-icon fa fa-solid fa-bolt" />
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/managemeter">
                      จัดการมิเตอร์
                    </Link>
                    </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="nav-icon fa fa-solid fa-file-invoice-dollar" />
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/billmanage">
                      จัดการบิล
                    </Link>
                    </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                <i className="nav-icon fa fa-solid fa-user" />
                  <p>
                    {/* <Link style={{ textDecoration: "none" }} to={""}>
                      จัดการโปรไฟล์
                    </Link> */}
                    </p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="nav-icon fa fa-solid fa-door-open" />
                  <p onClick={logout}>
                    
                      ออกจากระบบ
                    
                    </p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Menu;
