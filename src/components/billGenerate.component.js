import React, { Component } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DatePicker, Button, Card, Alert } from "antd";
import { CaretRightFilled, CaretLeftFilled } from "@ant-design/icons";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  listBill,
  readBill,
  resetVaule,
  readMonth,
  changePayStatus,
  changeNotiStatus,
  sentNotificate,
  getRoomName
} from "./function.components/bill";

const Billgenerate = () => {
  let { id } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [ dataRoomName , setdataRoomName] = useState([]);
  const [values, setValues] = useState({
    rentalFee: "",
    waterUnitLastMonth: "",
    waterUnitThisMonth: "",
    electricUnitLastMonth: "",
    electricUnitThisMonth: "",
    rentalNet: "",
  });
  const [selectMonthData, setSelectMonthData] = useState({
    month: data.month,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  
  const separator = (numb) => {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  };

  const isPayedButton = (props) => {
    if (props) {
      return (
        <input
          class="btn btn-outline-danger btn-block text-sm"
          type="button"
          onClick={() => handleonChangePay(data)}
          value="ยังไม่ได้จ่ายเงิน"
        ></input>
      );
    } else {
      return (
        <input
          class="btn btn-outline-success btn-block text-sm"
          type="button"
          onClick={() => handleonChangePay(data)}
          value="จ่ายเรียบร้อยแล้ว"
        ></input>
      );
    }
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

  const sentNotification = () => {
    const messageNoti = {
      roomId: data.roomId,
      messageData: "แจ้งยอดบิลเดือน " + data.month + " จำนวน " + (separator(data.rentalFee +
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
)) + " บาท",
    };
    console.log(messageNoti)
    if (!data.isBillNotified){
    handleonChangeNoti(data)}
    sentNotificate(user.token, messageNoti);
  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const preventMinus = (e) => {
    if (
      e.code === "Minus" ||
      e.code === "NumpadSubtract" ||
      e.code === "KeyE" 
    ) {
      e.preventDefault();
    }
  };

  
  const preventRoomSearchBug = (e) => {
    if (
      e.code === "Period" ||
      e.code === "NumpadDecimal" ||
      e.code === "Minus" ||
      e.code === "NumpadSubtract" ||
      e.code === "KeyE" 
    ) {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const UnitPrice = (thisMonth, lastMonth) => {
    if (lastMonth > thisMonth) {
      return thisMonth - lastMonth + 9999;
    } else {
      return thisMonth - lastMonth;
    }
  };

  //search

  const [stateData, setState] = useState({
    input: "",
  });

  const handleChange = (e) => {
    setState({ input: e.target.value });
  };

  const handleClick = () => {
    const searchbill = allData.find(
      (x) => Number(x.roomId) === Number(stateData.input)
    );
    if (typeof searchbill !== "undefined") {
      navigate("/Billgenerate/" + searchbill._id);
      window.location.reload();
    } else {
      console.log("not exists");
      alert("Room not exist!");
    }
  };

  //change Fee
  const handleOk = () => {
    setIsModalVisible(false);
    resetVaule(user.token, values.id, { dataBill })
      .then((res) => {
        console.log(res);
        loadData(user.token, id);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (id) => {
    setIsModalVisible(true);
    setValues({ ...values, id: id });
  };

  const handleonChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //input
  const [dataBill, setdataBill] = useState({
    rentalFee: data.rentalFee,
    waterUnitLastMonth: data.waterUnitLastMonth,
    waterUnitThisMonth: data.waterUnitThisMonth,
    electricUnitLastMonth: data.electricUnitLastMonth,
    electricUnitThisMonth: data.electricUnitThisMonth,
    rentalNet: data.rentalNet,
  });

  const handleonChangeValue = (e) => {
    setdataBill({ ...dataBill, [e.target.name]: e.target.value });
  };
  function prevBill() {
    const prevbill = allData.find(
      (x) => Number(x.roomId) === Number(data.roomId) - 1
    );
    if (typeof prevbill !== "undefined") {
      navigate("/Billgenerate/" + prevbill._id);
      window.location.reload();
    } else console.log("not exists");
  }
  function nextBill() {
    const nextbill = allData.find(
      (x) => Number(x.roomId) === Number(data.roomId) + 1
    );
    if (typeof nextbill !== "undefined") {
      navigate("/Billgenerate/" + nextbill._id);
      window.location.reload();
    } else console.log("not exists");
  }

  const handleOnclick = () => {
    loadDataMonthId(user.token, data.roomId, selectMonthData);
    readMonth(user.token, id, values)
      .then((res) => {
        var selectMonth = res.data._id;
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [payData, setPayData] = useState({
    isPayed: data.isPayed,
  });

  const handleonChangePay = (data) => {
    const value = {
      id: data._id,
      isPayed: !data.isPayed,
    };
    changePayStatus(user.token, id, value)
      .then((res) => {
        console.log(res);
        loadData(user.token, id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleonChangeNoti = (data) => {
    const value = {
      id: data._id,
      isBillNotified: !data.isBillNotified,
    };
    changeNotiStatus(user.token, id, value)
      .then((res) => {
        console.log(res);
        loadData(user.token, id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeDate = (date) => {
    console.log(date, date.format("MMM"));
    setSelectMonthData({ ...selectMonthData, month: date.format("MMM") });
    loadDataMonthId(user.token, data.roomId, selectMonthData);
  };

  const loadData = (authtoken, values) => {
    readBill(authtoken, values)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadDataMonthId = (authtoken, id, values) => {
    readMonth(authtoken, id, values)
      .then((res) => {
        var selectMonth = res.data._id;
        navigate("/Billgenerate/" + selectMonth);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadDataRoomName = (authtoken, values) => {
    getRoomName(authtoken, values)
        .then(res => {
            setdataRoomName(res.data)

        })
        .catch(err => {
            console.log(err);
        })
};


  const loadAllData = (authtoken) => {
    listBill(authtoken)
      .then((res) => {
        setAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData(user.token, id);
    loadAllData(user.token);
  }, []);
  console.log(data);
  console.log(data.isPayed);
  return (
    <div>
      <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">การจัดการบิล</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">ห้อง {data.roomId}</li>
                  <li className="breadcrumb-item">
                    <Link to="/billmanage">ระบบจัดการหอพัก</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/">ระบบจัดการหอพัก</Link>
                  </li>
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
                    {isPayedBadge(data.isPayed)}
                    <p></p>
                    <DatePicker
                      format={"MMM YYYY"}
                      className="ms-3"
                      picker="month"
                      placeholder={data.month}
                      onChange={onChangeDate}
                    />
                    <button
                      type="click"
                      className="btn btn-outline-success btn-sm text-sm ms-3 "
                      onClick={() => handleOnclick()}
                    >
                      ยืนยัน
                    </button>
                  </div>

                  <div className="col-sm-6">
                    <p></p>
                    {/*<button
                      className="btn btn-info btn-sm text-white ms-3"
                      onClick={() => navigate("/roomdetail/" + data._id)}
                      role="button"
                    >
                      ดูข้อมูล
                    </button> */}
                    <div className="btn-group ms-3">
                    <button
                      type="button"
                      className="btn btn-warning text-white"
                      onClick={() => navigate("/printbill/" + data._id)}
                    >
                      สร้าง pdf
                    </button>
                    <button
                      type="button"
                      className="btn btn-info text-white"
                      onClick={() => navigate("/roomdetail/" + data.roomIdDataBase)}
                    >
                      ดูข้อมูลห้อง
                    </button>
                    </div>
                    
                   
                    
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
                    class="btn btn-outline-info btn-block text-sm"
                    type="submit"
                    value="แจ้งบิล"
                    onClick={() => sentNotification(data)}
                  ></input>
                  <p></p>
                </div>
                <div>
                  {isPayedButton(data.isPayed)}
                  <p></p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="row">
                  <div className="col-sm-12">
                    <div class="input-group input-group-sm">
                      <input
                        type="number"
                        onChange={handleChange}
                        min = '0'
                        maxLength="16"
                        onInput={maxLengthCheck}
                        onKeyPress={preventRoomSearchBug}
                        onPaste={preventPasteNegative}
                        class="form-control"
                        placeholder="ค้นหาหมายเลขห้อง"
                      />
                      <span class="input-group-append">
                        <button
                          type="button"
                          onClick={handleClick}
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
                            onClick={prevBill}
                          >
                            ห้องก่อนหน้า{" "}
                          </Button>
                        </div>
                        <div className="col-sm-6">
                          <Button type="dashed" block onClick={nextBill}>
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
                <Card title="การคิดคำนวณค่าหอ" block>
                  <p>ค่าหอ = {separator(1 * data.rentalFee)} บาท</p>
                  <p>
                    ค่าไฟ = {data.electricUnitThisMonth}
                    {"-"}
                    {data.electricUnitLastMonth} {"= "}
                    {UnitPrice(
                      data.electricUnitThisMonth,
                      data.electricUnitLastMonth
                    )}
                    {" หน่วย "}
                    {" = "}
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
                    ค่าน้ำ = {data.waterUnitThisMonth}
                    {"-"}
                    {data.waterUnitLastMonth} {"= "}
                    {UnitPrice(
                      data.waterUnitThisMonth,
                      data.waterUnitLastMonth
                    )}
                    {" หน่วย "}
                    {" = "}
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
                                disabled
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={7}
                                disabled
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={18}
                                disabled
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={150}
                                disabled
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
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ค่าห้อง</th>
                            <th scope="col">หน่วยค่าไฟ/ค่าไฟรวม</th>
                            <th scope="col">หน่วยค่าน้ำ/ค่าน้ำรวม</th>
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
                                value={data.rentalFee}
                                disabled
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={UnitPrice(
                                  data.electricUnitThisMonth,
                                  data.electricUnitLastMonth
                                )}
                                disabled
                              ></input>
                              <p></p>
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={
                                  7 *
                                  UnitPrice(
                                    data.electricUnitThisMonth,
                                    data.electricUnitLastMonth
                                  )
                                }
                                disabled
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={UnitPrice(
                                  data.waterUnitThisMonth,
                                  data.waterUnitLastMonth
                                )}
                                disabled
                              ></input>
                              <p></p>
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={
                                  18 *
                                  UnitPrice(
                                    data.waterUnitThisMonth,
                                    data.waterUnitLastMonth
                                  )
                                }
                                disabled
                              ></input>
                            </th>
                            <th scope="row">
                              <input
                                class="form-control form-control-sm"
                                type="text"
                                value={data.rentalNet}
                                disabled
                              ></input>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <button
                          type="button  "
                          className="btn btn-success btn-sm btn-block text-md ms-3 mb-3 mt-2"
                          onClick={() => showModal(data._id)}
                        >
                          แก้ไขข้อมูล
                        </button>
                      </div>
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
      <Modal
        className="font-sarabun"
        show={isModalVisible}
        onHide={handleCancel}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>แก้ไขรายละเอียด</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                {" "}
                ค่าห้อง ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
              </span>
            </div>
            <input
              name="rentalFee"
              type="number"
              class="form-control"
              placeholder="กรอกค่าห้อง"
              maxLength="5"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              onChange={handleonChangeValue}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                มิเตอร์ค่าไฟเดือนที่แล้ว{" "}
              </span>
            </div>
            <input
              name="electricUnitLastMonth"
              onChange={handleonChangeValue}
              type="number"
              class="form-control"
              placeholder="กรอกค่ามิเตอร์ไฟฟ้าเดือนที่แล้ว"
              maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                มิเตอร์ค่าไฟเดือนนี้⠀⠀⠀
              </span>
            </div>
            <input
              name="electricUnitThisMonth"
              onChange={handleonChangeValue}
              type="number"
              class="form-control"
              placeholder="กรอกค่ามิเตอร์ไฟฟ้าเดือนนี้"
              maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                มิเตอร์ค่าน้ำเดือนที่แล้ว⠀
              </span>
            </div>
            <input
              name="waterUnitLastMonth"
              onChange={handleonChangeValue}
              type="number"
              class="form-control"
              placeholder="กรอกค่ามิเตอร์น้ำเดือนที่แล้ว"
              maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                มิเตอร์ค่าน้ำเดือนนี้⠀⠀⠀
              </span>
            </div>
            <input
              name="waterUnitThisMonth"
              onChange={handleonChangeValue}
              type="number"
              class="form-control"
              placeholder="กรอกค่ามิเตอร์น้ำเดือนนี้"
              maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                ค่าส่วนกลาง⠀⠀⠀⠀⠀⠀⠀
              </span>
            </div>
            <input
              name="rentalNet"
              type="number"
              onChange={handleonChangeValue}
              class="form-control"
              placeholder="กรอกค่าส่วนกลาง"
              maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOk}>
            ตกลง
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Billgenerate;
