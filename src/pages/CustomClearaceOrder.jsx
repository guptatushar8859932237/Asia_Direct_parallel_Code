import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CalculateIcon from "@mui/icons-material/Calculate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AiFillDelete } from "react-icons/ai";
import { MdDriveFileMoveOutline } from "react-icons/md";
const pageSize = 5;
const CustomClearaceOrder = () => {
  const [data, setData] = useState({
    customer_ref: "",
    goods_desc: "",
    destination: "",
    port_of_entry: "",
    port_of_exit: "",
    clearing_agent: "",
    comment_on_docs: "",
  });
  const [constgetdata, setConstgetdata] = useState([]);
  const [erd, setErd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputdata, setInputdata] = useState({});
  const [country, setCountry] = useState([]);
  const [client, setClient] = useState([]);
  const [lcientlist, setLcientlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showSeaOptions, setShowSeaOptions] = useState(false);
  const [showRoadOptions, setShowRoadOptions] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0]; // Access the first file from the files array
    if (file) {
      setSelectedImage(file);
    }
  };
  const datagetuseirID = JSON.parse(localStorage.getItem("data123"));

  const handleclick = () => {
    console.log(datagetuseirID.id);
    const formdata = new FormData();

    formdata.append("user_id", data.client);
    // formdata.append("added_by", datagetuseirID.id);
    formdata.append("freight", data?.freight);
    formdata.append("freight_option", data.freight_option);
    formdata.append("is_Import_Export", data.is_Import_Export);
    formdata.append("is_cong_shipp", data.is_cong_shipp);
    formdata.append("goods_desc", data.goods_desc);
    formdata.append("nature_of_goods", data.nature_of_goods);
    formdata.append("packing_type", data.packing_type);
    formdata.append("total_dimension", data.total_dimension);
    formdata.append("total_box", data.total_box);
    formdata.append("total_weight", data.total_weight);
    formdata.append("loading_country", data.loading_country);
    formdata.append("discharge_country", data.discharge_country);
    formdata.append("client", data.client);
    formdata.append("port_of_discharge", data.port_of_discharge);
    formdata.append("port_of_loading", data.port_of_loading);
    formdata.append("added_by", "1");
    // formdata.append("user_id", userid?.id);
    formdata.append("customer_ref", data?.customer_ref);
    formdata.append("destination", data?.destination);
    formdata.append("document", selectedImage);
    formdata.append("comment_on_docs", data?.comment_on_docs);
    formdata.append("document_name", data?.document_name);
    console.log(formdata);
    for (let [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}add-clearing-customer`, formdata)
      .then((response) => {
        toast.success(response.data.message);
        setShowModal(false);
        getdata();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleupdateupdate = () => {
    const formdata = new FormData();
    formdata.append("added_by", "1");
    // formdata.append("user_id", userid?.id);
    formdata.append("clearing_id", erd);
    // formdata.append("document", selectedImage);

    //////////////////////////////testing///////////////////////////////////////
    formdata.append("freight", inputdata.freight);
    formdata.append("freight_option", inputdata.freight_option);
    formdata.append("is_Import_Export", inputdata.is_Import_Export);
    formdata.append("is_cong_shipp", inputdata.is_cong_shipp);
    formdata.append("goods_desc", inputdata.goods_desc);
    formdata.append("nature_of_goods", inputdata.nature_of_goods);
    formdata.append("packing_type", inputdata.packing_type);
    formdata.append("total_dimension", inputdata.total_dimension);
    formdata.append("total_box", inputdata.total_box);
    formdata.append("total_weight", inputdata.total_weight);
    formdata.append("loading_country", inputdata.loading_country);
    formdata.append("discharge_country", inputdata.discharge_country);
    formdata.append("client", inputdata.client);
    formdata.append("port_of_discharge", inputdata.port_of_discharge);
    formdata.append("port_of_loading", inputdata.port_of_loading);
    formdata.append("comment_on_docs", inputdata.comment_on_docs);
    formdata.append("customer_ref", inputdata.customer_ref);
    //  formdata.append("document_name", inputdata.document_name)

    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-clearing`, formdata)
      .then((response) => {
        toast.success(response.data.message);
        getdata();
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleGetDataForUpdate = (id) => {
    setErd(id);
    const selectuser = constgetdata.find((item) => item.id === id);
    console.log(selectuser);
    setInputdata({
      customer_ref: selectuser?.customer_ref || "",
      goods_desc: selectuser?.goods_desc || "",
      destination: selectuser?.destination || "",
      port_of_entry: selectuser?.port_of_entry || "",
      port_of_exit: selectuser?.port_of_exit || "",
      clearing_agent: selectuser?.clearing_agent || "",
      comment_on_docs: selectuser?.comment_on_docs || "",
      freight: selectuser?.freight,
      freight_option: selectuser.freight_option,
      client: selectuser.user_id,
      is_Import_Export: selectuser.is_Import_Export,
      is_cong_shipp: selectuser.is_cong_shipp,
      goods_desc: selectuser.goods_desc,
      nature_of_goods: selectuser.nature_of_goods,
      packing_type: selectuser.packing_type,
      total_dimension: selectuser.total_dimension,
      total_box: selectuser.total_box,
      total_weight: selectuser.total_weight,
      loading_country: selectuser.loading_country,
      discharge_country: selectuser.discharge_country,
      port_of_discharge: selectuser.port_of_discharge,
      port_of_loading: selectuser.port_of_loading,
      added_by: "2",
      customer_ref: selectuser?.customer_ref,
      destination: selectuser?.destination,
      comment_on_docs: selectuser?.comment_on_docs,
      document_name: selectuser?.document_name,
    });
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (isUpdating) {
      handleupdateupdate();
    } else {
      handleclick();
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsUpdating(false);
    setInputdata({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const getdata = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, { added_by: "1" })
      .then((response) => {
        setConstgetdata(response?.data?.data || []);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  const handleclicknavidata = (id) => {
    const datauser = constgetdata.find((item) => item.id === id);
    navigate("/Admin/Custom-details", { state: { data: [datauser] } });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = constgetdata.filter((item) => {
    console.log(item);
    return (
      item?.clearance_number
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.goods_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.port_of_entry_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.port_of_exit_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
    );
  });

  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filteredData.slice(startindex, endIndex);

  const handleclickcleared = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "0",
        added_by: 1,
      })
      .then((response) => {
        console.log(response.data.data);
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getcountry();
    getclient();
  }, []);

  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        console.log(response.data);
        setCountry(response.data.data);
      })
      .catch((error) => {
        toast.errror(error.response.data.data);
      });
  };
  const getclient = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}client-list`)
      .then((response) => {
        setClient(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlestillclear = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "2",
        added_by: 1,
      })
      .then((response) => {
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlestillclear123 = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}clearing-list`, {
        clearing_status: "3",
        added_by: 1,
      })
      .then((response) => {
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
        added_by: 1,
      })
      .then((response) => {
        setConstgetdata(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

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

  const handlelcickdeletesdsd1234 = (item) => {
    const dataval = constgetdata.filter((item1) => {
      return item1.id === item.id;
    });
    const daatta = {
      clearance_id: item.id,
      user_id: item.user_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}MoveToClearaneOrder`, daatta)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        getdata();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlelcickdelete1234 = (id) => {
    console.log("a");
    navigate("/Admin/custom-calcualate", { state: { data: id } });
  };

  useEffect(() => {
    getClient();
  }, []);

  const getClient = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}client-list`)
      .then((response) => {
        setLcientlist(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row manageFreight">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="">
                  <h4 className="freight_hd">Custom Clearance</h4>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="">
                    <input
                      className="px-2 py-1 rounded "
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearch}
                    ></input>
                  </div>
                  <div className="mx-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUpdating(false);
                        setShowModal(true);
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Filter
                    </button>
                    <ul className="dropdown-menu">
                      <li className="li_icon">
                        <p
                          className="dropdown-item mb-0 clear_order"
                          onClick={handleclickcleared}
                        >
                          Pending
                        </p>
                      </li>
                      <li className="li_icon">
                        <p
                          className="dropdown-item mb-0 clear_order"
                          onClick={handleinprocess}
                        >
                          Accepted
                        </p>
                      </li>
                      <li className="li_icon">
                        <p
                          className="dropdown-item mb-0 clear_order"
                          onClick={handlestillclear}
                        >
                          Declined
                        </p>
                      </li>
                      <li className="li_icon">
                        <p
                          className="dropdown-item mb-0 clear_order"
                          onClick={handlestillclear123}
                        >
                          Moved to Order
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <tbody>
                    {currentdata.map((item, index) => {
                      console.log(item);
                      return (
                        <>
                          <tr key={index}>
                            <td className="list_bd">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <p className="client_nm">
                                    {item.client_name}
                                  </p>
                                  <p className="fright_no mx-2 fs-6">
                                    {item.clearance_number}
                                  </p>
                                </div>
                                <div className="">
                                  <p className="port_date">
                                    {new Date(
                                      item.created_at
                                    ).toLocaleDateString("en-GB")}
                                  </p>
                                </div>
                              </div>
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-3 ps-0">
                                    <div className="">
                                      <p className="origin">
                                        {item.goods_desc}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-5">
                                    <div className="d-flex align-items-center justify-content-center">
                                      <p className="origin">
                                        {item.port_of_entry_name}
                                      </p>
                                      <div className="arrow">
                                        <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                      </div>
                                      <p className="origin">
                                        {item.port_of_exit_name}
                                        <span className="fright_type"></span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="text-center"></div>
                                  </div>
                                  <div className="col-md-2 pe-0">
                                    <div className="text-end">
                                      <div className="dropdown">
                                        <a
                                          href=""
                                          type="button"
                                          className="act_btn dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          Action
                                        </a>
                                        <div className="dropdown-menu">
                                          <a
                                            className="dropdown-item li_icon"
                                            onClick={() =>
                                              handleclicknavidata(item.id)
                                            }
                                          >
                                            <VisibilityIcon
                                              style={{
                                                color: "rgb(27 34 69)",
                                                cursor: "pointer",
                                                marginRight: "10px",
                                                width: "20px",
                                              }}
                                            />
                                            View
                                          </a>
                                          <a
                                            className="dropdown-item li_icon"
                                            onClick={() =>
                                              handlelcickdelete(item.id)
                                            }
                                          >
                                            <AiFillDelete
                                              className="text-danger"
                                              style={{
                                                marginRight: "10px",
                                                width: "20px",
                                                cursor: "pointer",
                                                height: "20px",
                                              }}
                                            />
                                            Delete
                                          </a>
                                          <a
                                            className="dropdown-item li_icon"
                                            onClick={() =>
                                              handleGetDataForUpdate(item.id)
                                            }
                                          >
                                            <div className="action_btn">
                                              <FaEdit
                                                style={{
                                                  color: "rgb(11, 65, 112)",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                  height: "15px",
                                                }}
                                              />
                                              Edit
                                            </div>
                                          </a>
                                          <a
                                            className="dropdown-item li_icon NewDropdown"
                                            onClick={() =>
                                              handlelcickdeletesdsd1234(item)
                                            }
                                          >
                                            <div className="action_btn">
                                              <MdDriveFileMoveOutline
                                                style={{
                                                  color: "rgb(27 34 69)",
                                                  cursor: "pointer",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                }}
                                              />
                                              Inorder
                                            </div>
                                          </a>
                                          <a
                                            className="dropdown-item li_icon NewDropdown"
                                            onClick={() =>
                                              handlelcickdelete1234(item.id)
                                            }
                                          >
                                            <div className="action_btn">
                                              <CalculateIcon
                                                style={{
                                                  color: "rgb(27 34 69)",
                                                  cursor: "pointer",
                                                  marginRight: "10px",
                                                  width: "20px",
                                                }}
                                              />
                                              Get Estimate
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <p className="input_user mb-0" />
                                <label className="status">
                                  {item.quotation_status == 1 ? (
                                    <div className="d-flex align-items-center">
                                      <span className="dot bg-success me-2"></span>
                                      <p className="text-success mb-0">
                                        Accepted
                                      </p>
                                    </div>
                                  ) : // <p className="text-success mb-0">Accepted</p>
                                    item.quotation_status == 2 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-info me-2"></span>
                                        <p className="text-info mb-0">Declined</p>
                                      </div>
                                    ) : // <p className="text-danger mb-0">Declined</p>
                                      item.quotation_status == 3 ? (
                                        <div className="d-flex align-items-center">
                                          <span className="dot bg-success me-2"></span>
                                          <p className="text-success mb-0">
                                            Moved to Order
                                          </p>
                                        </div>
                                      ) : item.quotation_status == 4 ? (
                                        <p className="text-info mb-0">Estimated</p>
                                      ) : (
                                        <div className="d-flex align-items-center">
                                          <span className="dot bg-secondary me-2"></span>
                                          <p className="text-secondary mb-0">
                                            Pending
                                          </p>
                                        </div>
                                        // <p className="text-dark mb-0">Pending</p>
                                      )}
                                </label>
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div
        className={`modal fade ${showModal ? "show " : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {isUpdating ? "Update" : "Add"} Custom Clearance
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleModalClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label htmlFor="customer_ref" className="form-label">
                      Mode of Freight
                    </label>
                    <br />
                    <select
                      onChange={isUpdating ? handleInputChange : handlechange}
                      name="freight"
                      className="w-100 py-2 px-2 sel_custom"
                      value={isUpdating ? inputdata.freight : data.freight}
                    >
                      <option>Select...</option>
                      <option value="Sea">Sea</option>
                      <option value="Air">Air</option>
                      <option value="Road">Road</option>
                      <option value="Rail">Rail</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client </label>
                  <select
                    className="form-control"
                    name="client"
                    onChange={isUpdating ? handleInputChange : handlechange}
                    value={isUpdating ? inputdata.client : data.client}
                  >
                    <option>Select...</option>
                    {lcientlist &&
                      lcientlist.length > 0 &&
                      lcientlist.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <option key={index} value={item.id}>
                              {item.full_name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {showSeaOptions && (
                    <>
                      <h5>Sea Freight Options</h5>
                      <select
                        name="seaOption"
                        id="seaOption"
                        onChange={isUpdating ? handleInputChange : handlechange}
                        className="w-100 py-2 px-2"
                      >
                        <option value="">Select...</option>
                        <option value="fullContainer">Full Container</option>
                        <option value="lessThanContainer">
                          Less than Container Size
                        </option>
                      </select>
                    </>
                  )}
                  {showRoadOptions && (
                    <>
                      <h5>Road Freight Options</h5>
                      <select
                        name="roadOption"
                        id="roadOption"
                        onChange={isUpdating ? handleInputChange : handlechange}
                        className="w-100 py-2 px-2"
                      >
                        <option value="">Select...</option>
                        <option value="fullLoad">Full Load</option>
                        <option value="smallCargo">
                          Small Cargo for Console
                        </option>
                      </select>
                    </>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label>Are You</label>
                    <div className="shipRefer">
                      {!isUpdating ? (
                        <>
                          <input
                            type="radio"
                            id="statusShipper"
                            name="is_cong_shipp"
                            value="shipper"
                            // checked={inputdata.is_cong_shipp === "shipper"}
                            onChange={handlechange}
                          />
                          <label htmlFor="statusShipper">Shipper </label>
                          <input
                            type="radio"
                            id="statusConsignee"
                            name="is_cong_shipp"
                            value="consignee"
                            // checked={inputdata.is_cong_shipp === "consignee"}
                            onChange={handlechange}
                          />
                          <label htmlFor="statusConsignee">Consignee </label>
                        </>
                      ) : (
                        <>
                          <input
                            type="radio"
                            id="statusShipper"
                            name="is_cong_shipp"
                            value="shipper"
                            checked={inputdata.is_cong_shipp === "shipper"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="statusShipper">Shipper </label>

                          <input
                            type="radio"
                            id="statusConsignee"
                            name="is_cong_shipp"
                            value="consignee"
                            checked={inputdata.is_cong_shipp === "consignee"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="statusConsignee">Consignee </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Is this</label>
                  <div className="shipRefer d-flex">
                    {!isUpdating ? (
                      <>
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            id="statusOne"
                            name="is_Import_Export"
                            value="import"

                            onChange={handlechange}
                            className="check_input"
                          />
                          <label htmlFor="statusOne">Import</label>
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            id="statusTwo"
                            name="is_Import_Export"
                            value="export"

                            onChange={handlechange}
                            className="check_input"
                          />
                          <label htmlFor="statusTwo">Export</label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            id="statusOne"
                            name="is_Import_Export"
                            value="import"
                            checked={inputdata.is_Import_Export === "import"}
                            onChange={handleInputChange}
                            className="check_input"
                          />
                          <label htmlFor="statusOne">Import</label>
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            id="statusTwo"
                            name="is_Import_Export"
                            value="export"
                            checked={inputdata.is_Import_Export === "export"}
                            onChange={handleInputChange}
                            className="check_input"
                          />
                          <label htmlFor="statusTwo">Export</label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label>Shipment Refrence</label>
                  <div className="shipRefer">
                    <input
                      type="text"
                      id="stausone"
                      name="customer_ref"
                      className="w-100 rounded py-1 px-2 sel_custom"
                      onChange={isUpdating ? handleInputChange : handlechange}
                      value={
                        isUpdating
                          ? inputdata.customer_ref
                          : data.customer_ref
                      }
                      placeholder="Shipment Reference"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h6 className="md_heading">Port of Clearing Details</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="destination" className="form-label">
                      Port of Loading Country
                    </label>
                    <select
                      className="form-control"
                      id="port_of_entry"
                      name="loading_country"
                      value={
                        isUpdating
                          ? inputdata.loading_country
                          : data.loading_country
                      }
                      onChange={isUpdating ? handleInputChange : handlechange}
                    >
                      <option>Select...</option>
                      {country &&
                        country.length > 0 &&
                        country.map((item, index) => {
                          console.log(item);

                          return (
                            <>
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="port_of_entry" className="form-label">
                      Port of Exit Country
                    </label>
                    <select
                      className="form-control"
                      id="port_of_entry"
                      name="discharge_country"
                      value={
                        isUpdating
                          ? inputdata.discharge_country
                          : data.discharge_country
                      }
                      onChange={isUpdating ? handleInputChange : handlechange}
                    >
                      <option>Select...</option>
                      {country &&
                        country.length > 0 &&
                        country.map((item, index) => {
                          console.log(item);

                          return (
                            <>
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="port_of_exit" className="form-label">
                      Port of Loading
                    </label>
                    <input
                      className="form-control"
                      name="port_of_loading"
                      onChange={isUpdating ? handleInputChange : handlechange}
                      value={
                        isUpdating
                          ? inputdata.port_of_loading
                          : data.port_of_loading
                      }
                      placeholder="Port of Loading"
                    ></input>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="clearing_agent" className="form-label">
                      Port of Discharge
                    </label>
                    <input
                      className="form-control"
                      name="port_of_discharge"
                      onChange={isUpdating ? handleInputChange : handlechange}
                      value={
                        isUpdating
                          ? inputdata.port_of_discharge
                          : data.port_of_discharge
                      }
                      placeholder="Port of Discharge"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h6 className="md_heading">Cargo Details</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="port_of_exit" className="form-label">
                      Product Description
                    </label>
                    <input
                      className="form-control"
                      name="goods_desc"
                      value={
                        isUpdating ? inputdata.goods_desc : data.goods_desc
                      }
                      onChange={isUpdating ? handleInputChange : handlechange}
                      placeholder="Product Description"
                    ></input>
                  </div>
                </div>
                {/* <div className='col-md-6'>
                    <div className="mb-3">
                      <label htmlFor="clearing_agent" className="form-label">Nature of Goods</label>
                      <select className="form-control" id="clearing_agent" name="user_id" value={isUpdating ? inputdata.user_id : data.user_id} onChange={isUpdating ? handleInputChange : handlechange} >
                        <option>Select...</option>
                        {
                          client && client.length > 0 && client.map((item, index) => {
                            console.log(item)
                            return (
                              <>
                                <option key={index} value={item.id}>{item.full_name}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div> */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="clearing_agent" className="form-label">
                      Nature of Goods
                    </label>
                    <select
                      className="form-control"
                      id="clearing_agent"
                      name="nature_of_goods"
                      value={
                        isUpdating
                          ? inputdata.nature_of_goods
                          : data.nature_of_goods
                      }
                      onChange={isUpdating ? handleInputChange : handlechange}
                    >
                      <option>Select...</option>
                      <option>General Cargo</option>
                      <option>Battery</option>
                      <option>Powders</option>
                      <option>Hazardous</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="port_of_exit" className="form-label">
                      Type of Packing
                    </label>
                    <select
                      className="form-control"
                      name="packing_type"
                      value={
                        isUpdating ? inputdata.packing_type : data.packing_type
                      }
                      onChange={isUpdating ? handleInputChange : handlechange}
                    >
                      <option>Select...</option>
                      <option>Box</option>
                      <option>Crate</option>
                      <option>Pallet</option>
                      <option>Bags</option>
                    </select>
                  </div>
                </div>
                {/* <div className='col-md-6'>
                    <div className="mb-3">
                      <label htmlFor="clearing_agent" className="form-label">Nature of Goods</label>
                      <select className="form-control" id="clearing_agent" name="user_id" value={isUpdating ? inputdata.user_id : data.user_id} onChange={isUpdating ? handleInputChange : handlechange} >
                        <option>Select...</option>
                        {
                          client && client.length > 0 && client.map((item, index) => {
                            console.log(item)
                            return (
                              <>
                                <option key={index} value={item.id}>{item.full_name}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div> */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="clearing_agent" className="form-label">
                      Comment on Goods
                    </label>
                    <input
                      className="form-control"
                      name="comment_on_docs"
                      onChange={isUpdating ? handleInputChange : handlechange}
                      value={
                        isUpdating
                          ? inputdata.comment_on_docs
                          : data.comment_on_docs
                      }
                      placeholder="Comment on Docs"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="port_of_exit" className="form-label">
                      No of package
                    </label>
                    <input
                      className="form-control"
                      onKeyPress={handlekey}
                      name="total_box"
                      value={isUpdating ? inputdata.total_box : data.total_box}
                      onChange={isUpdating ? handleInputChange : handlechange}
                      placeholder="0.00"
                    ></input>
                  </div>
                </div>
                {/* <div className='col-md-6'>
                    <div className="mb-3">
                      <label htmlFor="clearing_agent" className="form-label">Nature of Goods</label>
                      <select className="form-control" id="clearing_agent" name="user_id" value={isUpdating ? inputdata.user_id : data.user_id} onChange={isUpdating ? handleInputChange : handlechange} >
                        <option>Select...</option>
                        {
                          client && client.length > 0 && client.map((item, index) => {
                            console.log(item)
                            return (
                              <>
                                <option key={index} value={item.id}>{item.full_name}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div> */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="clearing_agent" className="form-label">
                      Total Dimension
                    </label>
                    <input
                      className="form-control"
                      onKeyPress={handlekey}
                      name="total_dimension"
                      onChange={isUpdating ? handleInputChange : handlechange}
                      value={
                        isUpdating
                          ? inputdata.total_dimension
                          : data.total_dimension
                      }
                      placeholder="0.00"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="port_of_exit" className="form-label">
                      Weight
                    </label>
                    <input
                      className="form-control"
                      name="total_weight"
                      onKeyPress={handlekey}
                      onChange={isUpdating ? handleInputChange : handlechange}
                      value={
                        isUpdating ? inputdata.total_weight : data.total_weight
                      }
                      placeholder="0.00"
                    ></input>
                  </div>
                </div>
                {/* <div className='col-md-6'>
                    <div className="mb-3">
                      <label htmlFor="clearing_agent" className="form-label">Nature of Goods</label>
                      <select className="form-control" id="clearing_agent" name="user_id" value={isUpdating ? inputdata.user_id : data.user_id} onChange={isUpdating ? handleInputChange : handlechange} >
                        <option>Select...</option>
                        {
                          client && client.length > 0 && client.map((item, index) => {
                            console.log(item)
                            return (
                              <>
                                <option key={index} value={item.id}>{item.full_name}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div> */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="clearing_agent" className="form-label">
                      Add Attachment
                    </label>
                    <select
                      className="w-100 py-2 px-2 sel_custom"
                      name="document_name"
                      value={
                        isUpdating
                          ? inputdata.document_name
                          : data.document_name
                      }
                      onChange={isUpdating ? handleInputChange : handlechange}
                    >
                      <option>Select...</option>
                      <option>Packing List</option>
                      <option>Licenses/Permits</option>
                      <option>Product Literature</option>
                      <option>Other documents</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="comment_on_docs" className="form-label">
                      Document
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="document"
                      placeholder="Comment on Docs"
                      name="document"
                      value={
                        isUpdating
                          ? inputdata.document
                          : data.document
                      }
                      onChange={isUpdating ? handleInputChange : handleChangeFile}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isUpdating ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="btn btn-secondary close"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomClearaceOrder;
