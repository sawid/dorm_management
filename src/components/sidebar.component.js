import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "bootstrap";

const Menu = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type:'LOGOUT',
      payload: null,
    });
    navigate('/login');

  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <p className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light font-sarabun text-light">
            ระบบจัดการหอพัก
          </span>
        </p>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info font-sarabun text-light">พาสา ไทย</div>
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
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>
                    <Link style={{ textDecoration: "none" }} to="/">
                      รายงานผล
                    </Link>
                    <span className="badge badge-info right">2</span>
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/gallery.html" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>จัดการห้องพัก</p>
                </a>
              </li>
              <li className="nav-item">
                <button type="button" class="btn btn-block btn-primary" onClick={logout}>ออกจากระบบ</button>
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
