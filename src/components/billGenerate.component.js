import React, { Component } from "react";
import { useContext, useState, useEffect, useRef, } from "react";
import { useSelector } from "react-redux";
import {
  DatePicker,
  Button,
  Card,
  Table,
  Input,
  Popconfirm,
  Form,
  InputRef,
  Typography ,InputNumber, Modal
} from "antd";
import { CaretRightFilled, CaretLeftFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { readBill, changeBillNet } from "./function.components/bill";
import EditableTable from "./editTable.components"

const Billgenerate = () => {
  let { id } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    rentalFee: "",
    electricUnitPrice: "",
    waterUnitPrice: "",
    rentalNet: "",
  });

  

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const separator = (numb) => {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  };

  const isPayedBadge = (props) => {
    if (props) {
      return (
        <h1 className="m-0 ms-3 text-dark">
          ห้อง {data.roomId}
          <span class="badge rounded-pill bg-success text-md">จ่ายแล้ว</span>
        </h1>
      );
    } else {
      return (
        <h1 className="m-0 ms-3 text-dark">
          ห้อง {data.roomId}
          <span class="badge rounded-pill bg-danger text-md">ยังไม่จ่าย</span>
        </h1>
      );
    }
  };

  const UnitPrice = (thisMonth, lastMonth) => {
    if (lastMonth > thisMonth) {
      return thisMonth - lastMonth + 9999;
    } else {
      return thisMonth - lastMonth;
    }
  };

  const handleonChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //table
  

 

  const loadData = (authtoken, values) => {
    readBill(authtoken, values)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData(user.token, id);
  }, []);
  console.log(data);

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
                    {isPayedBadge(data.isBillNotified)}
                    <p></p>
                    <DatePicker
                      className="ms-3"
                      onChange={onChange}
                      picker="month"
                    />
                  </div>

                  <div className="col-sm-6">
                    <p></p>
                    <a
                      className="btn btn-info btn-sm text-white ms-3"
                      href="#"
                      role="button"
                    >
                      ดูข้อมูล
                    </a>
                    <button
                      type="button"
                      className="btn  btn-sm btn-warning text-white"
                    >
                      สร้าง pdf
                    </button>
                  </div>
                  <p></p>
                </div>
              </div>

              <div className="col-sm-3 ">
                <div className="card">
                  <h4 className="m-0 ms-2 text-dark bg-white">
                    สถานะบิล{" "}
                    <small class="text-muted text ">
                      {" "}
                      {data.isBillNotified ? "แจ้งแล้ว" : "ยังไม่แจ้ง"}
                    </small>
                  </h4>

                  <h4 className="m-0 ms-2 text-dark bg-white">
                    สถานะห้อง
                    <small className="text-muted">
                      {" "}
                      {data.isPayed ? "จ่ายแล้ว" : "ยังไม่จ่าย"}
                    </small>
                  </h4>
                  <p></p>
                </div>
                <div>
                  <input
                    class="btn btn-outline-success btn-block text-sm"
                    type="submit"
                    value="แจ้งบิล"
                  ></input>
                  <p></p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="row">
                  <div className="col-sm-12">
                    <div class="input-group input-group-sm">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="ค้นหาหมายเลขห้อง"
                      />
                      <span class="input-group-append">
                        <button
                          type="button"
                          class="btn btn-info btn-flat text-white"
                        >
                          ค้นหา
                        </button>
                      </span>
                    </div>
                    <div className="col-sm-12">
                      <p></p>
                      <div className="row">
                        <div className="col-sm-6">
                          <Button
                            type="dashed"
                            block
                            icon={<CaretLeftFilled />}
                          >
                            ห้องก่อนหน้า{" "}
                          </Button>
                        </div>
                        <div className="col-sm-6">
                          <Button type="dashed" block>
                            ห้องถัดไป <CaretRightFilled />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <h1></h1>{" "}
              </div>
            </div>
            <div></div>
            <div className="row">
              <div className="col-sm-6">
                <Card
                  title="การคิดคำนวณค่าหอ"
                  extra={<a href="#">ดูข้อมูล</a>}
                  block
                >
                  <p>ค่าหอ = {separator(1 * data.rentalFee)} บาท</p>
                  <p>
                    ค่าไฟ ={" "}
                    {separator(
                      7 *
                        UnitPrice(
                          data.electricUnitThisMonth,
                          data.electricUnitLastMonth
                        )
                    )}{" "}
                    บาท
                  </p>
                  <p>
                    ค่าน้ำ ={" "}
                    {separator(
                      18 *
                        UnitPrice(
                          data.waterUnitThisMonth,
                          data.waterUnitLastMonth
                        )
                    )}{" "}
                    บาท
                  </p>
                  <p>ค่าส่วนกลาง = {separator(1 * data.rentalNet)} บาท</p>

                  <h1>
                    รวม{" "}
                    {separator(
                      data.rentalFee +
                        7 *
                          UnitPrice(
                            data.electricUnitThisMonth,
                            data.electricUnitLastMonth
                          ) +
                        18 *
                          UnitPrice(
                            data.waterUnitThisMonth,
                            data.waterUnitLastMonth
                          ) +
                        data.rentalNet
                    )}{" "}
                    บาท
                  </h1>
                </Card>
                <p></p>
              </div>

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
                                value={data.rentalFee}
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={18}
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={150}
                              ></input>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  
                </div>
                <div className="card">
                  <div className="card-header">ค่าหอโดยรวม</div>
                  <EditableTable />
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

export default Billgenerate;
 
