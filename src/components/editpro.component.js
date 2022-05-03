import React, { Component } from "react";
import { Modal, Button } from "antd";
import { message } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { listAUser, changeFirstname, changeLastname, changeTelnumber, changeEmail, changeCellnumber } from "./function.components/users";


const Editprofile = () => {
    
    //state
    let { id } = useParams();
    const { user } = useSelector((state) => ({...state}))
    const [allProfile, setAllProfile] = useState([]);
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [visible, setVisible] = useState(false);

    const [profile, setProfile] = useState(
        // {
        // firstname: "",
        // lastname: "",
        // }
    );
    // localhost:3000/editprofile/lpojsedngouerngosernu
    useEffect(() => {
          loadData(user.token, id);
    },[])
    console.log(data)
  
    const loadData = (authtoken, id) => {
          listAUser(authtoken, id)
          .then(res => {
                  setData(res.data);
          })
          .catch(err => {
                  console.log(err);
          })
    };



    
    

    console.log(user)
    console.log(user.firstname)

    // console.log(profile)

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

    const handleonChangeFirstname = () => {
        console.log(profile)
        console.log("Data Path Params" + id)
        changeFirstname(user.token, id, { profile })
        changeLastname(user.token, id, { profile })
        changeTelnumber(user.token, id, { profile })
        changeEmail(user.token, id, { profile })
        changeCellnumber(user.token, id, { profile })
        .then(res => {
          console.log(res)
          loadData(user.token, id)
        })
        .catch(err => {
          console.log(err.response)
        })
    };

    function onValueSubmit (e) {
        e.preventDefault();

            console.log(profile)
            handleonChangeFirstname();


            setEditMode(false);
            setVisible(false);
            success();
    }
    
    function onCancel (event) {
        event.preventDefault();
        setVisible(false);
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

    // const failed = () => {
    //   message.error({
    //     content: "New Password doesn't match",
    //     className: 'custom-class',
    //     style: {
    //       margin: "40px 0px 0px 200px"
    //     },
    //   });
    // };

    const showModal = (id) => {
        setVisible(true);
        setProfile({...profile, id:id});
    };

    let Edit = null;
    if (!!editMode) {
        Edit =      
        <div>
                        
                <form style={{textAlign:"center"}}>
                    <div style={{marginBottom: 20}}>
                        <label style={{margin: '20px 150px 5px 150px'}}>First Name</label>
                        <input 
                            type="text" 
                            placeholder="John" 
                            size={30} 
                            style={{margin: '0px 50px 25px 50px', borderRadius: "6px"}}
                            name="firstname"
                            // value={data.firstname}
                            onChange={onValueChange}
                        />
                        <label style={{margin: '5px 150px 5px 150px'}}>Last Name</label>
                        <input 
                            type="text" 
                            placeholder="Farmer" 
                            size={30}  
                            style={{margin: '0px 50px 25px 50px', borderRadius: "6px"}}
                            name="lastname"
                            // value={data.lastname}
                            onChange={onValueChange}
                        />
                        <label style={{margin: '5px 150px 5px 150px'}}>Tel. Number</label>
                        <input 
                            type="tel" 
                            pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}" 
                            required placeholder="02-999-9999" 
                            size={30}    
                            style={{margin: '0px 50px 25px 50px', borderRadius: "6px"}}
                            name="telnum"
                            // value={data.telnumber}
                            onChange={onValueChange}
                        />
                    </div>
                    <div>
                        <label style={{margin: '5px 150px 5px 150px'}}>E-mail</label>
                        <input 
                            type="text" 
                            placeholder="example@gmail.com" 
                            size={30}    
                            style={{margin: '0px 50px 25px 50px', borderRadius: "6px"}}
                            name="email"
                            // value={data.Email}
                            onChange={onValueChange}
                        />
                        <label style={{margin: '5px 150px 5px 150px'}}>Cell. Number</label>
                        <input 
                            type="tel" 
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                            required placeholder="089-999-9999" 
                            size={30}    
                            style={{margin: '0px 50px 25px 50px', borderRadius: "6px"}}
                            name="cellnum"
                            // value={data.cellnumber}
                            onChange={onValueChange}
                        />
                        
                    </div>
                </form>

        </div>
    }

    return(
        <div>
            <div>
                <div>
                <div className="content-wrapper font-sarabun">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">จัดการโปรไฟล์</h1>
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
                        <div class="d-flex justify-content-center">
                            <section className="col-lg-5 connectedSortable" style={{textAlign:"center"}}>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 class="card-title">
                                            ข้อมูลทั่วไป
                                        </h3>
                                    </div>
                                    <form style={{textAlign:"center"}}>
                                        <div style={{marginBottom: 20}}>
                                            <label style={{margin: '20px 150px 5px 150px'}}>First Name</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{ data.firstname }</label>
                                            </div>
                                            <label style={{margin: '5px 150px 5px 150px'}}>Last Name</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{data.lastname}</label>
                                            </div>
                                            <label style={{margin: '5px 150px 5px 150px'}}>Telephone Number</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{data.telnumber}</label>
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{margin: '5px 150px 5px 150px'}}>E-mail</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 10px 150px'}}>
                                                <label>{data.Email}</label>
                                            </div>
                                            <label style={{margin: '5px 150px 5px 150px'}}>Cellphone Number</label>
                                            <div style={{background: '#F0F0F0', margin: '10px 150px 20px 150px'}}>
                                                <label>{data.cellnumber}</label>
                                            </div>
                                        </div>
                                        <Button type="primary" onClick={(event)=>{onEditMode(event)}}>Edit</Button>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                {/* /.container-fluid */}
                </section>
                {/* /.content */}
                </div>
                </div>
                <Modal
                  title="ข้อมูลทั่วไป"
                  centered
                  style={{ top: 20 , left: 120}}
                  visible={visible}
                  onOk={(event)=>{onValueSubmit(event)}}
                  onCancel={(event)=>{onCancel(event)}}
                  width={500}
                >
                    {Edit}
                </Modal>
            </div>
        </div>
    );

}

export default Editprofile