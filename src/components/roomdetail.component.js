import React, { Component } from "react";
import { Button, Radio } from 'antd';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
//import { Modal } from 'antd';

import { Input } from 'antd';
import { Table, Tag, Space } from 'antd';
import { readRoom , resetVaule } from "./function.components/room";
import { Modal } from "react-bootstrap";

const RoomDetail = () => {
  
  let { id } = useParams(); 
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


  // Input Data
  const [ dataRoom, setdataRoom ] = useState({
    
    room_type: data.room_type,
    rentalFee: data.rentalFee ,
    amountBed: data.amountBed,
    
  });
 
  /* const [ dataRoom_type, setdataRoom_type ] = useState({
    
    room_type:"",
    
  });
  const [ dataRentalFee, setdataRoomRentalFee ] = useState({
    
    rentalFee:0 ,
    
  });
  const [ dataRoomPhoneNumber, setdataRoomPhoneNumber ] = useState({
    
    phoneNumber:0 ,
    
  });
  const [ dataRoomNameRenter, setdataRoomNameRenter ] = useState({
    
    nameRenter:"",
    
  });
  */

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

  // Creat Table  
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

  // Modal  
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
      setIsModalVisible(false);
      resetVaule(user.token, values.id, {dataRoom})
      .then(res => {
        console.log(res)
        loadData(user.token, id)
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


    // On Change
    /*
    const handleonChangeValueType = (e) => {
      setdataRoom_type({...dataRoom_type, [e.target.name]:e.target.value });
    }
    const handleonChangeValueRentalFee = (e) => {
      setdataRoomRentalFee({...dataRentalFee, [e.target.name]:e.target.value });
    }
    const handleonChangeValuePhoneNumber = (e) => {
      setdataRoomPhoneNumber({...dataRoomPhoneNumber, [e.target.name]:e.target.value });
    }
    const handleonChangeValueNameRenter = (e) => {
      setdataRoomNameRenter({...dataRoomNameRenter, [e.target.name]:e.target.value });
    }
*/

 



const onChange = e => {
    console.log('Change:', e.target.name);
  };

const onChangeRadio = e => {
  console.log('radio checked:', e.target.value)
};





//

const handlePageClick = (data) => {
  console.log(data.selected);
  setCurrentPage(data.selected + 1);
};


useEffect(() => {
  loadData(user.token, id);
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
                          <p>ผู้เช่า นาย หนึ่งเดียวในใจ สองไส้ในกระเพาะ</p>
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
                <Radio.Button value="a">แจ้งปัญหา</Radio.Button>
                <Radio.Button value="b">ของชำรุด</Radio.Button>
                <Radio.Button value="c">การเข้า-ออกประตู</Radio.Button>
              </Radio.Group>
              </form>
              <div className="row">
                <div className="col-lg-12 mt-2">
                 <div className="card ms-2">
                    <div>

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
          <input name="nameRenter"  type="text" class="form-control" placeholder="กรอกชื่อผู้เช่า" aria-label="Username" aria-describedby="basic-addon1"/>
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