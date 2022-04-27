import React, { Component } from 'react'

import jsPDF from "jspdf";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// file pdf 
import agreement from './image/agreement.pdf';

import { Worker } from '@react-pdf-viewer/core';
// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { readRoom , resetVaule } from "./function.components/room";

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getFile, uploadFile } from './function.components/printDoc';

const Printagreement = () => {
    let { id } = useParams(); 
    const { user } = useSelector((state) => ({ ...state }));
    const [ data, setData ] = useState([]);
    const filePathData = "http://localhost:5000/api/uploads/"
    const [ fileData, setfileData ] = useState({
        selectedFile: null,
    });
    const [ urlPath , setUrlPath ] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            fileData.selectedFile,
            fileData.selectedFile.name
          );
        console.log(formData)
        uploadFile(user.token, id, formData)
        .then(res => {
            console.log(res)
            window.location.reload();
        })
        .catch(err => {
                console.log(err);
        })
    }

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

    const loadDataPDF = (authtoken, id) => {
      getFile(authtoken, id)
      .then(res => {
        const file = new Blob([res.data], {
            type: "application/pdf"
          });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          console.log(fileURL)
          setUrlPath(fileURL);

      })
      .catch(err => {
              console.log(err);
      })
    };

      useEffect(() => {
        loadData(user.token, id);
        loadDataPDF(user.token, id);
      },[])
      

    const handleonChangeFile = (e) => {
        setfileData({ selectedFile: e.target.files[0] });
      
    }

    console.log(fileData)

    return (
        <div>
            <div className="content-wrapper font-sarabun">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">สัญญาหอพัก</h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">รายงานผล</a>
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
                    <div className='container-fluid'>
                        <div class="container">
                            <div class="row">
                                <div class="col-auto me-auto"> <h1>ห้อง { data.roomName }</h1> </div>
                                <div class="col-auto">
                                    <a
                                        href={agreement} download="สัญญาหอพัก" target='_blank'>
                                        <button type="button" class="btn btn-danger" >ดาวน์โหลดร่างสัญญา</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/*upload*/}

                        <form className='' onSubmit={handleSubmit} enctype="multipart/form-data">
                          <div className='col-lg-8'>
                          <input type="file" class="form-control" name="selectedFile" onChange={handleonChangeFile}/>
                          </div>
                          <div className='col-lg-2'>
                          <button className='btn btn-primary form-control' type='submit'>Submit</button>
                          </div>
                          
                          
                        </form>
                        {/* pdf viewer */}
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '750px',
                                }}
                            >
                                <Viewer fileUrl={ data.contactPath === "none" ? agreement : "http://localhost:5000/api/uploads/" + data._id } />
                            </div>
                        </Worker>

                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>

    )
}

export default Printagreement

