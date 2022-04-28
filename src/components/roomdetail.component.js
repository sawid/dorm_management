import React, { Component } from "react";
import { Button, Radio } from 'antd';
import { useParams } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";

import { Table, Tag, Space } from 'antd';
import { readRoom, resetValueRoom } from "./function.components/room";
import { listRenter, resetValueRenter, readRenter, getRenterRoom, putRenterRoom } from "./function.components/renter"

import { Modal } from "react-bootstrap";

// Seachbar with dropdown
import { Select } from 'antd';
import Item from "antd/lib/list/Item";
const { Option } = Select;


const RoomDetail = () => {


  let { id } = useParams();
  const { user } = useSelector((state) => ({ ...state }))
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(9);
  const [dataRenter, setdataRenter] = useState([]);
  const [dataRenterNameList, setdataRenterNameList] = useState([]);
  const [dataPutRenterList, setdataPutRenterNameList] = useState([]);
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    id: "",
    val: "",
  });


  // Input Data
  const [dataRoom, setdataRoom] = useState({
    room_type: data.room_type,
    rentalFee: data.rentalFee,
    amountBed: data.amountBed,
  });

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

  const loadDataRenter = (authtoken, values) => {

    getRenterRoom(authtoken, values)
      .then(res => {
        console.log(values, "renter ID in Load")

        setdataRenter(res.data)
        console.log(data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const loadDataRenterList = (authtoken) => {
    listRenter(authtoken)
      .then(res => {
        setdataRenterNameList(res.data)
        console.log(data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const loadDataRenterNameList = (authtoken ,value) => {
    

  } 

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


  // Seach and droplist
 

  const onSearch = (vale) => {

    console.log(vale);
  };






  // Modal  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(values.id)
    resetValueRoom(user.token, values.id, { dataRoom })
      .then(res => {
        console.log(res)
        loadData(user.token, id)
        console.log("check load ")

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
    setValues({ ...values, id: id });
  };


  console.log(dataRenter)


  const handleonChangeValue = (e) => {
    setdataRoom({ ...dataRoom, [e.target.name]: e.target.value });
  }

  console.log(dataRoom)

  const handleonChangeRenterName = (e) => {
    setdataRenter({ ...dataRenter, [e.target.name]: e.target.value });
  }

  console.log(dataRenterNameList, "datalist")


  const onChangeRenterName = ( authtoken, id , values) => {
    putRenterRoom(authtoken ,id , values)
    .then(res => {
      setdataPutRenterNameList(res.data)
      console.log(data)
      })
    .catch(err => {
      console.log(err);
    })
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
    console.log(data.renterId, "renter ID ")
    loadDataRenter(user.token, id);
    loadDataRenterList(user.token);
  }, []);



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
                  <div className="card ms-3">
                    <div className="card-body justify-content-center mb-1">
                      <h2 className="mt-1">ห้องพัก {data.roomName}</h2>
                      <div className="card-subtitle text-muted">
                        <p>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</p>
                        <p>⠀⠀ผู้เช่า {dataRenter.renterName}</p>
                        <p>⠀⠀ประเภทห้อง {data.room_type}</p>
                        <p>⠀⠀จำนวนเตียง {data.amountBed}</p>
                        <p>⠀⠀ค่าเช่า {data.rentalFee}</p>
                      </div>
                    </div>
                  </div>

                </div>

                <div>
                  <form>
                    <button type="button" className="btn btn-success btn-block text-lg mb-3 mt-2 ms-3" onClick={() => showModal(data._id)}>แก้ไขรายละเอียด</button>
                    <input className="btn btn-success btn-block text-lg mb-3 ms-3" type="button" value="ดูสัญญา" onClick={() => navigate('/printagreement/' + data._id) }></input>
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
            <div>
              <form>
                <select class="form-select" name="renterId" aria-label="Default select example" onChange={onChangeRenterName} >
                  {dataRenterNameList.map((item, index) =>
                    <option name="renterId"> {item.renterName}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   </option>              
              )}
              </select>
            </form>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">ประเภทห้อง⠀</span>
          </div>
          <input name="room_type" onChange={handleonChangeValue} maxLength="3"  type="text" class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">จำนวนเตียง⠀</span>
          </div>
          <input name="amountBed" maxLength="2"
              min="0" 
              onChange={handleonChangeValue} 
              type="number" 
              class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"> ⠀⠀ค่าเช่า ⠀⠀</span>
          </div>
          <input name="rentalFee" maxLength="4"
             min="0" 
             onChange={handleonChangeValue} 
             type="number" 
             class="form-control" placeholder="กรอกประเภทห้อง" aria-label="Username" aria-describedby="basic-addon1" />
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
    </div >
  )

}

export default RoomDetail

/*
<select name="renterName"  >
                {dataRenterName.map((item,index) => 
                  < option key={index} value={item.id} >
                    {item.renterName}
                  </option>


                )}
</select>  */

/*<select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>*/


/*             <Select
   showSearch
   placeholder="Select a person"
   optionFilterProp="children"
   onChange={onChange}
   onSearch={onSearch}
   filterOption={(input, option) =>
     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
   }
 >
   <Option value="jack">Jack</Option>
   <Option value="lucy">Lucy</Option>
   <Option value="tom">Tom</Option>
 </Select>*/