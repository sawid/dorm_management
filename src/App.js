import MainPage from "./components/main-page.component";
import Menu from "./components/sidebar.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import Dashboard from "./components/dashboard.component";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div class="wrapper">
    <Router>
      <Header/>
      <Menu/>
      <Dashboard/>
      <Footer/>
      <div className="App">
          <nav className="navbar navbar-dark bg-dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} className="nav-link">
                  React Dorm System
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/"} className="nav-link">
                    main
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </nav>
        <Container>
          <Row>
            <Col md="12">
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<MainPage />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
    </div>
  );
}

export default App;
