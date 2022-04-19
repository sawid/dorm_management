import React, { Component } from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { DatePicker, Space } from 'antd';
import { Table, Tag} from 'antd';
const { Column } = Table;

const data = [
  {
    key: '1',
    id: '101',
    lastName: '',
    age: "",
    address: '',
    tags: ['ไม่ว่าง'],
  },
  {
    key: '2',
    id: '102',
    lastName: '',
    age: "",
    address: '',
    tags: ['ว่าง'],
  },
  {
    key: '3',
    id: '103',
    lastName: '',
    age: "",
    address: '',
    tags: ['ว่าง'],
  },
];


const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
export default function Managemeter () {

  const { user } = useSelector((state) => ({...state}))
  const [ data, setData ] = useState([]);


  return (
    <div>

      {/* <h1>{post.title}</h1>
      <p>{post.userId}</p> */}
      
      <div>
          <div className="content-wrapper font-sarabun">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  {/* /.col */}
                  <div className="col-sm-12">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">จัดการมิเตอร์</a>
                      </li>
                      <li className="breadcrumb-item active">ระบบจัดการหอพัก</li>
                    </ol>
                  </div>
                  <div className="col-sm-12">
                    <div className="card" style={{margin: "auto",padding: "10px 100px 10px 100px", width: "60%", textAlign: "center"}}>
                        <h1 className="m-0 text-dark">เลือกรอบมิเตอร์</h1>
                        <Space direction="vertical" style={{margin: "20px 0px 20px 0px"}}>
                            <DatePicker picker="month" />
                        </Space>
                    </div>
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
              {/* /.container-fluid */}



              <div>
                <div className="row" style={{textAlign: "center"}}>
                  {/* /.col */}
                  <div className="col-sm-3"></div>

                  <div className="col-sm-3">
                    <div className="card" style={{textAlign: "center"}}>
                        <h1 className="m-0 text-dark" style={{fontSize: "20px", padding: "10px"}}>จอมิเตอร์ค่าน้ำ</h1>
                        <div>
                            {/* <p>ราคาต่อหน่วย</p>
                            <input size={2}></input>
                            <p>บาท</p> */}
                            <p>ราคาต่อหน่วย . . . บาท</p>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="card" style={{textAlign: "center"}}>
                        <h1 className="m-0 text-dark" style={{fontSize: "20px", padding: "10px"}}>จอมิเตอร์ค่าไฟฟ้า</h1>
                        <div>
                            {/* <p>ราคาต่อหน่วย</p>
                            <input size={2}></input>
                            <p>บาท</p> */}
                            <p>ราคาต่อหน่วย . . . บาท</p>
                        </div>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                <div className="row">
                <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                    <div className="card">
                      <Table dataSource={data}>
                          <Column title="ห้อง" dataIndex="id" key="id" />
                          <Column
                            title="สถานะห้อง"
                            dataIndex="tags"
                            key="tags"
                            render={tags => (
                              <>
                                {tags.map(tag => {
                                  let color = tag.length > 4 ? 'green' : 'red';
                                  return (
                                    <Tag color={color} key={tag}>
                                      {tag.toUpperCase()}
                                    </Tag>
                                  );
                                })}
                              </>
                            )}
                          />
                          <Column title="หน่วยที่ใช้เดือนที่แล้ว" dataIndex="lastName" key="lastName" />
                          <Column title="หน่วยที่ใช้เดือนนี้" dataIndex="age" key="age" />
                          <Column title="ราคาที่ต้องจ่าย" dataIndex="address" key="address" />
                      </Table>
                    </div>
                  </div>
                </div>
              </div>   



            </section>
            {/* /.content */}
          </div>
        </div>


    </div>
  );
}







































// export default class Managemeter extends Component {

//     render() {
//       return (
//         <div>
//            <ul>
//             {
//               this.state.persons.map(person =>
//                   <li key={person.id}>{person.name}</li>
                  
//               )
                
//             }
//           </ul>
//           <div className="content-wrapper font-sarabun">
//             {/* Content Header (Page header) */}
//             <div className="content-header">
//               <div className="container-fluid">
//                 <div className="row mb-2">
//                   {/* /.col */}
//                   <div className="col-sm-12">
//                     <ol className="breadcrumb float-sm-right">
//                       <li className="breadcrumb-item">
//                         <a href="#">จัดการมิเตอร์</a>
//                       </li>
//                       <li className="breadcrumb-item active">ระบบจัดการหอพัก</li>
//                     </ol>
//                   </div>
//                   <div className="col-sm-12">
//                     <div className="card" style={{margin: "auto",padding: "10px 100px 10px 100px", width: "60%", textAlign: "center"}}>
//                         <h1 className="m-0 text-dark">เลือกรอบมิเตอร์</h1>
//                         <Space direction="vertical" style={{margin: "20px 0px 20px 0px"}}>
//                             <DatePicker picker="month" />
//                         </Space>
//                     </div>
//                   </div>
//                   {/* /.col */}
//                 </div>
//                 {/* /.row */}
//               </div>
//               {/* /.container-fluid */}
//             </div>
//             {/* /.content-header */}
//             {/* Main content */}
//             <section className="content">
//               {/* /.container-fluid */}



//               <div>
//                 <div className="row" style={{textAlign: "center"}}>
//                   {/* /.col */}
//                   <div className="col-sm-3"></div>

//                   <div className="col-sm-3">
//                     <div className="card" style={{textAlign: "center"}}>
//                         <h1 className="m-0 text-dark" style={{fontSize: "20px", padding: "10px"}}>จอมิเตอร์ค่าน้ำ</h1>
//                         <div>
//                             {/* <p>ราคาต่อหน่วย</p>
//                             <input size={2}></input>
//                             <p>บาท</p> */}
//                             <p>ราคาต่อหน่วย . . . บาท</p>
//                         </div>
//                     </div>
//                   </div>
//                   <div className="col-sm-3">
//                     <div className="card" style={{textAlign: "center"}}>
//                         <h1 className="m-0 text-dark" style={{fontSize: "20px", padding: "10px"}}>จอมิเตอร์ค่าไฟฟ้า</h1>
//                         <div>
//                             {/* <p>ราคาต่อหน่วย</p>
//                             <input size={2}></input>
//                             <p>บาท</p> */}
//                             <p>ราคาต่อหน่วย . . . บาท</p>
//                         </div>
//                     </div>
//                   </div>
//                   {/* /.col */}
//                 </div>
//                 <div className="row">
//                 <div className="col-sm-1"></div>
//                   <div className="col-sm-10">
//                     <div className="card">
//                       <Table dataSource={data}>
//                           <Column title="ห้อง" dataIndex="firstName" key="1" />
//                           <Column
//                             title="สถานะห้อง"
//                             dataIndex="tags"
//                             key="tags"
//                             render={tags => (
//                               <>
//                                 {tags.map(tag => {
//                                   let color = tag.length > 4 ? 'green' : 'red';
//                                   return (
//                                     <Tag color={color} key={tag}>
//                                       {tag.toUpperCase()}
//                                     </Tag>
//                                   );
//                                 })}
//                               </>
//                             )}
//                           />
//                           <Column title="หน่วยที่ใช้เดือนที่แล้ว" dataIndex="lastName" key="lastName" />
//                           <Column title="หน่วยที่ใช้เดือนนี้" dataIndex="age" key="age" />
//                           <Column title="ราคาที่ต้องจ่าย" dataIndex="address" key="address" />
//                       </Table>
//                     </div>
//                   </div>
//                 </div>
//               </div>   



//             </section>
//             {/* /.content */}
//           </div>
//         </div>
//       );
//     }
//   }
  