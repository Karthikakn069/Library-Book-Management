import React, { useState } from "react";
import {Link , useNavigate} from "react-router-dom"; 
import logo from "../images/library book logo.png";
import "../css/header.css";
function Header(){
  const navigate = useNavigate();
  const [showInput,setShowInput] = useState(false);
  const adminHandle = () =>{
    const pass = document.getElementById("admin-in").value;
    if(pass !== "admin123"){
      alert("wrong admin password");
      navigate('/');
    }
    else{
      navigate('/admin'); 
    }
    setShowInput(false);
  }
  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowInput(true);
  }
  function InputHandler(){
    return(
      <div className = {showInput === false ?"d-none":"d-show"}>
        <div className="ad-input">
            <label htmlFor="admin-in" style={{"marginBottom" :"10px"}}>ENTER ADMIN PASS :</label>
            <input type="text" name="admin-in" id="admin-in" style={{"marginBottom" :"10px"}} />
            <div style={{display:"flex" , justifyContent : "space-around"}} className="admin-button">
              <button onClick={adminHandle}>submit</button>
              <button onClick={(e)=>{e.preventDefault();setShowInput(false);}}>close</button>
            </div>
        </div>
      </div>
    )
  }
  return(
    <div>
      <InputHandler />
      <div className = "header">
        <div className = "header-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className = "header-mid">
          <h3>Library Book Management</h3>
        </div>
        <div className="header-links">
          <div className = "left-link"><Link to='/user'>User</Link></div>
          <div className = "left-link"><Link onClick={handleAdminClick}>Admin</Link></div>
        </div>
      </div>
      <hr />
    </div>
    
  )
}
export default Header;