import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
const pageSize = 6;
const ManageSupplier = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [supplierdata, setSupplierdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handlevalidtae = (value) => {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.supplier_name) {
      toast.error("Supplier Name is required");
      error.supplier_name = "Supplier Name is required";
    }
    if (!value.supplier_email) {
      toast.error("Supplier Email is required");
      error.supplier_email = "Supplier Email is required";
    } else if (!emailRegex.test(value.supplier_email)) {
      toast.error("Supplier Email is invalid");
      error.supplier_email = "Supplier Email is invalid";
    } else {
      apihit();
    }
    setError(error);
  };
  const handleclick = () => {
    handlevalidtae(data);
  };
  const apihit = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}add-supplier`, data)
      .then((response) => {
        toast.success(response.data.message);
        showdata();
        setData({
          name: "",
          email: "",
        });
      }).catch((error) => {
        toast.error(error.response.data.message);
      }).finally(() => {
        setLoading(false);
      });
  };
  const showdata = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setSupplierdata(response.data.data);
      }).catch((error) => {
        console.log(error.response.data.message);
      }).finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    showdata();
  }, []);
  const handledelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, { "supplier_id": id }).then((response) => {
          toast.success(response.data.message);
          showdata();
        }).catch((error) => {
          toast.error(error.response.data.message);
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  const editDataAll = (id) => {
    setId(id);
    const selectedUser = supplierdata.filter((item) => {
      return item.id === id;
    });
    const getData = selectedUser[0];
    setInputData((prevData) => ({
      ...prevData,
      name: getData.name,
      email: getData.email,
    }));
  };
  const submitInputdata = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleChange = () => {
    const updatedprodata = {
      supplier_email: inputData.email,
      supplier_id: id,
      supplier_name: inputData.name
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}update-supplier`, updatedprodata)
      .then((response) => {
        toast.success(response.data.message);
        showdata();
      }).catch((error) => {
        console.log(error);
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const filteredData = supplierdata.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filteredData.slice(startindex, endIndex);
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card ">
            <div className="card-body">
              <div className="row manageFreight">
                <div className="col-12">
                  <div className='d-flex justify-content-between align-item-center'>
                    <div className="">
                      <h4 className="freight_hd">Add Supplier</h4>
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                      <div className="">
                        <input className='px-2 py-1 rounded' placeholder='Search' type="text"  value={searchQuery} onChange={handleSearch}></input>
                      </div>
                      <div className="ms-2">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade modalBorder" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add Supplier</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label>Name</label>
                        <input type="text" onChange={handlechange} name='supplier_name' className="form-control" id="floatingInput1" placeholder="name" />
                      </div>
                      <div className="mb-3">
                        <label>Email</label>
                        <input type="email" onChange={handlechange} name='supplier_email' className="form-control" id="floatingInput" placeholder="tushar@gmail.com" />
                        <p className='text-danger mb-0'>{error.supplier_email}</p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" onClick={handleclick} className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-2">
                <table className="table table-striped tableICon">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Supplier Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ border: "none" }}>
                    {
                      currentdata && currentdata.length > 0 && currentdata.map((item, index) => {
                        console.log(item)
                        return (
                          <>
                            <tr className='border-bottom' key={index}>
                              <th>{startindex + index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>
                                <div className='d-flex align-items-center'>
                                  <div className='ms-2'>
                                    <button onClick={() => { editDataAll(item.id) }} type="button" className="border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      <FaEdit style={{ color: "#1b2245", margin: "10px" }} />
                                    </button>
                                    <div className="modal fade modalBorder" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                      <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className='modal-title'>Update Supplier</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                          </div>
                                          <div className="modal-body">
                                            <div className="mb-3">
                                              <label>Name</label>
                                              <input type="text" name="name" value={inputData.name} onChange={submitInputdata} className="form-control" id="floatingInput1" placeholder="name" />
                                            </div>
                                            <div className="mb-3">
                                              <label>Email</label>
                                              <input type="email" name="email" value={inputData.email} onChange={submitInputdata} className="form-control" id="floatingInput" placeholder="tushar@gmail.com" />
                                            </div>
                                          </div>
                                          <div className="modal-footer">
                                            {/* <button type="button" className="btn close_btn" data-bs-dismiss="modal">Close</button> */}
                                            <button type="button" data-bs-dismiss="modal" onClick={() => { handleChange(item.id) }} className="btn btn-primary">Update</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="action_btn1">
                                    <AiFillDelete className="text-danger" onClick={() => { handledelete(item.id) }} style={{cursor:"pointer"}} />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        )
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
              {/* <div className='mt-4'>
                <button disabled={currentPage === 1} className='btn rounded pagePre' style={{ backgroundColor: "red", color: "white" }} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <span className='mx-2'>{`Page ${currentPage} of ${totalPage}`}</span>
                <button disabled={currentPage === totalPage} className='btn rounded pageNext' style={{ backgroundColor: "green", color: "white" }} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </div> */}
            </div>
          </div >
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default ManageSupplier;
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// const pageSize = 6;
// const ManageSupplier = () => {
//   const [inputData, setInputData] = useState({ name: "", email: "" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [id, setId] = useState(null); // Null indicates "Add", not update
//   const [loading, setLoading] = useState(true);
//   const [supplierdata, setSupplierdata] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   useEffect(() => {
//     showdata();
//   }, []);
//   const showdata = () => {
//     setLoading(true);
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
//       .then((response) => {
//         setSupplierdata(response.data.data);
//       })
//       .catch((error) => {
//         toast.error(error.response?.data?.message || "Failed to load data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, {
//             supplier_id: id,
//           })
//           .then((response) => {
//             toast.success(response.data.message);
//             showdata();
//           })
//           .catch((error) => {
//             toast.error(error.response?.data?.message || "Failed to delete.");
//           });
//       }
//     });
//   };
//   const openModal = (supplier = null) => {
//     if (supplier) {
//       setInputData({ name: supplier.name, email: supplier.email });
//       setId(supplier.id); 
//     } else {
//       setInputData({ name: "", email: "" });
//       setId(null); 
//     }
//   };
//   const handleSubmit = () => {
//     const endpoint = id
//       ? `${process.env.REACT_APP_BASE_URL}update-supplier`
//       : `${process.env.REACT_APP_BASE_URL}add-supplier`;
//     const payload = id
//       ? {
//           supplier_name: inputData.name,
//           supplier_email: inputData.email,
//           supplier_id: id,
//         }
//       : { supplier_name: inputData.name, supplier_email: inputData.email };
//     axios
//       .post(endpoint, payload)
//       .then((response) => {
//         toast.success(response.data.message);
//         showdata();
//         setInputData({ name: "", email: "" });
//         setId(null);
//       })
//       .catch((error) => {
//         toast.error(error.response?.data?.message || "Operation failed.");
//       });
//   };
//   const filteredData = supplierdata.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const totalPage = Math.ceil(filteredData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = filteredData.slice(startIndex, startIndex + pageSize);
//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4>Add or Manage Suppliers</h4>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="px-2 py-1 rounded"
//                   />
//                   <button
//                     className="btn btn-primary ms-2"
//                     data-bs-toggle="modal"
//                     data-bs-target="#supplierModal"
//                     onClick={() => openModal()}
//                   >
//                     Add Supplier
//                   </button>
//                 </div>
//               </div>
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>Sr No</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentData.map((item, index) => (
//                     <tr key={item.id}>
//                       <td>{startIndex + index + 1}</td>
//                       <td>{item.name}</td>
//                       <td>{item.email}</td>
//                       <td>
//                         <FaEdit
//                           className="text-primary me-2"
//                           onClick={() => openModal(item)}
//                           data-bs-toggle="modal"
//                           data-bs-target="#supplierModal"
//                         />
//                         <AiFillDelete
//                           className="text-danger"
//                           onClick={() => handleDelete(item.id)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="d-flex justify-content-between align-items-center mt-3">
//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                   className="btn btn-secondary"
//                 >
//                   Previous
//                 </button>
//                 <span>{`Page ${currentPage} of ${totalPage}`}</span>
//                 <button
//                   disabled={currentPage === totalPage}
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                   className="btn btn-secondary"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className="modal fade"
//         id="supplierModal"
//         tabIndex="-1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">
//                 {id ? "Update Supplier" : "Add Supplier"}
//               </h5>
//               <button
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={inputData.name}
//                   onChange={(e) =>
//                     setInputData({ ...inputData, name: e.target.value })
//                   }
//                   className="form-control"
//                   placeholder="Supplier Name"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={inputData.email}
//                   onChange={(e) =>
//                     setInputData({ ...inputData, email: e.target.value })
//                   }
//                   className="form-control"
//                   placeholder="Supplier Email"
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="btn btn-primary"
//                 data-bs-dismiss="modal"
//                 onClick={handleSubmit}
//               >
//                 {id ? "Update" : "Add"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };
// export default ManageSupplier;
