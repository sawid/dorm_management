import React, { Component } from "react";
import { Button } from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { Input } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { Card } from "antd";
const ManagementRoom = () => {
  const [minValue, setMinValues] = useState(0);
  const [maxValue, setMaxValues] = useState(12);

  const onChangeRadio = (e) => {
    console.log("radio checked:", e.target.value);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { TextArea } = Input;

  const onChange = (e) => {
    console.log("Change:", e.target.name);
  };

  const dataTest = [];
  for (let i = 1001; i < 1100; i++) {
    dataTest.push({
      key: i,
      roomName: `${i}`,
      status: "empty",
      contactLength: "3"
    });
  }

  return (
    <div>
      <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 pb-5">
                <div classname="row">
                  <div className="col-6">
                    <h1 className="m-0 text-dark">จัดการห้องพัก</h1>
                  </div>
                  <div className="col-6 clearfix"></div>
                </div>
              </div>
              <div className="col-sm-6 pb-5">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">รายงานผล</a>
                  </li>
                  <li className="breadcrumb-item active">ระบบจัดการหอพัก</li>
                </ol>
              </div>
              {/* /.col */}
            </div>

            <div className="row">
              <div className="col-6">
                <form>
                  <Radio.Group onChange={onChangeRadio} defaultValue="a">
                    <Radio.Button value="a"></Radio.Button>
                    <Radio.Button
                      icon={<AppstoreOutlined />}
                      value="b"
                    ></Radio.Button>
                  </Radio.Group>
                </form>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6 d-flex flex-row justify-content-end">
                    <Button type="primary" onClick={showModal}>
                      สร้างห้อง
                    </Button>
                  </div>
                  <div className="col-6">
                    <div class="input-group input-group-sm ">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="ค้นหาหมายเลขห้อง"
                      />
                      <span class="input-group-append">
                        <button type="button" class="btn btn-info btn-flat">
                          ค้นหา
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {dataTest &&
                dataTest.length > 0 &&
                dataTest.slice(minValue, maxValue).map((item, index) => (
                  <div className="col-lg-2 col-12 col-sm-12 mt-4">
                    <Card title={"ห้อง " + item.roomName} bordered={true} >
                      <p>สถานะห้อง : { item.status ? <b>ว่าง</b> : <b>ไม่ว่าง</b> }</p>
                      <p>Card content</p>
                      <p>Card content</p>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input showCount maxLength={20} onChange={onChange} name="text-box" />
      </Modal>
    </div>
  );
};

export default ManagementRoom;
