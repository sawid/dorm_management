import { DatePicker,Space } from "antd";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import { listBills ,createBill} from "./function.components/billmana";

import { Modal, Button } from "react-bootstrap";
import { message } from 'antd';

import moment from "moment";

import { useNavigate } from "react-router-dom";


function Billmanage(){
    const { user } = useSelector((state) => ({...state}))
    const [data, setData] = useState([]);
    const [posts,setPosts] = useState([]);
    const [postDate,setPostDate] = useState('')
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(9);
    const [searchText,setSearchText]=useState('');
  const navigate = useNavigate();
   // Modal
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

    
    
    const loadData = (authtoken) => {
            listBills(authtoken)
            .then(res => {
                    setData(res.data)
                    setPosts(res.data);
                })
                .catch(err => {
                        console.log(err);
                    })
                };
    useEffect(()=> {
        setLoading(true)
        loadData(user.token)
        setLoading(false)
    }, []);
    const fillteredPosts = posts.filter((post)=>{       
        return post.roomId.includes(searchText);
      })
   
        
    if(loading){
        return <h2>loading...</h2>
    }
    const handlePageClick = (data)=>{
        console.log(data.selected)
        setCurrentPage(data.selected + 1)
    };
    var notPayed = data.filter(post => post.isBillNotified == false)
    var payed = data.filter(post => post.isBillNotified == true)


    function showAll() {
      setPosts(data)
    }

    const separator = (numb) => {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    };

    const UnitPrice = (thisMonth, lastMonth) => {
      if (lastMonth > thisMonth) {
        return thisMonth - lastMonth + 9999;
      } else {
        return thisMonth - lastMonth;
      }
    };
    const maxLengthCheck = (object) => {
      if (object.target.value.length > object.target.maxLength) {
        object.target.value = object.target.value.slice(
          0,
          object.target.maxLength
        );
      }
    };
  
    const preventMinus = (e) => {
      if (
        e.code === "Minus" ||
        e.code === "NumpadSubtract" ||
        e.code === "KeyE" 
      ) {
        e.preventDefault();
      }
    };
  
    
    const preventRoomSearchBug = (e) => {
      if (
        e.code === "Period" ||
        e.code === "NumpadDecimal" ||
        e.code === "Minus" ||
        e.code === "NumpadSubtract" ||
        e.code === "KeyE" 
      ) {
        e.preventDefault();
      }
    };
  
    const preventPasteNegative = (e) => {
      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedData = parseFloat(clipboardData.getData("text"));
  
      if (pastedData < 0) {
        e.preventDefault();
      }
    };
    function makeBill(event){
      setShow(false);
      event.preventDefault();
      let min=Number(event.target.min.value) 
      let max=Number(event.target.max.value) 
      for(let i=min;i<=max;i++){
        const value = {
          roomId: i,
          month: moment().format('MMM'),
          rentalFee: event.target.price.value,
        };
        createBill(user.token, value)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
    function showNotPayed() {
      setPosts(notPayed)
    }
    function showPayed(){
      setPosts(payed)
    }
    async function fillterDate(date){
      await setPostDate(date)
      console.log(date+' and '+postDate)    
      let fillteredPostDate = data.filter((post)=>{ 
        return moment(post.createdAt).format("MMM YY") === date
      })
      setPosts(fillteredPostDate)
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = fillteredPosts.slice(indexOfFirstPost,indexOfLastPost);
            
    return (
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
                        <a href="#">จัดการบิล</a>
                      </li>
                      <li className="breadcrumb-item active">ระบบจัดการหอพัก</li>
                    </ol>
                  </div>
                  <div className="col-sm-12">
                    <div className="card" style={{margin: "auto",padding: "10px 100px 10px 100px", width: "60%", textAlign: "center"}}>
                        <h1 className="m-0 text-dark">เลือกรอบบิล {postDate}</h1>
                        <Space direction="vertical" style={{margin: "20px 0px 20px 0px"}}>
                            <DatePicker picker="month" onChange={(date)=>fillterDate(moment(date).format("MMM YY"))}/>
                        </Space>
                    </div>
                    <span>
                   
                    </span>
                    
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
              <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchText}
                onChange={(event)=>{setSearchText(event.target.value)}}/>
                    <button type="button" class="btn btn-outline-success my-2 my-sm-0 m-2" onClick={showAll}>แสดงทั้งหมด</button>
                    <button type="button" class="btn btn-outline-danger m-2" onClick={showNotPayed}>ยังไม่จ่าย</button>
                    <button type="button" class="btn btn-outline-primary m-2" onClick={showPayed}>จ่ายแล้ว</button>
                    <button type="button" class="btn btn-outline-success m-2" onClick={handleShow}>
                สร้างห้อง
              </button>
                </form>
            </nav>
                
            <div className="row m-2">
             {
            currentPosts.map(post =>{
              return <div className="col-sm-6 col-md-4 v my-2">
                <div className="card shadow-sm w-100 " style={{ minHeight:175}}>
                <div className="card-header">
                    <h5 className="catd-title text-center h3 mt-2">
                        {post.isBillNotified === true ? "🟢" : "🔴"} ห้องพัก {post.roomId}
                      </h5>
                    </div>
                <div className="card-body">
                    <h6 className="catd-title text-center h2">{moment(post.createdAt).format('MMM YY')}</h6>
                    <h5 className="catd-subtitle mb-2 text-muted text-center">{separator(
                      post.rentalFee +
                        7 *
                          UnitPrice(
                            post.electricUnitThisMonth,
                            post.electricUnitLastMonth
                          ) +
                        18 *
                          UnitPrice(
                            post.waterUnitThisMonth,
                            post.waterUnitLastMonth
                          ) +
                        post.rentalNet)} บาท</h5>
                    <div className="d-flex justify-content-center">
                    <button type="button" class="btn btn-success text-center m-4" onClick={() => navigate('/Billgenerate/' + post._id)}>ดูรายละเอียดของบิล {post.roomName}</button>
                    
                </div>
                </div>
                </div>
                </div>
            }
            )
            }
            <Modal className="font-sarabun" show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>สร้างห้องพักใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(event)=>makeBill(event)}>
        <div class="form-group">
          <label for="exampleInputEmail1">room</label>
          <input class="form-control mb-3" id="min"type="number" placeholder="min" maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}/>
          <input class="form-control" id="max"type="number" placeholder="max" maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">price</label>
          <input class="form-control" id="price" type="number" placeholder="Default input" maxLength="4"
              min="0"
              onInput={maxLengthCheck}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}/>
        </div>
        <button type="submit" class="btn btn-primary m-3">make</button>
        <button type="button" class="btn btn-primary" onClick={handleClose}>cancel</button>
      </form>
        </Modal.Body>
      </Modal>
            </div>
            <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={fillteredPosts.length/postsPerPage}
            previousLabel={'<<'}
            nextLabel={'>>'}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'paeg-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            />
            </section>
            {/* /.content */}
          </div>
        </div>
    )
}
export default Billmanage;