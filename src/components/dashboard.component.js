import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createAnnoucement, listAnnoucement, numberDashboardTop } from "./function.components/dashboard";
import moment from "moment/min/moment-with-locales";
import { Modal, Button } from "react-bootstrap";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [dataAnnoucement, setDataAnnoucement] = useState([]);
  const [dataStatsTopBar, setDataStatsTopBar] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [ dataAnnoucementInput, setdataAnnoucementInput ] = useState({
    text: "",
  });

  const handleonChangeAnnoucement = (e) => {
    setdataAnnoucementInput({...dataAnnoucementInput, [e.target.name]:e.target.value });   
  }

  const handleonCreate = () => {
    setShow(false);
    createAnnoucement(user.token, dataAnnoucementInput)
    .then(res => {
          console.log(res)
          loadDataAnnoucement(user.token);
    })
    .catch(err => {
          console.log(err)
    })
    // console.log(dataRoom.roomName)
}

console.log(dataAnnoucementInput)

  useEffect(() => {
    loadDataAnnoucement(user.token);
    loadDataDashboardTop(user.token);
  }, []);

  const loadDataAnnoucement = (authtoken) => {
    listAnnoucement(authtoken)
      .then((res) => {
        setDataAnnoucement(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadDataDashboardTop = (authtoken) => {
    numberDashboardTop(authtoken)
      .then((res) => {
        setDataStatsTopBar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">รายงานผล</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">รายงานผล</a>
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
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-light">
                  {/* small box */}
                  <div className="inner">
                    <h3>{ dataStatsTopBar.numberRenter }</h3>
                    <p>จำนวนผู้เช่า</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-stalker" />
                  </div>
                  <a className="small-box-footer">
                    ข้อมูลเพิ่มเติม <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-light">
                  <div className="inner">
                    <h3>
                    { dataStatsTopBar.numberTotal }<sup style={{ fontSize: 20 }}>฿</sup>
                    </h3>
                    <p>จำนวนยอดเงิน</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-social-bitcoin" />
                  </div>
                  <a href="#" className="small-box-footer">
                    ข้อมูลเพิ่มเติม <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-light">
                  <div className="inner">
                    <h3>{ dataStatsTopBar.numberProblem }</h3>
                    <p>ปัญหาที่ได้รับรายงาน</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-alert-circled" />
                  </div>
                  <a href="#" className="small-box-footer">
                    ข้อมูลเพิ่มเติม <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-light">
                  <div className="inner">
                    <h3>{ dataStatsTopBar.numberNotPay }</h3>
                    <p>จำนวนผู้ค้างชำระ</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-ios-stopwatch" />
                  </div>
                  <a href="#" className="small-box-footer">
                    ข้อมูลเพิ่มเติม <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h4>ประกาศถึงผู้เข้าพัก</h4>
                    
                    <div className="card mt-3">
                      <div className="card-body p-0">
                        <table className="table table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th width="35%" scope="col">
                                วันที่
                              </th>
                              <th scope="col">ข้อความประกาศ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataAnnoucement.map((item, index) => (
                              <tr>
                                <th scope="row">
                                  <p>
                                    {moment(item.createdAt)
                                      .locale("th")
                                      .format("LLL")}
                                  </p>
                                </th>
                                <th scope="row">
                                  <p>{item.annoucementText}</p>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button type="button" class="btn btn-outline-success m-2" onClick={handleShow}>
                สร้างประกาศ
              </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      <Modal className="font-sarabun" show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>ประกาศถึงผู้เช่า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">ข้อความประกาศ</span>
          </div>
          <input name="text" onChange={handleonChangeAnnoucement} type="text" class="form-control" placeholder="กรอกข้อความประกาศ" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleonCreate}>
            ยืนยันการสร้าง
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
