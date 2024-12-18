import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Modal } from "@mui/material";

const pageSize = 5;
const ManageCustomer = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState([]);
  const [updatedata, setUpdatedata] = useState([]);
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({
    client_name: "",
    email: "",
    client_ref: "",
    contact_person: "",
    cellphone: "",
    telephone: "",
    address_1: "",
    address_2: "",
    city: "",
    province: "",
    country: "",
    code: "",
    company_id: "",
    importers_ref: "",
    tax_ref: "",
    password: "",
  });
  const [id, setId] = useState("");
  const [supplierdata, setSupplierdata] = useState([]);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const editDataAll = (id) => {
    setId(id);
    const selectedUser = supplierdata.filter((item) => {
      return item.id === id;
    });
    console.log(selectedUser[0]);
    const getData = selectedUser[0];
    console.log(getData)
    setInputData((prevData) => ({
      ...prevData,
      client_name: getData.full_name,
      email: getData.email,
      client_ref: getData.client_ref,
      contact_person: getData.contact_person,
      cellphone: getData.cellphone,
      telephone: getData.telephone,
      address_1: getData.address_1,
      address_2: getData.address_2,
      city: getData.city,
      province: getData.province,
      country: getData.country,
      code: getData.code,
      company_id: getData.company_id,
      importers_ref: getData.importers_ref,
      tax_ref: getData.tax_ref,
    }));
  };
  const handlevalidate = (value) => {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.email) {
      error.email = "Email is Required";
    } else if (!emailRegex.test(value.email)) {
      error.email = "Supplier Email is invalid";
    }

    if (!value.cellphone) {
      error.cellphone = "Cellphone is Required";
    }

    if (!value.address_1) {
      error.address_1 = "Address is Required";
    }

    if (!value.code) {
      error.code = "Code is Required";
    }

    if (!value.telephone) {
      error.telephone = "Telephone is Required";
    }

    if (!value.client_ref) {
      error.client_ref = "Client Ref is Required";
    }

    if (Object.keys(error).length === 0) {
      apihit();
    } else {
      setError(error);
    }
  };

  const handleclick = () => {
    handlevalidate(data);
  };
  const apihit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}add-customer`,
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
        const addButton = document.querySelector(".add-customer-button");
        if (addButton) {
          addButton.setAttribute("data-bs-toggle", "modal");
        }
        getclientlistr();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  useEffect(() => {
    getclientlistr();
  }, []);
  const getclientlistr = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}client-list`)
      .then((response) => {
        console.log(response.data);
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
        axios
          .post(`${process.env.REACT_APP_BASE_URL}delete-client`, {
            client_id: id,
          })
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

  const handleupdatevalue = (id) => {
    console.log(id);
    const updaredata = {
      client_name: inputData.client_name,
      email: inputData.email,
      client_ref: inputData.client_ref,
      contact_person: inputData.contact_person,
      cellphone: inputData.cellphone,
      telephone: inputData.telephone,
      address_1: inputData.address_1,
      address_2: inputData.address_2,
      city: inputData.city,
      province: inputData.province,
      country: inputData.country,
      code: inputData.code,
      company_id: inputData.company_id,
      importers_ref: inputData.importers_ref,
      tax_ref: inputData.tax_ref,
      client_id: id,
      password: inputData.password,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-client`, updaredata)
      .then((response) => {
        getclientlistr()
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const [isChecked, setIsChecked] = useState(true);
  const handleToggle = (id) => {
    const updatedData = supplierdata.map((item) =>
      item.id === id ? { ...item, status: 1 - item.status } : item
    );
    setSupplierdata(updatedData);
  };
  const handleToggle2 = (id) => {
    const updatedData = supplierdata.map((item) =>
      item.id === id ? { ...item, status: 1 - item.status } : item
    );
    setSupplierdata(updatedData);
  };
  let name, value;
  const submitInputdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  const handlelcicckac = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}change-status`, {
        user_id: id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filteredData = supplierdata.filter((item) => {
    console.log(item);
    return (
      item.cellphone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.telephone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = filteredData.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleclickdata = (id) => {
    const dataall = supplierdata.filter((item) => {
      return item.id === id;
    });
    console.log(dataall);
    navigate("/Admin/customer-details", { state: { alldata: dataall } });
  };
  const handlepress = (e) => {
    if (e.charCode < 46 || e.charCode > 57) {
      e.preventDefault();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const postData = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}upload-excel-client`, formdata)
        .then((response) => {
          getclientlistr();
          toast.success(response.data.message);
          getclientlistr();
          closeModal();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      console.log("No file selected");
    }
  };

  const updatecountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        console.log(response.data.data);
        setUpdatedata(response.data.data);
      })
      .catch((error) => {
        console.group(error.response.data.message);
      });
  };
  useEffect(() => {
    updatecountry();
  }, []);
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="card ">
              <div className="card-body">
                <div className="row manageFreight">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="">
                        <h4 className="freight_hd">Customer</h4>
                      </div>
                      <div className="d-flex justify-content-end align-items-center">
                        {/* <div className=''>
                            <button onClick={openModal}>Import excel</button>
                          </div> */}
                        <div className="ms-2">
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="form-control w-25"
                    placeholder="Search"
                  />
                </div>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  maria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Customer
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body customer_bdy">
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Email</label>
                            <br />
                            <input
                              type="email"
                              name="email"
                              onChange={handlechange}
                              placeholder="Email@gmail.com"
                              className="w-100 border p-2 rounded"
                            ></input>
                            <p className="text-danger mb-0">{error.email}</p>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Address 1</label>
                            <br />
                            <input
                              type="text"
                              name="address_1"
                              value={data.address_1}
                              placeholder="Address"
                              onChange={handlechange}
                              className="w-100 border p-2 rounded"
                            ></input>
                            <p className="text-danger mb-0">
                              {error.address_1}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Importer Refrence</label>
                            <input
                              type="text"
                              name="importers_ref"
                              placeholder="Importer Refrence"
                              value={data.importers_ref}
                              onChange={handlechange}
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Address 2</label>
                            <input
                              type="text"
                              name="address_2"
                              placeholder="Address"
                              value={data.address_2}
                              onChange={handlechange}
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>City</label>
                            <input
                              type="text"
                              name="city"
                              value={data.city}
                              placeholder="city"
                              onChange={handlechange}
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Province</label>
                            <input
                              type="text"
                              placeholder="Province"
                              className="w-100 border p-2 rounded"
                              value={data.province}
                              name="province"
                              onChange={handlechange}
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Country</label>
                            <select
                              name="country"
                              placeholder="Country"
                              onChange={handlechange}
                              value={data.country}
                              className="w-100 border p-2 rounded"
                            >
                              <option>Select...</option>
                              {updatedata &&
                                updatedata.length > 0 &&
                                updatedata.map((item, index) => {
                                  return (
                                    <>
                                      <option key={item.id}>{item.name}</option>
                                    </>
                                  );
                                })}
                            </select>
                            {/* <input type="text" name='country' placeholder='Country' onChange={handlechange} value={data.country} className="w-100 border p-2 rounded"></input> */}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Client Ref</label>
                            <input
                              type="text"
                              name="client_ref"
                              placeholder="Client Refrence"
                              onChange={handlechange}
                              value={data.client_ref}
                              className="w-100 border p-2 rounded"
                            ></input>
                            <p className="text-danger mb-0">
                              {error.client_ref}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Client Name</label>
                            <input
                              type="text"
                              name="client_name"
                              onChange={handlechange}
                              placeholder="Client Name"
                              value={data.client_name}
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Contact Person</label>
                            <input
                              type="text"
                              name="contact_person"
                              onChange={handlechange}
                              placeholder="Contact Person"
                              value={data.contact_person}
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Cellphone</label>
                            <input
                              type="text"
                              name="cellphone"
                              onKeyPress={handlepress}
                              maxLength={12}
                              placeholder="Cellphone"
                              onChange={handlechange}
                              value={data.cellphone}
                              className="w-100 border p-2 rounded"
                            ></input>
                            <p className="text-danger mb-0">
                              {error.cellphone}
                            </p>
                          </div>
                          <div className="mb-3  col-md-6">
                            <label>Telephone</label>
                            <input
                              type="text"
                              name="telephone"
                              onKeyPress={handlepress}
                              maxLength={12}
                              placeholder="Telephone"
                              onChange={handlechange}
                              value={data.telephone}
                              className="w-100 border p-2 rounded"
                            ></input>
                            <p className="text-danger mb-0">
                              {error.telephone}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Code</label>
                            <input
                              type="text"
                              name="code"
                              onKeyPress={handlepress}
                              placeholder="code"
                              onChange={handlechange}
                              value={data.code}
                              id="quntity"
                              className="w-100 border p-2 rounded"
                            ></input>
                            <p className="text-danger mb-0">{error.code}</p>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Company Reg/ID#</label>
                            <input
                              type="text"
                              name="company_id"
                              onChange={handlechange}
                              placeholder="Xyz refrecne number"
                              value={data.company_id}
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label>Vat/Tax Ref</label>
                            <input
                              type="text"
                              name="tax_ref"
                              onChange={handlechange}
                              value={data.tax_ref}
                              placeholder=" Vat / Tax Ref"
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label>Password</label>
                            <input
                              type="text"
                              name="password"
                              onChange={handlechange}
                              value={data.password}
                              placeholder="password"
                              className="w-100 border p-2 rounded"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={handleclick}
                          className="btn text-white"
                        >
                          Add Customer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive mt-2">
                  <table className="table mt-4 table-striped tableICon">
                    <thead>
                      <tr>
                        <th scope="col">Sr.No.</th>
                        <th scope="col">Client Name</th>
                        <th className="col-2" scope="col-2">
                          Client Email
                        </th>
                        {/* <th scope="col">Client Ref</th> */}
                        <th scope="col">Cellphone</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
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
                                <td>{item.full_name}</td>
                                <td className="col-2">{item.email} </td>
                                {/* <td >{item.client_ref}</td> */}
                                <td>{item.cellphone}</td>
                                <td>{item.telephone}</td>
                                <td>
                                  {item.status == 1 ? (
                                    <label
                                      className={`switch round ${
                                        isChecked ? "checked" : ""
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={!isChecked}
                                        onClick={() => {
                                          handlelcicckac(item.id);
                                        }}
                                        onChange={() => {
                                          handleToggle2(item.id);
                                        }}
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  ) : (
                                    <label
                                      className={`switch round ${
                                        isChecked ? "checked" : ""
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onClick={() => {
                                          handlelcicckac(item.id);
                                        }}
                                        onChange={() => {
                                          handleToggle(item.id);
                                        }}
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  )}
                                </td>
                                <td>
                                  <VisibilityIcon
                                    onClick={() => {
                                      handleclickdata(item.id);
                                    }}
                                    style={{
                                      color: "rgb(27 34 69)",
                                      cursor: "pointer",
                                    }}
                                  />
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

                                    <div className="ms-2">
                                      <button
                                        type="button"
                                        className=" border-0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={() => {
                                          editDataAll(item.id);
                                        }}
                                      >
                                        <FaEdit style={{ color: "#1b2245" }} />
                                      </button>
                                      <div
                                        className="modal fade modalManageFreight"
                                        id="staticBackdrop"
                                        data-bs-backdrop="static"
                                        data-bs-keyboard="false"
                                        tabIndex={-1}
                                        aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true"
                                      >
                                        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5
                                                className="modal-title"
                                                id="staticBackdropLabel"
                                              >
                                                Update Customer
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              />
                                            </div>
                                            <div className="modal-body">
                                              <div className="row">
                                                <div className="col-md-6 mb-3">
                                                  <label>Email</label>
                                                  <input
                                                    type="email"
                                                    name="email"
                                                    onChange={submitInputdata}
                                                    value={inputData.email}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Address 1</label>
                                                  <input
                                                    type="text"
                                                    name="address_1"
                                                    value={inputData.address_1}
                                                    onChange={submitInputdata}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>
                                                    Importer Refrence
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="importers_ref"
                                                    value={
                                                      inputData.importers_ref
                                                    }
                                                    onChange={submitInputdata}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Address 2</label>
                                                  <input
                                                    type="text"
                                                    name="address_2"
                                                    value={inputData.address_2}
                                                    onChange={submitInputdata}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>City</label>
                                                  <input
                                                    type="text"
                                                    name="city"
                                                    value={inputData.city}
                                                    onChange={submitInputdata}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Province</label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    value={inputData.province}
                                                    name="province"
                                                    onChange={submitInputdata}
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Country</label>
                                                  {/* <input type="text" name='country' onChange={submitInputdata} value={inputData.country} className="form-control"></input> */}
                                                  <select
                                                    name="country"
                                                    onChange={submitInputdata}
                                                    value={inputData.country}
                                                    className="form-control"
                                                  >
                                                    <option>Select...</option>
                                                    {updatedata &&
                                                      updatedata.length > 0 &&
                                                      updatedata.map(
                                                        (item, index) => {
                                                          return (
                                                            <>
                                                              <option
                                                                key={index}
                                                                value={
                                                                  item.id
                                                                }
                                                              >
                                                                {item.name}
                                                              </option>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Client Ref</label>
                                                  <input
                                                    type="text"
                                                    name="client_ref"
                                                    onChange={submitInputdata}
                                                    value={inputData.client_ref}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Client Name</label>
                                                  <input
                                                    type="text"
                                                    name="client_name"
                                                    onChange={submitInputdata}
                                                    value={
                                                      inputData.client_name
                                                    }
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Contact Person</label>
                                                  <input
                                                    type="text"
                                                    name="contact_person"
                                                    onChange={submitInputdata}
                                                    value={
                                                      inputData.contact_person
                                                    }
                                                    onKeyPress={handlepress}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Cellphone</label>
                                                  <input
                                                    type="text"
                                                    name="cellphone"
                                                    maxLength={13}
                                                    onChange={submitInputdata}
                                                    value={inputData.cellphone}
                                                    onKeyPress={handlepress}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Telephone</label>
                                                  <input
                                                    type="text"
                                                    name="telephone"
                                                    maxLength={13}
                                                    onChange={submitInputdata}
                                                    value={inputData.telephone}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                {/* <div className="col-md-6 mb-3">
                                                  <label>Country</label>
                                                  <select>
                                                    <option>Select...</option>
                                                    {updatedata &&
                                                      updatedata.length > 0 &&
                                                      updatedata.map(
                                                        (item, index) => {
                                                          return (
                                                            <>
                                                              <option
                                                                key={index}
                                                                value={
                                                                  item.id
                                                                }
                                                              >
                                                                {item.name}
                                                              </option>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                  <input
                                                    type="text"
                                                    name="country"
                                                    onChange={submitInputdata}
                                                    value={inputData.country}
                                                    className="form-control"
                                                  ></input>
                                                </div> */}
                                                <div className="col-md-6 mb-3">
                                                  <label>Code</label>
                                                  <input
                                                    type="text"
                                                    name="code"
                                                    onChange={submitInputdata}
                                                    value={inputData.code}
                                                    id="quntity"
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>
                                                    Company Reg / ID #
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="company_id"
                                                    onChange={submitInputdata}
                                                    value={inputData.company_id}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Vat / Tax Ref</label>
                                                  <input
                                                    type="text"
                                                    name="tax_ref"
                                                    onChange={submitInputdata}
                                                    value={inputData.tax_ref}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                  <label>Password</label>
                                                  <input
                                                    type="password"
                                                    name="password"
                                                    onChange={submitInputdata}
                                                    className="form-control"
                                                  ></input>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="modal-footer">
                                              <button
                                                type="button"
                                                data-bs-dismiss="modal"
                                                onClick={() => {
                                                  handleupdatevalue(item.id);
                                                }}
                                                className="btn text-white m-0"
                                              >
                                                Update Customer
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ms-2">
                                      <a
                                        href="https://chat.whatsapp.com/C1SiwQek53B434FSz4BjQo"
                                        target="_blank"
                                      >
                                        <WhatsAppIcon className="text-success" />
                                      </a>
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
                {/* <div className="mt-4">
                  <button
                    disabled={currentPage === 1}
                    className="btn rounded pagePre"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                  <button
                    disabled={currentPage === totalPage}
                    className="btn rounded pageNext"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div> */}
                <Modal
                  open={isModalOpen}
                  onClose={closeModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      height: 300,
                      width: 450,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <div className="mb-3">
                      <h3 id="modal-modal-title">Add Excel</h3>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                      className="mb-3 border ps-2 py-2 rounded w-100"
                      style={{ display: "block", marginTop: "16px" }}
                    />
                    <Button variant="contained" onClick={postData}>
                      Submit
                    </Button>
                    <button
                      className="ms-2 btn bg-danger"
                      style={{ color: "white" }}
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                    >
                      Submit
                    </button>
                  </Box>
                </Modal>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ManageCustomer;
