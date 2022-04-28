import React, { useState } from "react";

import { login } from "./function.components/auth";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

const Loginpage = ({ history }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate('/');
    }
    else {
      navigate('/');
    }
  };

  console.log(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value); 

    login(value)
      .then((res) => {
        console.log(res.data);
        toast.success('เข้าสู่ระบบสำเร็จ !', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        dispatch({
          type:'LOGIN',
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          }
        });
        localStorage.setItem('token', res.data.token);
        roleBaseRedirect(res.data.payload.user.role)
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error('ไม่สามารถเข้าสู่ระบบได้', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
  };

  return (
    <body class="hold-transition login-page font-sarabun">

      <div class="login-box">
        <div class="card card-outline card-light">
          <div class="card-header text-center">
            <a href="" class="h1">
              <b>dorm</b>System
            </a>
          </div>
          <div class="card-body">
            <p class="login-box-msg">ลงชื่อเข้าใช้</p>
            <form onSubmit={handleSubmit}>
              <div class="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  class="form-control"
                  placeholder="ชื่อผู้ใช้"
                  onChange={handleChange}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="รหัสผ่าน"
                  onChange={handleChange}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-7"></div>

                <div class="col-5">
                  <button type="submit" class="btn btn-light btn-block">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </div>
            </form>
            <div class="social-auth-links text-center mt-2 mb-3"></div>

            <p class="mb-1">
              <Link to="/register">สมัครสมาชิก</Link>
            </p>
            
          </div>
        </div>
      </div>

      <script src="../../plugins/jquery/jquery.min.js"></script>

      <script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

      <script src="../../dist/js/adminlte.min.js?v=3.2.0"></script>
    </body>
  );
};

export default Loginpage;
