import React, { Component } from "react";
import { Button, Radio } from 'antd';
import { useState } from 'react';
import { Modal } from 'antd';
import { Input } from 'antd';
import { Table, Tag, Space } from 'antd';

const RoomDetail = () => {
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ]

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

const onChange = e => {
    console.log('Change:', e.target.name);
  };

const onChangeRadio = e => {
  console.log('radio checked:', e.target.value)
};

  return (
    <div>
    <div className="content-wrapper font-sarabun">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">ข้อมูลห้องพัก</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">รายงานผล</a>
                </li>
                <li className="breadcrumb-item active">รายละเอียดห้องพัก</li>
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
        <div className="container-fluid"></div>
          <div className="row">
            <div className="col-4">
                <div className="card ms-3">
                    <h4 className="card-body"> ห้องพัก 101 </h4> 
                    <div className="card-subtitle mb-2 ms-3 text-muted">
                      <p>ผู้เช่า นาย หนึ่งเดียวในใจ สองไส้ในกระเพาะ</p>
                      <p>ประเถทห้อง พัดลม</p>
                      <p>จำนวนเตียง 1</p>
                      <p>ค่าเช่า 3500</p>
                      <p>เบอร์โทรศัพท์ 095-XXX-XXXX</p>
                      </div> 
                </div>
            </div>
            <div className="col-1"></div>
            
            
            
            <div className="col-6 ">
              <form>
              <Radio.Group onChange={onChangeRadio} defaultValue="a">
                <Radio.Button value="a">แจ้งปัญหา</Radio.Button>
                <Radio.Button value="b">ของชำรุด</Radio.Button>
                <Radio.Button value="c">การเข้า-ออกประตู</Radio.Button>
              </Radio.Group>
              </form>
              <div className="row">
                 <div className="card ms-3 mt-3">
                    <div>
                        <Table dataSource = {data} columns={columns}>
                          
                        </Table>
                    </div>
                 </div>
              </div>
            </div> 
            <div className="row">
              <div className="col-4 ms-3">
                  <form>
                      <input className="btn btn-success btn-block text-lg mb-3 mt-2" type="button" value="แก้ไข้รายละเอียด"></input>
                      <input className="btn btn-success btn-block text-lg mb-3" type="button" value="ดูสัญญา"></input>
                      <input className="btn btn-success btn-block text-lg" type="button" value="ดูรอบบิล"></input>
                  </form>
              </div>
              <div className="col-1"></div>
              <div className="col-6">
                
              </div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input showCount maxLength={20} onChange={onChange} name="text-box" />
    </Modal>
  </div>
  )
}

export default RoomDetail