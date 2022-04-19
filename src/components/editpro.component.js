import React, { Component } from "react";
import { Button } from "antd";

const Editprofile = () => {
  return (
    <div>
        <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Edit Profile</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">เเก้ไขโปรไฟล์</a>
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
            {/* start */}
            <div className="container-fluid">
                <div class="row">
                    <section className="col-lg-5 connectedSortable" style={{textAlign:"center", margin: "0px 0px 0px 70px", height:'100%'}}>
                        <div className="card">
                            <div className="card-header">
                                <h3 class="card-title">
                                    {/* <i class="fas fa-chart-pie mr-1"></i> */}
                                    ข้อมูลทั่วไป
                                </h3>
                            </div>
                            <form style={{textAlign:"center"}}>
                                <div style={{marginBottom: 20}}>
                                    <label style={{margin: '20px 200px 5px 200px'}}>First Name</label>
                                    <input type="text" placeholder="John" size={30} style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}></input>
                                    <label style={{margin: '5px 200px 5px 200px'}}>Last Name</label>
                                    <input type="text" placeholder="Farmer" size={30}  style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}></input>
                                    <label style={{margin: '5px 200px 5px 200px'}}>Tel. Number</label>
                                    <input type="tel" pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}" required placeholder="02-999-9999" size={30}    style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}></input>
                                    {/* <input type={"submit"}></input> */}
                                </div>
                                <div>
                                    <label style={{margin: '5px 200px 5px 200px'}}>E-mail</label>
                                    <input type="text" placeholder="example@gmail.com" size={30}    style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}></input>
                                    <label style={{margin: '5px 200px 5px 200px'}}>Cell. Number</label>
                                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required placeholder="089-999-9999" size={30}    style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}></input>
                                    <label style={{margin: '5px 200px 5px 200px'}}>Example</label>
                                    <input type="text" placeholder="Example" size={30}    style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}></input>
                                    {/* <input type={"submit"}></input> */}
                                </div>
                            </form>
                        </div>
                    </section>
                    <section className="col-lg-5 connectedSortable" style={{textAlign:"center", margin: "0px 0px 0px 70px", height:'100%'}}>
                        <div className="card">
                            <div className="card-header">
                                <h3 class="card-title">รหัสผ่าน</h3>
                                {/* <i class="fas fa-chart-pie mr-1"></i> */}
                            </div>
                            <form style={{textAlign:"center"}}>
                            <label style={{margin: '20px 200px 5px 200px'}}>Old password</label>
                                <input type="password" placeholder="Password123"    size={30}  style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}></input>
                                <label style={{margin: '5px 200px 5px 200px'}}>New password</label>
                                <input type="password" placeholder="NewPassword999" size={30}  style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}></input>
                                <label style={{margin: '5px 150px 5px 150px'}}>Confirm new password</label>
                                <input type="password" placeholder="NewPassword999" size={30}  style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}></input>
                            </form>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 class="card-title">อื่นๆ</h3>
                                {/* <i class="fas fa-chart-pie mr-1"></i> */}
                            </div>
                            <form style={{textAlign:"center"}}>
                                <label style={{margin: '5px 200px 5px 200px'}}>Example</label>
                                <input type="text" placeholder="Example" size={30}  style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}></input>
                                <label style={{margin: '5px 150px 5px 150px'}}>Example</label>
                                <input type="text" placeholder="Example" size={30}  style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}></input>
                            </form>
                        </div>
                        <div>
                            <Button type="primary" style={{margin: "20px 20px 20px 20px", background: "#A5F698", borderWidth: "0px"}}>
                                <h3 className="card-title">Save</h3>
                            </Button>
                            <Button style={{margin: "20px 20px 20px 20px", background: "#F38F8F", borderWidth: "0px"}}>
                                <h3 className="card-title">Cancel</h3>
                            </Button>

                            {/* <button type="button" style={{background: "#A5F698", margin: "0px 20px 0px 20px", padding: "10px 30px 10px 30px", borderRadius: "32px"}}>
                                <h3 class="card-title">
                                    Save
                                </h3>
                            </button>
                            <button type="button" style={{background: "#F38F8F", margin: "0px 20px 0px 20px", padding: "10px 30px 10px 30px", borderRadius: "32px"}}>
                                <h3 class="card-title">
                                    Cancel
                                </h3>
                            </button> */}

                        </div>
                    </section>
                </div>
            </div>
        {/* /.container-fluid */}
        </section>
        {/* /.content */}
        </div>
    </div>
  )
}

export default Editprofile