import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomName, readBill} from "./function.components/bill";
//Import jspdf **make pdf
import jsPDF from "jspdf";
//Import table to make in pdf
import 'jspdf-autotable'
//Import qr code image 
import imagebill from './image/image_printbill1.jpeg';
//Import font thai Sarabun
import "./font/Sarabun-Regular-normal.js";




const Printbill = () => {

    let { id } = useParams();
    const { user } = useSelector((state) => ({ ...state }))
    const [data, setData] = useState([]);
    const [ dataRoomName , setdataRoomName] = useState([]);
    const [values, setValues] = useState({
        rentalFee: "",
        electricUnitPrice: "",
        waterUnitPrice: "",
        rentalNet: "",
    });

    const loadData = (authtoken, values) => {
        readBill(authtoken, values)
            .then(res => {
                setData(res.data)

            })
            .catch(err => {
                console.log(err);
            })
    };

    const loadDataRoomName = (authtoken, values) => {
        getRoomName(authtoken, values)
            .then(res => {
                setdataRoomName(res.data)

            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleonChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value });
      }
    useEffect(() => {
        loadData(user.token, id);
        loadDataRoomName(user.token, id);
    }, [])

    console.log(dataRoomName)
    console.log(data)
    const UnitPrice = (thisMonth, lastMonth) => {
        if (lastMonth > thisMonth) {
          return thisMonth - lastMonth + 9999;
        } else {
          return thisMonth - lastMonth;
        }
    };
    
   
    const SavePDF = () => {
        
        
        const doc = new jsPDF('l', 'mm', [130, 210]);
        const fontSize = 10;
        doc.setFontSize(fontSize);
        const dorm_name = "สุขใจ อพาร์ตเม้นท์"
        const rental_price = data.rentalFee, rental_quantity = 1, rental_totals = rental_price * rental_quantity
        const electricity_price = UnitPrice(data.electricUnitThisMonth ,data.electricUnitLastMonth), electricity_quantity = 7, electricity_totals = electricity_price * electricity_quantity
        const water_price = UnitPrice(data.waterUnitThisMonth,data.waterUnitLastMonth), water_quantity = 18, water_totals = water_price * water_quantity
        const common_price = data.rentalNet, common_quantity = 1, common_totals = common_price * common_quantity
        const totals = rental_totals + electricity_totals + water_totals + common_totals
        //set & add font
        doc.autoTable({ html: '#my-table' })
        doc.addFont('Sarabun-Regular-normal.ttf', 'Sarabun-Regular', 'normal');
        doc.setFont('Sarabun-Regular');
        // Or use javascript directly:
        doc.autoTable({
            head: [['รายการ /Fee Item', 'ราคาต่อหน่วย (บาท) /Price (Baht)', 'จำนวนหน่วย /Quantity', 'จำนวนเงิน (บาท) /Tatals (Baht)']],
            body: [
                ['ค่าเช่า(Rental)', rental_price, rental_quantity, rental_totals],
                ['ค่าไฟฟ้า(Electricity)', electricity_price, electricity_quantity, electricity_totals],
                ['ค่าน้ำ(Water)', water_price, water_quantity, water_totals],
                ['ค่าส่วนกลาง(Common fee)', common_price, common_quantity, common_totals],
                
            ],
            styles: {font: 'Sarabun-Regular'}
        })

        doc.addImage(imagebill, 'JPEG', 120, 78, 50, 45);
        doc.text(dorm_name, 14, 15);
        doc.text("ห้อง : "+ dataRoomName , 100, 15);
        doc.text(" ใบแจ้งหนี้ ( Invoice ) ", 160, 15);
        doc.text(" หมายเหตุ ( Note )  : ", 15, 75);
        doc.text(" หมายเลข (Bank Account No.) : " + "XXX-XXXXXX-X", 15, 85);
        doc.text(" ธนาคาร (Bank) : " + "กสิกร (KBank)", 15, 92);
        doc.text(" รวมทั้งหมด (Totals) : " + totals, 120, 75);
        doc.save('บิลหอพัก.pdf');
    }


    return (
        <div>
            <div className="content-wrapper font-sarabun">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">บิลหอพัก</h1>
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
                                <div class="col-auto me-auto"><h1>ห้อง {dataRoomName}</h1></div>
                                <div class="col-auto "><button onClick={SavePDF} type="button" class="btn btn-danger" >ดาวน์โหลด</button></div>
                            </div>
                        </div>

                        <h2></h2>
                        <div class="container">
                            <div class="row">
                                <div class="col-auto me-auto"> <h6>สุขใจ อพาร์ตเม้นท์</h6> </div>
                                <div class="col-auto me-auto"> <h6>ห้อง : {dataRoomName}</h6> </div>
                                <div class="col-auto"> <h6> ใบแจ้งหนี้ ( Invoice )</h6> </div>
                            </div>
                        </div>
                        <h2></h2>
                        <h2></h2>
                        {/*table*/}
                        <table class="table table-borderless">
                            <thead>
                                <tr class="table-primary">
                                    <th scope="col">รายการ /Free Item</th>
                                    <th scope="col">ราคาต่อหน่วย (บาท) /Price (Baht)</th>
                                    <th scope="col">จำนวนหน่วย /Quantity</th>
                                    <th scope="col">จำนวนเงิน (บาท) /Tatals (Baht)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-secondary">
                                    <th scope="row">ค่าเช่า(Rental)</th>
                                    <td>{data.rentalFee}</td>
                                    <td>1</td>
                                    <td>{1*data.rentalFee}</td>
                                </tr>
                                <tr>
                                    <th scope="row">ค่าไฟฟ้า(Electricity)</th>
                                    <td>{UnitPrice(data.electricUnitThisMonth ,data.electricUnitLastMonth)}</td>
                                    <td>7</td>
                                    <td>{7* (UnitPrice(data.electricUnitThisMonth ,data.electricUnitLastMonth) )}</td>
                                </tr>
                                <tr class="table-secondary">
                                    <th scope="row">ค่าน้ำ(Water)</th>
                                    <td >{UnitPrice(data.waterUnitThisMonth,data.waterUnitLastMonth)}</td>
                                    <td>18</td>
                                    <td>{18* (UnitPrice(data.waterUnitThisMonth,data.waterUnitLastMonth ))}</td>
                                </tr>
                                <tr>
                                    <th scope="row">ค่าส่วนกลาง(Common fee)</th>
                                    <td >{data.rentalNet}</td>
                                    <td>1</td>
                                    <td>{1*data.rentalNet}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4"><h6>หมายเหตุ ( Note )  :  :</h6></div>
                                <div class="col-md-4 ms-auto"><h6>รวมทั้งหมด(Totals) : {data.rentalFee+(7*UnitPrice(data.electricUnitThisMonth ,data.electricUnitLastMonth))
                            + (18*UnitPrice(data.waterUnitThisMonth ,data.waterUnitLastMonth)) + data.rentalNet}</h6></div>
                            </div>
                        </div>
                        <br />
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <h6>
                                        <br />หมายเลข(Bank Account No.) : XXX-XXXXXX-X
                                        <br />
                                        <br />ธนาคาร(Bank) : กสิกร (KBank)

                                    </h6>
                                </div>
                                <div class="col-md-4 ms-auto"><img src={imagebill} width='230' /></div>
                            </div>
                        </div>

                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>

    )
}

export default Printbill

