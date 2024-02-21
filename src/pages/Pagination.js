import React from "react";
import "../css/pagination.css"
function Pagination(props){
  //console.log(props);
  const [nPages,currentPage,setCurrentPage] = [props.nPages,props.currentPage,props.setCurrentPage];
  const pageNumbers = [...Array(nPages+1).keys()].slice(1);
  const prevPage = ()=>{
    if(currentPage !== 1){
      setCurrentPage(currentPage -1);
    }
  }
  const nextPage = () =>{
    if(currentPage !== nPages){
      setCurrentPage(currentPage+1);
    }
  }
  return (
    <div className="pagg-outer">
      <nav>
        <ul className="pagination">
          <li className = "page-item">
            <button className="page-link" onClick={prevPage} href="#">
              Previous
            </button>
          </li>
          {
            pageNumbers.map(pgNumber =>(
              <li key={pgNumber} className ={`page-item ${currentPage === pgNumber ? 'active' : ''} `}>
                <a onClick={()=>setCurrentPage(pgNumber)} className='page-link' href ="#">{pgNumber}</a>
              </li>
            ))
          }
          <li className="page-item">
            <button className="page-item" onClick={nextPage} href="#">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Pagination;