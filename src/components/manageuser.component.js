import React from "react";

const Manageuser = () => {
  return (
    <div>
      <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">จัดการผู้ใช้</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">จัดการผู้ใช้</a>
                  </li>
                  <li className="breadcrumb-item active">ระบบจัดการหอพัก</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 class="card-title">รายชื่อผู้ใช้ในระบบ</h3>
                  </div>
                  <div className="card-body">
                    <div class="card-body p-0">
                    <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ค่าห้อง</th>
                        <th scope="col">ค่าไฟต่อหน่วย</th>
                        <th scope="col">ค่าน้ำต่อหน่วย</th>
                        <th scope="col">ค่าส่วนกลาง</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          {" "}
                          <input
                            class="form-control form-control-sm "
                            type="text"
                            value="5,000 บาท"
                          ></input>
                        </th>
                        <th scope="row">
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            value="7 บาทต่อหน่วย"
                          ></input>
                        </th>
                        <th scope="row">
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            value="18 บาทต่อหน่วย"
                          ></input>
                        </th>
                        <th scope="row">
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            value="150 บาท"
                          ></input>
                        </th>
                      </tr>
                    </tbody>
                  </table>      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Manageuser;
