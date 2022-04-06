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
import Withnav from "./components/withnav.component";
import Loginpage from "./components/login.component";
import Withoutnav from "./components/withoutnav.component";

function App() {
  return (
    <div class="wrapper">
      <Router>
        <Header />
        <Menu />
        <Routes>
          <Route path="/" exact element={<Dashboard />}/>
          <Route path="/login" element={<Loginpage />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
