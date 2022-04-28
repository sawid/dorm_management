import React, { useState } from "react";
import { Link } from "react-router-dom";

import { register } from './function.components/auth'
import { toast, ToastContainer } from "react-toastify";

const Registerpage = () => {

  const [value, setValue] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setValue({...value, 
      [e.target.name]:e.target.value,
    });
  };

  console.log(value);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
    if(value.password !== value.passwordConfirm) {
      alert("password not match")
    }
    else {
      register(value)
      .then(res => {
        console.log(res.data)
        toast.success('สมัครสมาชิกสำเร็จ !', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } ).catch(err => {
        console.log(err.response.data)
        toast.error('ไม่สามารถสมัครสมาชิก', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
    }
  }



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
            <p class="login-box-msg">สมัครสมาชิก</p>
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
              <div class="input-group mb-3">
                <input
                  type="password"
                  name="passwordConfirm"
                  class="form-control"
                  placeholder="ยืนยันรหัสผ่าน"
                  onChange={handleChange}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6"></div>

                <div class="col-6">
                  <button disabled={value.password.length < 6} type="submit" class="btn btn-light btn-block">
                    สมัครสมาชิก
                  </button>
                </div>
              </div>
            </form>
            <div class="social-auth-links text-center mt-2 mb-3"></div>

            <p class="mb-0">
              <Link to="/login">เข้าสู่ระบบ</Link>
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

export default Registerpage;
