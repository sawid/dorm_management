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

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Printagreement = () => {
    
    // ant design upload file
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


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
                                <div class="col-auto me-auto"> <h1>ห้อง1234</h1> </div>
                                <div class="col-auto">
                                    <a
                                        href={agreement} download="สัญญาหอพัก" target='_blank'>
                                        <button type="button" class="btn btn-danger" >ดาวน์โหลด</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/*upload*/}

                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        {/* pdf viewer */}
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '750px',
                                }}
                            >
                                <Viewer fileUrl={agreement} />
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

