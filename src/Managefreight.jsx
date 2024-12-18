import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { Box, Button, Modal } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Swal from "sweetalert2";
const pageSize = 5;
export default function Managefreight() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState({
    priority: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [is_active, setIs_active] = useState({
    is_active: "",
  });
  const [ready, setReady] = useState({
    ready: "",
  });
  const [loader, setLoader] = useState(true);
  const [options, setOptions] = useState();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [lcientlist, setLcientlist] = useState([]);
  const [formData, setFormData] = useState(null);
  const [formData1, setFormData1] = useState(null);
  const [formData2, setFormData2] = useState(null);
  const [formData3, setFormData3] = useState(null);
  const [files, setFiles] = useState(null);
  const [updatedata, setUpdatedata] = useState([]);
  const [apidata, setApidata] = useState([]);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputdata, setInputdata] = useState({
    freight_id: "",
    client_ref: "",
    type: "",
    freight: "",
    incoterm: "",
    dimension: "",
    weight: "",
    comment: "",
    no_of_packages: "",
    package_type: "",
    commodity: "",
    hazardous: "",
    country_of_origin: "",
    destination_country: "",
    insurance: "",
    supplier_address: "",
    port_of_loading: "",
    post_of_discharge: "",
    place_of_delivery: "",
    transit_time: "",
    shipment_details: "",
    nature_of_hazard: "",
    volumetric_weight: "",
    assign_for_estimate: "",
    assign_to_transporter: "",
    assign_warehouse: "",
    assign_to_clearing: "",
    send_to_warehouse: "",
    shipment_ref: "",
    shipment_origin: "",
    shipment_des: "",
    priority: "",
    is_active: "",
    ready_for_collection: "",
    quote_received: "",
    client_ref_name: "",
    client_quoted: "",
    product_desc: "",
    send_to_warehouse: "",
    assign_to_clearing: "",
  });
  const [clientdata, setClientdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const updatecountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        // console.log(response.data.data);
        setUpdatedata(response.data.data);
      })
      .catch((error) => {
        console.group(error.response.data.message);
      });
  };
  useEffect(() => {
    if (inputdata.priority) {
      setPriority(inputdata.priority);
    }
  }, [inputdata.priority]);

  useEffect(() => {
    updatecountry();
    getClient();
  }, []);
  const frightData = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}freight-list`)
      .then((response) => {
        setLoader(false);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoader(false);
      });
  };
  useEffect(() => {
    frightData();
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}supplier-list`
        );
        // console.log(response.data.data);
        setOptions(response.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  /////////////////////////////////////////////////delete function//////////////////////////////////////////
  const handledelete = (freight_id) => {
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
            freight_id: freight_id,
          })
          .then((response) => {
            toast.success(response.data.message);
            frightData();
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
  const handleFileChange4 = (event) => {
    const files = event.target.files;
    setFormData({ ...formData, supplier_invoice: files });
  };
  const handleFileChange1 = (event) => {
    const files = event.target.files;
    setFormData1({ ...formData1, packing_list: files });
  };
  const handleFileChange2 = (event) => {
    const files = event.target.files;
    setFormData2({ ...formData2, licenses: files });
  };
  const handleFileChange3 = (event) => {
    const files = event.target.files;
    setFormData3({ ...formData3, other_documents: files });
  };
  /////////////////////////////////////////update freight///////////////////////////////////////////
  const handleupdate = (freight_id) => {
    const setUSer = data.filter((item) => item.freight_id === freight_id);
    const getUSer = setUSer[0];
    setInputdata({
      freight_id: freight_id,
      client_ref: getUSer.client_ref,
      type: getUSer.type,
      freight: getUSer.freight,
      incoterm: getUSer.incoterm,
      dimension: getUSer.dimension,
      weight: getUSer.weight,
      comment: getUSer.comment,
      fcl_lcl: getUSer.fcl_lcl,
      no_of_packages: getUSer.no_of_packages,
      package_type: getUSer.package_type,
      commodity: getUSer.commodity,
      hazardous: getUSer.hazardous,
      country_of_origin: getUSer.collection_from,
      destination_country: getUSer.delivery_to,
      supplier_address: getUSer.supplier_address,
      port_of_loading: getUSer.port_of_loading,
      post_of_discharge: getUSer.post_of_discharge,
      place_of_delivery: getUSer.place_of_delivery,
      transit_time: getUSer.transit_time,
      add_attachments: getUSer.add_attachments,
      nature_of_hazard: getUSer.nature_of_hazard,
      volumetric_weight: getUSer.volumetric_weight,
      shipment_ref: getUSer.shipment_ref,
      assign_for_estimate: getUSer.assign_for_estimate,
      assign_to_transporter: getUSer.assign_to_transporter,
      assign_warehouse: getUSer.assign_warehouse,
      assign_to_clearing: getUSer.assign_to_clearing,
      send_to_warehouse: getUSer.send_to_warehouse,
      shipment_origin: getUSer.shipment_origin,
      shipment_des: getUSer.shipment_des,
      priority: getUSer.priority,
      is_active: getUSer.is_active,
      ready_for_collection: getUSer.ready_for_collection,
      quote_received: getUSer.quote_received,
      client_quoted: getUSer.client_quoted,
      insurance: getUSer.insurance,
      product_desc: getUSer.product_desc,
      client_ref_name: getUSer.client_ref_name,
      document: getUSer.add_attachment_file,
    });
  };
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  let day = String(today.getDate()).padStart(2, "0");
  let formattedDate = `${year}-${month}-${day}`;
  const handleupdateapipost = (freight_id) => {
    console.log(freight_id);
    const formdata = new FormData();
    formdata.append("date", formattedDate);
    formdata.append("id", inputdata.freight_id);
    formdata.append("client_ref", inputdata.client_ref);
    formdata.append("type", inputdata.type);
    formdata.append("freight", inputdata.freight);
    formdata.append("incoterm", inputdata.incoterm);
    formdata.append("dimension", inputdata.dimension);
    formdata.append("weight", inputdata.weight);
    formdata.append("quote_received", inputdata.quote_received);
    formdata.append("client_quoted", inputdata.client_quoted);
    formdata.append("is_active", inputdata.is_active);
    formdata.append("destination_country", inputdata.destination_country);
    formdata.append("comment", inputdata.comment);
    formdata.append("no_of_packages", inputdata.no_of_packages);
    formdata.append("fcl_lcl", inputdata.fcl_lcl);
    formdata.append("package_type", inputdata.package_type);
    formdata.append("insurance", inputdata.insurance);
    formdata.append("commodity", inputdata.commodity);
    formdata.append("hazardous", inputdata.hazardous);
    formdata.append("country_of_origin", inputdata.country_of_origin);
    formdata.append("supplier_address", inputdata.supplier_address);
    formdata.append("port_of_loading", inputdata.port_of_loading);
    formdata.append("post_of_discharge", inputdata.post_of_discharge);
    formdata.append("place_of_delivery", inputdata.place_of_delivery);
    formdata.append("ready_for_collection", inputdata.ready_for_collection);
    formdata.append("transit_time", inputdata.transit_time);
    formdata.append("priority", inputdata.priority);
    formdata.append("nature_of_hazard", inputdata.nature_of_hazard);
    formdata.append(
      "volumetric_weight",
      inputdata.dimension
        ? 167 * inputdata.dimension
        : inputdata.volumetric_weight
    );
    formdata.append("assign_for_estimate", inputdata.assign_for_estimate);
    formdata.append("add_attachments", inputdata.add_attachments);
    formdata.append("assign_to_transporter", inputdata.assign_to_transporter);
    formdata.append("assign_warehouse", inputdata.assign_warehouse);
    formdata.append("assign_to_clearing", inputdata.assign_to_clearing);
    formdata.append("shipment_ref", inputdata.shipment_ref);
    formdata.append("send_to_warehouse", inputdata.send_to_warehouse);
    formdata.append("shipment_origin", inputdata.shipment_origin);
    formdata.append("shipment_des", inputdata.shipment_des);
    formdata.append("product_desc", inputdata.product_desc);
    formdata.append("client_ref_name", inputdata.client_ref_name);
    if (formData) {
      for (let i = 0; i < formData.supplier_invoice.length; i++) {
        formdata.append("supplier_invoice", formData.supplier_invoice[i]);
      }
    }
    if (formData1) {
      for (let i = 0; i < formData1.packing_list.length; i++) {
        formdata.append("packing_list", formData1.packing_list[i]);
      }
    }
    if (formData2) {
      for (let i = 0; i < formData2.licenses.length; i++) {
        formdata.append("licenses", formData2.licenses[i]);
      }
    }
    if (formData3) {
      for (let i = 0; i < formData3.other_documents.length; i++) {
        formdata.append("other_documents", formData3.other_documents[i]);
      }
    }
    console.log(formdata);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}edit-freight`, formdata)
      .then((response) => {
        setLoader(true);
        console.log(response.data.message);
        if (response.data.success === true) {
          setLoader(false);
          frightData();
          toast.success(response.data.message);
        }
        return 0;
      })
      .catch((error) => {
        console.error(error.response);
        toast.error(error.response?.data || "An error occurred");
      });
  };
  //////////////////////////////////////get app api////////////////////////////////////////////////////
  const clientlist = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}clientlist`)
      .then((response) => {
        setClientdata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getapidata();
    clientlist();
  }, []);

  const getapidata = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getCommodities`)
      .then((response) => {
        setApidata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  ////////////////////////////////////////////////////////update///////////////////////////////////////////////////
  const handlelcickseedata = (freight_id) => {
    // alert(freight_id)
    const alldtaaa = data.filter((item) => {
      return item.freight_id === freight_id;
    });
    // console.log(alldtaaa);
    navigate("/Admin/MAnageFreightDetails", { state: { data: alldtaaa } });
  };
  const hanldeclicknavi = (freight_id) => {
    // console.log("frieghtid:", freight_id);
    const alldata = data.filter((item) => {
      return item.freight_id === freight_id;
    });
    console.log(alldata);
    navigate("/Admin/shipping-estimate", { state: { data: alldata } });
  };
  ///////////////////////pegenation//////////////////////////////////////////
  const filteredData = data.filter((item) => {
    return (
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      item.incoterm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.freight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.freight_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  // search //////////////////////////////////////////////////
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  ////////////////////////order move.//////////////////////////////////////////////
  const handlemoveOrder = (item) => {
    console.log(item);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}MoveToOrder`, {
        freight_id: item.freight_id,
        client_id: item.client_ref,
      })
      .then((response) => {
        toast.success(response.data.message);
        frightData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const handlePriorityChange = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      priority: event.target.value,
    }));
  };
  const handleshipmentrefChange = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      shipment_ref: event.target.value,
    }));
  };
  const handlereadyforcollection = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      ready_for_collection: event.target.value,
    }));
  };
  const handlereadyhazardous = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      hazardous: event.target.value,
    }));
  };
  const handlechangeassignestimate = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      assign_for_estimate: event.target.value,
    }));
  };
  const Quoterecieved = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      quote_received: event.target.value,
    }));
  };
  const onchnageclientquote = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      client_quoted: event.target.value,
    }));
  };
  const send_to_warehouse = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      send_to_warehouse: event.target.value,
    }));
  };
  const assign_to_clearing = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      assign_to_clearing: event.target.value,
    }));
  };
  const handleiinsurance = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      insurance: event.target.value,
    }));
  };
  const shipment_origin = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      shipment_origin: event.target.value,
    }));
  };
  const shipment_des = (event) => {
    setInputdata((prevData) => ({
      ...prevData,
      shipment_des: event.target.value,
    }));
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
   const postdata ={
    // "status":"3", 
    priority:data1.priority, 
    origin:data1.origin, 
    destination:data1.destination, 
    startDate:data1.startDate, 
    endDate:data1.endDate, 
    freightType:data1.freight, 
    freightSpeed:data1.type
   }
   axios.post(`${process.env.REACT_APP_BASE_URL}freight-list`,postdata).then((response)=>{
    if(response.data.success===true){
      closeModal()
      setData(response.data.data)

    }
  }).catch((error)=>
console.log(error.response.data))
  };
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
  // console.log(inputdata.is_active);
  const handlestatus = (id) => {
    console.log(id);
    const data123 = {
      freight_id: id,
      status: "2",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}status-Freight`, data123)
      .then((response) => {
        toast.success(response.data.message);
        frightData();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handlelcickapiupdatepartial = () => {
    const data1 = {
      status: "4",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}freight-list`, data1)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlelcickapiupdatedeclined = () => {
    const data1 = {
      status: "2",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}freight-list`, data1)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlelcickapiupdate = () => {
    const data1 = {
      status: "1",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}freight-list`, data1)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlelcickapiupdae = () => {
    const data1 = {
      status: "0",
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}freight-list`, data1)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleclickopenmodal = () => {
    setIsModalOpen(true);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData1({ ...data1, [name]: value });
  };
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper ">
          <div className="container-fluid">
            <div className="row manageFreight">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <h4 className="freight_hd">Freight By Admin</h4>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="me-2 searchManageFre">
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
                        className="dropdown-toggle me-2"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Status
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
                    <div className="me-2">
                      <button type="button" onClick={handleclickopenmodal}>
                        Filter
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/Admin/Addfreight");
                        }}
                      >
                        Add
                      </button>
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
                          const daaaa = new Date(item?.date).toLocaleDateString(
                            "en-GB"
                          );
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
                                      <p className="port_date">{daaaa}</p>
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
                                            {item.collection_from_name}
                                          </p>
                                          <div className="arrow">
                                            <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                          </div>
                                          <p className="origin">
                                            {item.delivery_to_name}
                                            <span className="fright_type">
                                              ({item.freight})
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="text-center">
                                          <p className="origin">
                                            {item.nature_of_hazard}
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
                                                style={{ cursor: "pointer" }}
                                                className="dropdown-item li_icon"
                                                onClick={() => {
                                                  handlelcickseedata(
                                                    item.freight_id
                                                  );
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
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  handleupdate(item.freight_id);
                                                }}
                                              >
                                                <FaEdit
                                                  style={{
                                                    color: "rgb(27 34 69)",
                                                    marginRight: "10px",
                                                    width: "20px",
                                                    height: "15px",
                                                  }}
                                                />
                                                Edit
                                              </a>
                                              <a
                                                style={{ cursor: "pointer" }}
                                                className="dropdown-item li_icon"
                                                onClick={() => {
                                                  handledelete(item.freight_id);
                                                }}
                                              >
                                                <AiFillDelete
                                                  className="text-danger"
                                                  style={{
                                                    marginRight: "10px",
                                                    width: "20px",
                                                  }}
                                                />{" "}
                                                Delete
                                              </a>
                                              <a
                                                style={{ cursor: "pointer" }}
                                                className="dropdown-item li_icon"
                                                onClick={() => {
                                                  handlestatus(item.freight_id);
                                                }}
                                              >
                                                <DoNotDisturbIcon
                                                  className="text-danger"
                                                  style={{
                                                    marginRight: "10px",
                                                    width: "20px",
                                                  }}
                                                />{" "}
                                                Declined
                                              </a>
                                              <a
                                                className="dropdown-item li_icon"
                                                onClick={() => {
                                                  hanldeclicknavi(
                                                    item.freight_id
                                                  );
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  <p className="mb-0">
                                                    <i
                                                      class="fi fi-ss-document-signed"
                                                      style={{
                                                        marginRight: "10px",
                                                        width: "20px",
                                                        color: "rgb(27 34 69)",
                                                      }}
                                                    ></i>
                                                    Estimate Quote
                                                  </p>
                                                </div>
                                              </a>
                                              <a
                                                className="dropdown-item li_icon"
                                                onClick={() => {
                                                  handlemoveOrder(item);
                                                }}
                                              >
                                                <div className="">
                                                  <MdDriveFileMoveOutline
                                                    className="text-success"
                                                    style={{
                                                      color: "rgb(27 34 69)",
                                                      marginRight: "10px",
                                                      width: "20px",
                                                    }}
                                                  />
                                                  Inorder
                                                </div>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <p
                                      type="radio"
                                      className="input_user mb-0"
                                    />
                                    <label className="status d-flex align-items-center">
                                      {item.status == 1 ? (
                                        <>
                                          <span className="dot bg-success me-2"></span>
                                          <p className="text-success mb-0">
                                            Accepted
                                          </p>
                                        </>
                                      ) : item.status == 2 ? (
                                        <>
                                          <span className="dot bg-danger me-2"></span>
                                          <p className="text-danger mb-0">
                                            Declined
                                          </p>
                                        </>
                                      ) : item.status == 3 ? (
                                        <>
                                          <span className="dot bg-secondary me-2"></span>
                                          <p className="text-secondary mb-0">
                                            Partial
                                          </p>
                                        </>
                                      ) : item.status == 4 ? (
                                        <>
                                          <span className="dot bg-info me-2"></span>
                                          <p className="text-info mb-0">
                                            Estimated
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <span className="dot bg-dark me-2"></span>
                                          <p className="text-dark mb-0">
                                            Pending
                                          </p>
                                        </>
                                      )}
                                    </label>
                                  </div>
                                </td>
                                <div
                                  className="modal fade modalManageFreight frightFormSec md_update"
                                  id="staticBackdrop"
                                  data-bs-backdrop="static"
                                  data-bs-keyboard="false"
                                  tabIndex={-1}
                                  aria-labelledby="staticBackdropLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-centered  modal-xl">
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
                                        <div className="row">
                                          <div className="col-lg-8">
                                            <div className="">
                                              <h4 className="">
                                                Shipment details
                                              </h4>
                                            </div>
                                            <div className="borderShip mt-3">
                                              <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                  <label>Date</label>
                                                  <input
                                                    type="date"
                                                    value={formattedDate}
                                                    name="date"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>Client</label>
                                                  <select
                                                    value={inputdata.client_ref}
                                                    onChange={handleupdateapi}
                                                    placeholder="client refrence"
                                                    name="client_ref"
                                                  >
                                                    {lcientlist &&
                                                      lcientlist.length > 0 &&
                                                      lcientlist.map(
                                                        (item, index) => {
                                                          return (
                                                            <>
                                                              <option
                                                                key={index}
                                                                value={item.id}
                                                              >
                                                                {item.full_name}
                                                              </option>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                </div>
                                                <div className=" col-lg-6  mb-3">
                                                  <label>Freight</label>
                                                  <select
                                                    name="type"
                                                    value={inputdata.type}
                                                    onChange={handleupdateapi}
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
                                                <div className=" col-lg-6  mb-3">
                                                  <label>Freight Type</label>
                                                  <select
                                                    name="freight"
                                                    value={inputdata.freight}
                                                    onChange={handleupdateapi}
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
                                                  </select>
                                                </div>
                                                <div className=" col-lg-6  mb-3">
                                                  <label>
                                                    Client Reference
                                                  </label>
                                                  <input
                                                    name="client_ref_name"
                                                    value={
                                                      inputdata.client_ref_name
                                                    }
                                                    onChange={handleupdateapi}
                                                  ></input>
                                                </div>
                                                <div className=" col-lg-6  mb-3">
                                                  <label>
                                                    Product Description
                                                  </label>
                                                  <input
                                                    name="product_desc"
                                                    value={
                                                      inputdata.product_desc
                                                    }
                                                    onChange={handleupdateapi}
                                                  ></input>
                                                </div>
                                                <div className="col-lg-12 mb-3">
                                                  <label>
                                                    Estimated Transit Time
                                                  </label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    placeholder="Transit Time"
                                                    value={
                                                      inputdata.transit_time
                                                    }
                                                    onChange={handleupdateapi}
                                                    name="transit_time"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <FormControl>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                                      <label>Priority</label>
                                                    </FormLabel>
                                                    <RadioGroup
                                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                                      value={inputdata.priority}
                                                      name="priority"
                                                      onChange={
                                                        handlePriorityChange
                                                      }
                                                    >
                                                      <FormControlLabel
                                                        value="High"
                                                        control={<Radio />}
                                                        label="High"
                                                      />
                                                      <FormControlLabel
                                                        value="Medium"
                                                        control={<Radio />}
                                                        label="Medium"
                                                      />
                                                      <FormControlLabel
                                                        value="Low"
                                                        control={<Radio />}
                                                        label="Low"
                                                      />
                                                    </RadioGroup>
                                                  </FormControl>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <FormControl>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                                      <label>
                                                        Shipment Reference
                                                      </label>
                                                    </FormLabel>
                                                    <RadioGroup
                                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                                      value={
                                                        inputdata.shipment_ref
                                                      } // Ensure this is correctly bound to the state
                                                      name="shipment_ref"
                                                      onChange={
                                                        handleshipmentrefChange
                                                      }
                                                    >
                                                      <FormControlLabel
                                                        value="shipper"
                                                        control={<Radio />}
                                                        label="shipper"
                                                      />
                                                      <FormControlLabel
                                                        value="consignee"
                                                        control={<Radio />}
                                                        label="consignee"
                                                      />
                                                    </RadioGroup>
                                                  </FormControl>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="mt-4">
                                              <h4>Cargo transit details</h4>
                                            </div>
                                            <div className="borderShip">
                                              <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                  <label>
                                                    Country of Origin
                                                  </label>
                                                  <select
                                                    name="country_of_origin"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.country_of_origin
                                                    }
                                                  >
                                                    <option value="">
                                                      select....
                                                    </option>
                                                    {updatedata &&
                                                      updatedata.length > 0 &&
                                                      updatedata.map(
                                                        (item, index) => (
                                                          <option
                                                            key={index}
                                                            value={item.id}
                                                          >
                                                            {item.name}
                                                          </option>
                                                        )
                                                      )}
                                                  </select>
                                                </div>
                                                <div className=" col-lg-6  mb-3">
                                                  <label>
                                                    {" "}
                                                    Destination Country
                                                  </label>
                                                  <select
                                                    name="destination_country"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.destination_country
                                                    }
                                                  >
                                                    <option>select....</option>
                                                    {updatedata &&
                                                      updatedata.length > 0 &&
                                                      updatedata.map(
                                                        (item, index) => {
                                                          // console.log(item);
                                                          return (
                                                            <>
                                                              <option
                                                                key={index}
                                                                value={item.id}
                                                              >
                                                                {item.name}
                                                              </option>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>Port of Loading</label>
                                                  <input
                                                    type="text"
                                                    name="port_of_loading"
                                                    value={
                                                      inputdata.port_of_loading
                                                    }
                                                    onChange={handleupdateapi}
                                                    placeholder="Port of Loading"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>
                                                    {" "}
                                                    Port of Discharge
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="post_of_discharge"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.post_of_discharge
                                                    }
                                                    placeholder="Port of Discharge"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>
                                                    Place of Delivery
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="place_of_delivery"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.place_of_delivery
                                                    }
                                                    placeholder="Place of Delivery"
                                                  />
                                                </div>
                                                <div className="col-lg-6">
                                                  <label> Incoterm </label>
                                                  <select
                                                    name="incoterm"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.incoterm}
                                                  >
                                                    <option value="">
                                                      Select...
                                                    </option>
                                                    <option value="CFR">
                                                      CFR
                                                    </option>
                                                    <option value="CIF">
                                                      CIF
                                                    </option>
                                                    <option value="DAP">
                                                      DAP
                                                    </option>
                                                    <option value="DDU">
                                                      DDU
                                                    </option>
                                                    <option value="DDP">
                                                      DDP
                                                    </option>
                                                    <option value="EXW">
                                                      EXW
                                                    </option>
                                                    <option value="FCA">
                                                      FCA
                                                    </option>
                                                    <option value="FOB">
                                                      FOB{" "}
                                                    </option>
                                                  </select>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>
                                                    Place of Receipt/ Supplier
                                                    Address
                                                  </label>
                                                  <input
                                                    type="text"
                                                    name="supplier_address"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.supplier_address
                                                    }
                                                    placeholder="Supplier Address"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>Type</label>

                                                  <select
                                                    name="fcl_lcl"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.fcl_lcl}
                                                  >
                                                    <option>Select...</option>
                                                    <option value={"FCL"}>
                                                      FCL
                                                    </option>
                                                    <option value={"LCL"}>
                                                      LCL
                                                    </option>
                                                  </select>
                                                </div>
                                                <div>
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      <FormControl>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                                          <label>Origin</label>
                                                        </FormLabel>
                                                        <RadioGroup
                                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                                          value={
                                                            inputdata.shipment_origin
                                                          }
                                                          name="shipment_origin"
                                                          onChange={
                                                            shipment_origin
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
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <label>Destination</label>
                                                      <FormControl>
                                                        <RadioGroup
                                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                                          value={
                                                            inputdata.shipment_des
                                                          }
                                                          name="shipment_des"
                                                          onChange={
                                                            shipment_des
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
                                                            value="Consignee will collect and facilitate import at destination port"
                                                            control={<Radio />}
                                                            label="Consignee will collect and facilitate import at destination port"
                                                          />
                                                        </RadioGroup>
                                                      </FormControl>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="mt-4">
                                              <h4>Product Description</h4>
                                            </div>
                                            <div className="borderShip">
                                              <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                  <label>Package Type</label>
                                                  <br />
                                                  <select
                                                    name="package_type"
                                                    value={
                                                      inputdata.package_type
                                                    }
                                                    onChange={handleupdateapi}
                                                    className="form-control"
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
                                                <div className="col-lg-6 mb-3">
                                                  <label>
                                                    {" "}
                                                    No. of Packages
                                                  </label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    name="no_of_packages"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.no_of_packages
                                                    }
                                                    placeholder="Num.. of Package"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>Commodity</label>
                                                  <select
                                                    name="commodity"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.commodity}
                                                    placeholder="Comment"
                                                  >
                                                    <option>Select...</option>
                                                    {apidata &&
                                                      apidata.length > 0 &&
                                                      apidata.map(
                                                        (item, index) => {
                                                          return (
                                                            <>
                                                              <option
                                                                key={index}
                                                                value={item.id}
                                                              >
                                                                {item.name}
                                                              </option>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                  </select>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label> Dimension</label>
                                                  <input
                                                    type="text"
                                                    onChange={handleupdateapi}
                                                    value={inputdata.dimension}
                                                    onKeyPress={handlekey}
                                                    name="dimension"
                                                    placeholder="Dimension"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label> Weight</label>
                                                  <input
                                                    type="text"
                                                    onKeyPress={handlekey}
                                                    onChange={handleupdateapi}
                                                    value={inputdata.weight}
                                                    name="weight"
                                                    placeholder="Weight"
                                                  />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                  <label>
                                                    {" "}
                                                    Volumetric Weight
                                                  </label>
                                                  <input
                                                    type="text"
                                                    disabled
                                                    onKeyPress={handlekey}
                                                    name="volumetric_weight"
                                                    value={
                                                      inputdata.dimension
                                                        ? 167 *
                                                          inputdata.dimension
                                                        : inputdata.volumetric_weight
                                                    }
                                                    placeholder="Volumetric Weight"
                                                  />
                                                </div>
                                                <div className="row">
                                                  <div className="col-6 mt-3">
                                                    <h5>Add attachments</h5>
                                                    <input
                                                      type="file"
                                                      name="supplier_invoice"
                                                      className="w-100 mb-3 rounded"
                                                      onChange={
                                                        handleFileChange4
                                                      }
                                                      multiple
                                                    />
                                                  </div>
                                                  <div className="col-6 mt-3">
                                                    <h5>Packing List</h5>
                                                    <input
                                                      type="file"
                                                      name="packing_list"
                                                      className="mb-3 w-100 rounded"
                                                      onChange={
                                                        handleFileChange1
                                                      }
                                                      multiple
                                                    />
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-6 mt-3">
                                                    <h5>licenses</h5>
                                                    <input
                                                      type="file"
                                                      name="licenses"
                                                      className="mb-3 w-100 rounded"
                                                      onChange={
                                                        handleFileChange2
                                                      }
                                                      multiple
                                                    />
                                                  </div>
                                                  <div className="col-6 mt-3">
                                                    <h5>Other Documents</h5>
                                                    <input
                                                      type="file"
                                                      name="other_documents"
                                                      className="mb-3 w-100 rounded"
                                                      onChange={
                                                        handleFileChange3
                                                      }
                                                      multiple
                                                    />
                                                  </div>
                                                </div>
                                                <div className=" col-lg-6  mb-3">
                                                  <label> Document Name</label>
                                                  <select
                                                    name="add_attachments"
                                                    onChange={handleupdateapi}
                                                    value={
                                                      inputdata.add_attachments
                                                    }
                                                  >
                                                    <option value="">
                                                      Select Doc...
                                                    </option>
                                                    <option value="supplierInvoice">
                                                      Supplier Invoice /
                                                      Quotation / Proforma
                                                      Invoice
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
                                                {inputdata.hazardous ===
                                                "yes" ? (
                                                  <div className=" col-lg-6  mb-3">
                                                    <label>
                                                      {" "}
                                                      Nature of hazard
                                                    </label>
                                                    <select
                                                      name="nature_of_hazard"
                                                      onChange={handleupdateapi}
                                                      value={
                                                        inputdata.nature_of_hazard
                                                      }
                                                    >
                                                      <option value="">
                                                        Select...
                                                      </option>
                                                      <option value="General Cargo">
                                                        General Cargo
                                                      </option>
                                                      <option value="Explosive">
                                                        Explosive
                                                      </option>
                                                      <option
                                                        value="Class 3 flammable
                                                          liquids"
                                                      >
                                                        Class 3 flammable
                                                        liquids
                                                      </option>
                                                      <option value="Corrosives">
                                                        Corrosives
                                                      </option>
                                                      <option value="Class 2 gases">
                                                        Class 2 gases
                                                      </option>
                                                      <option value="Compressed gas">
                                                        Compressed gas
                                                      </option>
                                                      <option value="Infection">
                                                        Infection
                                                      </option>
                                                      <option value="Corrosive">
                                                        Corrosive
                                                      </option>
                                                      <option value="Flammable">
                                                        Flammable
                                                      </option>
                                                      <option value="Flammable solids">
                                                        Flammable solids
                                                      </option>
                                                      <option value="Organic peroxides">
                                                        Organic peroxides
                                                      </option>
                                                      <option value="Toxic substances">
                                                        Toxic substances
                                                      </option>
                                                      <option
                                                        value="Class 9 other substances
                                                          and articles"
                                                      >
                                                        Class 9 other substances
                                                        and articles
                                                      </option>
                                                      <option value="Dry ice">
                                                        Dry ice
                                                      </option>
                                                      <option value="Poison">
                                                        Poison
                                                      </option>
                                                      <option value="Batteries">
                                                        Batteries
                                                      </option>
                                                      <option value="Gases">
                                                        Gases
                                                      </option>
                                                      <option value="Refrigerated">
                                                        Refrigerated
                                                      </option>
                                                      <option value="Inflammable">
                                                        Inflammable
                                                      </option>
                                                      <option value="Air bags">
                                                        Air bags
                                                      </option>
                                                      <option value="Ammunition">
                                                        Ammunition
                                                      </option>
                                                      <option value="Cigarette lighters">
                                                        Cigarette lighters
                                                      </option>
                                                      <option value="Lithium batteries">
                                                        Lithium batteries
                                                      </option>
                                                    </select>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                                <div className="col-lg-6 mb-3">
                                                  <label> Comment</label>
                                                  <textarea
                                                    name="comment"
                                                    id=""
                                                    onChange={handleupdateapi}
                                                    value={inputdata.comment}
                                                    placeholder="write your comment here.."
                                                  ></textarea>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-4">
                                            <div className="borderShip rightSecFre">
                                              <div className="col-lg-12 mb-3 shipRefer">
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label">
                                                    <label>
                                                      Assign For Estimate
                                                    </label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={
                                                      inputdata.assign_for_estimate
                                                    }
                                                    name="assign_for_estimate"
                                                    onChange={
                                                      handlechangeassignestimate
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div className="shipRefer mb-3">
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label">
                                                    <label>
                                                      Quote Received
                                                    </label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={
                                                      inputdata.quote_received
                                                    }
                                                    name="quote_received"
                                                    onChange={Quoterecieved}
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div className="shipRefer mb-3">
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label">
                                                    <label>
                                                      Client Quoted{" "}
                                                    </label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={
                                                      inputdata.client_quoted
                                                    }
                                                    name="client_quoted"
                                                    onChange={
                                                      onchnageclientquote
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div className="shipRefer mb-3">
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label">
                                                    <label>Insurance</label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={inputdata.insurance}
                                                    name="insurance"
                                                    onChange={handleiinsurance}
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div className="shipRefer mb-3">
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label">
                                                    <label>
                                                      Ready for collection
                                                    </label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={
                                                      inputdata.ready_for_collection
                                                    }
                                                    name="ready_for_collection"
                                                    onChange={
                                                      handlereadyforcollection
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                              <div className=" col-lg-6 mb-3">
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label">
                                                    <label>Hazardous</label>
                                                  </FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={inputdata.hazardous}
                                                    name="hazardous"
                                                    onChange={
                                                      handlereadyhazardous
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="no"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                            </div>
                                            <div className="borderShip mt-4">
                                              <div className="mb-3">
                                                <label>
                                                  {" "}
                                                  Assign to Transporter
                                                </label>

                                                <select
                                                  name="assign_to_transporter"
                                                  onChange={handleupdateapi}
                                                  value={
                                                    inputdata.assign_to_transporter
                                                  }
                                                >
                                                  <option value="">
                                                    Select...
                                                  </option>
                                                  <option value="Asia Direct - Africa">
                                                    Asia Direct - Africa
                                                  </option>
                                                  <option value="OBD Logistics">
                                                    OBD Logistics
                                                  </option>
                                                  <option value="SACO CFR">
                                                    SACO CFR
                                                  </option>
                                                  <option value="Shenzhen Nimbus">
                                                    Shenzhen Nimbus
                                                  </option>
                                                </select>
                                              </div>
                                              <div className="shipRefer mb-3">
                                                <label>Send to Warehouse</label>
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={
                                                      inputdata.send_to_warehouse
                                                    }
                                                    name="send_to_warehouse"
                                                    onChange={send_to_warehouse}
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                            </div>
                                            <div className="borderShip mt-4">
                                              <div className="mb-3">
                                                <label>Assign Warehouse</label>
                                                <select
                                                  name="assign_warehouse"
                                                  onChange={handleupdateapi}
                                                  value={
                                                    inputdata.assign_warehouse
                                                  }
                                                >
                                                  <option value="">
                                                    Select...
                                                  </option>
                                                  <option value="Asia Direct Hre">
                                                    Asia Direct Hre
                                                  </option>
                                                  <option value="Asia Direct - SA">
                                                    Asia Direct - SA
                                                  </option>
                                                  <option value="Jingwei International Logistics">
                                                    Jingwei International
                                                    Logistics
                                                  </option>
                                                  <option value="OBD Logistics">
                                                    OBD Logistics
                                                  </option>
                                                  <option value="Shenzhen Nimbus">
                                                    Shenzhen Nimbus
                                                  </option>
                                                </select>
                                              </div>
                                              <div className="shipRefer mb-3">
                                                <label>
                                                  Assign to Clearing
                                                </label>
                                                <FormControl>
                                                  <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                                                  <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    value={
                                                      inputdata.assign_to_clearing
                                                    }
                                                    name="assign_to_clearing"
                                                    onChange={
                                                      assign_to_clearing
                                                    }
                                                  >
                                                    <FormControlLabel
                                                      value="Yes"
                                                      control={<Radio />}
                                                      label="Yes"
                                                    />
                                                    <FormControlLabel
                                                      value="No"
                                                      control={<Radio />}
                                                      label="No"
                                                    />
                                                  </RadioGroup>
                                                </FormControl>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            handleupdateapipost(
                                              item.freight_id
                                            );
                                          }}
                                          className="btn"
                                          data-bs-dismiss="modal"
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
            {loader ? (
              <div class="loader-container">
                <div class="loader"></div>
                <p className="text-danger">
                  Updating... This may take some time
                </p>
              </div>
            ) : (
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
                    height: 500,
                    overflow: "scroll",
                    width: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <h2 id="modal-modal-title">Filter</h2>
                  <div className="row my-3  ">
                    <div className="col-6">
                      <label>Delivery Type</label>
                      <select
                        name="type"
                        onChange={handlechange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="express">Express</option>
                        <option value="normal">Consolidation</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label>Priority </label>
                      <div className="shipRefer1 d-flex">
                        <div>
                          <input
                            type="radio"
                            id="shipper"
                            name="priority"
                            style={{ cursor: "pointer" }}
                            value="High"
                            onChange={handlechange}
                          />
                          <label htmlFor="shipper">High</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="shipper2"
                            style={{ cursor: "pointer" }}
                            name="priority"
                            value="Medium"
                            onChange={handlechange}
                          />
                          <label htmlFor="consignee">Medium</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="shipper3"
                            name="priority"
                            style={{ cursor: "pointer" }}
                            value="Low"
                            onChange={handlechange}
                          />
                          <label htmlFor="mediumPr">Low</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Country of Origin</label>
                      <select
                        name="origin"
                        onChange={handlechange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        {updatedata &&
                          updatedata.length > 0 &&
                          updatedata.map((item, index) => {
                            return (
                              <>
                                <option value={item.id}>{item.name}</option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-6">
                      <label>Delivery to Country </label>
                      <select
                        name="destination"
                        onChange={handlechange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        {updatedata &&
                          updatedata.length > 0 &&
                          updatedata.map((item, index) => {
                            return (
                              <>
                                <option value={item.id}>{item.name}</option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Start Date</label>
                      <input
                        type="date"
                        id="shipper3"
                        name="startDate"
                        style={{ cursor: "pointer" }}
                        className="form-control"
                        onChange={handlechange}
                      />
                    </div>
                    <div className="col-6">
                      <label>End Date </label>
                      <input
                        type="date"
                        id="shipper3"
                        name="endDate"
                        style={{ cursor: "pointer" }}
                        className="form-control"
                        onChange={handlechange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Freight</label>
                      <select name="freight" onChange={handlechange} className="form-control">
                        <option value="">Select...</option>
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                        <option value="Road">Road</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label>freight Type </label>
                      <select name="type" onChange={handlechange} className="form-control">
                        <option value="">Select...</option>
                        <option value="express">Express</option>
                        <option value="normal">Normal</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="contained" onClick={postData}>
                    Filter Data
                  </Button>
                </Box>
              </Modal>
            )}
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}
