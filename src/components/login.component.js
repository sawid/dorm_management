import React, { useState } from "react";

import { login } from "./function.components/auth";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

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
      navigate('/admin/index');
    }
    else {
      navigate('/user/index');
    }
  };

  console.log(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value); 

    login(value)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
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
        alert(err.response.data);
      });
  };

  return (
    <body class="hold-transition login-page font-sarabun">
      <div class="login-box">
        <div class="card card-outline card-primary">
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
                <div class="col-8"></div>

                <div class="col-4">
                  <button type="submit" class="btn btn-primary btn-block">
                    ล็อกอิน
                  </button>
                </div>
              </div>
            </form>
            <div class="social-auth-links text-center mt-2 mb-3"></div>

            <p class="mb-1">
              <a href="forgot-password.html">ลืมรหัสผ่าน</a>
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
