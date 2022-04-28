import React from "react";
import { useState, useEffect } from 'react';
import { listUser, changeStatus, changeRole, removeUser, resetPassword } from "./function.components/users";
import { useSelector } from "react-redux";
import { Switch, Select, Tag } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import moment from "moment/min/moment-with-locales";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const Manageuser = () => {
  const { user } = useSelector((state) => ({...state}))
  const [ data, setData ] = useState([]);
  const [ values, setValues] = useState({
    id: "",
    password: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    setIsModalVisible(true);
    setValues({...values, id:id});
  };

  const handleonChangePassword = (e) => {
    setValues({...values, [e.target.name]:e.target.value });
  }

  const handleOk = () => {
    setIsModalVisible(false);
    resetPassword(user.token, values.id, { values })
    .then(res => {
      console.log(res)
      loadData(user.token)
    })
    .catch(err => {
      console.log(err.response)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(data)
  useEffect(() => {
        loadData(user.token);
  },[])

  const loadData = (authtoken) => {
        listUser(authtoken)
        .then(res => {
                setData(res.data);
        })
        .catch(err => {
                console.log(err);
        })
  };

  const handleonChange = (e, id) => {
          const value = {
                  id:id,
                  enabled:e,
          };
          changeStatus(user.token, value)
          .then(res => {
                console.log(res)
                loadData(user.token);
          })
          .catch(err => {
                  console.log(err)
          })
  }

  const handleonChangeRole = (e, id) => {
          const value = {
                  id:id,
                  role:e,
          };
          changeRole(user.token, value)
          .then(res => {
                  console.log(res)
                  loadData(user.token);
                })
          .catch(err => {
                  console.log(err)
          })
  }

  const handleonRemove = (id) => {

                  console.log(id)
                  removeUser(user.token, id)
                  .then(res => {
                        console.log(res)
                        loadData(user.token);
                        toast.success('ลบผู้ใช้แล้ว', {
                          position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          });
                      })
                  .catch(err => {
                          console.log(err)
                  })
          
  }

  const roleData = ['admin', 'user']

  return (
    <div>
      <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">จัดการผู้ใช้</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">จัดการผู้ใช้</a>
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
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 class="card-title">รายชื่อผู้ใช้ในระบบ</h3>
                  </div>
                  
                    <div class="card-body p-0">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ชื่อผู้ใช้</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col">การเปิดใช้</th>
                            <th scope="col">วันที่สร้าง</th>
                            <th scope="col">อัพเดต</th>
                            <th scope="col">ดำเนินการ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index)=> 
                        <tr>
                            <th scope="row">
                              <p>{ item.username }</p>
                            </th>
                            <th scope="row">
                              <Select 
                              style={{ width:"100%" }}
                              value={ item.role }
                              onChange={(e) => handleonChangeRole(e, item._id)}
                              >
                                      {roleData.map((item, index) => 
                                      <Select.Option value={ item } key={ index }>
                                              { item == 'admin' ? <Tag color="red">{ item }</Tag> : <Tag color="green">{ item }</Tag> }
                                              </Select.Option>
                                      )}
                              </Select>
                            </th>
                            <th scope="row">
                                <Switch checked={ item.enabled } onChange={ (e) => handleonChange(e, item._id) }/>
                            </th>
                            <th scope="row">
                              <p>
                              { moment(item.createdAt).locale('th').format('LLL') }
                              </p>
                            </th>
                            <th scope="row">
                              <p>
                                { moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow() }
                                </p>
                            </th>
                            <th scope="row">
                              <p>
                              <DeleteFilled onClick={ () => handleonRemove(item._id) }/>
                              <EditFilled onClick={ () => showModal(item._id) }/>
                              </p>
                            </th>
                        </tr>
                          )}
                          

                        </tbody>
                      </table>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      
      <Modal className="font-sarabun" show={isModalVisible} onHide={handleCancel} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>ตั้งค่ารหัสผ่านใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body><input class="form-control" onChange={handleonChangePassword} type="text" name="password" placeholder="กรอกรหัสผ่านใหม่"/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleOk}>
            ตั้งค่ารหัสผ่านใหม่
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Manageuser;
