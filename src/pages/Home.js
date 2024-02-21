import React from "react";
import Header from "./Header";
import {Outlet} from "react-router-dom";
function Home(){
  return(
    <div className = "home-outer">
      <Header />
      <div id = "detail">
        <Outlet />
      </div>
    </div>
  )
}

export default Home;