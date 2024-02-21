import React from "react";
import {Link , useNavigate} from "react-router-dom"; 
import logo from "../images/library book logo.png";
import "../css/header.css";
function Header(){
  const navigate = useNavigate();
  const adminHandle =() =>{
    const pas = prompt("Enter the password for admin page")
    if(pas !== "admin123"){
      alert("Admin access denied! Redirecting to Home Page");
      return navigate('/');
    }
    else{
      return navigate('/admin');
    }
  }
  return(
    <div>
      <div className = "header">
        <div className = "header-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className = "header-mid">
          <h3>Library Book Management</h3>
        </div>
        <div className="header-links">
          <div className = "left-link"><Link to='/user'>User</Link></div>
          <div className = "left-link"><Link onClick={adminHandle}>Admin</Link></div>
        </div>
      </div>
      <hr />
    </div>
    
  )
}
export default Header;