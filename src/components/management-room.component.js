import { DatePicker, Space } from "antd";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createRoom, listRoom } from "./function.components/room";
import { Modal, Button } from "react-bootstrap";

function ManagementRoom() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(8);
  const [searchText, setSearchText] = useState("");
  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Data Input
  const [ dataRoom, setdataRoom ] = useState({
    roomName: "",
  });

  // const loadData = (authtoken) => {
  //         listBills(authtoken)
  //         .then(res => {
  //                 setPosts(res.data);
  //             })
  //             .catch(err => {
  //                     console.log(err);
  //                 })
  //             };

  const handleonChangeRoomName = (e) => {
    setdataRoom({...dataRoom, [e.target.name]:e.target.value });
    
  }
  console.log(dataRoom)

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  useEffect(() => {
    setLoading(true);
    loadData(user.token);
    // loadData(user.token)
    setLoading(false);
  }, []);

  const loadData = (authtoken) => {
    listRoom(authtoken)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fillteredPosts = posts.filter((post) => {
    return post.roomName.toString().includes(searchText);
  });
  if (loading) {
    return <h2>loading...</h2>;
  }

  const handlePageClick = (data) => {
    console.log(data.selected);
    setCurrentPage(data.selected + 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = fillteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleonCreate = () => {
    setShow(false);
    createRoom(user.token, dataRoom)
    .then(res => {
          console.log(res)
          loadData(user.token);
    })
    .catch(err => {
          console.log(err)
    })
    // console.log(dataRoom.roomName)
}

  return (
    <div>
      <div className="content-wrapper font-sarabun">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">จัดการห้องพัก</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">จัดการห้องพัก</a>
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
          {/* /.container-fluid */}
          

          <div className="row m-2">
          <form class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
              />
              
              <button type="button" class="btn btn-outline-success m-2" onClick={handleShow}>
                สร้างห้อง
              </button>
              <button type="button" class="btn btn-outline-primary m-2">
                แจ้งทุกห้อง
              </button>
            </form>
            {currentPosts.map((post) => {
              return (
                <div className="col-sm-6 col-md-3 v my-2">
                  <div
                    className="card shadow-sm w-100 "
                    style={{ minHeight: 175 }}
                  >
                    <div className="card-header">
                    <h5 className="catd-title text-center h3 mt-2">
                        {post.status === "empty" ? "🟢" : "🔴"} ห้องพัก {post.roomName}
                      </h5>
                    </div>
                    <div className="card-body">
                      
                      <h5 className="catd-subtitle mb-2 text-muted text-center">
                        {"สถานะ : "}
                        {post.status === "empty" ? <b style={{ color: "#73d13d" }}>ว่าง</b> : <b style={{ color: "#ff4d4f" }}>ไม่ว่าง</b>}{" "}
                        
                      </h5>
                      <h5 className="catd-subtitle mb-2 text-muted text-center">
                        {"ประเภท : "}
                        {post.room_type === "fan" ? <b>พัดลม</b> : <b>แอร์</b>}{" "}
                        
                      </h5>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          class="btn btn-outline-success text-center m-3"
                          onClick={() => navigate('/roomdetail')}
                        >
                          ดูรายละเอียดของห้อง {post.roomName}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={posts.length / postsPerPage}
            previousLabel={"<<"}
            nextLabel={">>"}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"paeg-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </section>
        {/* /.content */}
      </div>
      <Modal className="font-sarabun" show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>สร้างห้องพักใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">รหัสห้อง</span>
          </div>
          <input name="roomName" onChange={handleonChangeRoomName} type="text" class="form-control" placeholder="กรอกรหัสห้อง" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleonCreate}>
            ยืนยันการสร้างห้อง
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ManagementRoom;
