import React, { Component } from "react";

export default class Registerpage extends Component {
  render() {
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
              <p class="login-box-msg">สมัครสมาชิก</p>
              <form action="../../index3.html" method="post">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ชื่อผู้ใช้"
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
                    class="form-control"
                    placeholder="รหัสผ่าน"
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
                    class="form-control"
                    placeholder="ยืนยันรหัสผ่าน"
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
                    <button type="submit" class="btn btn-primary btn-block">
                      สมัครสมาชิก
                    </button>
                  </div>
                </div>
              </form>
              <div class="social-auth-links text-center mt-2 mb-3"></div>

              <p class="mb-0">
                <a href="register.html" class="text-center">
                  เข้าสู่ระบบ
                </a>
              </p>
            </div>
          </div>
        </div>

        <script src="../../plugins/jquery/jquery.min.js"></script>

        <script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="../../dist/js/adminlte.min.js?v=3.2.0"></script>
      </body>
    );
  }
}
