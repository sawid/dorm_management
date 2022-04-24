import React, { Component } from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { DatePicker, Space } from 'antd';
import { Table, Tag} from 'antd';

import { listRoom } from "./function.components/room";



export default function Managemeter () {

  const [tables, setTables] = useState([]);
  const { user } = useSelector((state) => ({...state}))


  let color = 'blue';
  // console.log(tables);
  
  const columns = [
    {
      title: 'ห้อง',
      dataIndex: 'roomName',
      key: 'roomName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'สถานะห้อง',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <>
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'หน่วยที่ใช้เดือนที่แล้ว',
      dataIndex: '',
      key: '',
    },
    {
      title: 'หน่วยที่ใช้เดือนนี้',
      dataIndex: '',
      key: '',
    },
    {
      title: 'ราคาที่ต้องจ่าย',
      dataIndex: 'rentalFee',
      key: 'rentalFee',
    },
  ];

    const loadData = (authtoken) => {
          listRoom(authtoken)
          .then(res => {
              setTables(res.data);
          })
          .catch(err => {
              console.log(err);
          })
    };

    useEffect(()=> {
      loadData(user.token)

  }, []);
  
  return (
    <div>
      <div>
          <div className="content-wrapper font-sarabun">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  {/* /.col */}
                  <div className="col-sm-12">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">จัดการมิเตอร์</a>
                      </li>
                      <li className="breadcrumb-item active">ระบบจัดการหอพัก</li>
                    </ol>
                  </div>
                  <div className="col-sm-12">
                    <div className="card" style={{margin: "auto",padding: "10px 100px 10px 100px", width: "60%", textAlign: "center"}}>
                        <h1 className="m-0 text-dark">เลือกรอบมิเตอร์</h1>
                        <Space direction="vertical" style={{margin: "20px 0px 20px 0px"}}>
                            <DatePicker picker="month" />
                        </Space>
                    </div>
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
              {/* /.container-fluid */}



              <div>
                <div className="row" style={{textAlign: "center"}}>
                  {/* /.col */}
                  <div className="col-sm-3"></div>

                  <div className="col-sm-3">
                    <div className="card" style={{textAlign: "center"}}>
                        <h1 className="m-0 text-dark" style={{fontSize: "20px", padding: "10px"}}>จอมิเตอร์ค่าน้ำ</h1>
                        <div>
                            {/* <p>ราคาต่อหน่วย</p>
                            <input size={2}></input>
                            <p>บาท</p> */}
                            <p>ราคาต่อหน่วย . . . บาท</p>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="card" style={{textAlign: "center"}}>
                        <h1 className="m-0 text-dark" style={{fontSize: "20px", padding: "10px"}}>จอมิเตอร์ค่าไฟฟ้า</h1>
                        <div>
                            {/* <p>ราคาต่อหน่วย</p>
                            <input size={2}></input>
                            <p>บาท</p> */}
                            <p>ราคาต่อหน่วย . . . บาท</p>
                        </div>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                <div className="row">
                <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                    <div className="card">
                    <Table columns={columns} dataSource={tables} />
                    </div>
                  </div>
                </div>
              </div>   



            </section>
            {/* /.content */}
          </div>
        </div>


    </div>
  );
}
