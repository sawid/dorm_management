import React from 'react'

const Header = () => {
  return (
    <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#">
                <i className="fas fa-bars" />
              </a>
            </li>
            
          </ul>
          
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            
            {/* Notifications Dropdown Menu */}
            
            
          </ul>
        </nav>
      </div>
  )
}

export default Header