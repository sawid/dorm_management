import React, { Component } from "react";
import { Button, Radio } from 'antd';
import { useParams } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { Table, Tag, Space } from 'antd';
import { readRoom , resetValueRoom } from "./function.components/room";
import {listRenter, resetValueRenter,readRenter} from "./function.components/renter"

import { Modal } from "react-bootstrap";

// Seachbar with dropdown
import {Select} from 'react-select'


const RoomDetail = () => {
  
  let { id } = useParams(); 
  let { idRenter } = useParams(); 
  const { user } = useSelector((state) => ({...state}))
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(9);
  const [ data, setData ] = useState([]);
  const [ values, setValues] = useState({
    
    id:"", 
    val: "", 
  });


 /* const [ RenterId , setrenterId] = useState({
    
    renterId:"", 
    vals : "", 
  });*/

  // Input Data
  const [ dataRoom, setdataRoom ] = useState({
    
    room_type: data.room_type,
    rentalFee: data.rentalFee ,
    amountBed: data.amountBed,
    
  });


  //const [dataRenter,setdataRenter] = useState([]);
 
  // Load Data 
  const loadData = (authtoken, values) => {
    readRoom(authtoken, values)
    .then(res => {
            setData(res.data)
            console.log(data)
    })
    .catch(err => {
            console.log(err);
    })
  };

 /* const loadDataName = (authtoken) => {
      listRenter(authtoken)
      .then(res => {
        setdataRenter(res.data)
        console.log(data)
        
        })
      .catch(err => {
        console.log(err);
  })
  };*/



  // Creat Table  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
    },
  
  ]

  //  Test data Seachbar with Dropdown
  const options = [
    {values : 'cho', label: 'Cho' },
    {values : 'straw',label: 'Straw'},
    {values : 'van',label: 'Van'},
  ] 

  // Modal  
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
      setIsModalVisible(false);
      resetValueRoom(user.token, values.id, {dataRoom})
      console.log(values.id) 
      //resetValueRenter(user.token, RenterId.renterId,{dataRenter}) 
    
      .then(res => {
        console.log(res)
        loadData(user.token, id)
        //loadDataName(user.token)
      })
      .catch(err => {
        console.log(err.response)
      })
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const showModal = (id) => {
      setIsModalVisible(true);
      setValues({...values, id:id});
    };
   
    
      
    const handleonChangeValue = (e) => {
      setdataRoom({...dataRoom, [e.target.name]:e.target.value });
    }

    console.log(dataRoom)

   /* const handleonChangeRenterName = (e) => {
      setdataRenter({...dataRenter,[e.target.name]:e.target.value}); 
    }*/ 

   


const onChange = e => {
    console.log('Change:', e.target.name);
  };

const onChangeRadio = e => {
  console.log('radio checked:', e.target.value)
};





const handlePageClick = (data) => {
  console.log(data.selected);
  setCurrentPage(data.selected + 1);
};


useEffect(() => {
  loadData(user.token, id);
  //loadDataName(user.token)
},[])



  return (
    <div>
    <div className="content-wrapper font-sarabun">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
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
        <div className="container-fluid">
        <div className="row">
            <div className="col-6 ">
              <div className="row"> 
                <div className="card">
                    <div className="card-body justify-content-center"> 
                      <h2 className="mt-1">ห้องพัก {data.roomName}</h2>
                        <div className="card-subtitle text-muted">
                          <p>ผู้เช่า {data.renterName}</p>
                          <p>ประเถทห้อง {data.room_type}</p>
                          <p>จำนวนเตียง {data.amountBed}</p>
                          <p>ค่าเช่า {data.rentalFee}</p>
                          <p>เบอร์โทรศัพท์ 095-XXX-XXXX</p>
                        </div>
                    </div>
                  </div> 
                  
                </div>
                
                <div> 
                    <form>
                          <button type="button"className="btn btn-success btn-block text-lg mb-3 mt-2" onClick={() => showModal(data._id)}>แก้ไขรายละเอียด</button>
                          <input className="btn btn-success btn-block text-lg mb-3" type="button" value="ดูสัญญา"></input>
                          <input className="btn btn-success btn-block text-lg" type="button" value="ดูรอบบิล"></input>
                    </form>
                </div>
                
            </div>
            
            
            
            
            <div className="col-6">
              <form>
              <Radio.Group onChange={onChangeRadio} defaultValue="a">
                <Radio.Button value="a" className="ms-2">แจ้งปัญหา</Radio.Button>
              </Radio.Group>
              </form>
              <div className="row">
                <div className="col-lg-12 mt-2">
                 <div className="card ms-2">
                    <div>
                        <Table columns={columns} >  </Table>
                    </div>
                 </div>
                 </div>
              </div>
            </div> 
            <div className="row">
              <div className="col-4 ms-3">
                  
              </div>
              <div className="col-1"></div>
              <div className="col-6">
                
              </div>
          </div>
        </div>
        </div>
          
      </section>
      {/* /.content */}
    </div>
    <Modal className="font-sarabun" show={isModalVisible} onHide={handleCancel} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>แก้ไขรายละเอียด</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">⠀⠀ผู้เช่า ⠀⠀⠀</span>
          </div>
             
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">ประเภทห้อง⠀</span>
          </div>
          <input name="room_type" onChange={handleonChangeValue} type="text" class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">จำนวนเตียง⠀</span>
          </div>
          <input name="amountBed" onChange={handleonChangeValue} type="text" class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> ⠀⠀ค่าเช่า ⠀⠀</span>
          </div>
          <input name="rentalFee" onChange={handleonChangeValue} type="text" class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">เบอร์โทรศัพท์</span>
          </div>
          <input name="phoneNumber"type="text" class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1"/>
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
  )
  
}

export default RoomDetail

/*
<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input showCount maxLength={20} onChange={onChange} name="text-box" />
    </Modal>
*/ 

/*

<Modal.Header>
           <Modal.title>
              แก้ไข  
           </Modal.title>
        </Modal.Header>
*/

/*{ <select  > 
  {dataRenter.map((item,index) =>
   <option name="renterName" onChange={handleonChangeRenterName} >
     {item.renterName} 
   </option>

 )} 
</select> }*/