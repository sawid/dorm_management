import { DatePicker, Space } from "antd";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { createRenter, listRenter, removeRenter } from "./function.components/renter";

function ManagementRenter() {
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
  const [ dataRenter, setDataRenter ] = useState({
        renterName: "",
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
    setDataRenter({...dataRenter, [e.target.name]:e.target.value });
    
  }

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
    listRenter(authtoken)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fillteredPosts = posts.filter((post) => {
    return post.renterName.toString().includes(searchText);
  });
  if (loading) {
    return <h2>loading...</h2>;
  }

  const handlePageClick = (data) => {
    console.log(data.selected);
    setCurrentPage(data.selected + 1);
  };

  const handleRemoveRenter = (renterId) => {
          console.log(renterId)
          removeRenter(user.token, renterId)
          .then(res => {
            console.log(res)
            loadData(user.token);
      })
      .catch(err => {
            console.log(err)
      })
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = fillteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleonCreate = () => {
    setShow(false);
    createRenter(user.token, dataRenter)
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
                <h1 className="m-0 text-dark">จัดการผู้เช่า</h1>
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
                สร้างรายชื่อผู้เช่าใหม่
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
                         ผู้เช่า {post.renterName}
                      </h5>
                    </div>
                    <div className="card-body">
                      
                      <h5 className="catd-subtitle mb-2 text-muted text-center">
                      {"เบอร์โทร : "}
                      { post.telNum === "None" ? "ไม่มี" : post.telNum }
                        
                      </h5>
                      <h5 className="catd-subtitle mb-2 text-muted text-center">
                        
                        
                      </h5>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          class="btn btn-outline-danger text-center m-3"
                          onClick={ () => handleRemoveRenter(post._id) }
                        >
                          ลบผู้เช่า {post.renterName}
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
          <Modal.Title>สร้างผู้เช่าใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">รหัสห้อง</span>
          </div>
          <input name="renterName" onChange={handleonChangeRoomName} type="text" class="form-control" placeholder="กรอกรหัสห้อง" aria-label="Username" aria-describedby="basic-addon1"/>
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
export default ManagementRenter;
