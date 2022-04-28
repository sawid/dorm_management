import React, { Component } from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, DatePicker, Space } from 'antd';
import { Table, Tag} from 'antd';

import { listBills } from "./function.components/billmana";
import moment from "moment";


export default function Managemeter () {

  const [tables, setTables] = useState([]);
  const { user } = useSelector((state) => ({...state}))
  const [data, setData] = useState([]);


  // const [searchText,setSearchText]=useState('');
  const [tablesDate, setTablesDate] = useState('')


  let colorB = 'blue';
  let colorY = 'orange';
  let colorG = 'green';

  const UnitPrice = (thisMonth, lastMonth) => {
    if (lastMonth > thisMonth) {
      return Math.abs(thisMonth - lastMonth);
    } else {
      return thisMonth - lastMonth;
    }
  };
  const Real = [[], []]
  const Month = []
  
  for (let i = 0;i < tables.length;i++) 
  {
    Real[0].push(UnitPrice(tables[i].waterUnitThisMonth, tables[i].waterUnitLastMonth))
    Real[1].push(UnitPrice(tables[i].electricUnitThisMonth, tables[i].electricUnitLastMonth))
    Month.push(tables[i].month)
  }
  console.log(Real)
  console.log(Month)
  console.log(tablesDate)


  async function fillterDate(date){
    await setTablesDate(date)
    console.log(tablesDate)
    let fillteredTablesDate = data.filter((tables)=>{ 
      return tables.month === date
    })
    showAll()
    setTables(fillteredTablesDate)
  }
  // moment().format("MMM")

  function showAll(){
    setTables(data)
  }

  const loadData = (authtoken) => {
    listBills(authtoken)
    .then(res => {
        setData(res.data);
        setTables(res.data);
    })
    .catch(err => {
        console.log(err);
    })
};

  useEffect(()=> {
  loadData(user.token)

  }, []);
  console.log(data)
  
  const columns = [
    {
      title: 'ห้อง',
      dataIndex: 'roomId',
      key: 'roomId',
      render: text => <a>{text}</a>,
    },
    {
      title: 'หน่วยที่ใช้เดือนที่แล้ว (น้ำ)',
      dataIndex: 'waterUnitLastMonth',
      key: 'waterUnitLastMonth',
      render: waterUnitLastMonth => (
        <>
          <Tag color={colorB} key={waterUnitLastMonth}>
            {waterUnitLastMonth} หน่วย
          </Tag>
        </>
      ),
    },
    {
      title: 'หน่วยที่ใช้เดือนนี้ (น้ำ)',
      dataIndex: 'waterUnitThisMonth',
      key: 'waterUnitThisMonth',
      render: waterUnitThisMonth => (
        <>
          <Tag color={colorB} key={waterUnitThisMonth}>
            {waterUnitThisMonth} หน่วย
          </Tag>
        </>
      ),
    },
    {
      title: 'หน่วยที่ใช้เดือนที่แล้ว (ไฟฟ้า)',
      dataIndex: 'electricUnitLastMonth',
      key: 'electricUnitLastMonth',
      render: waterUnitThisMonth => (
        <>
          <Tag color={colorY} key={waterUnitThisMonth}>
            {waterUnitThisMonth} หน่วย
          </Tag>
        </>
      ),
    },
    {
      title: 'หน่วยที่ใช้เดือนนี้ (ไฟฟ้า)',
      dataIndex: 'electricUnitThisMonth',
      key: 'electricUnitThisMonth',
      render: waterUnitThisMonth => (
        <>
          <Tag color={colorY} key={waterUnitThisMonth}>
            {waterUnitThisMonth} หน่วย
          </Tag>
        </>
      ),
    },

  ];
  const columns1 = [
    {
      title: 'หน่วยที่ใช้จริง (น้ำ)',
      // dataIndex: '1',
      // key: '1',
      render: elctric => (
            <>
              <Tag color={colorG} key={elctric}>
                {elctric} หน่วย
              </Tag>
            </>
          ),
    },
  ];
  const columns2 = [
    {
      title: 'หน่วยที่ใช้จริง (ไฟฟ้า)',
      // dataIndex: '1',
      // key: '1',
      render: water => (
            <>
              <Tag color={colorG} key={water}>
                {water} หน่วย
              </Tag>
            </>
          ),
    },
  ];


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
                    <div className="card" style={{margin: "auto",padding: "25px 50px 25px 50px", width: "60%", textAlign: "center"}}>
                        <h1 className="m-0 text-dark">เลือกรอบมิเตอร์</h1>
                        <Space direction="vertical" style={{margin: "20px 0px 20px 0px"}}>
                            <DatePicker picker="month" onChange={(date)=>fillterDate(moment(date).format("MMM"))}/>
                        </Space>
                        <div>
                          <Button type="primary" onClick={showAll}>
                            แสดงทั้งหมด
                          </Button>
                        </div>
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

            <div className="container-fluid">
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
                            <p>ราคาต่อหน่วย 18 บาท</p>
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
                            <p>ราคาต่อหน่วย 7 บาท</p>
                        </div>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{padding: '0px'}}/>
                  <div className="col-sm-7" style={{padding: '0px'}}>
                    <div className="card">
                      <Table columns={columns} dataSource={tables} pagination={false}/>
                    </div>
                  </div>
                  <div className="col-sm-2" style={{padding: '0px'}}>
                    <div className="card">
                      <Table columns={columns1} dataSource={Real[0]} pagination={false}/>
                    </div>
                  </div>
                  <div className="col-sm-2" style={{padding: '0px'}}>
                  <div className="card">
                      <Table columns={columns2} dataSource={Real[1]} pagination={false}/>
                    </div>
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
