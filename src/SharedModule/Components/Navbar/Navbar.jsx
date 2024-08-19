import React from 'react'
import logo from "../../../assets/images/4.png";
import avatar from "../../../assets/images/avatar.png";
export default function Navbar({adminData}) {
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">

      <img src={logo} alt="logo" className='container-fluid w-50'/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
      <li className="nav-item text-white">
          <img src={avatar} alt='user avatar'/>
          </li>
        <li className="nav-item text-white">
         
          <a className="nav-link" href="#">{adminData?.userName}</a>
        </li>
    
      </ul>
   
    </div>
  </div>
</nav>
    </div>
  )
}
