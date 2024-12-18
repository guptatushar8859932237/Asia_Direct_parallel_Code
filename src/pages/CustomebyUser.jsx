import axios from "axios";
import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AiFillDelete } from "react-icons/ai";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaidIcon from '@mui/icons-material/Paid';
import CancelIcon from '@mui/icons-material/Cancel';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TollIcon from '@mui/icons-material/Toll';
import { FaEdit } from "react-icons/fa";
const pageSize = 5
export default function CustomebyUserap() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState({
    trans_reference: "",
    client: "",
    customer_ref: "",
    goods_desc: "",
    destination: "",
    port_of_entry: "",
    port_of_exit: "",
    clearing_agent: "",
    clearing_status: "",
    clearing_result: "",
    document_req: "",
    document: "",
    sad500: "",
    comment_on_docs: "",
  });
  const [error, setError] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImahe2] = useState(null);
  const [constgetdata, setConstgetdata] = useState("");
  const [erd, setErd] = useState("");
  const [inputdata, setInputdata] = useState([]);
  const [imageupload1, setimageupload1] = useState(null);
  const [imageupload2, setimageupload2] = useState(null);
  const [country, setCountry] = useState([])
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const navigate = useNavigate();

  //////////////////////////////////////////post data//////////////////////////////////////////////
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handECHlhange = (e) => {
    const data = e.target.files[0];
    setImage1(data);
  };
  const handECHlhange2 = (e) => {
    const data4 = e.target.files[0];
    setImahe2(data4);
  };
  const handlevalifdate = (value) => {
    let error = {};
    if (!value.trans_reference) {
      error.trans_reference = "trans refrence is required";
      toast.error("trans refrence is required");
    }
    if (!value.customer_ref) {
      error.customer_ref = "customer refrence is required";
      toast.error("customer refrence is required");
    }
    else {
      apihit();
    }
    setError(error);
  };

  const handleclick = () => {
    handlevalifdate(data);
  };

  const apihit = () => {
    const formdata = new FormData();
    formdata.append("trans_reference", data.trans_reference);
    formdata.append("client", data.client);
    formdata.append("customer_ref", data.customer_ref);
    formdata.append("goods_desc", data.goods_desc);
    formdata.append("destination", data.destination);
    formdata.append("port_of_entry", data.port_of_entry);
    formdata.append("port_of_exit", data.port_of_exit);
    formdata.append("clearing_agent", data.clearing_agent);
    formdata.append("clearing_status", data.clearing_status);
    formdata.append("clearing_result", data.clearing_result);
    formdata.append("document_req", data.document_req);
    formdata.append("document", image1);
    formdata.append("sad500", image2);
    formdata.append("comment_on_docs", data.comment_on_docs);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}add-clearing`, formdata)
      .then((response) => {
        console.log(response.data)
        toast.success(response.data.message);
        getdata();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  /////////////////////////////////////////delete functin //////////////////////////////////////////
  const handlelcickdelete = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}delete-clearing`, {
        clearing_id: id,
      })
      .then((response) => {
        toast.success(response.data.message);
        getdata();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //////////////////////////////////////////////////get data/////////////////////////////////////////////////

  const getdata = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, { added_by: 2 })
      .then((response) => {
        console.log(response?.data?.data);
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleclicknva = (id) => {
    const datauser = constgetdata.filter((item) => {
      return item.id === id
    })
    navigate('/Admin/Custom-details', { state: { data: datauser } })
  }
  ////////////////////////////////////////////////////////////update data//////////////////////////

  const handlegetid = (id) => {
    setErd(id);

    const selectuser = constgetdata.filter((item) => {
      return item.id === id;
    });

    const getdata = selectuser[0];
    console.log(getdata)
    setInputdata((previData) => ({
      ...previData,
      trans_reference: getdata.trans_reference,
      client: getdata.client,
      customer_ref: getdata.customer_ref,
      goods_desc: getdata.goods_desc,
      destination: getdata.destination,
      port_of_entry: getdata.port_of_entry,
      port_of_exit: getdata.port_of_exit,
      clearing_agent: getdata.clearing_agent,
      clearing_status: getdata.clearing_status,
      clearing_result: getdata.clearing_result,
      document_req: getdata.document_req,
      document: getdata.document,
      sad500: getdata.sad500,
      comment_on_docs: getdata.comment_on_docs,
    }));
    console.log(inputdata)
  };

  let name, value;
  const submitInputdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleupdateupdate = () => {
    const formdata = new FormData();
    formdata.append("clearing_id", erd);
    formdata.append("trans_reference", inputdata.trans_reference);
    formdata.append("client", inputdata.client);
    formdata.append("customer_ref", inputdata.customer_ref);
    formdata.append("goods_desc", inputdata.goods_desc);
    formdata.append("destination", inputdata.destination);
    formdata.append("port_of_entry", inputdata.port_of_entry);
    formdata.append("port_of_exit", inputdata.port_of_exit);
    formdata.append("clearing_agent", inputdata.clearing_agent);
    formdata.append("clearing_status", inputdata.clearing_status);
    formdata.append("clearing_result", inputdata.clearing_result);
    formdata.append("document_req", inputdata.document_req);
    formdata.append("document", imageupload1);
    formdata.append("sad500", imageupload2);
    formdata.append("comment_on_docs", inputdata.comment_on_docs);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-clearing`, formdata)
      .then((response) => {
        getdata();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  ////////////////////////////////get table filter data///////////////////////////////////////////




  const totalPages = Math.ceil(constgetdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = constgetdata.slice(startIndex, endIndex)

  const handlePageChange = (currentData) => {
    setCurrentPage(currentData);
  };

  // const handleclickcleared = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
  //       clearing_status: "Cleared",
  //       added_by: 2,
  //     })
  //     .then((response) => {
  //       setConstgetdata(response?.data?.data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };
  // const handleinprocess = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
  //       clearing_status: "In process",
  //       added_by: 2,
  //     })
  //     .then((response) => {
  //       setConstgetdata(response?.data?.data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };
  // const handlestillclear = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
  //       clearing_status: "Still to clear",
  //       added_by: 2,
  //     })
  //     .then((response) => {
  //       setConstgetdata(response?.data?.data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };
  const handleclickaccc = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}status-clearance`, {
        clearance_id: id,
        status: "1",
      })
      .then((response) => {
        getdata()
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleclickdecli = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}status-clearance`, {
        clearance_id: id,
        status: "2",
      })
      .then((response) => {
        console.log(response.data)
        toast.error(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleclickaccname = (id) => {
    const dataval = constgetdata.filter((item) => {
      return item.id === id
    })
    navigate('/Admin/shipping-estimate-clearence', { state: { data: dataval } })
  }
  const handleclickaccname123 = (item) => {
    console.log(item)
    const dataval = constgetdata.filter((item1) => {
      return item1.id === item.id
    })
    const daatta = {
      clearance_id: item.id,
      user_id: item.user_id
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}MoveToClearaneOrder`, daatta).then((response) => {
      toast.success(response.data.message)
      getdata()
    }).catch((error) => {
      console.log(error.response.data)
      toast.error(error.response.data.message)
    })
  }
  useEffect(() => {
    getcountry()
  }, [])
  const getcountry = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}country-list`).then((response) => {
      setCountry(response.data.data)
    }).catch((error) => {
      toast.errror(error.response.data.data)
    })
  }

  const handleclickcleared = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "0",
        added_by: 2,
      })
      .then((response) => {
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleinprocessdes = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "2",
        added_by: 2,
      })
      .then((response) => {
        getdata()
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleinprocess = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "1",
        added_by: 2,
      })
      .then((response) => {
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlestillclear = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "3",
        added_by: 2,
      })
      .then((response) => {
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };


  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row manageFreight">
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <h4 className="freight_hd">Custom Clearance</h4>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <input placeholder="Search" type="text" class="px-2 py-1 rounded" />
                  </div>
                  <div className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Filter</button>
                    <ul className="dropdown-menu">
                      <li className="filter_item">
                        <a
                          className="dropdown-item"
                          onClick={handleclickcleared}
                        >
                          Pending
                        </a>
                      </li>
                      <li className="filter_item">
                        <a
                          className="dropdown-item"
                          onClick={handleinprocess}
                        >
                          Accepted
                        </a>
                      </li>
                      <li className="filter_item">
                        <a
                          className="dropdown-item"
                          onClick={handleinprocessdes}
                        >
                          Declined
                        </a>
                      </li>
                      <li className="filter_item">
                        <a
                          className="dropdown-item"
                          onClick={handlestillclear}
                        >
                          Moved to Order
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add Clearance order
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
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            Trans Refrence*
                          </label>
                          <input
                            type="text"
                            onChange={handlechange}
                            name="trans_reference"
                            className="w-100 border p-2 rounded "
                            placeholder="Trans Refrence"
                          ></input>
                          <p className="text-danger">
                            {error.trans_reference}
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            {" "}
                            Client
                          </label>
                          <input
                            type="type"
                            onChange={handlechange}
                            name="client"
                            className="w-100 border p-2 rounded mb-3"
                            placeholder="client"
                          ></input>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            Customer Ref
                          </label>
                          <input
                            type="text"
                            onChange={handlechange}
                            name="customer_ref"
                            className="w-100 border p-2 rounded "
                            placeholder="customer Refrence"
                          ></input>
                          <p className="text-danger">
                            {error.customer_ref}
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            Goods Description
                          </label>
                          <input
                            type="text"
                            onChange={handlechange}
                            name="goods_desc"
                            placeholder="Goods Description"
                            className="w-100 border p-2 rounded mb-3"
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            Destination
                          </label>
                          <input
                            type="text"
                            name="destination"
                            placeholder="destination"
                            onChange={handlechange}
                            className="w-100 border p-2 rounded mb-3"
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal ">
                            Port of Entry
                          </label>
                          <select
                            onChange={handlechange}
                            placeholder="Port Of Entry"
                            name="port_of_entry"
                            className="w-100 border mb-3 rounded p-2 bg-white"
                          >
                            <option>Select...</option>
                            <option>Durban</option>
                            <option>Johannesburg</option>
                            <option>OR Tambo</option>
                            <option>Capetown</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <label className="fs-5 fw-normal">
                            Port of Exit
                          </label>
                          <input
                            type="text"
                            name="port_of_exit"
                            placeholder="Port Of Exit"
                            onChange={handlechange}
                            className="w-100 border p-2 rounded mb-3"
                          ></input>
                        </div>

                        <div className="col-lg-12">
                          <label className="fs-5 fw-normal">
                            Clearing Result
                          </label>
                          <input
                            type="text"
                            name="clearing_result"
                            placeholder="Clearing Result"
                            onChange={handlechange}
                            className="w-100 border p-2 rounded mb-3"
                          ></input>
                        </div>
                        <div className="col-lg-6 ">
                          <label className="fs-5 fw-normal">
                            Clearing Agent
                          </label>
                          <select
                            name="clearing_agent"
                            onChange={handlechange}
                            placeholder="Clearing Agent"
                            className="w-100 border mb-3 rounded p-2 mx-2 bg-white"
                          >
                            <option>Select...</option>
                            <option>Amanda</option>
                            <option>Mbedzi</option>
                            <option>Kethu</option>
                            <option>Sia</option>
                            <option>Shingi</option>
                            <option>Dolly</option>
                            <option>CARRIER</option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            Document Required
                          </label>
                          <select
                            className="w-100 mb-3 border rounded p-2 bg-white"
                            onChange={handlechange}
                            name="document_req"
                          >
                            <option>Select...</option>
                            <option>Not Rquired</option>
                            <option>ITAC</option>
                            <option>Other</option>
                            <option>Documents Required</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          {" "}
                          <label className="fs-5 fw-normal">
                            Clearing status
                          </label>
                          <select
                            className="w-100 mb-3 border rounded py-2 bg-white"
                            onChange={handlechange}
                            name="clearing_status"
                          >
                            <option>Select...</option>
                            <option>Pending</option>
                            <option>Success</option>
                            <option>Failed</option>
                          </select>
                        </div>

                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            Document Upload
                          </label>
                          <input
                            type="file"
                            name="document"
                            onChange={handECHlhange}
                            className="w-100 border p-1 rounded"
                            required
                          ></input>
                          <p className="text-danger">{error.document}</p>
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            {" "}
                            SAD500
                          </label>
                          <input
                            type="file"
                            onChange={handECHlhange2}
                            name="sad500"
                            className="w-100 border p-1 rounded mb-3"
                            required
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label className="fs-5 fw-normal">
                            {" "}
                            Comment on Docs
                          </label>
                          <input
                            type="text"
                            name="comment_on_docs"
                            placeholder="Comment on Docs"
                            onChange={handlechange}
                            className="w-100 border p-2 rounded mb-3"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={handleclick}
                        className="btn btn-primary"
                      >
                        save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  {/* <thead>
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Clearance No.</th>
                      <th scope="col">Customer Refrence</th>
                      <th scope="col">Good Description</th>
                      <th scope="col">Destination</th>
                      <th scope="col">Port of Entry</th>
                      <th scope="col">Port of Exit</th>
                      <th scope="col">Quotation Status</th>
                      <th scope="col">Documents</th>
                      <th scope="col">View</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead> */}
                  <tbody style={{ border: "none" }}>
                    {currentData &&
                      currentData.length > 0 &&
                      currentData.map((item, index) => {
                        console.log(item)
                        return (
                          <>
                            <tr className="border-bottom">
                              <td className="list_bd">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <p className="client_nm">{item.client_name}</p>
                                    <p className="fright_no mx-2 fs-6">{item.clearance_number}</p>
                                  </div>
                                  <div className="">
                                    <p className="port_date">{new Date(item.created_at).toLocaleDateString("en-GB")}</p>
                                  </div>
                                </div>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-3 ps-0">
                                      <div className="">
                                        <p className="origin">{item.goods_desc}</p>
                                      </div>
                                    </div>
                                    <div className="col-md-5">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <p className="origin">{item?.port_of_entry_name}</p>
                                        <div className="arrow">
                                          <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                        </div>
                                        <p className="origin">{item?.port_of_exit_name}</p>
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="text-center">
                                        {/* <p className="origin">Hazardous</p> */}
                                      </div>
                                    </div>
                                    <div className="col-md-2 pe-0">
                                      <div className="text-end">
                                        <div className="dropdown">
                                          <a href="" type="button" className="act_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Action</a>
                                          <div className="dropdown-menu">
                                            <a className="dropdown-item li_icon" onClick={() => { handleclicknva(item.id) }}>
                                              <VisibilityIcon

                                                style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  cursor: "pointer"

                                                }}
                                              />View</a>
                                            <a className="dropdown-item li_icon" onClick={() => { handlelcickdelete(item.id); }}>
                                              <AiFillDelete className="text-danger" style={{
                                                marginRight: "10px",
                                                width: "20px",
                                                fontSize: "20px",
                                                cursor: "pointer"
                                              }} />Delete

                                            </a>
                                            {/* <a className="dropdown-item li_icon">
                                              <div className="action_btn">
                                                <div
                                                  type="button"
                                                  onClick={() => {
                                                    handlegetid(item?.id);
                                                  }}
                                                  className="border-0 outline-none li_icon"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#staticBackdrop"
                                                >
                                                  <FaEdit style={{
                                                    color: "rgb(27 34 69)",
                                                    marginRight: "10px",
                                                    width: "20px",
                                                    height: "15px",
                                                  }} />Edit
                                                </div>
                                              </div>
                                            </a> */}
                                           
                                            <a className="dropdown-item li_icon" onClick={() => { handleclickdecli(item.id); }}>
                                              <CancelIcon
                                                style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  cursor: "pointer"
                                                }}
                                              />Declined
                                            </a>
                                            <a className="dropdown-item li_icon" onClick={() => { handleclickaccc(item.id); }}>
                                              <CheckCircleIcon
                                               style={{
                                                color: "rgb(27 34 69)",
                                                marginRight: "10px",
                                                width: "20px",
                                                cursor: "pointer"
                                              }}/>Accepted

                                            </a>
                                            <a className="dropdown-item li_icon" onClick={() => { handleclickaccname(item.id); }}>
                                              <CalculateIcon
                                               style={{
                                                color: "rgb(27 34 69)",
                                                marginRight: "10px",
                                                width: "20px",
                                                cursor: "pointer"
                                              }}/>Calculate Estimate

                                            </a>
                                            <a className="dropdown-item li_icon" onClick={() => { handleclickaccname123(item); }}>
                                              <SwapHorizontalCircleIcon
                                               style={{
                                                color: "rgb(27 34 69)",
                                                marginRight: "10px",
                                                width: "20px",
                                                cursor: "pointer"
                                              }}/>Move to order

                                            </a>
                                            <a className="dropdown-item li_icon">
                                              {
                                                item.bill_of_lading ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.bill_of_lading}`}><ReceiptIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.arrival_notification ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.arrival_notification}`}><AddAlertIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.letter_of_authority ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.letter_of_authority}`}><MarkEmailReadIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.packing_list ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.packing_list}`}><ReceiptLongIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.product_brochures ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.product_brochures}`}><LocalLibraryIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.product_literature ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.product_literature}`}><Inventory2Icon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.proof_of_payment ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.proof_of_payment}`}><PaidIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.supplier_invoice ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.supplier_invoice}`}><ReceiptIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                              {
                                                item.waybill ? (<a href={`${process.env.REACT_APP_BASE_URLdocument}${item.waybill}`}><TollIcon style={{
                                                  color: "rgb(27 34 69)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "20px",
                                                }} /></a>) : ('')
                                              }
                                            </a>
                                            {/* <a className="dropdown-item li_icon NewDropdown">
                                              <MenuIcon style={{ color: "rgb(27 34 69)", fontSize: "28px", marginRight: "10px", width: "20px" }} />Mode
                                              <div className=" dropIocnUser">
                                                <ul className="ProductList">
                                                  <li><a className="item_link" onClick={() => { handleclickdecli(item.id); }}>Declined</a></li>
                                                  <li>
                                                    <a
                                                      className="item_link"
                                                      onClick={() => {
                                                        handleclickaccc(item.id);
                                                      }}
                                                    >
                                                      Accepted
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      className="item_link"
                                                      onClick={() => {
                                                        handleclickaccname(item.id);
                                                      }}
                                                    >
                                                      Calculate Estimate
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      className="item_link"
                                                      onClick={() => {
                                                        handleclickaccname123(item);
                                                      }}
                                                    >
                                                      Move to Order
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </a> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <p type="radio" className="input_user mb-0" />
                                  <label className="status">
                                    {item?.quotation_status == "0" ? (
                                      <div className='d-flex align-items-center'>
                                        <span className="dot bg-secondary me-2"></span>
                                        <p className="text-secondary mb-0">
                                          Pending
                                        </p>
                                      </div>) : (item.quotation_status == "1" ? (<div className='d-flex align-items-center'>
                                        <span className="dot bg-success me-2"></span>
                                        <p className="text-success mb-0">
                                          Accepted
                                        </p>
                                      </div>) : (item.quotation_status == "2" ? (<div className='d-flex align-items-center'>
                                        <span className="dot bg-info me-2"></span>
                                        <p className="text-info mb-0">
                                          Declined
                                        </p>
                                      </div>) : (item.quotation_status == "3" ? (<div className='d-flex align-items-center'>
                                        <span className="dot bg-success me-2"></span>
                                        <p className="text-success mb-0">
                                          Ordered
                                        </p>
                                      </div>) : (item.quotation_status == "4" ? (<div className='d-flex align-items-center'>
                                        <span className="dot bg-success me-2"></span>
                                        <p className="text-success mb-0">
                                        Estimated
                                        </p>
                                      </div>):("")))))}
                                  </label>
                                </div>
                              </td>
                              <div className="modal fade modalManageFreight modal_user " id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex={-1}
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="staticBackdropLabel"
                                      >
                                        Update custom clearence
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body ">

                                      <label>Customer Ref</label>
                                      <input
                                        type="text"
                                        onChange={submitInputdata}
                                        value={inputdata.customer_ref}
                                        name="customer_ref"
                                        className="w-100 border p-3 rounded mb-3"
                                      ></input>
                                      <label>Goods Description</label>
                                      <input
                                        type="text"
                                        onChange={submitInputdata}
                                        value={inputdata.goods_desc}
                                        name="goods_desc"
                                        className="w-100 border p-3 rounded mb-3"
                                      ></input>
                                      <label>
                                        Destination
                                      </label>
                                      <input
                                        type="text"
                                        name="destination"
                                        value={inputdata.destination}
                                        onChange={submitInputdata}
                                        className="w-100 border p-3 rounded mb-3"
                                      ></input>

                                      <label>
                                        Port of Entry
                                      </label>
                                      <select
                                        onChange={submitInputdata}
                                        value={inputdata.port_of_entry}
                                        name="port_of_entry"
                                        className="w-100 border mb-3 rounded p-3 bg-white"
                                      >
                                        <option>Select...</option>
                                        <option>Durban</option>
                                        <option>Johannesburg</option>
                                        <option>OR Tambo</option>
                                        <option>Capetown</option>
                                      </select>
                                      <label>
                                        Country Of Origin
                                      </label>
                                      <select
                                        onChange={submitInputdata}
                                        value={inputdata.port_of_entry}
                                        name="port_of_entry"
                                        className="w-100 border mb-3 rounded p-3 bg-white"
                                      >
                                        <option>select....</option>
                                        {
                                          country && country.length > 0 && country.map((item, index) => {
                                            console.log(item)
                                            return (
                                              <>
                                                <option value={item.country_id}>{item?.country_name}</option>
                                              </>
                                            )
                                          })}
                                      </select>
                                      <label>
                                        Port of Exit
                                      </label>
                                      <select
                                        onChange={submitInputdata}
                                        value={inputdata.port_of_exit}
                                        name="port_of_exit"
                                        className="w-100 border mb-3 rounded p-3 bg-white"
                                      >
                                        <option>select....</option>
                                        {
                                          country && country.length > 0 && country.map((item, index) => {
                                            console.log(item)
                                            return (
                                              <>
                                                <option value={item.country_id}>{item?.country_name}</option>
                                              </>
                                            )
                                          })
                                        }
                                      </select>
                                      <label>
                                        Clearing Agent
                                      </label>
                                      <select
                                        name="clearing_agent"
                                        value={inputdata.clearing_agent}
                                        onChange={submitInputdata}
                                        className="w-100 border mb-3 rounded p-3 bg-white"
                                      >
                                        <option>Select...</option>
                                        <option>Amanda</option>
                                        <option>Mbedzi</option>
                                        <option>Kethu</option>
                                        <option>Sia</option>
                                        <option>Shingi</option>
                                        <option>Dolly</option>
                                        <option>CARRIER</option>
                                      </select>

                                      <label>
                                        {" "}
                                        Comment on Docs
                                      </label>
                                      <input
                                        type="text"
                                        name="comment_on_docs"
                                        onChange={submitInputdata}
                                        placeholder="comment on docs"
                                        value={inputdata.comment_on_docs}
                                        className="w-100 border p-3 rounded mb-3"
                                      ></input>
                                    </div>
                                    <div className="modal-footer">

                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleupdateupdate(item.id);
                                        }}
                                        className="btn"
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        className="btn cross_btn"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <th key={index}>{index + 1}</th>
                              <td></td>
                              <td>{item?.customer_ref}</td>
                              <td>{item?.destination}</td>
                              <td></td>
                              <td></td>
                              <td></td> */}
                              {/* <td>

                              </td> */}
                              {/* <td>
                                <VisibilityIcon

                                  style={{ color: "rgb(27 34 69)", cursor: "pointer", fontSize: "18px" }}
                                />

                              </td>
                              <td>
                                <div className="d-flex align-item-center">
                                  <div className="action_btn1 mt-2">
                                    <AiFillDelete className="text-danger" />
                                  </div>

                                  <div className="action_btn ms-2 mt-2"> */}
                              {/* <button
                                      type="button"
                                      className="border-0"
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                      onClick={() => {
                                        handlegetid(item?.id);
                                      }}
                                    >
                                      <FaEdit style={{ color: "#1b2245" }} />
                                    </button> */}

                              {/* <div className="">
                                <div class="dropdown">
                                  <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">

                                  </button>
                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">




                                  </ul>
                                </div>
                              </div>
                              </div>
                              </td> */}
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
                    <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                     disabled={currentPage === totalPages}
                      className="bg_page"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i class="fi fi-rr-angle-small-right page_icon"></i>
                    </button>
                  </div>
              {/* <div className='mt-4'>
                <button disabled={currentPage === 1} className='btn pagePre' onClick={() => handlePageChange(currentPage - 1)} style={{ backgroundColor: "red", color: "white" }}>
                  Previous
                </button>
                <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button className='btn btn-success pageNext' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} style={{ backgroundColor: "green", color: "white" }}>
                  Next
                </button>
              </div> */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
