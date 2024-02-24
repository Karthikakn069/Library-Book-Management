import React from "react";
import Axios from "axios";
import { useState , useEffect } from "react";
import Pagination from "./Pagination";
import "../css/user.css";
import {useNavigate} from "react-router-dom";


function Admin(){
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
  const [isEditableRow , setIsEditableRow] = useState([]);
  const navigate = useNavigate();
  const [newId , setnewId] = useState("");
  const [newTitle , setNewTitle] = useState("");
  const [newAuthor , setNewAuthor] = useState("");
  const [newSubject , setNewSubject] = useState("");
  const [newYear , setNewYear] = useState("");


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

  useEffect(()=>{
    setIsEditableRow(Array.from({ length: currentRecords.length }, () => false));
  },[currentRecords.length])


  const updateHandle = (props) =>{
    const updatedEditableRows = [...isEditableRow];
    updatedEditableRows[props] = true;
    setIsEditableRow(updatedEditableRows);
  }

  const setHandle = (props , orgId)=>{
    //console.log(currentRecords[props].publish_year);
    //console.log(orgId);
    if(currentRecords[props].publish_year < 0 || currentRecords[props].publish_year > 2024 ){
      alert("Enter a valid Year");
      return ;
    }
    //return console.log(Number(currentRecords[props].id));
    if(isNaN(Number(currentRecords[props].id))){
      return alert("Enter a valid Id");
    }
    Axios.post('http://localhost:3002/update_book',{id : orgId , upId : currentRecords[props].id , upTitle : currentRecords[props].title , upAuthor : currentRecords[props].author , upSubject : currentRecords[props].subject , upYear : currentRecords[props].publish_year })
    .then((response)=>{
      //console.log(response);
      if(response.data.errno === 1062){
         alert("This id has been already used");
         return ;
      }
      else if(response.data.errno === 1366 || response.data.errno === 1265){
        alert("Enter a valid year");
        return ;
      }
      const updatedEditableRows = [...isEditableRow];
      updatedEditableRows[props] = false;
      setIsEditableRow(updatedEditableRows);
    })
  }


  const deleteHandle = (id) => {
    Axios.delete(`http://localhost:3002/delete_book/${id}`).then((response)=>{
      console.log(response);
      navigate(0);
    })

  }

  const cancelHandle = (key,id,title,author,subject,publishYear) => {
    currentRecords[key].id = id;
    currentRecords[key].title = title;
    currentRecords[key].author = author;
    currentRecords[key].subject = subject;
    currentRecords[key].publish_year = publishYear;
    setCurrentRecords(currentRecords);
    const updatedEditableRows = [...isEditableRow];
    updatedEditableRows[key] = false;
    setIsEditableRow(updatedEditableRows);
  }

  const addRowHandle = () =>{
    //console.log(newId,newTitle,newAuthor,newSubject,newYear);
    if(newId === "" || newTitle === "" || newAuthor === "" || newSubject === "" || newYear === ""){
      return alert("Fill all the input fields to add row");
    }
    if(isNaN(newId)){
      return alert("Enter a valid id");
    }
    if(isNaN(newYear) || newYear < 0 || newYear > 2024){
      return alert("Enter a valid year");
    }
    Axios.put('http://localhost:3002/add_book' , {id : newId , title : newTitle , author : newAuthor , subject :newSubject , year : newYear})
    .then((response)=>{
      console.log(response);
      if(response.data.errno === 1062){
        return alert("The book id or title already in taken");
      }
    })
    return navigate(0);
  }


  return(
    <div className="user-outer">
      <div>
        <div className="search-head">
          <h3>Filter rows :</h3>
        </div>
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
        <div className="add-rows">
          <div className="add-row-head"><h3>Add new row :</h3></div>
          <div className="add-row-ele">
            <div className="ar-in">
              <label htmlFor="add-id">Id :</label>
              <input type="text" name="add-id" id="add-id" value = {newId} onChange={(e)=>{setnewId(e.target.value)}} />
            </div>
            <div className="ar-in">
              <label htmlFor="add-title">Title :</label>
              <input type="text" name="add-title" id="add-title" value = {newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />
            </div>
            <div className="ar-in">
              <label htmlFor="add-author">Author :</label>
              <input type="text" name="add-author" id="add-author" value = {newAuthor} onChange={(e)=>{setNewAuthor(e.target.value)}} />
            </div>
            <div className="ar-in">
              <label htmlFor="add-subject">Subject :</label>
              <input type="text" name="add-subject" id="add-subject" value = {newSubject} onChange={(e)=>{setNewSubject(e.target.value)}} />
            </div>
            <div className="ar-in">
              <label htmlFor="add-year">Publish Year :</label>
              <input type="text" name="add-year" id="add-year" value = {newYear} onChange={(e)=>{setNewYear(e.target.value)}} />
            </div>
            <div className="ar-in">
              <button onClick = {()=>{addRowHandle()}}>Add row</button>
            </div>
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
              <th>Operations</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {Object.keys(currentRecords).map((key)=>{
              const id = currentRecords[key].id;
              const title = currentRecords[key].title;
              const author = currentRecords[key].author;
              const subject = currentRecords[key].subject;
              const publishYear = currentRecords[key].publish_year;
              return(
                <tr key={key} id={`tr-${key}`}>
                  {isEditableRow[key] ?<td> <div className="td-input"><input type="text" id="td-id" defaultValue={id}  onChange={(e)=>{currentRecords[key].id = e.target.value}} /> </div></td> : <td>{currentRecords[key].id}</td>}
                  {isEditableRow[key] ? <td> <div className="td-input"> <input type="text" id="td-title"  defaultValue={title} onChange={(e)=>{currentRecords[key].title = e.target.value}} />  </div>  </td>:<td>{currentRecords[key].title}</td>}
                  {isEditableRow[key] ?<td> <div className="td-input"> <input type="text" id="td-author"  defaultValue={author} onChange={(e)=>{currentRecords[key].author = e.target.value}}/>  </div></td>:<td>{currentRecords[key].author}</td>}
                  {isEditableRow[key] ?<td> <div className="td-input"> <input type="text" id="td-subject" defaultValue={subject} onChange={(e)=>{currentRecords[key].subject = e.target.value}}/>  </div></td>:<td>{currentRecords[key].subject}</td>}
                  {isEditableRow[key] ?<td> <div className="td-input"> <input type="text" id="td-year" defaultValue={publishYear} onChange={(e)=>{currentRecords[key].publish_year = e.target.value}}/>  </div> </td>:<td>{currentRecords[key].publish_year}</td>}
                  {isEditableRow[key] ?
                    <td style={{display:'flex' , justifyContent:'space-around'}} className="td-buttons">
                      <button onClick = {()=>{setHandle(key,id)}}>Set</button>
                      <button onClick={()=>{cancelHandle(key,id,title,author,subject,publishYear)}}>Cancel</button>
                    </td>
                  : 
                    <td style={{display:'flex' , justifyContent:'space-around'}} className="td-buttons">
                      <button onClick = {()=>{isEditableRow[key]=true;updateHandle(key,id);}}>Update</button>
                      <button onClick = {()=>{deleteHandle(id)}}>Delete</button>
                    </td>
                  }
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
export default Admin;