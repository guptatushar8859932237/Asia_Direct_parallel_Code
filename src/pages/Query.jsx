import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const pageSize = 5;
const Query = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [supplierdata, setSupplierdata] = useState([]);

  useEffect(() => {
    getclientlistr();
  }, []);
  const getclientlistr = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getQueries`)
      .then((response) => {
        console.log(response.data.data);
        setLoader(false);
        setSupplierdata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
        setLoader(false);
      });
  };

  const handledelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data1= {
          query_id:id
        }
        axios
          .post(`${process.env.REACT_APP_BASE_URL}deleteQueries`,data1)
          .then((response) => {
            getclientlistr();
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filteredData = supplierdata.filter((item) => {
    console.log(item);
    return (
      item.phone_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = filteredData.slice(startIndex, endIndex);

  return (
    <>     
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="card ">
              <div className="card-body">
                <div className="row manageFreight">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">
                        <h4 className="freight_hd">Customer Query</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive mt-2">
                  <table className="table mt-4 table-striped tableICon">
                    <thead>
                      <tr>
                        <th scope="col">Sr.No.</th>
                        <th scope="col">Name</th>
                        <th className="col-2" scope="col-2">
                          Email
                        </th>
                        <th scope="col">Cellphone</th>
                        <th scope="col">Message</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ border: "none" }}>
                      {currentdata &&
                        currentdata.length > 0 &&
                        currentdata.map((item, index) => {
                          console.log(item);
                          return (
                            <>
                              <tr className="border-bottom" key={index}>
                                <th>{startIndex + index + 1}</th>
                                <td>{item.name}</td>
                                <td className="col-2">{item.email} </td>
                                <td >{item.phone_no}</td>
                                <td>{item?.message}</td>
                                <td>
                                  <p>{item.subject}</p>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="action_btn1">
                                      <AiFillDelete
                                        className="text-danger"
                                        onClick={() => {
                                          handledelete(item.id);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
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
    </>
  );
};
export default Query;
