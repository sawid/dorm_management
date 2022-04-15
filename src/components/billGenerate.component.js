import React, { Component } from "react";
export default class Billgenerate extends Component {
  render() {
    return (
      <div>
        <div className="content-wrapper font-sarabun">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">การจัดการบิล</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">จัดการบิล</a>
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
          {/* /.content-header */} {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card">
                    <p></p>
                      <div className="col-sm-8">
                        <h1 className="m-0 ms-3 text-dark">
                          ห้อง 123456{" "}
                          <span class="badge rounded-pill bg-success text-md">
                            จ่ายแล้ว
                          </span>
                        </h1>
                      </div>
                    
                    
                    <div className="col-sm-6">
                      <a
                        className="btn btn-info btn-sm text-white ms-3"
                        href="#"
                        role="button"
                      >
                        ดูข้อมูล
                      </a>
                      <button type="button" className="btn  btn-sm btn-warning text-white">
                    สร้าง pdf
                  </button>
                    </div>
                    <p></p>
                  </div>
                </div>
               
                <div className="col-sm-3 ">
                  <div className="card">
                    <h4 className="m-0 ms-2 text-dark bg-white">
                      สถานะบิล <small class="text-muted text "> แจ้งแล้ว</small>
                    </h4>
                    
                    <h4 className="m-0 ms-2 text-dark bg-white">
                      สถานะห้อง
                      <small className="text-muted"> จ่ายแล้ว</small>
                    </h4>
                  </div>
                  <div>
                    <input
                      class="btn btn-outline-success btn-block text-sm"
                      type="submit"
                      value="แจ้งบิล"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">{/* /calender*/}</div>
                <div className="col-sm-3"></div>
                <div className="col-sm-2">
               
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6"></div>
                <div className="col-sm-3">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="ค้นหาหมายเลขห้อง"/>
                      <span class="input-group-append">
                      <button type="button" class="btn btn-info btn-flat text-white">ค้นหา</button>
                  </span>
              </div>                
                </div>
               
              </div>
              <div ></div>
              <div className="row">
              <div className="col-sm-6">
              <div className="card">

                <div className="card-header">ค่าหอพื้นฐาน</div>
              <div className="row">
                <div className="col-sm-12">
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

              <div className="row">
                <div className="col-sm-6">
                  <input
                    class="btn btn-sm btn-success ms-2 text-sm"
                    type="submit"
                    value="บันทึก"
                  ></input>
                  <p className="lead ms-2 text-sm">กดเพื่อยืนยันการเปลี่ยนแปลง</p>
                </div>
              </div>

              </div>
              </div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                  {" "}
                  <p></p>
                </div>
              </div>
              <div className="col-sm-6">
              <div className="card">
                <div className="card-header">ค่าหอโดยรวม</div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ค่าห้อง</th>
                        <th scope="col">ค่าไฟรวม</th>
                        <th scope="col">ค่าน้ำรวม</th>
                        <th scope="col">ค่าส่วนกลาง</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          {" "}
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            value="5,000 บาท"
                          ></input>
                        </th>
                        <th scope="row">
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            value="1,050 บาท"
                          ></input>
                        </th>
                        <th scope="row">
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            value="54 บาท"
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
              <div className="row">
                <div className="col-sm-3">
                  <h2 className="m-0 ms-1 text-dark ">
                    รวม <small class="text-muted text "> 6,000 บาท</small>
                  </h2>
                </div>
                <div className="col-sm-2"> </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
      </div>
    );
  }
}
