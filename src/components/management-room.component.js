import React, { Component } from "react";
import { Button } from 'antd';
import { useState } from 'react';
import { Modal } from 'antd';
import { Input } from 'antd';
import {AppstoreOutlined}  from '@ant-design/icons';
import { Radio } from 'antd';
const ManagementRoom = () => {
  
  const onChangeRadio = e => {
    console.log('radio checked:', e.target.value)
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

const onChange = e => {
    console.log('Change:', e.target.name);
  };

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
                        <div className="col-6 clearfix">
                    </div>
                    
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
                      <Radio.Button icon={<AppstoreOutlined/>} value="b"></Radio.Button>
                      
                    </Radio.Group>
                 </form>
                  </div>  
                  <div className="col-6">

                    <div className="row">
                      <div className="col-6 d-flex flex-row justify-content-end">
                        <Button  type="primary" onClick={ showModal }>สร้างห้อง</Button>
                      </div>
                      <div className="col-6">
                        <div class="input-group input-group-sm ">
                            <input type="text" class="form-control" placeholder="ค้นหาหมายเลขห้อง"/>
                                <span class="input-group-append">
                                <button type="button" class="btn btn-info btn-flat">ค้นหา</button>
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
            <div className="container fluid"></div>
              <div className="row"> 
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 101 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 102 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 103 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 104 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 105 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 106 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 107 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 108 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 109 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 110 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 111 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 112 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 113 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 114 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 115 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 116 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 117 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-lg-2 col-6">   
                  <div class="small-box bg-light">
                    <div class="d-flex flex-row justify-content-start ">  
                      <i class="mt-3 ms-3 mb-2 fas fa-square text-success"></i>
                      <h4 class="ms-3 mb-5 mt-2 "> ห้องพัก 118 </h4>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div class=" dataTables_paginate paging_simple_numbers " id="example1_paginate">
                  <ul class="pagination d-flex justify-content-center"><li class="paginate_button page-item previous disabled " id="example1_previous">
                    <a href="#" aria-controls="example1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>
                    <li class="paginate_button page-item active"><a href="#" aria-controls="example1" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="2" tabindex="0" class="page-link">2</a></li>
                    <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="3" tabindex="0" class="page-link">3</a></li>
                    <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="4" tabindex="0" class="page-link">4</a></li>
                    <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="5" tabindex="0" class="page-link">5</a></li>
                    <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="6" tabindex="0" class="page-link">6</a></li>
                    <li class="paginate_button page-item next" id="example1_next"><a href="#" aria-controls="example1" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li>
                    </ul>
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

export default ManagementRoom