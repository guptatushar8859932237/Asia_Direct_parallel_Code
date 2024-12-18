import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FaEdit } from "react-icons/fa";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import Swal from "sweetalert2";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
const pageSize = 5;
export default function UserFreight() {
  const naviagte = useNavigate();
  const [options, setOptions] = useState();
  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedata, setUpdatedata] = useState([]);
  const [apidata,setApidata] = useState([]);
  const [clientdata, setClientdata] = useState([]);
  const [clearings, setClearings] = useState({});
  const [selectfile1, setSelectfile1] = useState(null);
  const [country, setCountry] = useState([]);
  const [inputdata, setInputdata] = useState({
    add_attachments: "",
    freight_id: "",
    product_desc: "",
    collection_from: "",
    freight: "",
    freight_type: "",
    shipment_ref: "",
    dimension: "",
    weight: "",
    user_type: "",
    shipment_origin: "",
    shipment_des: "",
    comment: "",
    no_of_packages: "",
    package_type: "",
    collection_address: "",
    delivery_address: "",
    nature_of_goods: "",
    delivery_to: "",
    port_of_loading: "",
    post_of_discharge: "",
    auto_calculate: "",
    sea_freight_option: "",
    road_freight_option: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const updatecountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setUpdatedata(response.data.data);
      })
      .catch((error) => {
        console.group(error.response.data.message);
      });
  };
  useEffect(() => {
    updatecountry();
  }, []);
  useEffect(() => {
    frightData();
  }, []);
  const frightData = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}new-freight-list`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}supplier-list`
        );
        console.log(response.data.data);
        setOptions(response.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  /////////////////////////////////////////////////delete function//////////////////////////////////////////
  const handledelete = (id) => {
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
          .post(`${process.env.REACT_APP_BASE_URL}delete-freight`, {
            freight_id: id,
          })
          .then((response) => {
            frightData();
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
  /////////////////////////////////////////update freight///////////////////////////////////////////
  const handleupdate = (id) => {
    console.log(id);
    setDataId(id);
    const setUSer = data.filter((item) => item.freight_id === id);
    const getUSer = setUSer[0];
    setInputdata((prevData) => ({
      ...prevData,
      add_attachments: getUSer.add_attachments,
      freight_id: getUSer.freight_id,
      product_desc: getUSer.product_desc,
      client_id: getUSer.client_id,
      collection_from: getUSer.collection_from,
      freight: getUSer.freight,
      freight_type: getUSer.freight_type,
      assign_to_clearing: getUSer.assign_to_clearing,
      shipment_ref: getUSer.shipment_ref,
      dimension: getUSer.dimension,
      weight: getUSer.weight,
      fcl_lcl: getUSer.fcl_lcl,
      user_type: getUSer.user_type,
      shipment_origin: getUSer.shipment_origin,
      commodity: getUSer.commodity,
      shipment_des: getUSer.shipment_des,
      comment: getUSer.comment,
      no_of_packages: getUSer.no_of_packages,
      package_type: getUSer.package_type,
      insurance: getUSer.insurance,
      collection_address: getUSer.collection_address,
      delivery_address: getUSer.delivery_address,
      nature_of_goods: getUSer.nature_of_goods,
      delivery_to: getUSer.delivery_to,
      port_of_loading: getUSer.port_of_loading,
      post_of_discharge: getUSer.post_of_discharge,
      auto_calculate: getUSer.auto_calculate,
      sea_freight_option: getUSer.sea_freight_option,
      road_freight_option: getUSer.road_freight_option,
    }));
    console.log(getUSer.assign_to_clearing)
    console.log(getUSer.insurance)
  };
  console.log(inputdata.user_type);
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const handleupdateapipost = (id) => {
    console.log("Client ID:", inputdata.client_id);
    const formData12 = new FormData();
    formData12.append("client_id", inputdata.client_id);
    formData12.append("freight_id", inputdata.freight_id);
    formData12.append("product_desc", inputdata.product_desc);
    formData12.append("freight_type", inputdata.freight_type);
    formData12.append("freight", inputdata.freight);
    formData12.append("dimension", inputdata.dimension);
    formData12.append("shipment_des", inputdata.shipment_des);
    formData12.append("weight", inputdata.weight);
    formData12.append("status", inputdata.status);
    formData12.append("shipment_origin", inputdata.shipment_origin);
    formData12.append("shipment_ref", inputdata.shipment_ref);
    formData12.append("freight_number", inputdata.freight_number);
    formData12.append("nature_of_goods", inputdata.nature_of_goods);
    formData12.append("comment", inputdata.comment);
    formData12.append("no_of_packages", inputdata.no_of_packages);
    formData12.append("package_type", inputdata.package_type);
    formData12.append("commodity", inputdata.commodity);
    formData12.append("insurance", inputdata.insurance);
    formData12.append("assign_to_clearing", inputdata.assign_to_clearing);
    formData12.append("user_type", inputdata.user_type);
    formData12.append("fcl_lcl", inputdata.fcl_lcl);
    formData12.append("port_of_loading", inputdata.port_of_loading);
    formData12.append("post_of_discharge", inputdata.post_of_discharge);
    formData12.append("delivery_to_country", inputdata.delivery_to_country);
    formData12.append("delivery_address", inputdata.delivery_address);
    formData12.append("delivery_to", inputdata.delivery_to);
    formData12.append("add_attachments", inputdata.add_attachments);
    formData12.append("auto_calculate", inputdata.auto_calculate);
    formData12.append("added_by", inputdata.added_by);
    formData12.append("client_name", inputdata.client_name);
    formData12.append("collection_address", inputdata.collection_address);
    formData12.append("collection_from", inputdata.collection_from);
    formData12.append(
      "collection_from_country",
      inputdata.collection_from_country
    );
    formData12.append("road_freight_option", inputdata.road_freight_option);
    formData12.append("sea_freight_option", inputdata.sea_freight_option);
    formData12.append("document", selectfile1);

    for (let pair of formData12.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-freights`, formData12)
      .then((response) => {
        toast.success(response.data.message);
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      });
  };
  ////////////////////////////////////get app api////////////////////////////////////////////////////
  const clientlist = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}clientlist`)
      .then((response) => {
        setClientdata(response.data.data);
      });
  };
  useEffect(() => {
    clientlist();
    getdata();
  }, []);
  const handleaccepted = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}status-Freight`, {
        status: 1,
        freight_id: id,
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        frightData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handledeclined = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}status-Freight`, {
        status: 2,
        freight_id: id,
      })
      .then((response) => {
        console.log(response.data);
        frightData();
        toast.error(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const hanldeclicknavicalc = (id) => {
    console.log(id);
    const alldtaaa = data.filter((item) => {
      return item.freight_id === id;
    });
    console.log(alldtaaa);
    naviagte("/Admin/shipping-estimate-client", { state: { data: alldtaaa } });
  };
  const handlelcickapiupdae = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}new-freight-list`, { status: 0 })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlelcickapiupdatepartial = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}new-freight-list`, { status: 4 })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const handlelcickapiupdatedeclined = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}new-freight-list`, { status: 2 })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlelcickapiupdate = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}new-freight-list`, { status: 1 })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleclick = (freight_id) => {
    const user = data.filter((item) => {
      return item.freight_id === freight_id;
    });
    console.log(user);
    navigate("/Admin/Updatedetails", { state: { data: user } });
  };
  ///////////////////////////////pegination//////////////////////////////////////////////////////////
  const filteredData = data.filter((item) => {
    console.log(item);
    return (
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.product_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.collection_from_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.nature_of_hazard
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.delivery_to_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      // item.incoterm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.freight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.freight_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlequotation = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}assign-estimateto-client`, {
        freight_id: id,
      })
      .then((response) => {
        console.log(response.data.message);
        frightData();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const getdata = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setCountry(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlechangeradioOrigin = (e) => {
    const { name, value } = e.target;
    setInputdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlechangeradioDestination = (e) => {
    const { name, value } = e.target;
    setInputdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlechangeradiouserTyoe = (e) => {
    setInputdata((prevData) => ({
      ...prevData,
      user_type: e.target.value,
    }));
  };
  const handlechangeradiousno = (e) => {
    const { name, value } = e.target;
    setInputdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlechangeradiouser = (e) => {
    setClearings(e.target.value);
  };
  const handlechangeradiouser22 = (e) => {
    setInputdata((prevData) => ({
      ...prevData,
      insurance: e.target.value
    }))
  };
  const handlechangeradiouser11 = (e) => {
    setInputdata((prevData) => ({
      ...prevData,
      assign_to_clearing: e.target.value
    }))
  };
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  console.log(inputdata.shipment_des);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleupdateapifile = (e) => {
    const file = e.target.file[0];
    if (file) {
      setSelectfile1(file);
    }
  };
  useEffect(()=>{
    getdataap()
  },[])
  const getdataap =() =>{
    axios.get(`${process.env.REACT_APP_BASE_URL}getCommodities`).then((response)=>{
      console.log(response.data)
      setApidata(response.data.data)
    }).catch((error)=>{
      console.log(error.response.data)
    })
  }
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row manageFreight">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="freight_hd">Freight By User</h4>
                <div className="d-flex">
                  <div className="me-2">
                    <input
                      className="py-1 rounded ps-1"
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search"
                    ></input>
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
                      <li className="filter_item">
                        <p
                          className="dropdown-item mb-0"
                          onClick={handlelcickapiupdae}
                        >
                          Pending
                        </p>
                      </li>
                      <li className="filter_item">
                        <p
                          className="dropdown-item mb-0"
                          onClick={handlelcickapiupdate}
                        >
                          Accepted
                        </p>
                      </li>
                      <li className="filter_item">
                        <p
                          className="dropdown-item mb-0"
                          onClick={handlelcickapiupdatedeclined}
                        >
                          Declined
                        </p>
                      </li>
                      <li className="filter_item">
                        <p
                          className="dropdown-item mb-0"
                          onClick={handlelcickapiupdatepartial}
                        >
                          Estimated
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
                <table className="table table-striped tableICon">
                  <tbody>
                    {currentdata &&
                      currentdata.length > 0 &&
                      currentdata.map((item, index) => {
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
                                      {item.freight_number}
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
                                          {item.product_desc}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-md-5">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <p className="origin">
                                          {item.collection_from_country}
                                        </p>
                                        <div className="arrow">
                                          <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                        </div>
                                        <p className="origin">
                                          {item.delivery_to_country}
                                          <span className="fright_type">
                                            ({item.freight})
                                          </span>
                                        </p>
                                      </div>
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
                                              onClick={() => {
                                                handleclick(item.freight_id);
                                              }}
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
                                              onClick={() => {
                                                handledelete(item.id);
                                              }}
                                            >
                                              <AiFillDelete
                                                className="text-danger"
                                                style={{
                                                  marginRight: "10px",
                                                  cursor: "pointer",
                                                  width: "20px",
                                                }}
                                              />
                                              Delete
                                            </a>
                                            <a className="dropdown-item li_icon">
                                              <div className="action_btn">
                                                <div
                                                  type="button"
                                                  onClick={() => {
                                                    handleupdate(
                                                      item.freight_id
                                                    );
                                                  }}
                                                  className="border-0 outline-none li_icon"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#staticBackdrop"
                                                >
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
                                              </div>
                                            </a>
                                            <a className="dropdown-item li_icon">
                                              <div className="action_btn">
                                                <div
                                                  type="button"
                                                  onClick={() => {
                                                    handledeclined(
                                                      item.freight_id
                                                    );
                                                  }}
                                                  className="border-0 outline-none li_icon"
                                                >
                                                  <CancelIcon
                                                    style={{
                                                      color: "rgb(11, 65, 112)",
                                                      marginRight: "10px",
                                                      width: "20px",
                                                      height: "15px",
                                                    }}
                                                  />
                                                  Declined
                                                </div>
                                              </div>
                                            </a>
                                            <a className="dropdown-item li_icon">
                                              <div className="action_btn">
                                                <div
                                                  type="button"
                                                  onClick={() => {
                                                    handleaccepted(
                                                      item.freight_id
                                                    );
                                                  }}
                                                  className="border-0 outline-none li_icon"
                                                >
                                                  <CheckCircleIcon
                                                    style={{
                                                      color: "rgb(11, 65, 112)",
                                                      marginRight: "10px",
                                                      width: "20px",
                                                      height: "15px",
                                                    }}
                                                  />
                                                  Accepted
                                                </div>
                                              </div>
                                            </a>
                                            <a className="dropdown-item li_icon">
                                              <div className="action_btn">
                                                <div
                                                  type="button"
                                                  onClick={() => {
                                                    hanldeclicknavicalc(
                                                      item.freight_id
                                                    );
                                                  }}
                                                  className="border-0 outline-none li_icon"
                                                >
                                                  <CalculateIcon
                                                    style={{
                                                      color: "rgb(11, 65, 112)",
                                                      marginRight: "10px",
                                                      width: "20px",
                                                      height: "15px",
                                                    }}
                                                  />
                                                  Calculate Estimate
                                                </div>
                                              </div>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <p type="radio" className="input_user mb-0" />
                                  <label className="status">
                                    {item.status == 1 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-success me-2"></span>
                                        <p className="text-success mb-0">
                                          Accepted
                                        </p>
                                      </div>
                                    ) : item.status == 2 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-danger me-2"></span>
                                        <p className="text-danger mb-0">
                                          Declined
                                        </p>
                                      </div>
                                    ) : item.status == 3 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-secondary me-2"></span>
                                        <p className="text-secondary mb-0">
                                          Partial
                                        </p>
                                      </div>
                                    ) : item.status == 4 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-info me-2"></span>
                                        <p className="text-info mb-0">
                                          Estimated
                                        </p>
                                      </div>
                                    ) : item.status == 6 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-danger me-2"></span>
                                        <p className="text-danger mb-0">
                                          Quotation Rejected
                                        </p>
                                      </div>
                                    ) : item.status == 5 ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-success me-2"></span>
                                        <p className="text-success mb-0">
                                          Quotation Accepted
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-dark me-2"></span>
                                        <p className="text-dark mb-0">
                                          pending
                                        </p>
                                      </div>
                                    )}
                                  </label>
                                </div>
                              </td>
                              <div
                                className="modal fade modalManageFreight md_update"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex={-1}
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="staticBackdropLabel"
                                      >
                                        Update Freight
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body">
                                      <div className="frightFormSec">
                                        <div className="container">
                                          <div className="borderShip mt-3">
                                            <h4>Freight Details</h4>
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <label>Freight Type</label>
                                                <select
                                                  name="freight"
                                                  value={inputdata.freight}
                                                  onChange={handleupdateapi}
                                                  id="freightOption"
                                                >
                                                  <option value="">
                                                    Select...
                                                  </option>
                                                  <option value="Sea">
                                                    Sea
                                                  </option>
                                                  <option value="Air">
                                                    Air
                                                  </option>
                                                  <option value="Road">
                                                    Road
                                                  </option>
                                                  <option value="Rail">
                                                    Rail
                                                  </option>
                                                </select>
                                                <p className="text-danger" />
                                              </div>
                                              <div className="col-lg-6">
                                                <label>Freight Option</label>
                                                <select
                                                  name="freight_type"
                                                  onChange={handleupdateapi}
                                                  value={inputdata.freight_type}
                                                >
                                                  <option value="">
                                                    Select...
                                                  </option>
                                                  <option value="express">
                                                    Express
                                                  </option>
                                                  <option value="normal">
                                                    Normal
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="borderShip">
                                            <h4>Shipment details</h4>
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <label>Origin</label>
                                                <FormControl>
                                                  <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="shipment_origin" 
                                                    value={
                                                      inputdata.shipment_origin
                                                    }
                                                    onChange={
                                                      handlechangeradioOrigin
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Shipper will deliver at Asia Direct - Africa warehouse"
                                                      control={<Radio />}
                                                      label="Shipper will deliver at Asia Direct - Africa warehouse"
                                                    />
                                                    <FormControlLabel
                                                      value="Asia Direct will collect from shipper address"
                                                      control={<Radio />}
                                                      label="Asia Direct will collect from shipper address"
                                                    />
                                                    <FormControlLabel
                                                      value="Shipper will deliver to the port of loading"
                                                      control={<Radio />}
                                                      label="Shipper will deliver to the port of loading"
                                                    />
                                                    <FormControlLabel
                                                      value="Shipper will deliver and facilitate export at the Port of loading"
                                                      control={<Radio />}
                                                      label="Shipper will deliver and facilitate export at the Port of loading"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                                <p className="text-danger" />
                                              </div>
                                              <div className="col-lg-6">
                                                <label>Destination</label>
                                                <FormControl>
                                                  <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="shipment_des"
                                                    value={
                                                      inputdata.shipment_des
                                                    }
                                                    onChange={
                                                      handlechangeradioDestination
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Asia Direct will deliver to the Address"
                                                      control={<Radio />}
                                                      label="Asia Direct will deliver to the Address"
                                                    />
                                                    <FormControlLabel
                                                      value="Consignee will collect at Asia Direct - Africa warehouse"
                                                      control={<Radio />}
                                                      label="Consignee will collect at Asia Direct - Africa warehouse"
                                                    />
                                                    <FormControlLabel
                                                      value="Consignee will collect at the nearest port"
                                                      control={<Radio />}
                                                      label="Consignee will collect at the nearest port"
                                                    />
                                                    <FormControlLabel
                                                      value="Consignee will collect and facilitate import at destination portn"
                                                      control={<Radio />}
                                                      label="Consignee will collect and facilitate import at destination portn"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                                <p className="text-danger" />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="borderShip ">
                                            <h4>Your Shipment reference</h4>
                                            <div className="row d-flex">
                                              <div className="col-lg-6">
                                                <FormControl>
                                                  <FormLabel id="demo-radio-buttons-group-label">
                                                    <label>
                                                      Client refrence
                                                    </label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="user_type"
                                                    value={
                                                      inputdata.user_type
                                                    }
                                                    onChange={
                                                      handlechangeradiouserTyoe
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      // value={inputdata.user_type==="shipper"}
                                                      control={<Radio />}
                                                      value="shipper"
                                                      label="Shipper"
                                                    />
                                                    <FormControlLabel
                                                      // value={inputdata.user_type=="consignee"}
                                                      control={<Radio />}
                                                      value="consignee"
                                                      label="Consignee"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div>
                                                <FormControl>
                                                  <FormLabel id="demo-radio-buttons-group-label">
                                                    <label>
                                                      Assign clearing
                                                    </label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="assign_to_clearing"
                                                    value={
                                                      inputdata.assign_to_clearing
                                                    }
                                                    onChange={
                                                      handlechangeradiouser11
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      checked={inputdata.assign_to_clearing === "Yes"}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      checked={inputdata.assign_to_clearing === "No"}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div>
                                                <div className="col-lg-6">
                                                  <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">
                                                      <label>Insurance</label>
                                                    </FormLabel>
                                                    <RadioGroup
                                                      aria-labelledby="demo-radio-buttons-group-label"
                                                      name="insurance"
                                                      value={
                                                        inputdata.insurance
                                                      }
                                                      onChange={
                                                        handlechangeradiouser22
                                                      }
                                                    >
                                                      <FormControlLabel
                                                        value="Yes"
                                                        checked={inputdata.insurance === "Yes"}
                                                        control={<Radio />}
                                                        label="Yes"
                                                      />
                                                      <FormControlLabel
                                                        value="No"
                                                        control={<Radio />}
                                                        checked={inputdata.insurance === "No"}
                                                        label="No"
                                                      />
                                                    </RadioGroup>
                                                  </FormControl>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="borderShip1">
                                              <h4>Location details</h4>
                                              <div className="row">
                                                <div className="col-lg-6">
                                                  <label>Collection from</label>
                                                  <select
                                                    value={
                                                      inputdata.collection_from
                                                    }
                                                    name="collection_from"
                                                    onChange={handleupdateapi}
                                                  >
                                                    {updatedata.map(
                                                      (option, index) => {
                                                        console.log(
                                                          typeof option.id
                                                        );
                                                        return (
                                                          <>
                                                            <option
                                                              key={index}
                                                              value={
                                                                option.id
                                                              }
                                                            >
                                                              {
                                                                option.name
                                                              }
                                                            </option>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </select>
                                                  <p className="text-danger" />
                                                </div>
                                                <div className="col-lg-6">
                                                  <label>
                                                    Collection Address
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="collection_address"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.collection_address
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-lg-6">
                                                  <div className="mb-3">
                                                    <label>Port of Loading</label>
                                                    <input
                                                      type="text"
                                                      name="port_of_loading"
                                                      onChange={handleupdateapi}
                                                      value={
                                                        inputdata.port_of_loading
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="mb-3">
                                                    <label>
                                                      Port of Discharge
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name="post_of_discharge"
                                                      onChange={handleupdateapi}
                                                      value={
                                                        inputdata.post_of_discharge
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-lg-6">
                                                  <label>Delivery To</label>
                                                  <select
                                                    value={
                                                      inputdata.delivery_to
                                                    }
                                                    name="delivery_to"
                                                    onChange={handleupdateapi}
                                                  >
                                                    {updatedata.map(
                                                      (option, index) => {
                                                        console.log(
                                                          typeof option.id
                                                        );
                                                        return (
                                                          <>
                                                            <option
                                                              key={index}
                                                              value={
                                                                option.id
                                                              }
                                                            >
                                                              {
                                                                option.name
                                                              }
                                                            </option>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </select>
                                                  <p className="text-danger" />
                                                </div>
                                                <div className="col-lg-6">
                                                  <label>
                                                    Delivery Address
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="delivery_address"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.delivery_address
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="borderShip">
                                            <h4>Cargo details</h4>
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>
                                                    Product Description
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="product_desc"
                                                    className="w-100"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.product_desc}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Nature of Goods</label>
                                                  <select
                                                    name="nature_of_goods"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.nature_of_goods
                                                    }
                                                  >
                                                    <option value="">
                                                      Select...
                                                    </option>
                                                    <option value="generalCargo">
                                                      General cargo
                                                    </option>
                                                    <option value="battery">
                                                      Battery
                                                    </option>
                                                    <option value="liquids">
                                                      Liquids
                                                    </option>
                                                    <option value="powders">
                                                      Powders
                                                    </option>
                                                    <option value="hazardous">
                                                      Hazardous
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Package Type</label>
                                                  <select
                                                    name="package_type"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.package_type}
                                                  >
                                                    <option value="">
                                                      Select...
                                                    </option>
                                                    <option value="box">
                                                      Box
                                                    </option>
                                                    <option value="crate">
                                                      Crate
                                                    </option>
                                                    <option value="pallet">
                                                      Pallet
                                                    </option>
                                                    <option value="bags">
                                                      Bags
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Total Packages</label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    name="no_of_packages"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.no_of_packages
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Total Dimension</label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    name="dimension"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.dimension}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Total Weight</label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    name="weight"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.weight}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Auto Calculate</label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    name="auto_calculate"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.auto_calculate
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Document Name</label>
                                                  <select
                                                    name="add_attachments"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.add_attachments
                                                    }
                                                  >
                                                    <option value="">
                                                      Select...
                                                    </option>
                                                    <option value="supplierInvoice">
                                                      Supplier Invoice / Quotation
                                                      / Proforma Invoice
                                                    </option>
                                                    <option value="packingList">
                                                      Packing List
                                                    </option>
                                                    <option value="licenses">
                                                      Licenses/Permits
                                                    </option>
                                                    <option value="otherDocuments">
                                                      Other documents
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Type</label>
                                                  <select
                                                    name="fcl_lcl"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.fcl_lcl
                                                    }
                                                  >
                                                    <option value="">
                                                      Select...
                                                    </option>
                                                   
                                                    <option value="FCL">
                                                      FCL
                                                    </option>
                                                    <option value="LCL">
                                                      LCL
                                                    </option>
                                                   
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Comment</label>
                                                  <input
                                                    type="text"
                                                    name="comment"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.comment}
                                                    className="mb-3"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Commodity</label>
                                                  <select
                                                    type="text"
                                                    name="commodity"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.commodity}
                                                    className="mb-3"
                                                  >
                                                    <option>Select...</option>
                                                    {
                                                    apidata && apidata.length>0 &&  apidata.map((item,index)=>{
                                                      return(
                                                        <>
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                        </>
                                                      )
                                                    })
                                                    }
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label>Add Attachment</label>
                                                  <input
                                                    type="file"
                                                    name="document"
                                                    onChange={handleupdateapifile}
                                                    className="mb-3"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="Toastify" />
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                          handleupdateapipost(item.id);
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
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
