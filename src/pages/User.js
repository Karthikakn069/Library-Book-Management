import React from "react";
import Axios from "axios";
import { useState , useEffect } from "react";
import Pagination from "./Pagination";
import "../css/user.css";

function User(){
  const [data , setData] = useState([]);
  const [searchInput , setSearchInput] = useState("");
  const [searchOption , setSearchOption] = useState("id");
  const [currentPage , setCurrentPage] = useState(1)
  const[permData,setPermData] = useState([]);
  const [perPage] = useState(10);
  let nPages = Math.ceil(data.length / perPage);
  let lastRecord = currentPage * perPage;
  let firstRecord = lastRecord - perPage;
  //const currentRecords = data.slice(firstRecord , lastRecord);
  const [currentRecords , setCurrentRecords] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:3002/get_books').then((response)=>{
      setData(response.data);
      setPermData(response.data)
    });
  },[]);

  const searchHandle = () =>{
    if(searchInput.length > 0){
      let firows = [];
        Object.values(permData).filter((item) =>{
        const searchValue = `${item[searchOption]}`.toLocaleLowerCase();
        const arr = searchValue.match(`${searchInput}`);
        return arr!==null ? firows.push(item):null;
      });
      setData(firows);
      setCurrentPage(1);
      return setData(firows);
    }
    else{
        Axios.get('http://localhost:3002/get_books').then((response)=>{
        setData(response.data);
        setCurrentRecords(response.data.slice(firstRecord, lastRecord));
      });
    }
  }
  useEffect(()=>{
    setCurrentRecords(data.slice(firstRecord, lastRecord));
  },[data,firstRecord,lastRecord]);
  
  return(
    <div className="user-outer">
      <div className="search-head">
          <h3>Filter rows :</h3>
      </div>
      <div>
        <div className="search-bar">
          <div className="search-options">
            <select name="type-select" id="select" className="se-opt" onChange={(e)=>{setSearchOption(e.target.value);}}>
              <option value="id">Id</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="subject">Subject</option>
              <option value="publish_year">Publish Year</option>
            </select>
          </div>
          <div className="search-input">
            <input type="text" name="search-in" id="search-in" onChange={(e)=>{setSearchInput(e.target.value);}}/>
            <button onClick={searchHandle}>Filter</button>
          </div>
        </div>
      </div>
      <div className="user-inner">
        <table className = "table-outer">
          <thead className="table-head">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Publish Year</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {Object.keys(currentRecords).map((key)=>{
              return(
                <tr key={key}>
                  <td>{currentRecords[key].id}</td>
                  <td>{currentRecords[key].title}</td>
                  <td>{currentRecords[key].author}</td>
                  <td>{currentRecords[key].subject}</td>
                  <td>{currentRecords[key].publish_year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination nPages = {nPages} currentPage = {currentPage} setCurrentPage = {setCurrentPage} />
    </div>
  )

}

export default User;