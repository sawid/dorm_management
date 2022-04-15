import React from "react";
import { useState, useEffect } from 'react';
import { listUser } from "./function.components/users";
import { useSelector } from "react-redux";

const Manageuser = () => {
  const { user } = useSelector((state) => ({...state}))
  const [ data, setData ] = useState([]);

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
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index)=> 
                        <tr>
                            <th scope="row">
                              <p>{ item.username }</p>
                            </th>
                            <th scope="row">
                              <p>{ item.role }</p>
                            </th>
                            <th scope="row">
                              <p>{ item.enabled }</p>
                            </th>
                            <th scope="row">
                              <p>{ item.createdAt }</p>
                            </th>
                            <th scope="row">
                              <p>{ item.updatedAt }</p>
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
    </div>
  );
};

export default Manageuser;
