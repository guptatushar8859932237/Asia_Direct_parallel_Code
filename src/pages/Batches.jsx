import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const pageSize = 5;

export default function Batches() {
  const [datauser, setDatauser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [errors, setErrors] = useState({});
  const [querry, setQuerry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [file, setFile] = useState(null);
  const [inputdata, setInputdata] = useState([]);
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getbatcghes();
  }, []);
  const getbatcghes = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getWarehouse`)
      .then((response) => {
        setBatches(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const handlecjhaneg = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const totalPages = Math.ceil(datauser.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = datauser.slice(startIndex, endIndex);

  const handlePageChange = (currentData) => {
    setCurrentPage(currentData);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!editData.Groupage_Batch_number)
      newErrors.Groupage_Batch_number = "Batch number is required";
    if (!editData.freight) newErrors.freight = "Freight is required";
    if (!editData.Start_Date) newErrors.Start_Date = "Start date is required";
    if (!editData.Total_Weight)
      newErrors.Total_Weight = "Total weight is required";
    if (!editData.Total_Dimension)
      newErrors.Total_Dimension = "Total dimension is required";
    if (!editData.Dispatched)
      newErrors.Dispatched = "Dispatched status is required";
    if (!editData.Time_in_Storage)
      newErrors.Time_in_Storage = "Time in storage is required";
    if (!editData.Costs_to_collect)
      newErrors.Costs_to_collect = "Costs to collect are required";
    if (!editData.Warehouse_Cost)
      newErrors.Warehouse_Cost = "Warehouse cost is required";
    if (!editData.Costs_to_dispatch)
      newErrors.Costs_to_dispatch = "Costs to dispatch are required";
    if (!editData.destination)
      newErrors.destination = "Destination is required";
    if (!editData.WayBill) newErrors.WayBill = "WayBill is required";
    if (!editData.Agent) newErrors.Agent = "Agent is required";
    if (!editData.warehouse) newErrors.warehouse = "Warehouse is required";
    if (!editData.Forewarding_agent)
      newErrors.Forewarding_agent = "Forwarding agent is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const postData1 = () => {
    if (!validateFields()) {
      return;
    }

    const data11221 = {
      batch_number: editData.Groupage_Batch_number,
      warehouse_id: editData.warehouse,
      freight: editData.freight,
      date_start: editData.Start_Date,
      total_weight: parseFloat(editData.Total_Weight),
      total_dimensions: parseFloat(editData.Total_Dimension),
      dispatched: editData.Dispatched,
      date_dispatch: editData.Date_dispatched,
      time_in_storage: parseFloat(editData.Time_in_Storage),
      costs_to_collect: parseFloat(editData.Costs_to_collect),
      warehouse_cost: parseFloat(editData.Warehouse_Cost),
      costs_to_dispatch: parseFloat(editData.Costs_to_dispatch),
      destination: editData.destination,
      waybill: editData.WayBill,
      agent: editData.Agent,
      forwarding_agent: editData.Forewarding_agent,
      batch_name: editData.batch_name,
      freight_cost: editData.freight_cost,
      costs_to_collect_des: editData.costs_to_collect_des,
      costs_to_dispatch_des: editData.costs_to_dispatch_des,
      warehouse_cost_des: editData.warehouse_cost_des,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}createBatch`, data11221)
      .then((response) => {
        toast.success(response.data.message);
        closeModal();
        getdata();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const getdata = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getAllBatch`)
      .then((response) => {
        console.log(response.data.data);
        setDatauser(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlechnage = (e) => {
    setQuerry(e.target.value);
  };

  const filterData = currentData.filter((item) => {
    const queryLower = querry.toLowerCase();

    return (
      item.batch_number.toLowerCase().includes(queryLower) ||
      item.batch_name.toLowerCase().includes(queryLower) ||
      item.freight.toLowerCase().includes(queryLower) ||
      item.total_dimensions.toString().includes(queryLower) ||
      item.total_weight.toString().includes(queryLower) ||
      item.agent.toLowerCase().includes(queryLower) ||
      item.destination.toLowerCase().includes(queryLower) ||
      item.forwarding_agent.toLowerCase().includes(queryLower) ||
      (item.date_start &&
        new Date(item.date_start)
          .toLocaleDateString("en-CA")
          .includes(queryLower))
    );
  });
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const openModal2 = (id) => {
    const datata = datauser.filter((item) => {
      return item.id === id;
    });
    const userdtata = datata[0];
    setInputdata(userdtata);
    console.log(datata[0]);
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const postData = () => {
    // setLoader(true)

    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      console.log("asdfhdfh");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}UploadExcelBatch`, formdata)
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            // setLoader(false)
            closeModal1();
            // frightData()
          }
        })
        .catch((error) => {
          //   setLoader(false)
          console.log(error.response.data);
        });
    } else {
      console.log("No file selected");
    }
  };

  const handleclickdelete = (id) => {
    console.log(id);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}deleteBatche`, { batch_id: id })
      .then((response) => {
        getdata();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const postData1234 = () => {
    const dataaaaaa = {
      batch_id: inputdata.id,
      batch_number: inputdata.batch_number,
      warehouse_id: inputdata.warehouse_id,
      freight: inputdata.freight,
      date_start: inputdata.date_start,
      total_weight: inputdata.total_weight,
      total_dimensions: inputdata.total_dimensions,
      dispatched: inputdata.dispatched,
      date_dispatch: inputdata.date_dispatch,
      time_in_storage: inputdata.time_in_storage,
      costs_to_collect: inputdata.costs_to_collect,
      warehouse_cost: inputdata.warehouse_cost,
      costs_to_dispatch: inputdata.costs_to_dispatch,
      destination: inputdata.destination,
      waybill: inputdata.waybill,
      agent: inputdata.agent,
      forwarding_agent: inputdata.forwarding_agent,
      batch_name: inputdata.batch_name,
      freight_cost: inputdata.freight_cost,
      costs_to_collect_des: inputdata.costs_to_collect_des,
      costs_to_dispatch_des: inputdata.costs_to_dispatch_des,
      warehouse_cost_des: inputdata.warehouse_cost_des,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}editBatch`, dataaaaaa)
      .then((response) => {
        if (response.data.success === true) {
          getdata();
          closeModal2();
          toast.success(response.data.message);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleclickid = (id) => {
    const datta = datauser.filter((item) => {
      return item.id === id;
    });
    console.log(datta[0]);
    navigate("/Admin/BatchesOrder", { state: { data: datta[0] } });
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card ">
            <div className="card-body">
              <div className="row manageFreight">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="freight_hd">Batches</h4>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <div class="me-2">
                        <input
                          class="py-1 rounded ps-1"
                          type="text"
                          placeholder="Search"
                          id="outlined-basic"
                          value={querry}
                          onChange={handlechnage}
                        />
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          className="btn_batch"
                          onClick={openModal}
                        >
                          Add Batch
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TableContainer component={Paper} className="mt-3">
                <Table className="batch_table">
                  <TableHead>
                    <TableRow className="border-bottom">
                      <TableCell className="fw-bold">Sr.No.</TableCell>
                      <TableCell className="fw-bold">Batch Number</TableCell>
                      <TableCell className="fw-bold">Freight</TableCell>
                      <TableCell className="fw-bold">Dimension</TableCell>
                      <TableCell className="fw-bold">Weight</TableCell>
                      <TableCell className="fw-bold col-1">Agent</TableCell>
                      <TableCell className="fw-bold">Start Date</TableCell>
                      <TableCell className="fw-bold">Destination</TableCell>
                      <TableCell className="fw-bold">
                        Forwarding Agent
                      </TableCell>
                      <TableCell className="fw-bold">View</TableCell>
                      <TableCell className="fw-bold">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterData &&
                      filterData.length > 0 &&
                      filterData.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <TableRow key={index + 1} className="border-bottom">
                              <TableCell>{startIndex + index + 1}</TableCell>
                              <TableCell>{item?.batch_number}</TableCell>
                              <TableCell>{item?.freight}</TableCell>
                              <TableCell>{item?.total_dimensions}</TableCell>
                              <TableCell>{item?.total_weight}</TableCell>
                              <TableCell className="col-1">
                                {item?.agent}
                              </TableCell>
                              <TableCell>
                                {new Date(item?.date_start).toLocaleDateString(
                                  "en-CA"
                                )}
                              </TableCell>
                              <TableCell>{item?.destination}</TableCell>
                              <TableCell>{item?.forwarding_agent}</TableCell>
                              <TableCell>
                                <VisibilityIcon
                                  onClick={() => {
                                    handleclickid(item.id);
                                  }}
                                  style={{
                                    color: "rgb(27 34 69)",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="d-flex align-items-center">
                                  <FaEdit
                                    className="fs-5"
                                    style={{
                                      color: "#1b2245",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      openModal2(item.id);
                                    }}
                                  />
                                  <AiFillDelete
                                    style={{ cursor: "pointer" }}
                                    className="text-danger fs-5"
                                    onClick={() => {
                                      handleclickdelete(item.id);
                                    }}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
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
                    height: "90vh",
                    width: 550,
                    overflow: "scroll",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <div className="text-center mb-4">
                    <h3 id="modal-modal-title">Add Batches</h3>
                  </div>
                  <label className="ware_label">Groupage batch number</label>
                  <TextField
                    label="Groupage Batch number"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className=" mb-3 form-control"
                    name="Groupage_Batch_number"
                    fullWidth
                    error={!!errors.Groupage_Batch_number}
                    helperText={errors.Groupage_Batch_number}
                  />
                  <label className="ware_label">Groupage batch name</label>
                  <TextField
                    label="Groupage Batch Name"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className=" mb-3"
                    name="batch_name"
                    fullWidth
                    error={!!errors.batch_name}
                    helperText={errors.batch_name}
                  />
                  <label className="ware_label">Freight</label>
                  <select
                    className="form-control py-2 mb-3"
                    name="freight"
                    onChange={handlecjhaneg}
                  >
                    <option>Select...</option>
                    <option>Sea</option>
                    <option>Air</option>
                    <option>Road</option>
                  </select>
                  {errors.freight && (
                    <p className="text-danger">{errors.freight}</p>
                  )}
                  <label className="ware_label">Date</label>
                  <TextField
                    type="date"
                    label="Start Date"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    name="Start_Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.Start_Date}
                    helperText={errors.Start_Date}
                  />
                  <label className="ware_label"> Total Weight</label>
                  <TextField
                    label="Total Weight"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    onKeyPress={handlekey}
                    name="Total_Weight"
                    fullWidth
                    error={!!errors.Total_Weight}
                    helperText={errors.Total_Weight}
                  />
                  <label className="ware_label">Total Dimension</label>
                  <TextField
                    label="Total Dimension"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    onKeyPress={handlekey}
                    name="Total_Dimension"
                    fullWidth
                    error={!!errors.Total_Dimension}
                    helperText={errors.Total_Dimension}
                  />
                  <label className="ware_label">Dispatched</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="Dispatched"
                    onChange={handlecjhaneg}
                  >
                    <option>Select...</option>
                    <option>True</option>
                    <option>False</option>
                  </select>
                  {errors.Dispatched && (
                    <p className="text-danger mb-0">{errors.Dispatched}</p>
                  )}
                  <label className="ware_label">Storage Time</label>
                  <TextField
                    label="Time in Storage"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    name="Time_in_Storage"
                    fullWidth
                    error={!!errors.Time_in_Storage}
                    helperText={errors.Time_in_Storage}
                  />

                  <label className="ware_label">Freight Cost</label>
                  <TextField
                    label="Time in Storage"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    name="freight_cost"
                    onKeyPress={handlekey}
                    fullWidth
                    error={!!errors.freight_cost}
                    helperText={errors.freight_cost}
                  />
                  <label className="ware_label">Costs to Collect</label>
                  <TextField
                    label="Costs to collect"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    onKeyPress={handlekey}
                    name="Costs_to_collect"
                    fullWidth
                    error={!!errors.Costs_to_collect}
                    helperText={errors.Costs_to_collect}
                  />
                  <label className="ware_label">Warehouse Cost</label>
                  <TextField
                    label="Warehouse Cost"
                    variant="outlined"
                    className="mb-3"
                    onChange={handlecjhaneg}
                    onKeyPress={handlekey}
                    name="Warehouse_Cost"
                    fullWidth
                    error={!!errors.Warehouse_Cost}
                    helperText={errors.Warehouse_Cost}
                  />
                  <label className="ware_label">Costs to Dispatch</label>
                  <TextField
                    label="Costs to dispatch"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    onKeyPress={handlekey}
                    name="Costs_to_dispatch"
                    fullWidth
                    error={!!errors.Costs_to_dispatch}
                    helperText={errors.Costs_to_dispatch}
                  />
                  <label className="ware_label">Destination</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="destination"
                    onChange={handlecjhaneg}
                  >
                    <option>Select...</option>
                    <option>Johannesburg, South Africa</option>
                    <option>Durban, South Africa</option>
                    <option>Cape Town, South Africa</option>
                    <option>Luanda, Angola</option>
                    <option>Harare, Zimbabwe</option>
                    <option>Bulawayo, Zimbabwe</option>
                    <option>Lusaka, Zambia</option>
                    <option>Kitwe, Zambia</option>
                    <option>Lubumbashi, DR Congo</option>
                  </select>
                  {errors.destination && (
                    <p className="text-danger mb-0">{errors.destination}</p>
                  )}
                  <label className="ware_label">
                    Costs to Collect Destination{" "}
                  </label>
                  <TextField
                    label="Costs to collect"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    onKeyPress={handlekey}
                    name="costs_to_collect_des"
                    fullWidth
                    error={!!errors.costs_to_collect_des}
                    helperText={errors.costs_to_collect_des}
                  />
                  <label className="ware_label">
                    Warehouse Cost Destination{" "}
                  </label>
                  <TextField
                    label="Warehouse Cost"
                    variant="outlined"
                    className="mb-3"
                    onChange={handlecjhaneg}
                    onKeyPress={handlekey}
                    name="costs_to_dispatch_des"
                    fullWidth
                    error={!!errors.costs_to_dispatch_des}
                    helperText={errors.costs_to_dispatch_des}
                  />

                  <label className="ware_label">
                    Costs to Dispatch Destination{" "}
                  </label>

                  <TextField
                    label="Costs to dispatch"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="mb-3"
                    onKeyPress={handlekey}
                    name="warehouse_cost_des"
                    fullWidth
                    error={!!errors.warehouse_cost_des}
                    helperText={errors.warehouse_cost_des}
                  />
                  <label className="ware_label">WayBill</label>
                  <TextField
                    label="WayBill"
                    variant="outlined"
                    onChange={handlecjhaneg}
                    className="form-control mb-3 "
                    name="WayBill"
                    fullWidth
                    error={!!errors.WayBill}
                    helperText={errors.WayBill}
                  />
                  <label className="ware_label">Destination Handler</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="Agent"
                    onChange={handlecjhaneg}
                  >
                    <option>Select...</option>
                    <option>Asia Direct</option>
                    <option>Shenzhen Nimbus Shipping</option>
                    <option>Shenzhen Portline</option>
                    <option>OBD Logistics</option>
                  </select>
                  {errors.Agent && (
                    <p className="text-danger mb-0">{errors.Agent}</p>
                  )}
                  <label className="ware_label">Warehouse</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="warehouse"
                    onChange={handlecjhaneg}
                  >
                    <option>Select...</option>
                    {batches &&
                      batches.length > 0 &&
                      batches.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <option value={item.id} key={index}>
                              {item.warehouse_name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  {errors.warehouse && (
                    <p className="text-danger mb-0">{errors.warehouse}</p>
                  )}
                  <label className="ware_label">Origin Handler</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="Forewarding_agent"
                    onChange={handlecjhaneg}
                  >
                    <option>Select...</option>
                    <option>DHL</option>
                    <option>Fedex</option>
                    <option>SACO CFR</option>
                    <option>Contra Consolidations</option>
                    <option>Afristar</option>
                    <option>Asia Direct - Africa</option>
                  </select>
                  {errors.Forewarding_agent && (
                    <p className="text-danger">{errors.Forewarding_agent}</p>
                  )}
                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="submit_btn"
                      onClick={postData1}
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
              <Modal
                open={isModalOpen1}
                onClose={closeModal1}
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
                  <h2 id="modal-modal-title">Add Excel</h2>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="mb-3 border ps-2 py-2 rounded w-100"
                    style={{ display: "block" }}
                  />
                  <Button variant="contained" onClick={postData}>
                    Submit
                  </Button>
                </Box>
              </Modal>
              <Modal
                open={isModalOpen2}
                onClose={closeModal2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    height: 600,
                    width: 450,
                    overflow: "scroll",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <div className="text-center mb-4">
                    <h3 id="modal-modal-title">Update Batch</h3>
                  </div>
                  <label className="ware_label">Batch Number</label>
                  <input
                    type="text"
                    value={inputdata.batch_number}
                    onChange={handleupdateapi}
                    name="batch_number"
                    className="form-control mb-3 py-2"
                    placeholder="batchnumber"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Batch Name</label>
                  <input
                    type="text"
                    value={inputdata.batch_name}
                    onChange={handleupdateapi}
                    name="batch_name"
                    className="form-control mb-3 py-2"
                    placeholder="batch number"
                    style={{ display: "block" }}
                  />
                  {/* <input
                    type="text"
                    value={inputdata.warehouse_id}
                    onChange={handleupdateapi}
                    name="warehouse_id"
                    placeholder="warehouse_id"
                    className="form-control mb-3"
                    style={{ display: "block", }}
                  /> */}
                  <label className="ware_label">Freight</label>
                  <select
                    name="freight"
                    onChange={handleupdateapi}
                    value={inputdata.freight}
                    id=""
                    className="form-control mb-3 py-2"
                  >
                    <option>Select...</option>
                    <option>Air</option>
                    <option>Sea</option>
                    <option>Road</option>
                  </select>
                  <label className="ware_label">Total Weight</label>
                  <input
                    type="text"
                    value={inputdata.total_weight}
                    onChange={handleupdateapi}
                    name="total_weight"
                    placeholder="total_weight"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Total Dimension</label>
                  <input
                    type="text"
                    value={inputdata.total_dimensions}
                    onChange={handleupdateapi}
                    name="total_dimensions"
                    placeholder="total_dimensions"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Dispatch</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="dispatched"
                    onChange={handleupdateapi}
                    value={inputdata.dispatched}
                  >
                    <option>Select...</option>
                    <option>True</option>
                    <option>False</option>
                  </select>
                  <label className="ware_label">Storage Time</label>
                  <input
                    type="text"
                    value={inputdata.time_in_storage}
                    onChange={handleupdateapi}
                    name="time_in_storage"
                    placeholder="time_in_storage"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Freight Cost</label>
                  <input
                    type="text"
                    value={inputdata.freight_cost}
                    onChange={handleupdateapi}
                    name="freight_cost"
                    placeholder="freight_cost"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Cost to Collect</label>
                  <input
                    type="text"
                    value={inputdata.costs_to_collect}
                    onChange={handleupdateapi}
                    name="costs_to_collect"
                    placeholder="costs_to_collect"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Warehouse Cost</label>
                  <input
                    type="text"
                    value={inputdata.warehouse_cost}
                    onChange={handleupdateapi}
                    name="warehouse_cost"
                    placeholder="warehouse_cost"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">cost to Dispatch</label>
                  <input
                    type="text"
                    value={inputdata.costs_to_dispatch}
                    onChange={handleupdateapi}
                    name="costs_to_dispatch"
                    placeholder="costs_to_dispatch"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  <label className="ware_label">Destination</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="destination"
                    value={inputdata.destination}
                    onChange={handleupdateapi}
                  >
                    <option>Select...</option>
                    <option value="Johannesburg, South Africa">
                      Johannesburg, South Africa
                    </option>
                    <option value="Durban, South Africa">
                      Durban, South Africa
                    </option>
                    <option value="Cape Town, South Africa">
                      Cape Town, South Africa
                    </option>
                    <option value="Luanda, Angola">Luanda, Angola</option>
                    <option value="Harare, Zimbabwe">Harare, Zimbabwe</option>
                    <option value="Bulawayo, Zimbabwe">
                      Bulawayo, Zimbabwe
                    </option>
                    <option value="Lusaka, Zambia">Lusaka, Zambia</option>
                    <option value="Kitwe, Zambia">Kitwe, Zambia</option>
                    <option value="Lubumbashi, DR Congo">
                      Lubumbashi, DR Congo
                    </option>
                  </select>
                  <label className="ware_label">
                    cost to collect Destination
                  </label>
                  <input
                    type="text"
                    value={inputdata.costs_to_collect_des}
                    onChange={handleupdateapi}
                    name="costs_to_collect_des"
                    placeholder="costs_to_collect_des"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />
                  {/* <select
                    className="form-control mb-3"
                    value={inputdata.agent}
                    onChange={handleupdateapi}
                    name="agent"
                  >
                    <option>Select...</option>
                    <option>Shenzhen Nimbus Shipping</option>
                    <option>Shenzhen Portline</option>
                    <option>OBD Logistics</option>
                  </select> */}
                  <label className="ware_label">Destination Handler</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="agent"
                    value={inputdata.agent}
                    onChange={handleupdateapi}
                  >
                    <option>Select...</option>
                    <option>Shenzhen Nimbus Shipping</option>
                    <option>Shenzhen Portline</option>
                    <option>OBD Logistics</option>
                  </select>
                  <label className="ware_label">Warehouse</label>
                  <select
                    className="form-control mb-3 py-2"
                    value={inputdata.warehouse_id}
                    onChange={handleupdateapi}
                    name="warehouse_id"
                    placeholder="warehouse_id"
                  >
                    <option>Select...</option>
                    {batches &&
                      batches.length > 0 &&
                      batches.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <option value={item.id} key={index}>
                              {item.warehouse_name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  <label className="ware_label">
                    Warehouse Cost Destination
                  </label>
                  <input
                    type="text"
                    value={inputdata.warehouse_cost_des}
                    onChange={handleupdateapi}
                    name="warehouse_cost_des"
                    placeholder="warehouse_cost_des"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />{" "}
                  <label className="ware_label">
                    Costs to Dispatch Destination
                  </label>
                  <input
                    type="text"
                    value={inputdata.costs_to_dispatch_des}
                    onChange={handleupdateapi}
                    name="costs_to_dispatch_des"
                    placeholder="costs_to_dispatch_des"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />{" "}
                  <label className="ware_label">Waybill</label>
                  <input
                    type="text"
                    value={inputdata.waybill}
                    onChange={handleupdateapi}
                    name="waybill"
                    placeholder="waybill"
                    className="form-control mb-3 py-2"
                    style={{ display: "block" }}
                  />{" "}
                  {/* <input
                    type="text"
                    value={inputdata.warehouse_cost}
                    onChange={handleupdateapi}
                    name="warehouse_cost"
                    placeholder="warehouse_cost"
                    className="form-control mb-3"
                    style={{ display: "block", }}
                  />{" "} */}
                  <label className="ware_label">Origin Handler</label>
                  <select
                    className="form-control mb-3 py-2"
                    name="forwarding_agent"
                    value={inputdata.forwarding_agent}
                    onChange={handleupdateapi}
                  >
                    <option>Select...</option>
                    <option>DHL</option>
                    <option>Fedex</option>
                    <option>SACO CFR</option>
                    <option>Contra Consolidations</option>
                    <option>Afristar</option>
                    <option>Asia Direct - Africa</option>
                  </select>
                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="submit_btn"
                      onClick={postData1234}
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
              <ToastContainer />
              <div className="text-center d-flex justify-content-end align-items-center mt-3">
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
              {/* <div className="mt-4">
                <button
                  disabled={currentPage === 1}
                  className="btn pagePre"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Previous
                </button>
                <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  className="btn btn-success pageNext"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Next
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
