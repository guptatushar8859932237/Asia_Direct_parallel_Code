import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
const pageSize = 5;
export default function Cashbook() {
 
 const [data,setData]=useState([])
 const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCashbookList`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  return (
    <div className="wpWrapper">
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
      <div className="table-responsive mt-2">
                <table className="table table-striped tableICon">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bank Ref.</th>
                      <th>Description of Receipt</th>
                      <th>Receipt</th>
                      <th>Payment</th>
                      <th>Customer</th>
                      <th>Shipment Ref</th>
                      <th>Allocated</th>
                      <th>Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdata &&
                      currentdata.length > 0 &&
                      currentdata.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <tr key={item.id}>
                              <td>{new Date(item.date).toLocaleDateString("EN-gb")}</td>
                              <td>BOB</td>
                              <td>{item.description_on_receipt}</td>
                              <td>{item.receipt}</td>
                              <td><input></input></td>
                              <td><input></input></td>
                              <td><input></input></td>
                              <td><input></input></td>
                             
                              <td><button className='btn btn-secondary'>ADD</button></td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                <div className="text-center d-flex justify-content-end align-items-center">
                  <button
                    disabled={currentPage === 1}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <i class="fi fi-rr-angle-small-left page_icon"></i>
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                  <button
                    disabled={currentPage === totalPage}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <i class="fi fi-rr-angle-small-right page_icon"></i>
                  </button>
                </div>
              
                <ToastContainer />
              </div>
    </div>
    </div>
    </div>
    </div>
  )
}
