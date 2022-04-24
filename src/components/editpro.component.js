import React, { Component } from "react";
import { Modal, Button } from "antd";
import { message } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { listUser } from "./function.components/users";

const ProfileEdit = () => {
    // change to user API //
    const startProfile = [{
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        cellnum: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }];


    //state
    const [profile, setProfile] = useState([{startProfile}]);
    const [allProfile, setAllProfile] = useState([]);

    //function
    function onValueChange (event) {
        const {name, value} = event.target;
        setProfile((prevProfile) => {
            return {
                ...prevProfile,
                [name]: value
            }
        });
    }

    function onValueSubmit (event) {
        event.preventDefault();

        if (profile.newPassword !== profile.confirmNewPassword) {
            return failed();
        }
        else {

            setAllProfile(() => {
                return [profile];
            });

            setProfile(profile);

            success();
            // redirect page //
        }
    }

    const success = () => {
        message.success({
          content: 'Saved',
          className: 'custom-class',
          style: {
            margin: "40px 0px 0px 200px"
          },
        });
      };

      const failed = () => {
        message.error({
          content: "New Password doesn't match",
          className: 'custom-class',
          style: {
            margin: "40px 0px 0px 200px"
          },
        });
      };


    function onCancel (event) {
        event.preventDefault();

        setAllProfile((prevAllProfile)=>{
            return [...prevAllProfile];
        });
        
        // redirect page //
    }

    //Elements
    const profileElement = allProfile.map((theProfile) => {
        return (
            <div className="card">
                <p>firstname: {theProfile.firstname}</p>
                <p>lastname: {theProfile.lastname}</p>
                <p>telnum: {theProfile.telnum}</p>
                <p>oldpassword: {theProfile.oldPassword}</p>
                <p>newpassword: {theProfile.newPassword}</p>
                <p>confirmnewpassword: {theProfile.confirmNewPassword}</p>
            </div>
        )
    })



  return (
    <div></div>
  )
}

const Profile = () => {
    // change to user API //
    const startProfile = [{
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        cellnum: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }];


    //state
    const [profile, setProfile] = useState([{startProfile}]);
    const [allProfile, setAllProfile] = useState([]);

    const [editMode, setEditMode] = useState(null);

    const [visible, setVisible] = useState(false);

    function onEditMode (event) {
        event.preventDefault();

        setEditMode(true);
        setVisible(true);

    }

  return (
    <div></div>
  )
}

const Editprofile = () => {

    const listUser = (authtoken) => {
        listUser(authtoken)
        .then(res => {
            setProfile(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };

    // useEffect(()=> {    
    //     listUser(user.token)

    // }, []);

    const startProfile = [{
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        cellnum: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }];


    //state
    const [profile, setProfile] = useState([startProfile]);
    const [allProfile, setAllProfile] = useState([]);

    // const { user } = useSelector((state) => ({...state}))
    
    const [editMode, setEditMode] = useState(null);
    const [visible, setVisible] = useState(false);

    //function
    function onValueChange (event) {
        const {name, value} = event.target;
        setProfile((prevProfile) => {
            return {
                ...prevProfile,
                [name]: value
            }
        });
    }

    function onValueSubmit (event) {
        event.preventDefault();

        if (profile.newPassword !== profile.confirmNewPassword) {
            return failed();
        }
        else {

            setAllProfile(() => {
                return [profile];
            });

            setProfile(profile);

            setEditMode(false);
            setVisible(false);

            success();
            // redirect page //
        }
    }
    
    function onCancel (event) {
        event.preventDefault();

        setAllProfile((prevAllProfile)=>{
            return [...prevAllProfile];
        });

        setVisible(false);
        
        // redirect page //
    }

    function onEditMode (event) {
        event.preventDefault();

        setEditMode(true);
        showModal();

    }
    
    const success = () => {
        message.success({
          content: 'Saved',
          className: 'custom-class',
          style: {
            margin: "40px 0px 0px 200px"
          },
        });
      };

    const failed = () => {
      message.error({
        content: "New Password doesn't match",
        className: 'custom-class',
        style: {
          margin: "40px 0px 0px 200px"
        },
      });
    };

    const showModal = () => {
        setVisible(true);
    };

    let Edit = null;
    if (!!editMode) {
        Edit =      <div>
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
                                    ข้อมูลทั่วไป
                                </h3>
                            </div>
                            <form style={{textAlign:"center"}}>
                                <div style={{marginBottom: 20}}>
                                    <label style={{margin: '20px 200px 5px 200px'}}>First Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John" 
                                        size={30} 
                                        style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}
                                        name="firstname"
                                        value={profile.firstname}
                                        onChange={onValueChange}
                                    />
                                    <label style={{margin: '5px 200px 5px 200px'}}>Last Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Farmer" 
                                        size={30}  
                                        style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}
                                        name="lastname"
                                        value={profile.lastname}
                                        onChange={onValueChange}
                                    />
                                    <label style={{margin: '5px 200px 5px 200px'}}>Tel. Number</label>
                                    <input 
                                        type="tel" 
                                        pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}" 
                                        required placeholder="02-999-9999" 
                                        size={30}    
                                        style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}
                                        name="telnum"
                                        value={profile.telnum}
                                        onChange={onValueChange}
                                    />
                                </div>
                                <div>
                                    <label style={{margin: '5px 200px 5px 200px'}}>E-mail</label>
                                    <input 
                                        type="text" 
                                        placeholder="example@gmail.com" 
                                        size={30}    
                                        style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}
                                        name="email"
                                        value={profile.email}
                                        onChange={onValueChange}
                                    />
                                    <label style={{margin: '5px 200px 5px 200px'}}>Cell. Number</label>
                                    <input 
                                        type="tel" 
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                        required placeholder="089-999-9999" 
                                        size={30}    
                                        style={{margin: '0px 150px 25px 150px', borderRadius: "6px"}}
                                        name="cellnum"
                                        value={profile.cellNum}
                                        onChange={onValueChange}
                                    />
                                    
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
                                <input 
                                    type="password" 
                                    placeholder="Password123"    
                                    size={30}  
                                    style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}
                                    name="oldPassword"
                                    value={profile.oldPassword}
                                    onChange={onValueChange}
                                />
                                <label style={{margin: '5px 200px 5px 200px'}}>New password</label>
                                <input 
                                    type="password" 
                                    placeholder="NewPassword999" 
                                    size={30}  
                                    style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}
                                    name="newPassword"
                                    value={profile.newPassword}
                                    onChange={onValueChange}
                                />
                                <label style={{margin: '5px 150px 5px 150px'}}>Confirm new password</label>
                                <input 
                                    type="password" 
                                    placeholder="NewPassword999" 
                                    size={30}  
                                    style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}
                                    name="confirmNewPassword"
                                    value={profile.confirmNewPassword}
                                    onChange={onValueChange}
                                />
                            </form>
                        </div>
                        {/* <div className="card">
                            <div className="card-header">
                                <h3 class="card-title">อื่นๆ</h3>
                            </div>
                            <form style={{textAlign:"center"}}>
                                <label style={{margin: '5px 200px 5px 200px'}}>Example</label>
                                <input 
                                    type="text" 
                                    placeholder="Example" 
                                    size={30}  
                                    style={{margin: "0px 50px 20px 50px", borderRadius: "6px"}}
                                />
                            </form>
                        </div> */}
                    </section>
                </div>
            </div>
            <div>
                {/* {profileElement} */}
            </div>
        {/* /.container-fluid */}
        </section>
        {/* /.content */}
        </div>
                    </div>
    }

    return(
        <div style={{textAlign: 'center'}}>
            <div>
                <div>
                <div className="content-wrapper font-sarabun">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Profile</h1>
                        </div>
                        {/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">
                              <a href="#">โปรไฟล์</a>
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
                                            ข้อมูลทั่วไป
                                        </h3>
                                    </div>
                                    <form style={{textAlign:"center"}}>
                                        <div style={{marginBottom: 20}}>
                                            <label style={{margin: '20px 200px 5px 200px'}}>First Name</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{profile.firstname}</label>
                                            </div>
                                            <label style={{margin: '5px 200px 5px 200px'}}>Last Name</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{profile.lastname}</label>
                                            </div>
                                            <label style={{margin: '5px 200px 5px 200px'}}>Telephone Number</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{profile.telnum}</label>
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{margin: '5px 200px 5px 200px'}}>E-mail</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{profile.email}</label>
                                            </div>
                                            <label style={{margin: '5px 200px 5px 200px'}}>Cellphone Number</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 20px 150px'}}>
                                                <label>{profile.cellnum}</label>
                                            </div>
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
                                        <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                            <label>{profile.oldPassword}</label>
                                        </div>
                                        <label style={{margin: '5px 200px 5px 200px'}}>New password</label>
                                        <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                            <label>{profile.newPassword}</label>
                                        </div>
                                        <label style={{margin: '5px 150px 5px 150px'}}>Confirm new password</label>
                                        <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                            <label>{profile.confirmNewPassword}</label>
                                        </div>
                                    </form>
                                </div>
                                {/* <div className="card">
                                    <div className="card-header">
                                        <h3 class="card-title">อื่นๆ</h3>
                                    </div>
                                    <form style={{textAlign:"center"}}>
                                        <label style={{margin: '5px 200px 5px 200px'}}>Example</label>
                                        <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                            <label>Example</label>
                                        </div>
                                    </form>
                                </div> */}
                                <Button type="primary" onClick={(event)=>{onEditMode(event)}}>Edit</Button>
                            </section>
                        </div>
                    </div>
                {/* /.container-fluid */}
                </section>
                {/* /.content */}
                </div>
                </div>
                <Modal
                  centered
                  visible={visible}
                  onOk={(event)=>{onValueSubmit(event)}}
                  onCancel={(event)=>{onCancel(event)}}
                  width={1550}
                >
                    {Edit}
                </Modal>
            </div>
        </div>
    );

}

export default Editprofile